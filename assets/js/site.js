(() => {
  const config = window.SITE_CONFIG || {};
  const digits = String(config.whatsappNumber || '').replace(/\D/g, '');
  const message = config.whatsappMessage || 'Hello, I’m interested in discussing a project with Life in every line by house of design. My project is in [Location] and I’m looking for help with [Service].';
  document.querySelectorAll('.whatsapp-link').forEach((link) => {
    if (digits) {
      link.href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${link.textContent.trim()}, opens WhatsApp in a new tab`);
    } else {
      const onNestedPage = /\/(projects|services|about|contact)\//.test(location.pathname);
      link.href = onNestedPage ? '../contact/#contact-config' : 'contact/#contact-config';
      link.title = 'WhatsApp contact details will be added before launch';
      link.setAttribute('aria-label', `${link.textContent.trim()}. WhatsApp contact details will be added before launch.`);
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        menuButton.focus();
      }
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const hero = document.querySelector('.hero-art-wrap');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const building = hero.querySelector('.building');
    const progress = hero.querySelector('.scroll-progress span');
    const stage = hero.querySelector('.art-stage');
    let ticking = false;
    const labels = ['The plan', 'Taking shape', 'A place to belong'];
    const render = () => {
      const rect = hero.getBoundingClientRect();
      const available = Math.max(1, rect.height + window.innerHeight * 0.35);
      const amount = Math.max(0, Math.min(1, (window.innerHeight * 0.85 - rect.top) / available));
      if (building) {
        building.style.opacity = String(.12 + amount * .88);
        building.style.transform = `translateY(${54 * (1 - amount)}px) scale(${.93 + amount * .07}) rotate(${-7 * (1 - amount)}deg)`;
      }
      if (progress) progress.style.width = `${amount * 100}%`;
      if (stage) stage.textContent = labels[Math.min(labels.length - 1, Math.floor(amount * labels.length))];
      ticking = false;
    };
    const schedule = () => {
      if (!ticking) { window.requestAnimationFrame(render); ticking = true; }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    render();
  }
})();