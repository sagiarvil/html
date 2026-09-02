(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const menuButton = $('[data-menu-button]');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('.hx-navlinks a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const favoriteKey = 'hh-habitat-favorites';
  const getFavorites = () => {
    try { return new Set(JSON.parse(localStorage.getItem(favoriteKey) || '[]')); }
    catch { return new Set(); }
  };
  const saveFavorites = set => localStorage.setItem(favoriteKey, JSON.stringify([...set]));
  const syncFavorites = () => {
    const favorites = getFavorites();
    $$('[data-favorite]').forEach(button => {
      const active = favorites.has(button.dataset.favorite);
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? '♥' : '♡';
      button.setAttribute('aria-label', `${active ? 'Remove' : 'Save'} ${button.dataset.favoriteLabel || 'property'}`);
    });
  };
  $$('[data-favorite]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const favorites = getFavorites();
    const id = button.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    saveFavorites(favorites);
    syncFavorites();
  }));
  syncFavorites();

  const filterButtons = $$('[data-property-filter]');
  const listingCards = $$('[data-property-card]');
  const resultCount = $('[data-result-count]');
  const locationInput = $('[data-location-filter]');
  const sortSelect = $('[data-sort]');
  const grid = $('[data-listing-grid]');

  const params = new URLSearchParams(location.search);
  const initialType = params.get('type');
  if (initialType && filterButtons.length) {
    filterButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.propertyFilter === initialType)));
  }
  if (locationInput && params.get('location')) locationInput.value = params.get('location');

  const activeType = () => filterButtons.find(btn => btn.getAttribute('aria-pressed') === 'true')?.dataset.propertyFilter || 'all';
  const applyFilters = () => {
    if (!listingCards.length) return;
    const type = activeType();
    const query = locationInput?.value.trim().toLowerCase() || '';
    let visible = listingCards.filter(card => {
      const typeOk = type === 'all' || card.dataset.type === type;
      const locationOk = !query || (card.dataset.location || '').toLowerCase().includes(query);
      const show = typeOk && locationOk;
      card.classList.toggle('is-hidden', !show);
      return show;
    });
    if (sortSelect && grid) {
      const sort = sortSelect.value;
      visible.sort((a, b) => {
        if (sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        return Number(a.dataset.order) - Number(b.dataset.order);
      });
      visible.forEach(card => grid.appendChild(card));
    }
    if (resultCount) resultCount.textContent = `${visible.length} ${visible.length === 1 ? 'residence' : 'residences'}`;
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    applyFilters();
  }));
  locationInput?.addEventListener('input', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);
  applyFilters();

  $$('[data-search-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const type = $('[name="type"]', form)?.value || 'all';
    const locationValue = $('[name="location"]', form)?.value || '';
    const target = new URL('habitat-listings.html', location.href);
    if (type && type !== 'all') target.searchParams.set('type', type);
    if (locationValue) target.searchParams.set('location', locationValue);
    location.href = target.href;
  }));

  $$('[data-demo-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = $('[data-form-status]', form);
    if (status) {
      status.textContent = 'Demo complete — this front-end form is ready to connect to your CRM, email or form endpoint.';
      status.setAttribute('role', 'status');
    }
  }));

  const lightbox = $('[data-lightbox]');
  const lightboxImage = lightbox ? $('img', lightbox) : null;
  $$('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = $('img', button)?.src || '';
    lightboxImage.alt = $('img', button)?.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }));
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  const reveals = $$('.hx-reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));
})();
