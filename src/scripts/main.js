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

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.remove('bg-transparent');
      nav.classList.add('bg-page/95', 'border-b', 'border-ink/10');
    } else {
      nav.classList.add('bg-transparent');
      nav.classList.remove('bg-page/95', 'border-b', 'border-ink/10');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
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

(function setupCarousels() {
  function setupCarousel(trackId, prevId, nextId, dotsSelector, indexAttribute) {
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    const dots = Array.from(document.querySelectorAll(dotsSelector));
    if (!track || !prev || !next || !dots.length) return;

    const cards = Array.from(track.children);
    const controls =
      prev.parentElement === next.parentElement ? prev.parentElement : null;
    const dotControls = dots[0] ? dots[0].parentElement : null;

    if (cards.length <= 1) {
      prev.classList.add('hidden');
      next.classList.add('hidden');
      if (controls) controls.classList.add('hidden');
      if (dotControls) dotControls.classList.add('hidden');
    }

    function cardStep() {
      const firstCard = cards[0];
      if (!firstCard) return track.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return firstCard.getBoundingClientRect().width + gap;
    }

    function activeIndex() {
      return Math.round(track.scrollLeft / cardStep());
    }

    function maxIndex() {
      const visibleCards = Math.max(1, Math.round(track.clientWidth / cardStep()));
      return Math.max(0, cards.length - visibleCards);
    }

    function updateDots() {
      const lastIndex = maxIndex();
      const index = Math.max(0, Math.min(lastIndex, activeIndex()));
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('hidden', dotIndex > lastIndex);
        const isActive = dotIndex === index;
        dot.classList.toggle('w-8', isActive);
        dot.classList.toggle('w-2.5', !isActive);
        dot.classList.toggle('bg-accent', isActive);
        dot.classList.toggle('bg-ink/20', !isActive);
      });
    }

    function scrollToIndex(index) {
      track.scrollTo({ left: cardStep() * index, behavior: 'smooth' });
    }

    prev.addEventListener('click', () => {
      scrollToIndex(Math.max(0, activeIndex() - 1));
    });

    next.addEventListener('click', () => {
      scrollToIndex(Math.min(maxIndex(), activeIndex() + 1));
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        scrollToIndex(
          Math.min(maxIndex(), Number(dot.getAttribute(indexAttribute) || 0))
        );
      });
    });

    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateDots);
    });

    window.addEventListener('resize', updateDots, { passive: true });
    updateDots();
  }

  setupCarousel(
    'portfolio-track',
    'portfolio-prev',
    'portfolio-next',
    '#portfolio-dots [data-portfolio-index]',
    'data-portfolio-index'
  );
  setupCarousel(
    'reviews-track',
    'reviews-prev',
    'reviews-next',
    '#reviews-dots [data-review-index]',
    'data-review-index'
  );
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
  const u = new URL(window.location.origin + '/');
  u.searchParams.set('sent', '1');
  u.hash = '#contact';
  next.value = u.toString();
  form.appendChild(next);
})();
