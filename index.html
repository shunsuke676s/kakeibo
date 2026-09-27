'use strict';

/* ================= 定数・ユーティリティ ================= */
const STORE_KEY = 'kakeibo.v2';
const OLD_KEY = 'kakeibo.v1';
const DEFAULT_MAJORS = [
  { name: '食費', minors: ['食料品', '外食', 'カフェ・おやつ', 'その他'] },
  { name: '日用品', minors: ['消耗品', '雑貨', 'その他'] },
  { name: '交通', minors: ['電車・バス', 'タクシー', 'ガソリン・駐車場', 'その他'] },
  { name: '住居', minors: ['家賃・ローン', '家具・家電', 'その他'] },
  { name: '光熱費', minors: ['電気', 'ガス', '水道'] },
  { name: '通信', minors: ['スマホ', 'インターネット', 'サブスク'] },
  { name: '娯楽', minors: ['趣味', '旅行', '本・ゲーム', 'その他'] },
  { name: '交際', minors: ['飲み会', 'プレゼント', 'その他'] },
  { name: '医療', minors: ['病院', '薬', 'その他'] },
  { name: '衣服', minors: ['服・靴', '美容院', 'その他'] },
  { name: 'その他', minors: ['その他'] },
];
const PALETTE = ['#0f766e', '#f59e0b', '#3b82f6', '#ec4899', '#22c55e', '#ef4444',
  '#8b5cf6', '#06b6d4', '#a16207', '#f97316', '#64748b', '#84cc16'];
const EXTRA_COLOR = '#94a3b8';
const WEEK = ['日', '月', '火', '水', '木', '金', '土'];
const UNSET_MINOR = '（未分類）';

const $ = (sel) => document.querySelector(sel);
const pad = (n) => String(n).padStart(2, '0');
const fmtNum = (n) => Math.round(n).toLocaleString('ja-JP');
const yen = (n) => '¥' + fmtNum(n);
const signedYen = (n) => (n > 0 ? '+' : n < 0 ? '-' : '') + yen(Math.abs(n));
const clone = (o) => JSON.parse(JSON.stringify(o));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const toHalfDigits = (s) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
const ds = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const pd = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const todayStr = () => ds(new Date());

function yenShort(n) {
  const a = Math.abs(n), s = n < 0 ? '-' : '';
  if (a >= 1e8) return s + '¥' + +(a / 1e8).toFixed(1) + '億';
  if (a >= 1e4) return s + '¥' + +(a / 1e4).toFixed(1) + '万';
  return s + yen(a);
}
function shade(hex, t) { // 白と混ぜて薄くする
  const n = parseInt(hex.slice(1), 16);
  const mix = (c) => Math.round(c + (255 - c) * t);
  return `rgb(${mix(n >> 16)},${mix((n >> 8) & 255)},${mix(n & 255)})`;
}
function totals(list) {
  let inc = 0, exp = 0;
  for (const e of list) { if (e.type === 'income') inc += e.amount; else exp += e.amount; }
  return { inc, exp, bal: inc - exp };
}
function setSigned(el, v) {
  el.textContent = signedYen(v);
  el.className = v < 0 ? 'neg' : 'pos';
}

/* ================= データ ================= */
function freshState() {
  return { entries: [], majors: clone(DEFAULT_MAJORS), defaults: { major: '食費', minor: '食料品' } };
}

function loadState() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { /* 破損時は初期化 */ }
  if (!d || typeof d !== 'object') {
    d = freshState();
    // 旧バージョン（v1）のデータを引き継ぐ
    try {
      const old = JSON.parse(localStorage.getItem(OLD_KEY));
      if (old && Array.isArray(old.entries)) {
        d.entries = old.entries.map((e) => {
          const inc = e.type === 'income';
          return {
            id: e.id || uid(), createdAt: e.createdAt || Date.now(),
            type: inc ? 'income' : 'expense', amount: e.amount, date: e.date,
            major: inc ? '' : (e.category || 'その他'), minor: '',
            memo: inc ? [e.category, e.memo].filter(Boolean).join(' ') : (e.memo || ''),
          };
        });
        d.lastBackup = old.lastBackup;
        for (const e of d.entries) {
          if (e.type === 'expense' && !d.majors.some((m) => m.name === e.major)) d.majors.push({ name: e.major, minors: [] });
        }
      }
    } catch (e) { /* 旧データなし */ }
  }
  if (!Array.isArray(d.entries)) d.entries = [];
  if (!Array.isArray(d.majors) || !d.majors.length) d.majors = clone(DEFAULT_MAJORS);
  d.majors.forEach((m) => { if (!Array.isArray(m.minors)) m.minors = []; });
  if (!d.defaults) d.defaults = { major: '', minor: '' };
  return d;
}
let state = loadState();

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); return true; }
  catch (e) { toast('保存できませんでした'); return false; }
}
const findMajor = (name) => state.majors.find((m) => m.name === name);
function ensureDefaults() {
  const m = findMajor(state.defaults.major) || state.majors[0];
  state.defaults.major = m ? m.name : '';
  if (!m || !m.minors.includes(state.defaults.minor)) state.defaults.minor = (m && m.minors[0]) || '';
}
function majorColor(name) {
  const i = state.majors.findIndex((m) => m.name === name);
  return i < 0 ? EXTRA_COLOR : PALETTE[i % PALETTE.length];
}

