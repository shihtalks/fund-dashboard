// app.js — Fund Dashboard Application Logic

(function () {
  'use strict';

  // ============================================================
  // UTILITIES
  // ============================================================

  function fmt(val, digits = 2) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    const abs = Math.abs(val);
    if (abs >= 1e12) return (val / 1e12).toFixed(1) + '万亿';
    if (abs >= 1e8)  return (val / 1e8).toFixed(1) + '亿';
    if (abs >= 1e4)  return (val / 1e4).toFixed(1) + '万';
    return val.toFixed(digits);
  }

  function fmtPct(val) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    const sign = val > 0 ? '+' : '';
    return sign + val.toFixed(2) + '%';
  }

  function colorClass(val) {
    if (val > 0) return 'val-up';
    if (val < 0) return 'val-down';
    return 'val-flat';
  }

  function heatColor(pct) {
    const MAX = 3;
    const clamped = Math.max(-MAX, Math.min(MAX, pct));
    const t = clamped / MAX;
    if (t > 0) {
      // red tones (up)
      const r = Math.round(180 + 60 * t);
      const g = Math.round(50 - 30 * t);
      const b = Math.round(50 - 30 * t);
      return `rgb(${r},${g},${b})`;
    } else if (t < 0) {
      // green tones (down)
      const r = Math.round(30 + 30 * t);
      const g = Math.round(160 + 30 * (-t));
      const b = Math.round(80 + 20 * (-t));
      return `rgb(${r},${g},${b})`;
    }
    return 'rgb(60,63,75)';
  }

  // ============================================================
  // INIT: META / TIMESTAMPS
  // ============================================================

  function initMeta() {
    const meta = FUND_DATA.meta;
    const tradingDateEl = document.getElementById('tradingDate');
    const lastUpdateEl  = document.getElementById('lastUpdate');
    const nextUpdateEl  = document.getElementById('nextUpdate');
    const updateTimeEl  = document.getElementById('updateTime');

    if (tradingDateEl) tradingDateEl.textContent = meta.trading_date + ' 交易数据';
    if (lastUpdateEl)  lastUpdateEl.textContent  = meta.update_time;
    if (nextUpdateEl)  nextUpdateEl.textContent  = meta.next_update;
    if (updateTimeEl)  updateTimeEl.textContent  = '数据来源: ' + meta.data_source;
  }

  // ============================================================
  // SECTION 1A: INDEX CARDS
  // ============================================================

  function renderIndexCards() {
    const container = document.getElementById('indexCards');
    if (!container) return;

    container.innerHTML = FUND_DATA.indices.map(idx => {
      const cls = colorClass(idx.change_pct);
      return `
        <div class="idx-card">
          <div class="idx-name">${idx.name} <span style="opacity:0.5;font-size:10px">${idx.code}</span></div>
          <div class="idx-price ${cls}">${idx.price.toLocaleString('zh-CN', {minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          <div class="idx-detail">
            <span class="${cls}">${fmtPct(idx.change_pct)}</span>
            <span class="${cls}">${idx.change_amt > 0 ? '+' : ''}${idx.change_amt.toFixed(2)}</span>
          </div>
          <div class="idx-amp">振幅 ${idx.amplitude}%</div>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  // SECTION 1B: INDUSTRY HEATMAP
  // ============================================================

  function renderHeatmap() {
    const container = document.getElementById('heatmapContainer');
    if (!container) return;

    // Determine flex widths by absolute magnitude of main_flow
    const boards = FUND_DATA.industry_boards;
    const maxFlow = Math.max(...boards.map(b => Math.abs(b.main_flow)));

    container.innerHTML = boards.map(b => {
      const bg = heatColor(b.change_pct);
      const flowRatio = Math.abs(b.main_flow) / maxFlow;
      const minW = 60, maxW = 140;
      const w = Math.round(minW + (maxW - minW) * flowRatio);
      return `
        <div class="hm-cell" style="background:${bg};width:${w}px;flex-grow:${flowRatio.toFixed(2)}" title="${b.name}: ${fmtPct(b.change_pct)}">
          <span class="hm-name">${b.name}</span>
          <span class="hm-pct">${fmtPct(b.change_pct)}</span>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  // SECTION 1C: FUND FLOW TABLE
  // ============================================================

  function renderFundFlow() {
    const tbody = document.getElementById('flowBody');
    if (!tbody) return;

    tbody.innerHTML = FUND_DATA.fund_flow.map(row => {
      function cell(val) {
        const cls = colorClass(val);
        return `<td class="${cls}">${val > 0 ? '+' : ''}${fmt(val, 1)}</td>`;
      }
      return `
        <tr>
          <td>${row.date}</td>
          ${cell(row.main_net)}
          ${cell(row.super_large_net)}
          ${cell(row.large_net)}
          ${cell(row.medium_net)}
          ${cell(row.small_net)}
        </tr>
      `;
    }).join('');
  }

  // ============================================================
  // SECTION 2: FUND TABLE
  // ============================================================

  let currentTab = 'top50';
  let currentSort = { key: 'daily_return', dir: 'desc' };

  function getTabFunds() {
    const funds = FUND_DATA.funds;
    if (currentTab === 'top50') {
      return [...funds].sort((a, b) => b.daily_return - a.daily_return).slice(0, 50);
    }
    return funds.filter(f => f.type === currentTab);
  }

  function sortFunds(funds) {
    const { key, dir } = currentSort;
    return [...funds].sort((a, b) => {
      const av = a[key] ?? -Infinity;
      const bv = b[key] ?? -Infinity;
      return dir === 'desc' ? bv - av : av - bv;
    });
  }

  function renderFundTable() {
    const tbody = document.getElementById('fundBody');
    if (!tbody) return;

    const funds = sortFunds(getTabFunds());

    tbody.innerHTML = funds.map((f, i) => {
      const rank = i + 1;
      let rankEl;
      if (rank <= 3) {
        rankEl = `<span class="rank-${rank}">${rank}</span>`;
      } else {
        rankEl = rank;
      }

      function pctCell(val) {
        const cls = colorClass(val);
        return `<td class="${cls}">${fmtPct(val)}</td>`;
      }

      return `
        <tr>
          <td>${rankEl}</td>
          <td>${f.code}</td>
          <td>${f.name}</td>
          <td><span class="type-badge type-${f.type}">${f.type}</span></td>
          ${pctCell(f.daily_return)}
          ${pctCell(f.week_1)}
          ${pctCell(f.month_1)}
          ${pctCell(f.month_3)}
          ${pctCell(f.month_6)}
          ${pctCell(f.year_1)}
          ${pctCell(f.ytd)}
          <td>${f.fee}</td>
        </tr>
      `;
    }).join('');
  }

  function initTabs() {
    const nav = document.getElementById('tabNav');
    if (!nav) return;
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderFundTable();
    });
  }

  function initSort() {
    const table = document.getElementById('fundTable');
    if (!table) return;
    table.querySelector('thead').addEventListener('click', e => {
      const th = e.target.closest('th.sortable');
      if (!th) return;
      const key = th.dataset.sort;
      if (currentSort.key === key) {
        currentSort.dir = currentSort.dir === 'desc' ? 'asc' : 'desc';
      } else {
        currentSort = { key, dir: 'desc' };
      }

      // Update header UI
      table.querySelectorAll('th.sortable').forEach(h => {
        h.classList.remove('sorted-asc', 'sorted-desc');
        h.querySelector('.sort-arrow').textContent = '';
      });
      th.classList.add(currentSort.dir === 'desc' ? 'sorted-desc' : 'sorted-asc');
      th.querySelector('.sort-arrow').textContent = currentSort.dir === 'desc' ? '▼' : '▲';

      renderFundTable();
    });
  }

  // ============================================================
  // SECTION 3: INSIGHTS
  // ============================================================

  function renderInsights() {
    const grid = document.getElementById('insightsGrid');
    if (!grid) return;

    grid.innerHTML = FUND_DATA.insights.map(item => `
      <div class="insight-card">
        <div class="insight-label">${item.label}</div>
        <div class="insight-value">${item.value}</div>
        <div class="insight-sub">${item.sub}</div>
      </div>
    `).join('');
  }

  // ============================================================
  // THEME TOGGLE
  // ============================================================

  function initTheme() {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'dark';
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
      try { localStorage.setItem('theme', html.getAttribute('data-theme')); } catch (e) {}
    });

    // Restore saved theme
    try {
      const saved = localStorage.getItem('theme');
      if (saved) document.documentElement.setAttribute('data-theme', saved);
    } catch (e) {}
  }

  // ============================================================
  // BOOT
  // ============================================================

  function init() {
    initMeta();
    renderIndexCards();
    renderHeatmap();
    renderFundFlow();
    initTabs();
    initSort();
    renderFundTable();
    renderInsights();
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
