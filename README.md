# 公募基金每日筛选

A daily Chinese mutual fund screening dashboard, automatically updated every trading day.

**Live site: https://sishilalala.github.io/fund-dashboard/**

---

## Features

### A-Share Market Overview
- **Index cards** — real-time quotes for 7 major indices: 上证指数, 深证成指, 创业板指, 沪深300, 科创50, 上证50, 北证50
- **Industry heatmap** — sector performance ranked by daily change, with leading stock for each board
- **Fund flow table** — last 5 trading days of market-wide net inflows, broken down by order size (super-large / large / medium / small)

### Fund Rankings
Tabbed view across 7 categories:

| Tab | Coverage |
|-----|----------|
| 综合 Top 50 | Cross-category top 50 by daily return |
| 股票型 | Top 30 equity funds |
| 混合型 | Top 30 hybrid funds |
| 债券型 | Top 30 bond funds |
| 指数型 | Top 30 index / ETF / LOF funds |
| QDII | Top 30 overseas-investing funds |
| FOF | Top 30 fund-of-funds / pension funds |

All tables show: daily return, 1-week, 1-month, 3-month, 6-month, 1-year, YTD, and subscription fee. Every column is sortable.

### UI
- Dark / light theme toggle
- Sticky header with trading date and last-update timestamp

---

## Architecture

### Frontend
Plain HTML + CSS + JavaScript — no build step, no framework. Served directly from the `gh-pages` branch via GitHub Pages.

### Data pipeline
`scripts/update_data.py` fetches data from:
- **East Money API** (`push2.eastmoney.com`) — index quotes
- **Sina Finance** (`vip.stock.finance.sina.com.cn`) — industry board rankings
- **AKShare** — market fund flow and open-fund rankings

It writes five chunked JS files to stay within GitHub API file-size limits:

| File | Variable | Contents |
|------|----------|----------|
| `data-market.js` | `FUND_DATA_MARKET` | Indices, industry boards, fund flow |
| `data-top-funds.js` | `FUND_DATA_TOP` | Cross-category top 50 |
| `data-cat1.js` | `FUND_DATA_CAT1` | 股票型 / 混合型 / 债券型 top 30 each |
| `data-cat2.js` | `FUND_DATA_CAT2` | 指数型 / QDII / FOF top 30 each |
| `data-meta.js` | `FUND_DATA_META` | Update timestamp and trading date |

`app.js` merges these into a single `FUND_DATA` object at runtime.

### Automation
Two GitHub Actions workflows:

- **`deploy-pages.yml`** — deploys the site to GitHub Pages on every push to `main`
- **`update-data.yml`** — runs Monday–Friday at 16:30 Beijing time (08:30 UTC), fetches fresh data, and commits the updated JS files directly to `gh-pages`

Manual trigger (`workflow_dispatch`) is enabled on both workflows.

---

## Local development

```bash
# Install Python dependencies
pip install akshare pandas requests

# Fetch latest data (writes data-*.js files in the repo root)
python scripts/update_data.py

# Serve the site locally (any static server works)
python -m http.server 8080
# then open http://localhost:8080
```

No Node.js, no npm, no build step required.
