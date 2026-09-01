(() => {
  const qs = (s, root=document) => root.querySelector(s);
  const qsa = (s, root=document) => [...root.querySelectorAll(s)];

  qsa('[data-save]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const saved = button.classList.toggle('is-saved');
      button.setAttribute('aria-pressed', saved ? 'true' : 'false');
      button.textContent = saved ? '♥' : '♡';
    });
  });

  const listings = qsa('[data-listing]');
  const results = qs('[data-results-count]');
  const empty = qs('[data-empty]');
  const type = qs('[data-filter-type]');
  const beds = qs('[data-filter-beds]');
  const max = qs('[data-filter-max]');
  const location = qs('[data-filter-location]');

  const filterListings = () => {
    if (!listings.length) return;
    let visible = 0;
    listings.forEach(card => {
      const typeOk = !type || type.value === 'all' || card.dataset.type === type.value;
      const bedsOk = !beds || beds.value === 'all' || Number(card.dataset.beds) >= Number(beds.value);
      const maxOk = !max || max.value === 'all' || Number(card.dataset.price) <= Number(max.value);
      const locValue = location?.value.trim().toLowerCase() || '';
      const locOk = !locValue || (card.dataset.location || '').toLowerCase().includes(locValue);
      const show = typeOk && bedsOk && maxOk && locOk;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (results) results.textContent = `${visible} curated ${visible === 1 ? 'property' : 'properties'}`;
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };

  [type, beds, max].filter(Boolean).forEach(el => el.addEventListener('change', filterListings));
  if (location) location.addEventListener('input', filterListings);
  filterListings();

  qsa('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const note = qs('[data-form-note]', form);
      if (note) note.textContent = 'Demo interaction complete — connect this form to your preferred backend, CRM or form service.';
    });
  });
})();
