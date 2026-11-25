// Menu and the draggable service canvas. Hover, press and the hero entrance live in assets/motion.

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

/* ---------- mobile menu ---------- */
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
  menu.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
matchMedia('(min-width: 900px)').addEventListener('change', () => setMenu(false));

/* ---------- service canvas: wires follow the nodes; nodes drag on a fine pointer ---------- */
const canvas = document.querySelector('[data-canvas]');
if (canvas) {
  const nodes = Object.fromEntries([...canvas.querySelectorAll('[data-node]')].map((n) => [n.dataset.node, n]));
  const wires = [...canvas.querySelectorAll('[data-wire]')].map((p) => ({ p, ends: p.dataset.wire.split(' ') }));
  const offset = new Map(Object.keys(nodes).map((k) => [k, { x: 0, y: 0 }]));

  const centre = (el) => {
    const c = canvas.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
  };
  const draw = () => {
    for (const { p, ends: [a, b] } of wires) {
      const A = centre(nodes[a]), B = centre(nodes[b]);
      const midY = (A.y + B.y) / 2;
      p.setAttribute('d', `M${A.x},${A.y} C${A.x},${midY} ${B.x},${midY} ${B.x},${B.y}`);
    }
  };
  draw();
  addEventListener('resize', draw);
  document.fonts?.ready.then(draw);

  // past the canvas edge the node slows down instead of stopping dead (rubber band)
  const band = (v, min, max) => {
    if (v < min) return min - Math.sqrt(min - v) * 4;
    if (v > max) return max + Math.sqrt(v - max) * 4;
    return v;
  };

  let drag = null;
  const startDrag = (e) => {
    if (!finePointer.matches || e.button !== 0 || drag) return;
    const el = e.currentTarget, key = el.dataset.node, o = offset.get(key);
    const c = canvas.getBoundingClientRect(), r = el.getBoundingClientRect();
    drag = {
      el, key, id: e.pointerId, sx: e.clientX - o.x, sy: e.clientY - o.y,
      // how far the node may travel each way before the band kicks in
      minX: o.x - (r.left - c.left) + 8, maxX: o.x + (c.right - r.right) - 8,
      minY: o.y - (r.top - c.top) + 8, maxY: o.y + (c.bottom - r.bottom) - 8,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.remove('is-settling');
    el.classList.add('is-dragging');
  };
  const moveDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const x = band(e.clientX - drag.sx, drag.minX, drag.maxX);
    const y = band(e.clientY - drag.sy, drag.minY, drag.maxY);
    offset.set(drag.key, { x, y });
    drag.el.style.setProperty('--dx', `${x}px`);
    drag.el.style.setProperty('--dy', `${y}px`);
    draw();
  };
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { el, key, minX, maxX, minY, maxY } = drag;
    const o = offset.get(key);
    const x = Math.min(maxX, Math.max(minX, o.x)), y = Math.min(maxY, Math.max(minY, o.y));
    el.classList.remove('is-dragging');
    if (x !== o.x || y !== o.y) {
      // snap back inside the canvas, wires following frame by frame
      offset.set(key, { x, y });
      if (!reduced.matches) el.classList.add('is-settling');
      el.style.setProperty('--dx', `${x}px`);
      el.style.setProperty('--dy', `${y}px`);
      const t0 = performance.now();
      const follow = (t) => { draw(); if (t - t0 < 360) requestAnimationFrame(follow); else el.classList.remove('is-settling'); };
      requestAnimationFrame(follow);
    }
    drag = null;
  };
  for (const el of Object.values(nodes)) {
    el.addEventListener('pointerdown', startDrag);
    el.addEventListener('pointermove', moveDrag);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
  }
  canvas.classList.add('is-live');
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
