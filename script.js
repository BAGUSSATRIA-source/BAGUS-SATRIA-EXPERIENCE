/* =============================================
   BAGUS SATRIA — PORTFOLIO  |  script.js
   ============================================= */
'use strict';

/* ── CUSTOM CURSOR ── */
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function anim() {
    dot.style.transform  = `translate(${mx - 5}px,${my - 5}px)`;
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.transform = `translate(${rx - 17}px,${ry - 17}px)`;
    requestAnimationFrame(anim);
  })();

  document.querySelectorAll('a,button,.proj-card,.skill-card,.gdot').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
  });
})();

/* ── NAV SCROLL ── */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 50);
  }, { passive: true });
})();

/* ── ACTIVE NAV HIGHLIGHT ── */
(function () {
  const links    = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: .35 });

  sections.forEach(s => io.observe(s));
})();

/* ── MOBILE HAMBURGER ── */
(function () {
  const btn    = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    drawer.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: .1 });

  els.forEach(el => io.observe(el));
})();

/* ── SKILL BARS ── */
(function () {
  const fills = document.querySelectorAll('.bar-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.width = e.target.dataset.w || '0%'; }, 150);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .3 });

  fills.forEach(f => io.observe(f));
})();

/* ── TYPED EFFECT ── */
(function () {
  const el  = document.getElementById('typed');
  const cur = document.getElementById('typed-cursor');
  if (!el) return;

  const lines = [
    'Student Intern · Quality Control',
    'Freelance Surveyor & Estimator',
    'Freelance Photographer',
    'Graphic Designer',
  ];

  let li = 0, ci = 0, del = false;

  function tick() {
    const txt = lines[li];
    if (!del) {
      el.textContent = txt.slice(0, ++ci);
      if (ci === txt.length) { del = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = txt.slice(0, --ci);
      if (ci === 0) { del = false; li = (li + 1) % lines.length; return setTimeout(tick, 350); }
    }
    setTimeout(tick, del ? 45 : 75);
  }
  tick();
})();

/* ── PROJECT PHOTO GALLERY ── */
(function () {
  document.querySelectorAll('.proj-gallery').forEach(gallery => {
    const imgs = gallery.querySelectorAll('img');
    const dots = gallery.querySelectorAll('.gdot');
    if (imgs.length <= 1) return;

    let cur = 0, timer;
    let startX = 0;

    function show(idx) {
      imgs[cur].classList.add('hidden');
      dots[cur].classList.remove('active');
      cur = idx;
      imgs[cur].classList.remove('hidden');
      dots[cur].classList.add('active');
    }

    function next() { show((cur + 1) % imgs.length); }
    function prev() { show((cur - 1 + imgs.length) % imgs.length); }

    timer = setInterval(next, 3000);

    dots.forEach((d, i) => {
      d.addEventListener('click', () => {
        clearInterval(timer);
        show(i);
        timer = setInterval(next, 3000);
      });
    });

    gallery.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        clearInterval(timer);
        if (dx < 0) next();
        else prev();
        timer = setInterval(next, 3000);
      }
    });
  });
})();

/* ── FOOTER YEAR ── */
(function () {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
