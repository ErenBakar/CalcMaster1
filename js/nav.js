function buildNav(activeSlug) {
  const desk = document.getElementById('desktopNav');
  const mob = document.getElementById('mobMenu');
  if (!desk || !mob) return;
  desk.innerHTML = '';
  mob.innerHTML = '';

  const isHome = !activeSlug || activeSlug === 'index';

  CATEGORIES.forEach(cat => {
    const wrap = document.createElement('div');
    wrap.className = 'dd-wrap';
    const btn = document.createElement('button');
    btn.className = 'dd-btn';
    btn.type = 'button';
    btn.textContent = cat.label + ' ';
    const arr = document.createElement('span');
    arr.className = 'dd-arrow';
    arr.textContent = '▼';
    btn.appendChild(arr);
    const menu = document.createElement('div');
    menu.className = 'dd-menu';
    cat.tools.forEach(t => {
      const link = document.createElement('a');
      link.className = 'dd-item';
      link.href = t.slug + '.html';
      link.textContent = t.label;
      link.dataset.tool = t.id;
      if (t.slug === activeSlug) link.classList.add('active');
      menu.appendChild(link);
    });
    btn.addEventListener('click', e => { e.stopPropagation(); toggleDD(wrap, btn, menu); });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    desk.appendChild(wrap);

    const mc = document.createElement('div');
    const mh = document.createElement('div');
    mh.className = 'mob-cat';
    mh.innerHTML = cat.label + '<span>▼</span>';
    const mi = document.createElement('div');
    mi.className = 'mob-items';
    cat.tools.forEach(t => {
      const link = document.createElement('a');
      link.className = 'mob-item';
      link.href = t.slug + '.html';
      link.textContent = t.label;
      link.dataset.tool = t.id;
      if (t.slug === activeSlug) link.classList.add('active');
      mi.appendChild(link);
    });
    mh.addEventListener('click', () => { mi.classList.toggle('open'); });
    mc.appendChild(mh);
    mc.appendChild(mi);
    mob.appendChild(mc);
  });

  document.addEventListener('click', closeAllDD);
}

function toggleDD(wrap, btn, menu) {
  const isOpen = menu.classList.contains('open');
  closeAllDD();
  if (!isOpen) { menu.classList.add('open'); btn.classList.add('open'); }
}

function closeAllDD() {
  document.querySelectorAll('.dd-menu').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.dd-btn').forEach(b => b.classList.remove('open'));
}

function closeMob() {
  const m = document.getElementById('mobMenu');
  if (m) m.classList.remove('open');
  const icon = document.getElementById('mobIcon');
  if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>';
}

function initNav() {
  const activeSlug = document.body.dataset.activeTool || '';
  buildNav(activeSlug);

  const toggle = document.getElementById('mobToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.getElementById('mobMenu').classList.toggle('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);
