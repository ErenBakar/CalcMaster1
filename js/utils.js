const fmt = (n, d = 2) => isFinite(n) && !isNaN(n) ? n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—';
const tl = (n, d = 2) => isFinite(n) && !isNaN(n) ? fmt(n, d) + ' ₺' : '—';
const sv = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
const gv = (id) => parseFloat(document.getElementById(id)?.value) || 0;
const gi = (id) => parseInt(document.getElementById(id)?.value) || 0;
const gs = (id) => document.getElementById(id)?.value || '';
