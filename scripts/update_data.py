#!/usr/bin/env python3
"""
update_data.py — Daily fund data updater for fund-dashboard

This script fetches real fund/market data and updates data.js.
Scheduled via GitHub Actions to run on trading days.

Data sources:
  - 东方财富 (eastmoney.com) API — market indices, fund flow
  - 天天基金 (fund.eastmoney.com) — fund rankings and returns
"""

import json
import time
import datetime
import requests
from pathlib import Path

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
OUTPUT_PATH = Path(__file__).parent.parent / "data.js"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Referer": "https://fund.eastmoney.com/",
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)

# ──────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────

def safe_float(v, default=0.0):
    try:
        return float(v)
    except (TypeError, ValueError):
        return default

def safe_get(url, params=None, retries=3, timeout=15):
    for attempt in range(retries):
        try:
            r = SESSION.get(url, params=params, timeout=timeout)
            r.raise_for_status()
            return r
        except Exception as e:
            print(f"  [warn] attempt {attempt+1} failed: {e}")
            time.sleep(2 ** attempt)
    return None

# ──────────────────────────────────────────────
# 1. MARKET INDICES
# ──────────────────────────────────────────────

INDEX_CODES = [
    "1.000001",   # 上证指数
    "0.399001",   # 深证成指
    "0.399006",   # 创业板指
    "1.000300",   # 沪深300
    "1.000688",   # 科创50
    "1.000016",   # 上证50
    "0.899050",   # 北证50
]

def fetch_indices():
    print("[1] Fetching market indices...")
    url = "https://push2.eastmoney.com/api/qt/ulist.np/get"
    params = {
        "fltt": 2,
        "invt": 2,
        "fields": "f2,f3,f4,f5,f6,f15,f16,f17,f18,f23",  # price,pct,amt,vol,turnover,high,low,open,close,amp
        "secids": ",".join(INDEX_CODES),
        "_": int(time.time() * 1000),
    }
    r = safe_get(url, params=params)
    if not r:
        return []

    try:
        data = r.json()
        items = data.get("data", {}).get("diff", [])
        code_map = {
            "000001": "上证指数", "399001": "深证成指", "399006": "创业板指",
            "000300": "沪深300", "000688": "科创50", "000016": "上证50", "899050": "北证50"
        }
        result = []
        for item in items:
            code = str(item.get("f12", ""))
            result.append({
                "code": code,
                "name": code_map.get(code, item.get("f14", "")),
                "price":       safe_float(item.get("f2")),
                "change_pct":  safe_float(item.get("f3")),
                "change_amt":  safe_float(item.get("f4")),
                "volume":      safe_float(item.get("f5")),
                "high":        safe_float(item.get("f15")),
                "low":         safe_float(item.get("f16")),
                "open":        safe_float(item.get("f17")),
                "prev_close":  safe_float(item.get("f18")),
                "amplitude":   safe_float(item.get("f23")),
            })
        print(f"   → {len(result)} indices fetched")
        return result
    except Exception as e:
        print(f"   [error] parsing indices: {e}")
        return []

# ──────────────────────────────────────────────
# 2. INDUSTRY BOARDS
# ──────────────────────────────────────────────

def fetch_industry_boards():
    print("[2] Fetching industry boards...")
    url = "https://push2.eastmoney.com/api/qt/clist/get"
    params = {
        "pn": 1, "pz": 50, "po": 1, "np": 1, "ut": "bd1d9ddb04089700cf9c27f6f7426281",
        "fltt": 2, "invt": 2,
        "fid": "f3",
        "fs": "m:90+t:2+f:!50",  # SW industry boards
        "fields": "f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152",
        "_": int(time.time() * 1000),
    }
    r = safe_get(url, params=params)
    if not r:
        return []
    try:
        data = r.json()
        items = data.get("data", {}).get("diff", [])
        result = []
        for item in items:
            result.append({
                "name":       item.get("f14", ""),
                "change_pct": safe_float(item.get("f3")),
                "main_flow":  safe_float(item.get("f62")),
            })
        print(f"   → {len(result)} boards fetched")
        return result
    except Exception as e:
        print(f"   [error] parsing boards: {e}")
        return []