/* ================= 画面遷移 ================= */
let currentScreen = 'home';
let prevHash = '#/';
let lastHash = location.hash || '#/';

function route() {
  const hash = location.hash || '#/';
  if (hash !== lastHash) { prevHash = lastHash; lastHash = hash; }
  const [name, arg] = hash.replace(/^#\/?/, '').split('/');

  let screen = 'home', title = '家計簿';
  if (name === 'expense' || name === 'income') {
    screen = 'entry';
    title = openEntry(name, null);
  } else if (name === 'edit') {
    const e = state.entries.find((x) => x.id === decodeURIComponent(arg || ''));
    if (e) { screen = 'entry'; title = openEntry(e.type, e); }
  } else if (name === 'graph') { screen = 'graph'; title = 'グラフ'; }
  else if (name === 'settings') { screen = 'settings'; title = '管理画面'; }

  currentScreen = screen;
  for (const s of ['home', 'entry', 'graph', 'settings']) $('#screen-' + s).hidden = s !== screen;
  $('#title').textContent = title;
  $('#backBtn').hidden = screen === 'home';
  $('#backBtn').textContent = name === 'edit' ? '‹ 戻る' : '‹ ホーム';
  renderCurrent();
  window.scrollTo(0, 0);
}

function renderCurrent() {
  if (currentScreen === 'home') renderHome();
  else if (currentScreen === 'graph') renderGraph();
  else if (currentScreen === 'settings') renderSettings();
  else if (currentScreen === 'entry') renderEntryRecent();
}

function goBack() {
  const [name] = location.hash.replace(/^#\/?/, '').split('/');
  location.hash = name === 'edit' && prevHash && !prevHash.startsWith('#/edit') ? prevHash : '#/';
}

/* ================= 明細リスト（共通） ================= */
function rowHTML(e) {
  const inc = e.type === 'income';
  const badge = inc
    ? '<span class="badge income">収入</span>'
    : `<span class="badge" style="--c:${majorColor(e.major)}">${esc(e.major)}</span>`;
  const text = inc ? esc(e.memo || '') : [e.minor, e.memo].filter(Boolean).map(esc).join('<small>・</small>');
  return `<a class="row" href="#/edit/${encodeURIComponent(e.id)}">${badge}<span class="row-text">${text}</span>
    <span class="amt ${inc ? 'pos' : 'neg'}">${inc ? '+' : '-'}${yen(e.amount)}</span></a>`;
}

function listHTML(entries, emptyText) {
  if (!entries.length) return `<p class="empty">${emptyText}</p>`;
  const groups = new Map();
  [...entries]
    .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || 0) - (a.createdAt || 0))
    .forEach((e) => { if (!groups.has(e.date)) groups.set(e.date, []); groups.get(e.date).push(e); });
  let html = '';
  for (const [date, items] of groups) {
    const d = pd(date), t = totals(items), parts = [];
    if (t.exp) parts.push('支出 ' + yen(t.exp));
    if (t.inc) parts.push('収入 ' + yen(t.inc));
    html += `<div class="day"><div class="day-head"><span>${d.getMonth() + 1}月${d.getDate()}日(${WEEK[d.getDay()]})</span><span>${parts.join('　')}</span></div>
      <div class="card">${items.map(rowHTML).join('')}</div></div>`;
  }
  return html;
}

/* ================= ホーム ================= */
function renderHome() {
  const now = new Date();
  const key = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  const t = totals(state.entries.filter((e) => e.date.slice(0, 7) === key));
  $('#homeMonth').textContent = `${now.getFullYear()}年${now.getMonth() + 1}月の収支`;
  $('#hInc').textContent = yen(t.inc);
  $('#hExp').textContent = yen(t.exp);
  setSigned($('#hBal'), t.bal);
  const recent = [...state.entries]
    .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 10);
  $('#recentList').innerHTML = listHTML(recent, 'まだ記録がありません。<br>「支出入力」「収入入力」から始めましょう。');
}

/* ================= 支出・収入入力 ================= */
let entryMode = 'expense';
let editing = null;

