// main.js — global scripts

(function () {
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const iconOpen = document.getElementById('icon-hamburger');
  const iconClose = document.getElementById('icon-close');
  if (!burger || !mobileMenu || !iconOpen || !iconClose) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    iconOpen.classList.add('is-hidden');
    iconClose.classList.remove('is-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    iconOpen.classList.remove('is-hidden');
    iconClose.classList.add('is-hidden');
  }

  burger.addEventListener('click', () => {
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();

(function () {
  const nav = document.getElementById('site-nav');
  if (!nav || !nav.classList.contains('fixed')) return;

  let ticking = false;

  function update() {
    ticking = false;
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('bg-transparent', !scrolled);
    nav.classList.toggle('bg-page/95', scrolled);
    nav.classList.toggle('border-b', scrolled);
    nav.classList.toggle('border-ink/10', scrolled);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', update);
  window.addEventListener('pageshow', update);
})();

/** Hero background parallax (no-op when #hero-parallax-bg is absent) */
(function () {
  const hero = document.getElementById('hero');
  const layer = document.getElementById('hero-parallax-bg');
  if (!hero || !layer) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let ticking = false;

  function update() {
    ticking = false;
    if (reduceMotion.matches) {
      layer.style.transform = '';
      return;
    }
    const h = hero.offsetHeight || 1;
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / h));
    const yPercent = progress * 30;
    layer.style.transform = 'translate3d(0, ' + yPercent + '%, 0)';
  }

  function onScrollOrResize() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });
  reduceMotion.addEventListener('change', update);
})();

/** Hero background video: gated autoplay, fade-in, offscreen pause */
(function () {
  const hero = document.getElementById('hero');
  const video = document.getElementById('hero-video');
  if (!hero || !video) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  if (reduceMotion.matches || saveData) {
    video.querySelectorAll('source').forEach((source) => source.remove());
    video.removeAttribute('src');
    video.removeAttribute('autoplay');
    video.load();
    return;
  }

  // iOS/Safari autoplay requires the muted + playsInline *properties*, not just attributes.
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  function markReady() {
    video.classList.add('is-ready');
  }

  function tryPlay() {
    video.muted = true;
    video.playsInline = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => undefined);
    }
  }

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markReady();
  video.addEventListener('canplay', markReady, { once: true });
  video.addEventListener('playing', markReady, { once: true });

  const visibility = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!reduceMotion.matches && video.paused) tryPlay();
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    { threshold: 0.1 }
  );
  visibility.observe(hero);

  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) video.pause();
  });
})();

(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/** Student deals photo carousel: snap-scroll track, buttons and dots as enhancement */
(function () {
  const track = document.getElementById('deals-track');
  const prev = document.getElementById('deals-prev');
  const next = document.getElementById('deals-next');
  const dots = Array.from(document.querySelectorAll('#deals-dots [data-deals-index]'));
  if (!track || !prev || !next || !dots.length) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function step() {
    return track.clientWidth || 1;
  }

  function currentIndex() {
    return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step())));
  }

  function go(index) {
    const nextIndex = (index + slides.length) % slides.length;
    track.scrollTo({
      left: step() * nextIndex,
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
  }

  function updateDots() {
    const index = currentIndex();
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle('w-8', isActive);
      dot.classList.toggle('w-2.5', !isActive);
      dot.classList.toggle('bg-accent', isActive);
      dot.classList.toggle('bg-ink/40', !isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  prev.addEventListener('click', () => go(currentIndex() - 1));
  next.addEventListener('click', () => go(currentIndex() + 1));
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      go(Number(dot.getAttribute('data-deals-index') || 0));
    });
  });

  track.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(currentIndex() - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(currentIndex() + 1);
      }
    }
  );

  let ticking = false;
  track.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateDots();
      });
    },
    { passive: true }
  );
  window.addEventListener('resize', updateDots, { passive: true });
  updateDots();
})();

/** Contact form: Formspree redirect back to site + success message */
(function () {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('contact-form-success');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1' && successEl) {
    successEl.classList.remove('hidden');
    params.delete('sent');
    const nextSearch = params.toString();
    const clean =
      window.location.pathname +
      (nextSearch ? '?' + nextSearch : '') +
      window.location.hash;
    window.history.replaceState({}, '', clean);
  }

  const next = document.createElement('input');
  next.type = 'hidden';
  next.name = '_next';
  const u = new URL(window.location.href);
  u.searchParams.set('sent', '1');
  u.hash = '#contact';
  next.value = u.toString();
  form.appendChild(next);
})();
