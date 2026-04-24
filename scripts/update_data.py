#!/usr/bin/env python3
"""
每日自动采集公募基金数据，生成 data chunk files
数据来源：AKShare（东方财富/天天基金）、新浪财经
"""
import json
import re
import sys
import time
from datetime import datetime

import akshare as ak
import pandas as pd
import requests

# Strip HTML tags from strings sourced from external APIs.
# JavaScript's escapeHtml() handles final encoding at render time;
# this layer removes injected markup before it reaches the data files.
_HTML_TAG_RE = re.compile(r'<[^>]*>')

def sanitize_str(s):
    return _HTML_TAG_RE.sub('', str(s)) if s is not None else ''


def requests_get(url, max_retries=3, **kwargs):
    """GET with exponential backoff and rate-limit handling."""
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, **kwargs)
            if resp.status_code == 429:
                wait = int(resp.headers.get('Retry-After', 60))
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp
        except requests.RequestException as e:
            if attempt < max_retries - 1:
                delay = 2 ** attempt
                print(f"  Request failed ({e}), retrying in {delay}s...")
                time.sleep(delay)
            else:
                raise


def fetch_indices():
    """获取A股主要指数"""
    print("Fetching A-share indices...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://quote.eastmoney.com/",
    }
    url = "https://push2.eastmoney.com/api/qt/ulist.np/get"
    params = {
        "fltt": 2,
        "secids": "1.000001,0.399001,0.399006,1.000300,1.000688,1.000016,0.899050",
        "fields": "f1,f2,f3,f4,f5,f6,f7,f8,f12,f13,f14,f15,f16,f17,f18",
        "ut": "fa5fd1943c7b386f172d6893dbfba10b",
    }
    name_map = {
        "000001": "上证指数", "399001": "深证成指", "399006": "创业板指",
        "000300": "沪深300", "000688": "科创50", "000016": "上证50", "899050": "北证50",
    }
    try:
        resp = requests_get(url, params=params, headers=headers, timeout=15)
        data = resp.json()
        if data.get("data") and data["data"].get("diff"):
            indices = []
            for item in data["data"]["diff"]:
                code = item.get("f12", "")
                indices.append({
                    "code": sanitize_str(code),
                    "name": sanitize_str(name_map.get(code, item.get("f14", ""))),
                    "price": item.get("f2", 0),
                    "change_pct": item.get("f3", 0),
                    "change_amt": item.get("f4", 0),
                    "volume": item.get("f6", 0),
                    "high": item.get("f15", 0),
                    "low": item.get("f16", 0),
                    "open": item.get("f17", 0),
                    "prev_close": item.get("f18", 0),
                    "amplitude": item.get("f7", 0),
                })
            print(f"  Got {len(indices)} indices")
            return indices
    except Exception as e:
        print(f"  Error: {e}")
    return []


def fetch_industry_boards():
    """获取行业板块涨跌排名（新浪财经）"""
    print("Fetching industry boards...")
    try:
        url = "https://vip.stock.finance.sina.com.cn/q/view/newSinaHy.php"
        resp = requests_get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        match = re.search(r"=\\s*({.*})", resp.text, re.DOTALL)
        if match:
            raw = json.loads(match.group(1))
            boards = []
            for key, val in raw.items():
                parts = val.split(",")
                if len(parts) >= 13:
                    boards.append({
                        "name": sanitize_str(parts[1]),
                        "stock_count": int(parts[2]),
                        "change_pct": round(float(parts[5]), 2),
                        "volume": int(parts[6]),
                        "amount": int(parts[7]),
                        "leader_name": sanitize_str(parts[12]),
                        "leader_change_pct": round(float(parts[9]), 2),
                    })
            boards.sort(key=lambda x: x["change_pct"], reverse=True)
            print(f"  Got {len(boards)} boards")
            return boards
    except Exception as e:
        print(f"  Error: {e}")
    return []


def fetch_fund_flow():
    """获取大盘资金流向（最近5天）"""
    print("Fetching market fund flow...")
    try:
        df = ak.stock_market_fund_flow()
        flows = []
        for _, row in df.tail(5).iterrows():
            flows.append({
                "date": sanitize_str(str(row["日期"])[:10]),
                "sh_close": round(float(row["上证-收盘价"]), 2),
                "sh_change": round(float(row["上证-涨跌幅"]), 2),
                "sz_close": round(float(row["深证-收盘价"]), 2),
                "sz_change": round(float(row["深证-涨跌幅"]), 2),
                "main_net_inflow": round(float(row["主力净流入-净额"]) / 1e8, 2),
                "main_net_pct": round(float(row["主力净流入-净占比"]), 2),
                "super_large_net": round(float(row["超大单净流入-净额"]) / 1e8, 2),
                "large_net": round(float(row["大单净流入-净额"]) / 1e8, 2),
                "medium_net": round(float(row["中单净流入-净额"]) / 1e8, 2),
                "small_net": round(float(row["小单净流入-净额"]) / 1e8, 2),
            })
        print(f"  Got {len(flows)} days")
        return flows
    except Exception as e:
        print(f"  Error: {e}")
    return []


def classify_fund(name):
    name = str(name)
    if any(k in name for k in ["指数", "ETF", "LOF"]):
        return "指数型"
    if any(k in name for k in ["债", "信用", "利率", "纯债"]):
        return "债券型"
    if any(k in name for k in ["混合", "配置", "平衡", "灵活"]):
        return "混合型"
    if any(k in name for k in ["股票", "成长", "价值"]):
        return "股票型"
    if any(k in name for k in ["QDII", "美国", "美元", "港股", "全球", "亚太", "恒生", "纳斯达克", "标普"]):
        return "QDII"
    if any(k in name for k in ["FOF", "养老"]):
        return "FOF"
    return "其他"