# ──────────────────────────────────────────────
# 3. FUND FLOW (MARKET LEVEL)
# ──────────────────────────────────────────────

def fetch_fund_flow():
    print("[3] Fetching market-level fund flow...")
    url = "https://push2his.eastmoney.com/api/qt/kamt/kline/get"
    params = {
        "fields1": "f1,f2,f3,f7",
        "fields2": "f51,f52,f53,f54,f55,f56,f57,f58",
        "klt": 101,  # daily
        "lmt": 5,
        "_": int(time.time() * 1000),
    }
    r = safe_get(url, params=params)
    if not r:
        return []
    try:
        data = r.json()
        klines = data.get("data", {}).get("klines", [])
        result = []
        for line in klines:
            parts = line.split(",")
            if len(parts) < 7:
                continue
            result.append({
                "date":             parts[0],
                "main_net":         safe_float(parts[1]) * 1e8,
                "super_large_net":  safe_float(parts[2]) * 1e8,
                "large_net":        safe_float(parts[3]) * 1e8,
                "medium_net":       safe_float(parts[4]) * 1e8,
                "small_net":        safe_float(parts[5]) * 1e8,
            })
        result.sort(key=lambda x: x["date"], reverse=True)
        print(f"   → {len(result)} days of fund flow fetched")
        return result
    except Exception as e:
        print(f"   [error] parsing fund flow: {e}")
        return []

# ──────────────────────────────────────────────
# 4. FUND RANKINGS
# ──────────────────────────────────────────────

FUND_TYPE_MAP = {
    "001": "股票型",
    "002": "混合型",
    "003": "债券型",
    "004": "混合型",  # 货币型 → skip or relabel
    "005": "债券型",
    "006": "QDII",
    "007": "货币型",
    "008": "指数型",
    "009": "股票型",
    "010": "FOF",
    "011": "指数型",
    "013": "QDII",
}

def fetch_funds_by_type(fund_type_code, type_label, top_n=50):
    """Fetch top N funds of a given type from 天天基金."""
    url = "https://fund.eastmoney.com/data/rankhandler.aspx"
    params = {
        "op": "ph",
        "dt": "kf",
        "ft": fund_type_code,
        "rs": "",
        "gs": 0,
        "sc": "1nzf",  # sort by 1-year return
        "st": "desc",
        "pi": 1,
        "pn": top_n,
        "dx": 1,
        "v": int(time.time() * 1000),
    }
    r = safe_get(url, params=params)
    if not r:
        return []
    try:
        # Response format: var rankData = {...}
        text = r.text
        start = text.index("[") 
        end = text.rindex("]") + 1
        arr = json.loads(text[start:end])
        result = []
        for item in arr:
            parts = item.split(",")
            if len(parts) < 20:
                continue
            try:
                result.append({
                    "code":         parts[0],
                    "name":         parts[1],
                    "type":         type_label,
                    "daily_return": safe_float(parts[8]),
                    "week_1":       safe_float(parts[11]),
                    "month_1":      safe_float(parts[13]),
                    "month_3":      safe_float(parts[14]),
                    "month_6":      safe_float(parts[15]),
                    "year_1":       safe_float(parts[16]),
                    "ytd":          safe_float(parts[17]),
                    "fee":          parts[27] + "%" if len(parts) > 27 else "—",
                })
            except Exception:
                continue
        return result
    except Exception as e:
        print(f"   [error] parsing fund type {type_label}: {e}")
        return []

def fetch_all_funds():
    print("[4] Fetching fund rankings...")
    type_map = [
        ("001", "股票型"),
        ("002", "混合型"),
        ("003", "债券型"),
        ("011", "指数型"),
        ("006", "QDII"),
        ("010", "FOF"),
    ]
    all_funds = []
    for code, label in type_map:
        funds = fetch_funds_by_type(code, label, top_n=100)
        print(f"   → {label}: {len(funds)} funds")
        all_funds.extend(funds)
        time.sleep(0.5)  # polite delay
    return all_funds

# ──────────────────────────────────────────────
# 5. INSIGHTS (auto-generated)
# ──────────────────────────────────────────────