function openEntry(mode, e) {
  entryMode = mode;
  editing = e;
  const isExp = mode === 'expense';
  $('#entryForm').dataset.mode = mode;
  $('#majorField').hidden = !isExp;
  $('#minorField').hidden = !isExp;
  $('#dateLabel').textContent = isExp ? '日付' : '収入日';
  $('#fDate').value = e ? e.date : todayStr();
  $('#fAmount').value = e ? fmtNum(e.amount) : '';
  $('#fMemo').value = e ? e.memo || '' : '';
  if (isExp) {
    const major = e ? e.major : state.defaults.major;
    fillMajor(major);
    fillMinor(major, e ? e.minor : (major === state.defaults.major ? state.defaults.minor : null));
  }
  $('#saveBtn').textContent = e ? '更新する' : '記録する';
  $('#deleteBtn').hidden = !e;
  $('#entryRecentWrap').hidden = !!e;
  return e ? '記録を編集' : isExp ? '支出入力' : '収入入力';
}

function optionsHTML(names) {
  return names.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join('');
}
function fillMajor(selected) {
  const names = state.majors.map((m) => m.name);
  if (selected && !names.includes(selected)) names.push(selected); // 削除済み分類の記録を編集する場合
  $('#fMajor').innerHTML = optionsHTML(names);
  $('#fMajor').value = selected || names[0];
}
function fillMinor(major, selected) {
  const m = findMajor(major);
  const names = m ? m.minors.slice() : [];
  if (selected && !names.includes(selected)) names.push(selected);
  const sel = $('#fMinor');
  sel.innerHTML = names.length ? optionsHTML(names) : '<option value="">（なし）</option>';
  sel.value = selected || names[0] || '';
}

function renderEntryRecent() {
  if (editing) return;
  const isExp = entryMode === 'expense';
  $('#entryRecentTitle').textContent = isExp ? '最近の支出' : '最近の収入';
  const list = state.entries
    .filter((e) => e.type === entryMode)
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 5);
  $('#entryRecent').innerHTML = listHTML(list, isExp ? 'まだ支出の記録はありません。' : 'まだ収入の記録はありません。');
}

/* ================= グラフ ================= */
const graph = { tab: 'expense', gran: 'm', anchor: new Date(), buckets: [] };
const BUCKETS = { d: 7, w: 8, m: 12, y: 5 };

function pStart(d, g) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (g === 'w') x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // 月曜始まり
  else if (g === 'm') x.setDate(1);
  else if (g === 'y') x.setMonth(0, 1);
  return x;
}
function pShift(start, g, n) {
  if (g === 'd') return new Date(start.getFullYear(), start.getMonth(), start.getDate() + n);
  if (g === 'w') return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7 * n);
  if (g === 'm') return new Date(start.getFullYear(), start.getMonth() + n, 1);
  return new Date(start.getFullYear() + n, 0, 1);
}
const pRange = (start, g) => [ds(start), ds(pShift(start, g, 1))];
const inRange = (list, [a, b]) => list.filter((e) => e.date >= a && e.date < b);

function pLabel(s, g) {
  const y = s.getFullYear(), m = s.getMonth() + 1, d = s.getDate();
  if (g === 'd') return `${y}年${m}月${d}日(${WEEK[s.getDay()]})`;
  if (g === 'w') {
    const e = pShift(s, 'd', 6);
    return `${y}年 ${m}/${d}〜${e.getMonth() + 1}/${e.getDate()}`;
  }
  if (g === 'm') return `${y}年${m}月`;
  return `${y}年`;
}
function pShort(s, g) {
  if (g === 'd' || g === 'w') return `${s.getMonth() + 1}/${s.getDate()}`;
  if (g === 'm') return s.getMonth() === 0 ? `${String(s.getFullYear()).slice(2)}/1` : `${s.getMonth() + 1}月`;
  return String(s.getFullYear());
}

function renderGraph() {
  document.querySelectorAll('#graphTab button').forEach((b) => b.classList.toggle('active', b.dataset.v === graph.tab));
  document.querySelectorAll('#granSeg button').forEach((b) => b.classList.toggle('active', b.dataset.v === graph.gran));
  const g = graph.gran;
  const start = pStart(graph.anchor, g);
  const range = pRange(start, g);
  const list = inRange(state.entries, range);
  const t = totals(list);
  $('#pLabel').textContent = pLabel(start, g);
  $('#gInc').textContent = yen(t.inc);
  $('#gExp').textContent = yen(t.exp);
  setSigned($('#gBal'), t.bal);

  graph.buckets = [];
  for (let i = BUCKETS[g] - 1; i >= 0; i--) {
    const s = pShift(start, g, -i);
    const items = inRange(state.entries, pRange(s, g));
    graph.buckets.push({ start: s, label: pShort(s, g), items, ...totals(items) });
  }

  let html = '';
  if (graph.tab === 'expense') html = expenseView(list);
  else if (graph.tab === 'income') html = incomeView(list, t);
  else html = savingView(list, t, range);
  $('#graphBody').innerHTML = html;
}

