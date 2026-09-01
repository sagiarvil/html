(() => {
  const chips = [...document.querySelectorAll('.category-chip')];
  const cards = [...document.querySelectorAll('.product-card')];
  const empty = document.getElementById('catalogEmpty');
  const buyerScope = { habitat: '5 HTML pages included' };

  const style = document.createElement('style');
  style.id = 'hh-product-render-styles';
  style.textContent = `
    .product-visual.has-real-preview{min-height:0;padding:0;background:#eef0f3;overflow:hidden}
    .hh-render-shell{position:relative;width:100%;overflow:hidden;background:#fff;border-bottom:1px solid rgba(24,28,37,.1)}
    .hh-render-viewport{position:relative;width:100%;min-height:330px;overflow:hidden;background:#fff}
    .hh-render-frame{position:absolute;top:0;left:0;width:1440px;height:820px;border:0;background:#fff;transform-origin:top left;pointer-events:none;opacity:0;transition:opacity .2s ease}
    .hh-render-shell.is-loaded .hh-render-frame{opacity:1}
    .hh-render-loading{position:absolute;inset:0;display:grid;place-items:center;background:#f6f7f9;color:#7f8794;font-size:.68rem;font-weight:850;letter-spacing:.11em;text-transform:uppercase}
    .hh-render-shell.is-loaded .hh-render-loading{display:none}
    .hh-preview-badge,.hh-scope-badge{position:absolute;z-index:3;padding:.48rem .7rem;border-radius:999px;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);color:#2d3440;box-shadow:0 6px 18px rgba(20,27,43,.1);font-size:.62rem;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
    .hh-preview-badge{left:16px;top:16px}.hh-scope-badge{left:16px;top:54px;background:#171b24;color:#fff}
    .product-visual.has-real-preview .visual-label{right:16px;bottom:16px;z-index:3;box-shadow:0 6px 18px rgba(20,27,43,.1)}
    .product-visual.has-real-preview::after{content:'Open live demo';position:absolute;inset:auto 16px 16px auto;z-index:4;opacity:0;transform:translateY(6px);padding:.62rem .82rem;border-radius:999px;background:#171b24;color:#fff;font-size:.68rem;font-weight:850;transition:opacity .18s ease,transform .18s ease}
    .product-visual.has-real-preview:hover::after{opacity:1;transform:none}.product-visual.has-real-preview:hover .visual-label{opacity:0}
    @media(max-width:760px){.hh-render-viewport{min-height:245px}.product-visual.has-real-preview::after{display:none}}
    @media(prefers-reduced-motion:reduce){.hh-render-frame,.product-visual.has-real-preview::after{transition:none}}
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  const keyFromCard = card => {
    const link = card.querySelector('a[href*="product.html?template="]');
    if (!link) return null;
    try { return new URL(link.getAttribute('href'), window.location.href).searchParams.get('template'); }
    catch { return null; }
  };

  const resizePreview = shell => {
    const viewport = shell.querySelector('.hh-render-viewport');
    const frame = shell.querySelector('.hh-render-frame');
    if (!viewport || !frame) return;
    const sourceWidth = 1440;
    const sourceHeight = 820;
    const available = viewport.clientWidth || shell.clientWidth;
    const scale = Math.max(.16, available / sourceWidth);
    frame.style.transform = `scale(${scale})`;
    viewport.style.height = `${Math.round(sourceHeight * scale)}px`;
  };

  const mountRealPreview = card => {
    const key = keyFromCard(card);
    const visual = card.querySelector('.product-visual');
    if (!key || !visual || visual.dataset.realRender === 'true') return;
    const category = card.querySelector('.product-card-topline p')?.textContent?.trim() || 'HTML TEMPLATE';
    const scope = buyerScope[key] ? `<span class="hh-scope-badge">${buyerScope[key]}</span>` : '';
    visual.dataset.realRender = 'true';
    visual.classList.add('has-real-preview');
    visual.href = `live-preview.html?template=${encodeURIComponent(key)}`;
    visual.setAttribute('aria-label', `Open ${key} live demo`);
    visual.innerHTML = `
      <div class="hh-render-shell" aria-hidden="true"><div class="hh-render-viewport"><iframe class="hh-render-frame" data-src="demos/${encodeURIComponent(key)}.html" loading="lazy" tabindex="-1" title=""></iframe><div class="hh-render-loading">Loading actual template</div></div></div>
      <span class="hh-preview-badge">Actual included HTML render</span>${scope}<span class="visual-label">${category}</span>`;
    const shell = visual.querySelector('.hh-render-shell');
    const frame = visual.querySelector('.hh-render-frame');
    if (!shell || !frame) return;
    resizePreview(shell);
    frame.addEventListener('load', () => shell.classList.add('is-loaded'), { once:true });
    if ('ResizeObserver' in window) new ResizeObserver(() => resizePreview(shell)).observe(shell);
    else window.addEventListener('resize', () => resizePreview(shell), { passive:true });
  };

  cards.forEach(mountRealPreview);
  const previewFrames = [...document.querySelectorAll('.hh-render-frame[data-src]')];
  const loadFrame = frame => { if (frame.src || !frame.dataset.src) return; frame.src = frame.dataset.src; frame.removeAttribute('data-src'); };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (!entry.isIntersecting) return; loadFrame(entry.target); observer.unobserve(entry.target); }); }, { rootMargin:'700px 0px' });
    previewFrames.forEach(frame => observer.observe(frame));
  } else previewFrames.forEach(loadFrame);

  if (!chips.length || !cards.length) return;
  chips.forEach(chip => {
    chip.setAttribute('aria-pressed', chip.classList.contains('is-active') ? 'true' : 'false');
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter || 'all';
      chips.forEach(item => { const active = item === chip; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', active ? 'true' : 'false'); });
      let visible = 0;
      cards.forEach(card => { const show = filter === 'all' || card.dataset.category === filter; card.hidden = !show; if (show) visible += 1; });
      if (empty) empty.hidden = visible !== 0;
    });
  });
})();