def generate_insights(indices, boards, fund_flow, funds):
    insights = []

    # Best / worst board
    if boards:
        best  = max(boards, key=lambda b: b["change_pct"])
        worst = min(boards, key=lambda b: b["change_pct"])
        insights.append({
            "label": "今日最强板块",
            "value": f"{best['name']}领涨，<span class='highlight-up'>{best['change_pct']:+.2f}%</span>，主力净流入 <span class='highlight-up'>{best['main_flow']/1e8:+.1f}亿</span>",
            "sub":   "板块资金流入显著，建议关注相关基金"
        })
        insights.append({
            "label": "今日最弱板块",
            "value": f"{worst['name']}跌幅居首，<span class='highlight-down'>{worst['change_pct']:+.2f}%</span>，资金持续流出",
            "sub":   "板块承压，建议回避相关主题基金"
        })

    # Top fund
    if funds:
        top = max(funds, key=lambda f: f["daily_return"])
        insights.append({
            "label": "基金综合排名冠军",
            "value": f"<span class='highlight-accent'>{top['name']} ({top['code']})</span> 日涨 <span class='highlight-up'>{top['daily_return']:+.2f}%</span>",
            "sub":   f"今年来累计涨幅 {top['ytd']:+.2f}%"
        })

    # Fund flow summary
    if fund_flow:
        today = fund_flow[0]
        main = today["main_net"]
        super_l = today["super_large_net"]
        large = today["large_net"]
        small = today["small_net"]
        sentiment = "偏多" if main > 0 else "偏空"
        insights.append({
            "label": "资金流向提示",
            "value": f"今日主力净流入 <span class='{'highlight-up' if main>0 else "highlight-down"}'>{main/1e8:+.1f}亿</span>，市场情绪{sentiment}",
            "sub":   f"超大单净流入 {super_l/1e8:+.1f}亿，大单净流入 {large/1e8:+.1f}亿，小单净流出 {small/1e8:+.1f}亿"
        })

    # Index overview
    if indices:
        hs300 = next((i for i in indices if i["code"] == "000300"), None)
        sh    = next((i for i in indices if i["code"] == "000001"), None)
        cyb   = next((i for i in indices if i["code"] == "399006"), None)
        parts = []
        for idx in [hs300, sh, cyb]:
            if idx:
                cls = "highlight-up" if idx["change_pct"] > 0 else "highlight-down"
                parts.append(f"{idx['name']} <span class='{cls}'>{idx['change_pct']:+.2f}%</span>")
        insights.append({
            "label": "今日指数概览",
            "value": "，".join(parts),
            "sub":   "大盘整体走势，供参考"
        })

    return insights

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────

def main():
    now = datetime.datetime.now()
    today = now.strftime("%Y-%m-%d")
    update_time = now.strftime("%Y-%m-%d %H:%M:%S")

    # Calculate next update (next trading day 09:35)
    next_day = now + datetime.timedelta(days=1)
    while next_day.weekday() >= 5:  # skip weekends
        next_day += datetime.timedelta(days=1)
    next_update = next_day.strftime("%Y-%m-%d") + " 09:35:00"

    print(f"\n=== Fund Dashboard Data Update ===")
    print(f"Time: {update_time}")
    print()

    indices      = fetch_indices()
    boards       = fetch_industry_boards()
    fund_flow    = fetch_fund_flow()
    funds        = fetch_all_funds()
    insights     = generate_insights(indices, boards, fund_flow, funds)

    payload = {
        "indices":         indices,
        "industry_boards": boards,
        "fund_flow":       fund_flow,
        "funds":           funds,
        "insights":        insights,
        "meta": {
            "trading_date": today,
            "update_time":  update_time,
            "next_update":  next_update,
            "data_source":  "东方财富、天天基金",
        }
    }

    js_content = "const FUND_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")

    print(f"\n✓ data.js updated: {OUTPUT_PATH}")
    print(f"  Indices: {len(indices)}, Boards: {len(boards)}, Funds: {len(funds)}, Flow days: {len(fund_flow)}")

if __name__ == "__main__":
    main()