function breakdown(exps) {
  const map = new Map();
  for (const e of exps) {
    let m = map.get(e.major);
    if (!m) { m = { name: e.major, total: 0, minors: new Map() }; map.set(e.major, m); }
    m.total += e.amount;
    const k = e.minor || UNSET_MINOR;
    m.minors.set(k, (m.minors.get(k) || 0) + e.amount);
  }
  return [...map.values()]
    .sort((a, b) => b.total - a.total)
    .map((m) => {
      const color = majorColor(m.name);
      const minors = [...m.minors].sort((a, b) => b[1] - a[1]);
      return {
        name: m.name, total: m.total, color,
        minors: minors.map(([name, v], j) => ({ name, v, color: shade(color, minors.length > 1 ? (j / minors.length) * 0.7 : 0) })),
      };
    });
}

function arcPath(cx, cy, r0, r1, a0, a1) {
  if (a1 - a0 >= Math.PI * 2 - 1e-6) {
    const mid = a0 + Math.PI;
    return arcPath(cx, cy, r0, r1, a0, mid) + arcPath(cx, cy, r0, r1, mid, a1);
  }
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const p = (r, a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(r1, a0)}A${r1} ${r1} 0 ${large} 1 ${p(r1, a1)}L${p(r0, a1)}A${r0} ${r0} 0 ${large} 0 ${p(r0, a0)}Z`;
}

function sunburst(bd, total) {
  const C = 115;
  let a = -Math.PI / 2, svg = '';
  for (const m of bd) {
    const a1 = a + (m.total / total) * Math.PI * 2;
    svg += `<path d="${arcPath(C, C, 52, 80, a, a1)}" fill="${m.color}" style="stroke:var(--card)" stroke-width="1.5"/>`;
    let b = a;
    for (const s of m.minors) {
      const b1 = b + (s.v / total) * Math.PI * 2;
      svg += `<path d="${arcPath(C, C, 83, 110, b, b1)}" fill="${s.color}" style="stroke:var(--card)" stroke-width="1.5"/>`;
      b = b1;
    }
    a = a1;
  }
  return `<svg class="sunburst" viewBox="0 0 230 230" role="img" aria-label="支出の内訳">${svg}
    <text x="${C}" y="${C - 6}" text-anchor="middle" font-size="11" style="fill:var(--sub)">支出合計</text>
    <text x="${C}" y="${C + 14}" text-anchor="middle" font-size="17" font-weight="700" style="fill:var(--text)">${yenShort(total)}</text></svg>`;
}

// 棒グラフ：mode='stack'（積み上げ） / 'signed'（プラスマイナス）
function barChart(bars, mode) {
  const W = 340, H = 190, top = 20, base = 158, n = bars.length;
  const gw = W / n, bw = Math.min(26, gw * 0.62);
  let maxV, minV;
  if (mode === 'stack') { maxV = Math.max(1, ...bars.map((b) => b.total)); minV = 0; }
  else {
    maxV = Math.max(0, ...bars.map((b) => b.v));
    minV = Math.min(0, ...bars.map((b) => b.v));
    if (maxV === minV) maxV = 1;
  }
  const scale = (base - top) / (maxV - minV);
  const zeroY = top + maxV * scale;
  let svg = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  svg += `<text x="2" y="12" font-size="10" style="fill:var(--sub)">${yenShort(maxV)}</text>`;
  if (minV < 0) svg += `<text x="2" y="${base + 2}" font-size="10" style="fill:var(--sub)" dominant-baseline="hanging">${yenShort(minV)}</text>`;
  bars.forEach((b, i) => {
    const x = gw * i + (gw - bw) / 2;
    const sel = i === n - 1;
    svg += `<g opacity="${sel ? 1 : 0.5}">`;
    if (mode === 'stack') {
      let y = zeroY;
      for (const s of b.segs) {
        const h = s.v * scale;
        if (h <= 0) continue;
        y -= h;
        svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" fill="${s.color}"/>`;
      }
    } else if (b.v) {
      const h = Math.abs(b.v) * scale;
      const y = b.v > 0 ? zeroY - h : zeroY;
      svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" style="fill:var(${b.v > 0 ? '--income' : '--expense'})"/>`;
    }
    svg += '</g>';
    svg += `<text x="${(gw * i + gw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="${n > 8 ? 9.5 : 11}" font-weight="${sel ? 700 : 400}" style="fill:var(${sel ? '--text' : '--sub'})">${b.label}</text>`;
    svg += `<rect class="bar-hit" data-bi="${i}" x="${(gw * i).toFixed(1)}" y="0" width="${gw.toFixed(1)}" height="${H}" fill="transparent"/>`;
  });
  svg += `<line x1="0" y1="${zeroY.toFixed(1)}" x2="${W}" y2="${zeroY.toFixed(1)}" style="stroke:var(--line)"/>`;
  return svg + '</svg>';
}