def fetch_top_funds():
    """获取全部基金涨幅 Top 50"""
    print("Fetching top 50 funds (all types)...")
    try:
        df = ak.fund_open_fund_rank_em(symbol="全部")
        df["日增长率"] = pd.to_numeric(df["日增长率"], errors="coerce")
        df = df.dropna(subset=["日增长率"]).sort_values("日增长率", ascending=False)
        funds = []
        for _, row in df.head(50).iterrows():
            funds.append({
                "code": sanitize_str(row["基金代码"]),
                "name": sanitize_str(row["基金简称"]),
                "date": sanitize_str(str(row["日期"])),
                "nav": round(float(row["单位净值"]), 4) if pd.notna(row["单位净值"]) else None,
                "acc_nav": round(float(row["累计净值"]), 4) if pd.notna(row["累计净值"]) else None,
                "daily_return": round(float(row["日增长率"]), 2),
                "week_1": round(float(row["近1周"]), 2) if pd.notna(row["近1周"]) else None,
                "month_1": round(float(row["近1月"]), 2) if pd.notna(row["近1月"]) else None,
                "month_3": round(float(row["近3月"]), 2) if pd.notna(row["近3月"]) else None,
                "month_6": round(float(row["近6月"]), 2) if pd.notna(row["近6月"]) else None,
                "year_1": round(float(row["近1年"]), 2) if pd.notna(row["近1年"]) else None,
                "ytd": round(float(row["今年来"]), 2) if pd.notna(row["今年来"]) else None,
                "since_inception": round(float(row["成立来"]), 2) if pd.notna(row["成立来"]) else None,
                "fee": sanitize_str(row["手续费"]) if pd.notna(row["手续费"]) else None,
                "type": classify_fund(row["基金简称"]),
            })
        print(f"  Got {len(funds)} funds")
        return funds
    except Exception as e:
        print(f"  Error: {e}")
    return []


def fetch_category_funds():
    """获取各类型基金 Top 30"""
    print("Fetching per-category top 30...")
    category_funds = {}
    for symbol in ["股票型", "混合型", "债券型", "指数型", "QDII", "FOF"]:
        try:
            df = ak.fund_open_fund_rank_em(symbol=symbol)
            df["日增长率"] = pd.to_numeric(df["日增长率"], errors="coerce")
            df = df.dropna(subset=["日增长率"]).sort_values("日增长率", ascending=False)
            top = []
            for _, row in df.head(30).iterrows():
                top.append({
                    "code": sanitize_str(row["基金代码"]),
                    "name": sanitize_str(row["基金简称"]),
                    "daily_return": round(float(row["日增长率"]), 2),
                    "week_1": round(float(row["近1周"]), 2) if pd.notna(row["近1周"]) else None,
                    "month_1": round(float(row["近1月"]), 2) if pd.notna(row["近1月"]) else None,
                    "month_3": round(float(row["近3月"]), 2) if pd.notna(row["近3月"]) else None,
                    "month_6": round(float(row["近6月"]), 2) if pd.notna(row["近6月"]) else None,
                    "year_1": round(float(row["近1年"]), 2) if pd.notna(row["近1年"]) else None,
                    "ytd": round(float(row["今年来"]), 2) if pd.notna(row["今年来"]) else None,
                    "fee": sanitize_str(row["手续费"]) if pd.notna(row["手续费"]) else None,
                })
            category_funds[symbol] = top
            print(f"  {symbol}: {len(top)} funds")
        except Exception as e:
            print(f"  {symbol} Error: {e}")
    return category_funds


def main():
    data = {}
    data["indices"] = fetch_indices()
    data["industry_boards"] = fetch_industry_boards()
    data["fund_flow"] = fetch_fund_flow()
    data["top_funds"] = fetch_top_funds()
    data["category_funds"] = fetch_category_funds()

    if not data["top_funds"]:
        print("ERROR: No fund data collected. Aborting to avoid publishing empty data.", file=sys.stderr)
        sys.exit(1)

    data["metadata"] = {
        "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "trading_date": data["top_funds"][0]["date"] if data["top_funds"] else datetime.now().strftime("%Y-%m-%d"),
    }

    # Write chunked data files (to avoid GitHub API size limits)
    # data-market.js
    market = {"indices": data["indices"], "industry_boards": data["industry_boards"], "fund_flow": data["fund_flow"]}
    write_js_file("data-market.js", "FUND_DATA_MARKET", market)

    # data-top-funds.js
    write_js_file("data-top-funds.js", "FUND_DATA_TOP", {"top_funds": data["top_funds"]})

    # data-cat1.js
    cat1 = {k: data["category_funds"].get(k, []) for k in ["股票型", "混合型", "债券型"]}
    write_js_file("data-cat1.js", "FUND_DATA_CAT1", cat1)

    # data-cat2.js
    cat2 = {k: data["category_funds"].get(k, []) for k in ["指数型", "QDII", "FOF"]}
    write_js_file("data-cat2.js", "FUND_DATA_CAT2", cat2)

    # data-meta.js
    write_js_file("data-meta.js", "FUND_DATA_META", {"metadata": data["metadata"]})

    print("\nAll data chunk files written.")


def write_js_file(filename, var_name, obj):
    js = f"const {var_name} = " + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"  {filename} written ({len(js)/1024:.1f} KB)")


if __name__ == "__main__":
    main()
