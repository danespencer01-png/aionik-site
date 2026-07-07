const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Hero flow field ---------- */
(() => {
  const canvas = document.getElementById('field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, dpr, particles = [];
  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(Math.round(w * h / 9000), 240);
    particles = Array.from({ length: count }, () => spawn(true));
  }

  function spawn(anywhere) {
    const roll = Math.random();
    return {
      x: anywhere ? Math.random() * w : -10,
      y: Math.random() * h,
      vx: 0, vy: 0,
      cyan: Math.random() < 0.5,
      // filaments carry the flowing-line language, dots add texture,
      // rings read as drifting cells
      kind: roll < 0.55 ? 'streak' : roll < 0.94 ? 'dot' : 'ring',
      r: roll < 0.94 ? 0.8 + Math.random() * 1.4 : 3.5 + Math.random() * 4.5
    };
  }

  // layered sines stand in for curl noise: smooth, cheap, no lib
  function fieldAngle(x, y, t) {
    return Math.sin(x * 0.0016 + t * 0.25) * 1.3
         + Math.cos(y * 0.0021 - t * 0.18) * 1.1
         + Math.sin((x + y) * 0.0009 + t * 0.1) * 0.7;
  }

  let t = 0, running = !reducedMotion;

  function drawParticle(p, alpha) {
    if (p.kind === 'streak') {
      const k = 7;
      ctx.beginPath();
      ctx.moveTo(p.x - (p.vx + 0.35) * k, p.y - p.vy * k);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = p.cyan ? `rgba(34, 211, 238, ${alpha})` : `rgba(167, 139, 250, ${alpha})`;
      ctx.lineWidth = p.r * 0.9;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else if (p.kind === 'ring') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.strokeStyle = p.cyan ? `rgba(34, 211, 238, ${alpha * 0.55})` : `rgba(167, 139, 250, ${alpha * 0.55})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = p.cyan ? `rgba(34, 211, 238, ${alpha})` : `rgba(167, 139, 250, ${alpha})`;
      ctx.fill();
    }
  }

  function frame() {
    if (!running) return;
    t += 0.016;
    ctx.fillStyle = 'rgba(7, 7, 14, 0.09)';
    ctx.fillRect(0, 0, w, h);

    // slow ambient plumes drifting under the particles
    for (let i = 0; i < 2; i++) {
      const gx = w * (0.3 + 0.4 * i) + Math.sin(t * 0.1 + i * 3) * w * 0.15;
      const gy = h * 0.5 + Math.cos(t * 0.08 + i * 2) * h * 0.25;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 260);
      g.addColorStop(0, i ? 'rgba(34, 211, 238, 0.015)' : 'rgba(139, 92, 246, 0.02)');
      g.addColorStop(1, 'rgba(7, 7, 14, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(gx - 260, gy - 260, 520, 520);
    }

    for (const p of particles) {
      const a = fieldAngle(p.x, p.y, t);
      const drag = p.kind === 'ring' ? 0.02 : 0.035; // cells respond sluggishly
      p.vx += Math.cos(a) * drag;
      p.vy += Math.sin(a) * drag;

      // cursor as disturbance: radial push, a vortex swirl,
      // and a fraction of the cursor's own velocity dragged in
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy, R = 150;
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 0.9;
        p.vx += (dx / d) * f - (dy / d) * f * 0.6 + mouse.vx * f * 0.12;
        p.vy += (dy / d) * f + (dx / d) * f * 0.6 + mouse.vy * f * 0.12;
      }

      p.vx *= 0.96; p.vy *= 0.96;
      p.x += p.vx + 0.35; // gentle constant drift, left to right
      p.y += p.vy;

      if (p.x > w + 12 || p.y < -12 || p.y > h + 12) Object.assign(p, spawn(false));

      drawParticle(p, 0.5);
    }
    requestAnimationFrame(frame);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const nx = e.clientX - rect.left, ny = e.clientY - rect.top;
    mouse.vx = nx - mouse.x; mouse.vy = ny - mouse.y;
    if (Math.abs(mouse.vx) > 60) { mouse.vx = 0; mouse.vy = 0; } // ignore jumps
    mouse.x = nx; mouse.y = ny;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  document.addEventListener('visibilitychange', () => {
    if (reducedMotion) return;
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  addEventListener('resize', resize);
  resize();

  if (reducedMotion) {
    // static render: one faint pass of the field, no animation
    ctx.fillStyle = 'rgba(7, 7, 14, 1)';
    ctx.fillRect(0, 0, w, h);
    for (const p of particles) drawParticle(p, 0.35);
  } else {
    requestAnimationFrame(frame);
  }
})();

/* ---------- Scroll-etched channel network + laminar switch-on ---------- */
(() => {
  const svg = document.getElementById('network');
  if (!svg) return;
  const wires = [...svg.querySelectorAll('.wire')];
  const nodes = [...svg.querySelectorAll('.node')];

  const lens = wires.map(p => {
    const L = p.getTotalLength();
    p.style.strokeDasharray = L;
    p.style.strokeDashoffset = L;
    return L;
  });

  function progress() {
    const r = svg.getBoundingClientRect();
    // 0 when the svg enters the viewport bottom, 1 when its center passes mid-screen
    return Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.5 + r.height * 0.5)));
  }

  function draw() {
    const pr = reducedMotion ? 1 : progress();
    wires.forEach((p, i) => { p.style.strokeDashoffset = lens[i] * (1 - pr); });
    nodes.forEach(n => n.classList.toggle('lit', pr >= +n.dataset.at));
    svg.classList.toggle('etched', pr >= 0.99);
  }

  if (reducedMotion) { draw(); }
  else {
    addEventListener('scroll', () => requestAnimationFrame(draw), { passive: true });
    draw();
  }
})();

/* ---------- Liquid light on glass cards ---------- */
(() => {
  const cards = [...document.querySelectorAll('.sheen')].map(el => ({
    el, tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, x2: 0.5, y2: 0.5, live: false
  }));
  if (!cards.length) return;
  let raf = null;

  function tick() {
    let settled = true;
    for (const c of cards) {
      // leading lobe chases the cursor; trailing lobe chases the leading one
      c.x += (c.tx - c.x) * 0.09;  c.y += (c.ty - c.y) * 0.09;
      c.x2 += (c.x - c.x2) * 0.05; c.y2 += (c.y - c.y2) * 0.05;
      const r = c.el.getBoundingClientRect();
      c.el.style.setProperty('--mx', (c.x * r.width) + 'px');
      c.el.style.setProperty('--my', (c.y * r.height) + 'px');
      c.el.style.setProperty('--mx2', (c.x2 * r.width) + 'px');
      c.el.style.setProperty('--my2', (c.y2 * r.height) + 'px');
      if (c.live || Math.abs(c.tx - c.x2) + Math.abs(c.ty - c.y2) > 0.002) settled = false;
    }
    raf = settled ? null : requestAnimationFrame(tick);
  }

  function wake() { if (!raf) raf = requestAnimationFrame(tick); }

  cards.forEach(c => {
    c.el.addEventListener('mousemove', e => {
      const r = c.el.getBoundingClientRect();
      c.tx = (e.clientX - r.left) / r.width;
      c.ty = (e.clientY - r.top) / r.height;
      c.live = true;
      if (reducedMotion) {
        c.el.style.setProperty('--mx', (c.tx * r.width) + 'px');
        c.el.style.setProperty('--my', (c.ty * r.height) + 'px');
        c.el.style.setProperty('--mx2', (c.tx * r.width) + 'px');
        c.el.style.setProperty('--my2', (c.ty * r.height) + 'px');
      } else wake();
    });
    c.el.addEventListener('mouseleave', () => {
      // the light settles back to rest like a droplet
      c.tx = 0.5; c.ty = 0.5; c.live = false;
      if (!reducedMotion) wake();
    });
  });
})();