function lineChart(points) {
  const W = 340, H = 170, top = 20, base = 138, n = points.length;
  const gw = W / n;
  let maxV = Math.max(0, ...points.map((p) => p.v));
  let minV = Math.min(0, ...points.map((p) => p.v));
  if (maxV === minV) maxV = 1;
  const scale = (base - top) / (maxV - minV);
  const Y = (v) => top + (maxV - v) * scale;
  const X = (i) => gw * i + gw / 2;
  const pts = points.map((p, i) => `${X(i).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ');
  let svg = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  svg += `<text x="2" y="12" font-size="10" style="fill:var(--sub)">${yenShort(maxV)}</text>`;
  svg += `<line x1="0" y1="${Y(0).toFixed(1)}" x2="${W}" y2="${Y(0).toFixed(1)}" style="stroke:var(--line)"/>`;
  svg += `<polyline points="${pts}" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>`;
  points.forEach((p, i) => {
    const sel = i === n - 1;
    svg += `<circle cx="${X(i).toFixed(1)}" cy="${Y(p.v).toFixed(1)}" r="${sel ? 4.5 : 3}" style="fill:var(${p.v < 0 ? '--expense' : '--accent'})"/>`;
    svg += `<text x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="${n > 8 ? 9.5 : 11}" font-weight="${sel ? 700 : 400}" style="fill:var(${sel ? '--text' : '--sub'})">${p.label}</text>`;
    svg += `<rect class="bar-hit" data-bi="${i}" x="${(gw * i).toFixed(1)}" y="0" width="${gw.toFixed(1)}" height="${H}" fill="transparent"/>`;
  });
  return svg + '</svg>';
}

const HINT = '<p class="hint">グラフをタップするとその期間に移動します</p>';

function expenseView(list) {
  const exps = list.filter((e) => e.type === 'expense');
  const total = exps.reduce((s, e) => s + e.amount, 0);
  let html = '<div class="panel"><h3>内訳（内側：大分類／外側：小分類）</h3>';
  if (!total) {
    html += '<p class="empty">この期間の支出はありません。</p>';
  } else {
    const bd = breakdown(exps);
    html += sunburst(bd, total);
    for (const m of bd) {
      html += `<details class="bd"><summary>
          <span class="dot" style="background:${m.color}"></span>
          <span class="bd-name">${esc(m.name)}</span>
          <span class="bd-val">${yen(m.total)}<small>${((m.total / total) * 100).toFixed(1)}%</small></span>
          <span class="chev"></span>
          <span class="seg-bar">${m.minors.map((s) => `<i style="width:${(s.v / total) * 100}%;background:${s.color}"></i>`).join('')}</span>
        </summary><ul class="minor-list">
        ${m.minors.map((s) => `<li class="minor-row"><span class="dot" style="background:${s.color}"></span><span class="mn">${esc(s.name)}</span><span class="mv">${yen(s.v)}<small>${((s.v / m.total) * 100).toFixed(1)}%</small></span></li>`).join('')}
        </ul></details>`;
    }
  }
  html += '</div>';

  // 推移（大分類で色分けした積み上げ棒）
  const used = new Set();
  const bars = graph.buckets.map((b) => {
    const bd = breakdown(b.items.filter((e) => e.type === 'expense'));
    bd.forEach((m) => used.add(m.name));
    return { label: b.label, total: b.exp, segs: bd.map((m) => ({ v: m.total, color: m.color })) };
  });
  const legend = [...used].map((n) => `<span><i style="background:${majorColor(n)}"></i>${esc(n)}</span>`).join('');
  html += `<div class="panel"><h3>支出の推移</h3>${barChart(bars, 'stack')}<div class="legend">${legend}</div>${HINT}</div>`;
  html += `<h2 class="section-title">この期間の支出</h2>${listHTML(exps, 'この期間の支出はありません。')}`;
  return html;
}

function incomeView(list, t) {
  const incs = list.filter((e) => e.type === 'income');
  let html = `<div class="panel"><div class="stats">
      <div class="stat wide"><span>収入合計</span><strong class="pos">${yen(t.inc)}</strong></div>
      <div class="stat"><span>件数</span><strong>${incs.length}件</strong></div>
      <div class="stat"><span>支出に対する割合</span><strong>${t.exp ? Math.round((t.inc / t.exp) * 100) + '%' : '—'}</strong></div>
    </div></div>`;
  const bars = graph.buckets.map((b) => ({ label: b.label, total: b.inc, segs: [{ v: b.inc, color: getCss('--income') }] }));
  html += `<div class="panel"><h3>収入の推移</h3>${barChart(bars, 'stack')}${HINT}</div>`;
  html += `<h2 class="section-title">この期間の収入</h2>${listHTML(incs, 'この期間の収入はありません。')}`;
  return html;
}

function savingView(list, t, range) {
  const cumulative = (end) => totals(state.entries.filter((e) => e.date < end)).bal;
  const total = cumulative(range[1]);
  const rate = t.inc ? Math.round((t.bal / t.inc) * 100) + '%' : '—';
  let html = `<div class="panel"><div class="stats">
      <div class="stat wide"><span>この期間の貯金額（収入－支出）</span><strong class="${t.bal < 0 ? 'neg' : 'pos'}">${signedYen(t.bal)}</strong></div>
      <div class="stat"><span>貯蓄率</span><strong>${rate}</strong></div>
      <div class="stat"><span>累計貯金額</span><strong class="${total < 0 ? 'neg' : ''}">${signedYen(total)}</strong></div>
    </div></div>`;
  const bars = graph.buckets.map((b) => ({ label: b.label, v: b.bal }));
  html += `<div class="panel"><h3>貯金額の推移（プラス＝青／マイナス＝赤）</h3>${barChart(bars, 'signed')}${HINT}</div>`;
  const points = graph.buckets.map((b) => ({ label: b.label, v: cumulative(pRange(b.start, graph.gran)[1]) }));
  html += `<div class="panel"><h3>累計貯金額の推移</h3>${lineChart(points)}</div>`;
  html += `<h2 class="section-title">この期間の明細</h2>${listHTML(list, 'この期間の記録はありません。')}`;
  return html;
}

function getCss(v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#2563eb'; }

/* ================= 管理画面 ================= */
const openMajors = new Set();

function renderSettings() {
  ensureDefaults();
  $('#defMajor').innerHTML = optionsHTML(state.majors.map((m) => m.name));
  $('#defMajor').value = state.defaults.major;
  const dm = findMajor(state.defaults.major);
  $('#defMinor').innerHTML = dm && dm.minors.length ? optionsHTML(dm.minors) : '<option value="">（なし）</option>';
  $('#defMinor').value = state.defaults.minor;

  $('#catEditor').innerHTML = state.majors.map((m, i) => `
    <details class="cat-major" data-name="${esc(m.name)}" ${openMajors.has(m.name) ? 'open' : ''}>
      <summary>
        <span class="dot" style="background:${majorColor(m.name)}"></span>
        <span class="cm-name">${esc(m.name)}</span>
        <span class="cm-count">小分類 ${m.minors.length}</span>
        <span class="chev"></span>
      </summary>
      <div class="cm-body">
        <ul class="cat-list">${m.minors.map((s, j) => `
          <li class="cat-item"><span>${esc(s)}</span><span class="cat-actions">
            <button type="button" data-act="minor-up" data-i="${i}" data-j="${j}" ${j ? '' : 'disabled'} aria-label="上へ">↑</button>
            <button type="button" data-act="minor-rename" data-i="${i}" data-j="${j}">変更</button>
            <button type="button" class="del" data-act="minor-del" data-i="${i}" data-j="${j}">削除</button>
          </span></li>`).join('') || '<li class="cat-item"><span class="note">小分類はありません</span></li>'}
        </ul>
        <form class="cat-add" data-add-minor="${i}">
          <input class="input" maxlength="16" placeholder="小分類を追加" autocomplete="off">
          <button class="btn small" type="submit">追加</button>
        </form>
        <div class="cm-actions">
          <button type="button" data-act="major-up" data-i="${i}" ${i ? '' : 'disabled'}>↑ 上へ移動</button>
          <button type="button" data-act="major-rename" data-i="${i}">名前を変更</button>
          <button type="button" class="del" data-act="major-del" data-i="${i}">大分類を削除</button>
        </div>
      </div>
    </details>`).join('');

  $('#countInfo').textContent = `記録件数：${state.entries.length}件`;
  $('#lastBackup').textContent = state.lastBackup
    ? `最終バックアップ：${new Date(state.lastBackup).toLocaleString('ja-JP')}`
    : 'まだバックアップしていません';
}

function askName(msg, current, list) {
  const v = prompt(msg, current);
  if (v === null) return null;
  const name = v.trim();
  if (!name) { toast('名前を入力してください'); return null; }
  if (name !== current && list.includes(name)) { toast('同じ名前があります'); return null; }
  return name;
}

function settingsChanged() {
  ensureDefaults();
  saveState();
  renderSettings();
}

/* ================= CSV ================= */
function csvCell(v) {
  const s = String(v ?? '');
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function toCSV() {
  const rows = [['日付', '区分', '大分類', '小分類', '金額', '備考', 'ID']];
  [...state.entries]
    .sort((a, b) => a.date.localeCompare(b.date) || (a.createdAt || 0) - (b.createdAt || 0))
    .forEach((e) => rows.push([e.date, e.type === 'income' ? '収入' : '支出', e.major || '', e.minor || '', e.amount, e.memo || '', e.id]));
  return '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n'); // BOM付きでExcelでも文字化けしない
}
function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false; }
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

async function exportCSV() {
  if (!state.entries.length) { toast('書き出す記録がありません'); return; }
  const d = new Date();
  const name = `kakeibo-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.csv`;
  const file = new File([toCSV()], name, { type: 'text/csv' });
  let done = false;
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: '家計簿バックアップ' }); done = true; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  if (!done) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  state.lastBackup = Date.now();
  saveState();
  renderSettings();
  toast('書き出しました');
}

async function importCSV(file) {
  const rows = parseCSV(await file.text()).filter((r) => r.some((c) => c.trim() !== ''));
  if (rows.length < 2) { toast('データが見つかりませんでした'); return; }
  const head = rows[0].map((s) => s.trim());
  const col = (...names) => { for (const n of names) { const i = head.indexOf(n); if (i >= 0) return i; } return -1; };
  const iDate = col('日付'), iType = col('区分'), iMajor = col('大分類', 'カテゴリ'), iMinor = col('小分類'),
    iAmt = col('金額'), iMemo = col('備考', 'メモ'), iId = col('ID');
  if (iDate < 0 || iAmt < 0) { toast('この家計簿の形式のCSVではありません'); return; }
  if (!confirm(`${rows.length - 1}行のデータを読み込みます。よろしいですか？`)) return;

  const ids = new Set(state.entries.map((e) => e.id));
  let added = 0, skipped = 0;
  for (const r of rows.slice(1)) {
    const get = (i) => (i >= 0 ? (r[i] || '').trim() : '');
    const m = get(iDate).replace(/\//g, '-').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const amount = parseInt(toHalfDigits(get(iAmt)).replace(/[^\d]/g, ''), 10);
    if (!m || !amount) { skipped++; continue; }
    const id = get(iId) || uid();
    if (ids.has(id)) { skipped++; continue; }
    const inc = get(iType) === '収入';
    let major = '', minor = '';
    if (!inc) {
      major = get(iMajor) || 'その他';
      minor = get(iMinor);
      let mj = findMajor(major);
      if (!mj) { mj = { name: major, minors: [] }; state.majors.push(mj); }
      if (minor && !mj.minors.includes(minor)) mj.minors.push(minor);
    }
    state.entries.push({
      id, createdAt: Date.now(), type: inc ? 'income' : 'expense', amount,
      date: `${m[1]}-${pad(m[2])}-${pad(m[3])}`, major, minor, memo: get(iMemo),
    });
    ids.add(id);
    added++;
  }
  ensureDefaults();
  saveState();
  renderSettings();
  toast(`${added}件を読み込みました${skipped ? `（${skipped}件スキップ）` : ''}`);
}

/* ================= トースト ================= */
let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ================= イベント ================= */
window.addEventListener('hashchange', route);
$('#backBtn').addEventListener('click', goBack);

// 入力画面
$('#fMajor').addEventListener('change', (e) => {
  const major = e.target.value;
  fillMinor(major, major === state.defaults.major ? state.defaults.minor : null);
});
$('#fAmount').addEventListener('input', (e) => {
  const digits = toHalfDigits(e.target.value).replace(/[^\d]/g, '').slice(0, 10);
  e.target.value = digits ? Number(digits).toLocaleString('ja-JP') : '';
});
$('#entryForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseInt($('#fAmount').value.replace(/[^\d]/g, ''), 10);
  if (!amount || amount <= 0) { toast('金額を入力してください'); $('#fAmount').focus(); return; }
  const date = $('#fDate').value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { toast('日付を選んでください'); return; }
  const isExp = entryMode === 'expense';
  const data = {
    type: entryMode, amount, date, memo: $('#fMemo').value.trim(),
    major: isExp ? $('#fMajor').value : '', minor: isExp ? $('#fMinor').value : '',
  };
  if (editing) {
    Object.assign(editing, data);
    if (!saveState()) return;
    toast('更新しました');
    goBack();
  } else {
    state.entries.push({ id: uid(), createdAt: Date.now(), ...data });
    if (!saveState()) return;
    toast(isExp ? '支出を記録しました' : '収入を記録しました');
    // 続けて入力しやすいよう、日付と分類は残して金額・備考だけ空にする
    $('#fAmount').value = '';
    $('#fMemo').value = '';
    renderEntryRecent();
  }
});
$('#deleteBtn').addEventListener('click', () => {
  if (!editing || !confirm('この記録を削除しますか？')) return;
  state.entries = state.entries.filter((x) => x !== editing);
  saveState();
  toast('削除しました');
  goBack();
});

// グラフ画面
$('#graphTab').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-v]');
  if (!b) return;
  graph.tab = b.dataset.v;
  renderGraph();
});
$('#granSeg').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-v]');
  if (!b) return;
  graph.gran = b.dataset.v;
  renderGraph();
});
$('#pPrev').addEventListener('click', () => { graph.anchor = pShift(pStart(graph.anchor, graph.gran), graph.gran, -1); renderGraph(); });
$('#pNext').addEventListener('click', () => { graph.anchor = pShift(pStart(graph.anchor, graph.gran), graph.gran, 1); renderGraph(); });
$('#graphBody').addEventListener('click', (e) => {
  const hit = e.target.closest('[data-bi]');
  if (!hit) return;
  const b = graph.buckets[Number(hit.dataset.bi)];
  if (b) { graph.anchor = b.start; renderGraph(); }
});

// 管理画面
$('#defMajor').addEventListener('change', (e) => {
  state.defaults.major = e.target.value;
  state.defaults.minor = '';
  settingsChanged();
  toast('既定値を変更しました');
});
$('#defMinor').addEventListener('change', (e) => {
  state.defaults.minor = e.target.value;
  settingsChanged();
  toast('既定値を変更しました');
});
$('#catEditor').addEventListener('toggle', (e) => { // toggleはバブリングしないのでキャプチャで拾う
  const d = e.target;
  if (!d.classList || !d.classList.contains('cat-major')) return;
  if (d.open) openMajors.add(d.dataset.name); else openMajors.delete(d.dataset.name);
}, true);
$('#catEditor').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-act]');
  if (!b) return;
  const i = Number(b.dataset.i), j = Number(b.dataset.j);
  const m = state.majors[i];
  if (!m) return;
  switch (b.dataset.act) {
    case 'major-up':
      if (i > 0) [state.majors[i - 1], state.majors[i]] = [state.majors[i], state.majors[i - 1]];
      break;
    case 'major-rename': {
      const name = askName('大分類の新しい名前', m.name, state.majors.map((x) => x.name));
      if (!name || name === m.name) return;
      state.entries.forEach((x) => { if (x.type === 'expense' && x.major === m.name) x.major = name; });
      if (state.defaults.major === m.name) state.defaults.major = name;
      if (openMajors.delete(m.name)) openMajors.add(name);
      m.name = name;
      break;
    }
    case 'major-del':
      if (state.majors.length <= 1) { toast('大分類は最低1つ必要です'); return; }
      if (!confirm(`大分類「${m.name}」とその小分類を選択肢から削除しますか？\n（記録済みのデータは残ります）`)) return;
      state.majors.splice(i, 1);
      openMajors.delete(m.name);
      break;
    case 'minor-up':
      if (j > 0) [m.minors[j - 1], m.minors[j]] = [m.minors[j], m.minors[j - 1]];
      break;
    case 'minor-rename': {
      const old = m.minors[j];
      const name = askName('小分類の新しい名前', old, m.minors);
      if (!name || name === old) return;
      state.entries.forEach((x) => { if (x.type === 'expense' && x.major === m.name && x.minor === old) x.minor = name; });
      if (state.defaults.major === m.name && state.defaults.minor === old) state.defaults.minor = name;
      m.minors[j] = name;
      break;
    }
    case 'minor-del':
      if (!confirm(`小分類「${m.minors[j]}」を選択肢から削除しますか？\n（記録済みのデータは残ります）`)) return;
      m.minors.splice(j, 1);
      break;
    default:
      return;
  }
  settingsChanged();
});
$('#catEditor').addEventListener('submit', (e) => {
  const f = e.target.closest('form[data-add-minor]');
  if (!f) return;
  e.preventDefault();
  const m = state.majors[Number(f.dataset.addMinor)];
  const input = f.querySelector('input');
  const name = input.value.trim();
  if (!m || !name) return;
  if (m.minors.includes(name)) { toast('同じ名前があります'); return; }
  m.minors.push(name);
  settingsChanged();
  toast(`「${name}」を追加しました`);
});
$('#majorAdd').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#majorName').value.trim();
  if (!name) return;
  if (findMajor(name)) { toast('同じ名前があります'); return; }
  state.majors.push({ name, minors: [] });
  openMajors.add(name);
  $('#majorName').value = '';
  settingsChanged();
  toast(`「${name}」を追加しました`);
});
$('#exportBtn').addEventListener('click', exportCSV);
$('#importFile').addEventListener('change', async (e) => {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (f) { try { await importCSV(f); } catch (err) { toast('読み込みに失敗しました'); } }
});
$('#wipeBtn').addEventListener('click', () => {
  if (!state.entries.length) { toast('記録はありません'); return; }
  if (!confirm('すべての記録を削除します。元に戻せません。\n先にCSVで書き出しておくことをおすすめします。\n削除しますか？')) return;
  state.entries = [];
  saveState();
  renderSettings();
  toast('すべて削除しました');
});

/* ================= 起動 ================= */
ensureDefaults();
route();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
