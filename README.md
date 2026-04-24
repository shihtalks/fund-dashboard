# 公募基金每日筛选 — Daily Fund Dashboard

> A-share market overview + mutual fund rankings, refreshed automatically every trading day at 16:30 Beijing time.

**Live site: https://sishilalala.github.io/fund-dashboard/**

---

## What's on the dashboard

### 1. A-Share Market Overview (A股市场总览)

| Widget | What it shows |
|--------|---------------|
| Index cards | Price, change %, and volume for 7 major indices (上证指数, 深证成指, 创业板指, 沪深300, 科创50, 上证50, 北证50) |
| Industry heatmap | All industry sectors color-coded by daily gain/loss, with the top-performing stock in each sector |
| Fund flow table | Net inflows for the last 5 trading days, split by order size: super-large / large / medium / small |

### 2. Fund Rankings (基金排行榜)

Seven tabs, each showing the top performers by daily return:

| Tab | Contents |
|-----|----------|
| 综合 Top 50 | Top 50 funds across all types |
| 股票型 (Equity) | Top 30 equity funds |
| 混合型 (Hybrid) | Top 30 hybrid funds |
| 债券型 (Bond) | Top 30 bond funds |
| 指数型 (Index) | Top 30 index / ETF / LOF funds |
| QDII | Top 30 overseas-investing funds |
| FOF | Top 30 fund-of-funds / pension funds |

Every table shows: **daily return · 1W · 1M · 3M · 6M · 1Y · YTD · fee**. All columns are sortable.

### 3. Other UI details
- Dark / light theme toggle
- Sticky header displaying the current trading date and last-update time
- Next-update countdown

---

## How data gets updated

```
Every weekday at 16:30 CST (08:30 UTC)
  └─ GitHub Actions runs scripts/update_data.py
       ├─ Fetches index quotes        ← East Money API
       ├─ Fetches industry boards     ← Sina Finance
       ├─ Fetches market fund flow    ← AKShare
       └─ Fetches fund rankings       ← AKShare (东方财富/天天基金)
  └─ Writes 5 JS data files and commits them to gh-pages
  └─ Site updates automatically — no manual step needed
```

The data is split across five files to stay within GitHub's API file-size limits:

| File | Contents |
|------|----------|
| `data-market.js` | Indices, industry boards, fund flow |
| `data-top-funds.js` | Cross-category top 50 |
| `data-cat1.js` | 股票型 / 混合型 / 债券型 top 30 |
| `data-cat2.js` | 指数型 / QDII / FOF top 30 |
| `data-meta.js` | Update timestamp and trading date |

---

## Tech stack

- **Frontend** — plain HTML + CSS + JavaScript, no build tools, no framework
- **Data pipeline** — Python 3.12, using `akshare`, `pandas`, `requests`
- **Hosting** — GitHub Pages (`gh-pages` branch)
- **Automation** — two GitHub Actions workflows:
  - `deploy-pages.yml` — redeploys the site on every push to `main`
  - `update-data.yml` — daily data refresh on weekdays (manual trigger also available)

---

## Run locally

```bash
# 1. Install Python dependencies
pip install akshare pandas requests

# 2. Pull the latest data
python scripts/update_data.py

# 3. Serve the site
python -m http.server 8080
# Open http://localhost:8080
```

No Node.js or build step required.
