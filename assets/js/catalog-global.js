(() => {
  const chips = [...document.querySelectorAll('.category-chip')];
  const cards = [...document.querySelectorAll('.product-card')];
  const empty = document.getElementById('catalogEmpty');

  const style = document.createElement('style');
  style.id = 'hh-real-preview-styles';
  style.textContent = `
    .product-visual.has-real-preview{
      min-height:0;
      padding:1rem;
      background:linear-gradient(135deg,var(--product-soft),#fff 72%);
    }
    .hh-render-shell{
      position:relative;
      width:100%;
      margin:0 auto;
      overflow:hidden;
      border:1px solid rgba(24,28,37,.14);
      border-radius:12px;
      background:#fff;
      box-shadow:0 20px 48px rgba(20,27,43,.16);
    }
    .hh-render-toolbar{
      height:32px;
      display:flex;
      align-items:center;
      gap:7px;
      padding:0 12px;
      border-bottom:1px solid #e9ecf0;
      background:#f7f8fa;
    }
    .hh-render-toolbar>span{
      width:7px;
      height:7px;
      border-radius:50%;
      background:#cfd4dc;
      flex:0 0 auto;
    }
    .hh-render-toolbar>b{
      margin-left:auto;
      color:#8b929d;
      font-size:.57rem;
      font-weight:850;
      letter-spacing:.11em;
      text-transform:uppercase;
    }
    .hh-render-viewport{
      position:relative;
      width:100%;
      min-height:210px;
      overflow:hidden;
      background:#fff;
    }
    .hh-render-frame{
      position:absolute;
      top:0;
      left:0;
      width:1280px;
      height:680px;
      border:0;
      background:#fff;
      transform-origin:top left;
      pointer-events:none;
      opacity:0;
      transition:opacity .24s ease;
    }
    .hh-render-shell.is-loaded .hh-render-frame{opacity:1}
    .hh-render-loading{
      position:absolute;
      inset:0;
      display:grid;
      place-items:center;
      background:linear-gradient(180deg,#fff,#f6f7f9);
      color:#858c98;
      font-size:.7rem;
      font-weight:800;
      letter-spacing:.08em;
      text-transform:uppercase;
    }
    .hh-render-shell.is-loaded .hh-render-loading{display:none}
    .product-visual.has-real-preview .visual-label{
      right:1.7rem;
      bottom:1.7rem;
      box-shadow:0 5px 18px rgba(20,27,43,.08);
    }
    @media(max-width:760px){
      .product-visual.has-real-preview{padding:.75rem}
      .hh-render-toolbar{height:29px}
      .product-visual.has-real-preview .visual-label{right:1.25rem;bottom:1.25rem}
    }
    @media(prefers-reduced-motion:reduce){.hh-render-frame{transition:none}}
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  const keyFromCard = card => {
    const link = card.querySelector('a[href*="product.html?template="]');
    if (!link) return null;
    try {
      return new URL(link.getAttribute('href'), window.location.href).searchParams.get('template');
    } catch {
      return null;
    }
  };

  const resizePreview = shell => {
    const viewport = shell.querySelector('.hh-render-viewport');
    const frame = shell.querySelector('.hh-render-frame');
    if (!viewport || !frame) return;
    const sourceWidth = 1280;
    const sourceHeight = 680;
    const available = viewport.clientWidth || shell.clientWidth;
    const scale = Math.max(.18, available / sourceWidth);
    frame.style.transform = `scale(${scale})`;
    viewport.style.height = `${Math.round(sourceHeight * scale)}px`;
  };

  const mountRealPreview = card => {
    const key = keyFromCard(card);
    const visual = card.querySelector('.product-visual');
    if (!key || !visual || visual.dataset.realRender === 'true') return;

    const category = card.querySelector('.product-card-topline p')?.textContent?.trim() || 'HTML TEMPLATE';
    visual.dataset.realRender = 'true';
    visual.classList.add('has-real-preview');
    visual.innerHTML = `
      <div class="hh-render-shell" aria-hidden="true">
        <div class="hh-render-toolbar"><span></span><span></span><span></span><b>Real HTML render</b></div>
        <div class="hh-render-viewport">
          <iframe class="hh-render-frame" data-src="demos/${encodeURIComponent(key)}.html" loading="lazy" tabindex="-1" title=""></iframe>
          <div class="hh-render-loading">Rendering template</div>
        </div>
      </div>
      <span class="visual-label">${category}</span>
    `;

    const shell = visual.querySelector('.hh-render-shell');
    const frame = visual.querySelector('.hh-render-frame');
    if (!shell || !frame) return;

    resizePreview(shell);
    frame.addEventListener('load', () => shell.classList.add('is-loaded'), { once:true });

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => resizePreview(shell));
      ro.observe(shell);
    } else {
      window.addEventListener('resize', () => resizePreview(shell), { passive:true });
    }
  };

  cards.forEach(mountRealPreview);

  const previewFrames = [...document.querySelectorAll('.hh-render-frame[data-src]')];
  const loadFrame = frame => {
    if (frame.src || !frame.dataset.src) return;
    frame.src = frame.dataset.src;
    frame.removeAttribute('data-src');
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadFrame(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin:'650px 0px' });
    previewFrames.forEach(frame => observer.observe(frame));
  } else {
    previewFrames.forEach(loadFrame);
  }

  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.setAttribute('aria-pressed', chip.classList.contains('is-active') ? 'true' : 'false');
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter || 'all';
      chips.forEach(item => {
        const active = item === chip;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      let visible = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });
})();
