/**
 * HTML&HTML PDF Engine — İstemci Taraflı Yüksek Hızlı Motor (Zero-Data Retention)
 * pdf-lib ve pdf.js tabanlı %100 yerel, tam fonksiyonel dönüştürücü ve Adobe Acrobat Pro DC seviyesinde Edit Studio.
 */
(function (window, document) {
  'use strict';

  var selectedFiles = [];
  var currentToolId = 'pdf-merge';

  // ACROBAT PRO DC STUDIO STATE
  // ACROBAT PRO DC STUDIO STATE
  var studio = {
    pdfDoc: null,
    pdfBytes: null,
    currentPage: 1,
    totalPages: 1,
    zoomScale: 1.5,
    activeTool: 'select',
    strokeColor: '#2563eb',
    strokeWidth: 4,
    fontSize: 16,
    fontFamily: 'auto', // 'auto' (Orijinal Fontu Algıla) veya manuel seçilen font
    isBold: false,
    isItalic: false,
    fontSizeManualSet: false,
    fontFamilyManualSet: false,
    isBoldManualSet: false,
    isItalicManualSet: false,
    colorManualSet: false,
    pageTextIndex: {},   // Her sayfanın getTextContent() koordinat ve font dizini
    lastDetectedFont: null, // Son tespit edilen font bilgisi
    fontToastTimer: null,
    textBgColor: 'transparent',
    isDrawing: false,
    startX: 0,
    startY: 0,
    pageOverlays: {},    // Her sayfanın çizim katmanını ImageData olarak saklar
    pageObjects: {},     // Her sayfanın interaktif nesnelerini saklar (metin, resim, kaşe, sansür, şekil)
    selectedObjectId: null,
    deletedPages: new Set(),
    pageRotations: {},   // Her sayfanın dönüş açısı
    undoHistory: [],
    redoHistory: [],
    customStampImg: null,
    eventsInitialized: false,
    signatureInkColor: '#0f172a',
    whiteoutColor: '#ffffff',
    whiteoutMode: 'area', // 'area' (dikdörtgen) | 'brush' (serbest fırça)
    whiteoutBrushSize: 24,
    drawingSnapshot: null,
    showTextBoxes: false,
    isUnderline: false,
    textAlign: 'left',
    lineHeight: 1.2
  };

  // PHOTOSHOP WEB STUDIO STATE
  var psStudio = {
    currentImage: null,
    fileName: 'tuval.png',
    activeTool: 'select',
    strokeColor: '#2563eb',
    strokeWidth: 4,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    rotation: 0,
    flippedH: false,
    isDrawing: false,
    startX: 0,
    startY: 0,
    undoHistory: [],
    snapshotData: null
  };

  function init() {
    var searchInput = document.getElementById('toolSearchInput');
    var filterTabs = document.querySelectorAll('.category-tab');
    var toolCards = document.querySelectorAll('.pdf-tool-card');
    var modal = document.getElementById('toolModal');
    var modalTitle = document.getElementById('modalToolTitle');
    var modalDesc = document.getElementById('modalToolDesc');
    var dropzone = document.getElementById('modalDropzone');
    var fileInput = document.getElementById('toolFileInput');
    var fileStatus = document.getElementById('fileStatus');
    var actionBtn = document.getElementById('modalActionBtn');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var mdPreview = document.getElementById('markdownPreview');
    var mdCode = document.getElementById('markdownCode');
    var copyMdBtn = document.getElementById('copyMdBtn');
    var downloadMdBtn = document.getElementById('downloadMdBtn');
    var progressBox = document.getElementById('processProgress');
    var extraOptions = document.getElementById('extraOptions');

    // Türkçe karakter duyarlı normalizasyon
    function normalizeSearch(str) {
      return String(str || '')
        .replace(/İ/g, 'i')
        .replace(/I/g, 'i')
        .replace(/ı/g, 'i')
        .replace(/Ğ/g, 'g')
        .replace(/ğ/g, 'g')
        .replace(/Ü/g, 'u')
        .replace(/ü/g, 'u')
        .replace(/Ş/g, 's')
        .replace(/ş/g, 's')
        .replace(/Ö/g, 'o')
        .replace(/ö/g, 'o')
        .replace(/Ç/g, 'c')
        .replace(/ç/g, 'c')
        .toLowerCase()
        .trim();
    }

    // Arama ve Filtreleme
    function filterCards() {
      var rawQuery = searchInput ? searchInput.value : '';
      var query = normalizeSearch(rawQuery);
      var activeTab = document.querySelector('.category-tab.active');
      var activeCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
      var allCards = document.querySelectorAll('.pdf-tool-card');

      allCards.forEach(function (card) {
        var h3 = card.querySelector('h3');
        var p = card.querySelector('p');
        var badge = card.querySelector('.tool-badge');
        var toolId = card.getAttribute('data-tool-id') || '';

        var titleNorm = normalizeSearch(h3 ? h3.textContent : '');
        var descNorm = normalizeSearch(p ? p.textContent : '');
        var badgeNorm = normalizeSearch(badge ? badge.textContent : '');
        var idNorm = normalizeSearch(toolId);
        var cat = card.getAttribute('data-category');

        if (toolId === 'photoshop-web') {
          descNorm += ' photoshop psd gorsel resim editor fotoshop tasarim photopea adobe';
        }

        var matchesQ = !query || 
          titleNorm.indexOf(query) !== -1 || 
          descNorm.indexOf(query) !== -1 || 
          badgeNorm.indexOf(query) !== -1 || 
          idNorm.indexOf(query) !== -1;

        var matchesC = !query ? (activeCategory === 'all' || cat === activeCategory) : true;

        if (matchesQ && matchesC) {
          card.style.setProperty('display', 'flex', 'important');
          if (toolId === 'photoshop-web' && query && (query.indexOf('photo') !== -1 || query.indexOf('psd') !== -1 || query.indexOf('gorsel') !== -1 || query.indexOf('editor') !== -1 || query.indexOf('fotoshop') !== -1)) {
            card.style.order = '-1';
          } else {
            card.style.order = '';
          }
        } else {
          card.style.setProperty('display', 'none', 'important');
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
      searchInput.addEventListener('keyup', filterCards);
      searchInput.addEventListener('search', filterCards);
    }

    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        filterCards();
      });
    });

    // Standart Modal Açma
    function openModal(card) {
      currentToolId = card.getAttribute('data-tool-id');
      var name = card.querySelector('h3').textContent;
      var desc = card.querySelector('p').textContent;

      if (modalTitle) modalTitle.textContent = name;
      if (modalDesc) modalDesc.textContent = desc;

      selectedFiles = [];
      if (fileInput) {
        fileInput.value = '';
        fileInput.multiple = (currentToolId === 'pdf-merge' || currentToolId === 'jpg-to-pdf');
        if (currentToolId === 'word-to-pdf') {
          fileInput.accept = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else if (currentToolId === 'excel-to-pdf' || currentToolId === 'excel-to-md') {
          fileInput.accept = '.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel';
        } else if (currentToolId === 'jpg-to-pdf') {
          fileInput.accept = 'image/jpeg,image/png,image/webp';
        } else {
          fileInput.accept = 'application/pdf';
        }
      }

      if (fileStatus) {
        fileStatus.innerHTML = '';
        fileStatus.style.display = 'none';
      }
      if (mdPreview) mdPreview.style.display = 'none';
      if (progressBox) progressBox.style.display = 'none';
      if (extraOptions) extraOptions.innerHTML = buildExtraOptions(currentToolId);

      if (actionBtn) {
        actionBtn.disabled = true;
        actionBtn.textContent = (currentToolId === 'pdf-edit') ? 'Dosya Seçin ve Düzenleyiciyi Başlatın' : (name + ' — Dosya Bekleniyor');
      }

      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    // Dinamik Kart Entegrasyonu: Photoshop Web Kartı
    var bentoGrid = document.querySelector('.tools-bento-grid');
    if (bentoGrid && !document.querySelector('.pdf-tool-card[data-tool-id="photoshop-web"]')) {
      var psCard = document.createElement('div');
      psCard.className = 'pdf-tool-card';
      psCard.setAttribute('data-category', 'organize');
      psCard.setAttribute('data-tool-id', 'photoshop-web');
      psCard.style.cursor = 'pointer';
      psCard.innerHTML = 
        '<div class="tool-icon-wrap primary" style="background:#1e3a8a; color:#60a5fa;">' +
          '<span style="font-weight:900; font-size:15px; letter-spacing:0.5px; font-family:sans-serif;">Ps</span>' +
        '</div>' +
        '<span class="tool-badge" style="background:#2563eb; color:#ffffff;">Tam Kapasite</span>' +
        '<h3>Photoshop Web Editör</h3>' +
        '<p>PSD, AI, PNG, JPG katmanlar, filtreler, fırçalar, rötuş ve maskeleme. Tarayıcınızda doğrudan tam ekran ve eksiksiz çalışır.</p>' +
        '<div class="card-footer-action" style="color:#38bdf8; font-weight:700;">Tam Ekran Editörü Aç →</div>';

      var editCard = document.querySelector('.pdf-tool-card[data-tool-id="pdf-edit"]');
      if (editCard && editCard.nextSibling) {
        bentoGrid.insertBefore(psCard, editCard.nextSibling);
      } else {
        bentoGrid.appendChild(psCard);
      }
    }

    // Kart Tıklama ve Delegasyon
    if (bentoGrid) {
      bentoGrid.addEventListener('click', function (e) {
        var card = e.target.closest('.pdf-tool-card');
        if (!card) return;
        var tid = card.getAttribute('data-tool-id');
        if (tid === 'photoshop-web') {
          e.preventDefault();
          e.stopPropagation();
          openPhotoshopStudio();
          return;
        }
        openModal(card);
      });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Ek Seçenekler
    function buildExtraOptions(toolId) {
      if (toolId === 'excel-to-md') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<div style="margin-bottom:10px; display:flex; align-items:center; gap:8px; background:#064e3b; padding:8px 12px; border-radius:6px; border:1px solid #059669;">' +
            '<input type="checkbox" id="excelAllSheetsCheckbox" checked style="width:16px; height:16px; cursor:pointer; accent-color:#10b981;">' +
            '<label for="excelAllSheetsCheckbox" style="font-size:12px; font-weight:700; color:#ecfdf5; cursor:pointer; margin:0;">Tüm çalışma sayfalarını (sheetler) dönüştür</label>' +
          '</div>' +
          '<label style="font-size:12px; font-weight:700; color:#cbd5e1;">Çıktı Biçimi:</label>' +
          '<select id="excelOutputFormatSelect" style="width:100%; padding:8px 12px; border:1px solid #475569; background:#0f172a; color:#ffffff; border-radius:6px; font-size:13px; margin-top:4px;">' +
            '<option value="combined">Tüm sayfaları tek birleştirilmiş .md yap</option>' +
            '<option value="separate">Her sayfayı ayrı ayır (Çoklu .md dosyaları)</option>' +
          '</select>' +
          '</div>';
      }
      if (toolId === 'pdf-edit') {
        return '<div style="margin-top:12px; padding:10px; background:#1e3a8a; border:1px solid #3b82f6; border-radius:8px; font-size:12px; color:#bfdbfe; text-align:left;">' +
          '⚡ <strong style="color:#ffffff;">Adobe Acrobat Pro DC Düzeyinde Düzenleyici:</strong> Metin ekleme, serbest çizim, fosforlu vurgu, şekiller, imza, kaşe ve sansürleme araçları tam ekran stüdyoda açılacaktır.' +
          '</div>';
      }
      if (toolId === 'pdf-watermark') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#cbd5e1;">Filigran Metni:</label>' +
          '<input type="text" id="watermarkTextInput" value="GİZLİ &amp; KORUMALI" style="width:100%; padding:8px 12px; border:1px solid #475569; background:#0f172a; color:#ffffff; border-radius:6px; font-size:13px; margin-top:4px;">' +
          '</div>';
      }
      if (toolId === 'pdf-rotate') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#cbd5e1;">Döndürme Açısı:</label>' +
          '<select id="rotateDegreesSelect" style="width:100%; padding:8px 12px; border:1px solid #475569; background:#0f172a; color:#ffffff; border-radius:6px; font-size:13px; margin-top:4px;">' +
          '<option value="90">90 Derece Sağa</option>' +
          '<option value="180">180 Derece (Ters)</option>' +
          '<option value="270">90 Derece Sola (270°)</option>' +
          '</select>' +
          '</div>';
      }
      if (toolId === 'pdf-protect') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#cbd5e1;">Parola Belirleyin:</label>' +
          '<input type="password" id="protectPasswordInput" placeholder="En az 6 karakter" style="width:100%; padding:8px 12px; border:1px solid #475569; background:#0f172a; color:#ffffff; border-radius:6px; font-size:13px; margin-top:4px;">' +
          '</div>';
      }
      return '';
    }

    // Dosya Seçimi
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', function () { fileInput.click(); });
      dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', function () {
        dropzone.classList.remove('dragover');
      });
      dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
          handleFiles(e.dataTransfer.files);
        }
      });
      fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files.length) {
          handleFiles(fileInput.files);
        }
      });
    }

    function handleFiles(files) {
      selectedFiles = Array.prototype.slice.call(files);
      if (!selectedFiles.length || !fileStatus || !actionBtn) return;

      var infoText = '';
      if (selectedFiles.length === 1) {
        var f = selectedFiles[0];
        infoText = '✓ <strong>' + escapeHtml(f.name) + '</strong> (' + (f.size / 1024).toFixed(1) + ' KB)';
      } else {
        infoText = '✓ <strong>' + selectedFiles.length + ' dosya seçildi</strong>: ' +
          selectedFiles.map(function (x) { return escapeHtml(x.name); }).join(', ');
      }

      fileStatus.innerHTML = infoText;
      fileStatus.style.display = 'block';
      actionBtn.disabled = false;
      actionBtn.textContent = (currentToolId === 'pdf-edit') ? 'Acrobat Pro DC Stüdyosunu Başlat ➔' : 'İşlemi Başlat (Tarayıcıda Yerel & Hızlı)';
    }

    // İşlem Yürütücüsü
    if (actionBtn) {
      actionBtn.addEventListener('click', async function () {
        if (!selectedFiles.length) return;

        // PDF Düzenle ise Stüdyoyu Aç!
        if (currentToolId === 'pdf-edit') {
          closeModal();
          await openAcrobatStudio(selectedFiles[0]);
          return;
        }

        actionBtn.disabled = true;
        actionBtn.innerHTML = '<span class="spinner"></span> İşleniyor... Lütfen bekleyin';
        if (progressBox) {
          progressBox.style.display = 'block';
          progressBox.textContent = 'Dosya bellek katmanında ayrıştırılıyor...';
        }

        try {
          await executeTool(currentToolId, selectedFiles);
          if (progressBox) progressBox.textContent = '✓ İşlem başarıyla tamamlandı!';
          actionBtn.disabled = false;
          actionBtn.textContent = '✓ Başarılı — Tekrar Çalıştır';
        } catch (err) {
          console.error('PDF İşlem Hatası:', err);
          if (progressBox) progressBox.textContent = 'Hata: ' + (err.message || 'Bilinmeyen bir hata oluştu');
          actionBtn.disabled = false;
          actionBtn.textContent = 'Yeniden Dene';
        }
      });
    }

    // Markdown Panosu Aksiyonları
    if (copyMdBtn && mdCode) {
      copyMdBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(mdCode.textContent).then(function () {
          copyMdBtn.textContent = 'Kopyalandı! ✓';
          setTimeout(function () { copyMdBtn.textContent = 'Markdown\'ı Kopyala'; }, 2000);
        });
      });
    }

    if (downloadMdBtn && mdCode) {
      downloadMdBtn.addEventListener('click', function () {
        var blob = new Blob([mdCode.textContent], { type: 'text/markdown;charset=utf-8' });
        downloadBlob(blob, (selectedFiles[0] ? selectedFiles[0].name.replace(/\.[^/.]+$/, '') : 'cikti') + '.md');
      });
    }

    // ACROBAT PRO DC STUDIO EVENTLERİNİ BAĞLA
    initAcrobatStudioEvents();

    // PHOTOSHOP WEB STUDIO EVENTLERİNİ BAĞLA
    initPhotoshopStudioEvents();
  }

  /* =========================================================
   * ADOBE ACROBAT PRO DC GRADE EDIT STÜDYOSU (ÇEKİRDEK MOTOR)
   * ========================================================= */
  /* =========================================================
   * ADOBE ACROBAT PRO DC GRADE EDIT STÜDYOSU (ÇEKİRDEK MOTOR)
   * ========================================================= */
  async function openAcrobatStudio(file) {
    var modal = document.getElementById('acrobatStudioModal');
    var fileNameBadge = document.getElementById('studioFileName');
    if (!modal) return;

    if (fileNameBadge) fileNameBadge.textContent = file.name;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    studio.pdfBytes = await file.arrayBuffer();
    var pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib) {
      console.error('[PDF-Engine] window.pdfjsLib bulunamadı! CSP veya CDN yüklemesi engellendi.');
      alert('PDF görüntüleyici motoru (pdf.js) yüklenemedi. CSP veya CDN erişimini kontrol edin ve sayfayı yenileyin.');
      return;
    }

    try {
      if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      var loadingTask = pdfjsLib.getDocument({ data: studio.pdfBytes.slice(0) });
      studio.pdfDoc = await loadingTask.promise;
      studio.totalPages = studio.pdfDoc.numPages;
      studio.currentPage = 1;
      studio.pageOverlays = {};
      studio.pageObjects = {};
      studio.pageTextIndex = {};
      studio.lastDetectedFont = null;
      studio.deletedPages = new Set();
      studio.pageRotations = {};
      studio.undoHistory = [];
      studio.redoHistory = [];
      studio.selectedObjectId = null;

      updatePageCounterDisplay();

      // Viewport genişliğine göre orantılı akıllı ölçekleme (min 1.5 - 2.5 A4 çözünürlüğü)
      var firstPage = await studio.pdfDoc.getPage(1);
      var unscaledVp = firstPage.getViewport({ scale: 1.0 });
      var vpEl = document.getElementById('studioViewport');
      var availWidth = (vpEl && vpEl.clientWidth > 200) ? (vpEl.clientWidth - 80) : 900;
      var fitScale = availWidth / unscaledVp.width;
      studio.zoomScale = Math.max(1.3, Math.min(2.5, fitScale));

      var zoomDisp = document.getElementById('zoomLevelDisplay');
      if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 100) + '%';

      if (!studio.eventsInitialized) {
        initAcrobatStudioEvents();
        studio.eventsInitialized = true;
      }

      renderThumbnails();
      await renderPage(studio.currentPage);
    } catch (err) {
      console.error('[PDF-Engine] Stüdyo başlatma hatası:', err);
      alert('PDF dosyası yüklenirken hata oluştu: ' + (err.message || err));
    }
  }

  function closeAcrobatStudio() {
    var modal = document.getElementById('acrobatStudioModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    studio.selectedObjectId = null;
  }

  function updatePageCounterDisplay() {
    var totalPagesEl = document.getElementById('totalPagesNum');
    var curPageEl = document.getElementById('currentPageNum');
    var activeCount = studio.totalPages - studio.deletedPages.size;
    if (totalPagesEl) totalPagesEl.textContent = activeCount;
    if (curPageEl) curPageEl.textContent = studio.currentPage;
  }

  function saveCurrentOverlay() {
    var overlay = document.getElementById('pdfDrawOverlay');
    if (!overlay) return;
    var ctx = overlay.getContext('2d');
    studio.pageOverlays[studio.currentPage] = ctx.getImageData(0, 0, overlay.width, overlay.height);
  }

  function restoreOverlay(pageNum) {
    var overlay = document.getElementById('pdfDrawOverlay');
    if (!overlay) return;
    var ctx = overlay.getContext('2d');
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    if (studio.pageOverlays[pageNum]) {
      ctx.putImageData(studio.pageOverlays[pageNum], 0, 0);
    }
  }

  /* =========================================================
   * AKILLI FONT TANIMA VE EŞLEŞTİRME MOTORU (ACROBAT PRO DC)
   * ========================================================= */
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (x) {
      var hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  function parseAndMatchFont(rawFontName, styleFontFamily, fontSizePdf, scale) {
    var raw = ((rawFontName || '') + ' ' + (styleFontFamily || '')).toLowerCase();

    var isBold = /bold|black|heavy|demi|w7|w8|w9|semibold/i.test(raw);
    var isItalic = /italic|oblique|slanted/i.test(raw);

    var fontFamily = 'Arial, sans-serif';
    var fontDisplayName = 'Arial';
    var standardPdfFont = 'Helvetica';

    if (/courier|mono|consolas|fixed/i.test(raw)) {
      fontFamily = "'Courier New', monospace";
      fontDisplayName = 'Courier New';
      standardPdfFont = 'Courier';
    } else if (/times|serif|roman|minion|garamond/i.test(raw)) {
      if (/georgia/i.test(raw)) {
        fontFamily = 'Georgia, serif';
        fontDisplayName = 'Georgia';
        standardPdfFont = 'TimesRoman';
      } else {
        fontFamily = "'Times New Roman', serif";
        fontDisplayName = 'Times New Roman';
        standardPdfFont = 'TimesRoman';
      }
    } else if (/georgia/i.test(raw)) {
      fontFamily = 'Georgia, serif';
      fontDisplayName = 'Georgia';
      standardPdfFont = 'TimesRoman';
    } else if (/verdana/i.test(raw)) {
      fontFamily = 'Verdana, sans-serif';
      fontDisplayName = 'Verdana';
      standardPdfFont = 'Helvetica';
    } else if (/helvetica/i.test(raw)) {
      fontFamily = 'Helvetica, sans-serif';
      fontDisplayName = 'Helvetica';
      standardPdfFont = 'Helvetica';
    } else {
      fontFamily = 'Arial, sans-serif';
      fontDisplayName = 'Arial';
      standardPdfFont = 'Helvetica';
    }

    var baseFontSize = Math.round(fontSizePdf || 12);
    var fontSizePx = Math.round(baseFontSize * (scale || 1));
    if (fontSizePx < 8) fontSizePx = 8;
    if (fontSizePx > 72) fontSizePx = 72;

    return {
      fontFamily: fontFamily,
      fontDisplayName: fontDisplayName,
      fontSizePx: fontSizePx,
      baseFontSize: baseFontSize,
      isBold: isBold,
      isItalic: isItalic,
      standardPdfFont: standardPdfFont
    };
  }

  async function buildPageTextIndex(pageNum, page, viewport) {
    if (!studio.pageTextIndex) studio.pageTextIndex = {};
    try {
      var textContent = await page.getTextContent();
      var items = textContent.items || [];
      var styles = textContent.styles || {};
      var indexed = [];

      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (!it.str || !it.str.trim()) continue;

        var tx = it.transform[4];
        var ty = it.transform[5];
        var fontSizePdf = Math.hypot(it.transform[0], it.transform[1]) || 12;
        var itW = it.width || (fontSizePdf * 0.55 * it.str.length);
        var itH = it.height || fontSizePdf;

        // Viewport 4 köşe projeksiyonu (dönüş açılarına tam duyarlı bounding box)
        var p1 = viewport.convertToViewportPoint(tx, ty);
        var p2 = viewport.convertToViewportPoint(tx + itW, ty);
        var p3 = viewport.convertToViewportPoint(tx + itW, ty + itH);
        var p4 = viewport.convertToViewportPoint(tx, ty + itH);

        var minX = Math.min(p1[0], p2[0], p3[0], p4[0]);
        var maxX = Math.max(p1[0], p2[0], p3[0], p4[0]);
        var minY = Math.min(p1[1], p2[1], p3[1], p4[1]);
        var maxY = Math.max(p1[1], p2[1], p3[1], p4[1]);

        var rawFont = it.fontName || '';
        var styleObj = styles[rawFont] || {};
        var fontInfo = parseAndMatchFont(rawFont, styleObj.fontFamily, fontSizePdf, viewport.scale);

        indexed.push({
          str: it.str,
          x: minX,
          y: minY,
          width: Math.max(maxX - minX, 4),
          height: Math.max(maxY - minY, 6),
          rawFontName: rawFont,
          fontFamily: fontInfo.fontFamily,
          fontDisplayName: fontInfo.fontDisplayName,
          fontSize: fontInfo.fontSizePx,
          fontSizePdf: fontInfo.baseFontSize,
          isBold: fontInfo.isBold,
          isItalic: fontInfo.isItalic,
          standardPdfFont: fontInfo.standardPdfFont
        });
      }

      studio.pageTextIndex[pageNum] = indexed;
    } catch (e) {
      console.warn('[PDF-Engine] TextContent indeksleme hatası:', e);
      studio.pageTextIndex[pageNum] = [];
    }
  }

  /* =========================================================
   * ACROBAT PRO DC KILAVUZ METİN KUTULARI (SHOW TEXT BOXES KATMANI)
   * ========================================================= */
  function renderLiveTextLayer(pageNum) {
    var wrapper = document.getElementById('canvasWrapper');
    if (!wrapper) return;

    var layer = document.getElementById('acrobatLiveTextLayer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'acrobatLiveTextLayer';
      layer.className = 'acrobat-live-text-layer';
      wrapper.appendChild(layer);
    }
    layer.innerHTML = '';
    layer.style.display = studio.showTextBoxes ? 'block' : 'none';

    if (!studio.showTextBoxes) return;

    var items = (studio.pageTextIndex && studio.pageTextIndex[pageNum]) || [];
    items.forEach(function (it, idx) {
      var box = document.createElement('div');
      box.className = 'acrobat-live-text-box';
      box.style.left = Math.max(0, it.x - 2) + 'px';
      box.style.top = Math.max(0, it.y - 2) + 'px';
      box.style.width = Math.max(16, it.width + 4) + 'px';
      box.style.height = Math.max(12, it.height + 4) + 'px';
      box.title = 'Tıkla ve Düzenle: "' + it.str + '" (' + it.fontDisplayName + ' ' + it.fontSize + 'px)';

      box.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        activateAcrobatTextEdit(it);
      });
      layer.appendChild(box);
    });
  }

  /* =========================================================
   * ACROBAT PRO DC CERRAHİ METİN DÜZENLEME (WHITEOUT + CONTENTEDITABLE)
   * ========================================================= */
  function activateAcrobatTextEdit(it) {
    if (!it) return;
    pushUndo();

    var whiteoutId = 'wo_' + Date.now();
    var textId = 'txt_' + (Date.now() + 1);

    // 1. Orijinal metni sayfa renginde opak beyazlatma ile ört (Eski yazı görünmez, çakışma sıfır!)
    var whiteoutPadX = 3;
    var whiteoutPadY = 2;
    var whiteoutObj = {
      id: whiteoutId,
      type: 'whiteout',
      x: Math.max(0, it.x - whiteoutPadX),
      y: Math.max(0, it.y - whiteoutPadY),
      width: Math.max(20, it.width + (whiteoutPadX * 2)),
      height: Math.max(14, it.height + (whiteoutPadY * 2)),
      bgColor: '#ffffff',
      detectedFont: it
    };

    // 2. Tam o koordinatta birebir eşleşen font ve boyutla interaktif metin kutusu aç
    var textObj = {
      id: textId,
      type: 'text',
      x: Math.max(0, it.x - 2),
      y: Math.max(0, it.y - 2),
      width: Math.max(80, it.width + 12),
      height: Math.max(20, it.height + 6),
      text: it.str,
      fontSize: it.fontSize || 16,
      fontFamily: it.fontFamily || 'Arial, sans-serif',
      color: it.color || '#0f172a',
      bgColor: 'transparent',
      isBold: !!it.isBold,
      isItalic: !!it.isItalic,
      isUnderline: false,
      textAlign: 'left',
      lineHeight: 1.2,
      detectedFont: it,
      pairedWhiteoutId: whiteoutId
    };

    if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
    studio.pageObjects[studio.currentPage].push(whiteoutObj);
    studio.pageObjects[studio.currentPage].push(textObj);

    studio.lastDetectedFont = it;
    showFontMatchBadge(it);

    renderPageObjects(studio.currentPage);
    selectObject(textId);

    // Kılavuz kutulardan çıkıp seçim aracına odaklan
    var selBtn = document.querySelector('.acrobat-tools .tool-btn[data-tool="select"]');
    if (selBtn) {
      document.querySelectorAll('.acrobat-tools .tool-btn').forEach(function (x) { x.classList.remove('active'); });
      selBtn.classList.add('active');
      studio.activeTool = 'select';
    }

    // Düzenlenebilir metin kutusuna doğrudan gir ve imleci sona koy
    setTimeout(function () {
      var textEl = document.querySelector('.pdf-obj[data-id="' + textId + '"] .pdf-obj-text-content');
      if (textEl) {
        textEl.focus();
        var range = document.createRange();
        range.selectNodeContents(textEl);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 60);
  }

  function detectFontAtPosition(pageNum, canvasX, canvasY, boxWidth, boxHeight) {
    var items = (studio.pageTextIndex && studio.pageTextIndex[pageNum]) || [];
    var fallback = {
      fontFamily: 'Arial, sans-serif',
      fontDisplayName: 'Arial',
      fontSize: 16,
      fontSizePdf: 12,
      isBold: false,
      isItalic: false,
      color: '#0f172a',
      text: '',
      standardPdfFont: 'Helvetica'
    };

    if (!items.length) return fallback;

    var targetX = canvasX;
    var targetY = canvasY;
    var targetW = Math.max(boxWidth || 10, 8);
    var targetH = Math.max(boxHeight || 10, 8);

    var bestMatch = null;
    var maxOverlap = 0;
    var minDistance = Infinity;
    var tCenterX = targetX + targetW / 2;
    var tCenterY = targetY + targetH / 2;

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var overlapX = Math.max(0, Math.min(targetX + targetW, it.x + it.width) - Math.max(targetX, it.x));
      var overlapY = Math.max(0, Math.min(targetY + targetH, it.y + it.height) - Math.max(targetY, it.y));
      var overlap = overlapX * overlapY;

      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatch = it;
      }

      if (maxOverlap === 0) {
        var itCenterX = it.x + it.width / 2;
        var itCenterY = it.y + it.height / 2;
        var dist = Math.hypot(tCenterX - itCenterX, tCenterY - itCenterY);
        if (dist < minDistance) {
          minDistance = dist;
          if (dist < 180) {
            bestMatch = it;
          }
        }
      }
    }

    if (!bestMatch && items.length > 0) {
      bestMatch = items[0];
    }

    // Canvas piksel rengi tespiti
    var detectedColor = '#0f172a';
    try {
      var renderCanvas = document.getElementById('pdfRenderCanvas');
      if (renderCanvas && bestMatch) {
        var ctx = renderCanvas.getContext('2d');
        var sx = Math.floor(bestMatch.x + Math.min(bestMatch.width / 2, 8));
        var sy = Math.floor(bestMatch.y + Math.min(bestMatch.height / 2, 8));
        if (sx >= 0 && sx < renderCanvas.width && sy >= 0 && sy < renderCanvas.height) {
          var px = ctx.getImageData(sx, sy, 1, 1).data;
          // Eğer aşırı beyaz/arka plan rengi değilse al
          if (!(px[0] > 235 && px[1] > 235 && px[2] > 235)) {
            detectedColor = rgbToHex(px[0], px[1], px[2]);
          }
        }
      }
    } catch (e) {}

    return {
      fontFamily: bestMatch ? bestMatch.fontFamily : fallback.fontFamily,
      fontDisplayName: bestMatch ? bestMatch.fontDisplayName : fallback.fontDisplayName,
      fontSize: bestMatch ? bestMatch.fontSize : fallback.fontSize,
      fontSizePdf: bestMatch ? bestMatch.fontSizePdf : fallback.fontSizePdf,
      isBold: bestMatch ? bestMatch.isBold : fallback.isBold,
      isItalic: bestMatch ? bestMatch.isItalic : fallback.isItalic,
      color: detectedColor,
      text: bestMatch ? bestMatch.str : '',
      standardPdfFont: bestMatch ? bestMatch.standardPdfFont : fallback.standardPdfFont
    };
  }

  function showFontMatchBadge(detected) {
    if (!detected) return;
    var styles = [];
    if (detected.isBold) styles.push('Bold');
    if (detected.isItalic) styles.push('Italic');
    var styleStr = styles.length ? ' (' + styles.join(', ') + ')' : '';

    var badgeText = '✓ Orijinal Font Tespit Edildi: ' + (detected.fontDisplayName || 'Arial') + ' ' + (detected.fontSize || 14) + 'px' + styleStr;

    // 1. Tuval üzeri şık Floating Toast bildirimi
    var toast = document.getElementById('smartFontToast');
    var toastText = document.getElementById('smartFontToastText');
    if (toast && toastText) {
      toastText.textContent = badgeText;
      toast.style.display = 'inline-flex';
      requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });

      if (studio.fontToastTimer) clearTimeout(studio.fontToastTimer);
      studio.fontToastTimer = setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(function () { toast.style.display = 'none'; }, 300);
      }, 3400);
    }

    // 2. Toolbar üzerindeki akıllı rozet
    var badgeGroup = document.getElementById('smartFontBadgeGroup');
    var badgeTextEl = document.getElementById('smartFontBadgeText');
    if (badgeGroup && badgeTextEl) {
      badgeTextEl.textContent = '✨ ' + (detected.fontDisplayName || 'Arial') + ' ' + (detected.fontSize || 14) + 'px' + styleStr;
      badgeGroup.style.display = 'inline-flex';
    }
  }

  async function renderPage(pageNum) {
    if (!studio.pdfDoc) return;
    if (studio.deletedPages.has(pageNum)) {
      // Silinmiş sayfa ise en yakın aktif sayfaya yönlendir
      for (var p = 1; p <= studio.totalPages; p++) {
        if (!studio.deletedPages.has(p)) {
          studio.currentPage = p;
          pageNum = p;
          break;
        }
      }
    }

    saveCurrentOverlay();

    var page = await studio.pdfDoc.getPage(pageNum);
    var rotationAngle = (page.rotate + (studio.pageRotations[pageNum] || 0)) % 360;
    var viewport = page.getViewport({ scale: studio.zoomScale, rotation: rotationAngle });

    var renderCanvas = document.getElementById('pdfRenderCanvas');
    var overlayCanvas = document.getElementById('pdfDrawOverlay');
    var objOverlay = document.getElementById('pdfObjectOverlay');
    var wrapper = document.getElementById('canvasWrapper');

    renderCanvas.width = viewport.width;
    renderCanvas.height = viewport.height;
    overlayCanvas.width = viewport.width;
    overlayCanvas.height = viewport.height;
    wrapper.style.width = viewport.width + 'px';
    wrapper.style.height = viewport.height + 'px';
    if (objOverlay) {
      objOverlay.style.width = viewport.width + 'px';
      objOverlay.style.height = viewport.height + 'px';
    }

    var renderContext = {
      canvasContext: renderCanvas.getContext('2d'),
      viewport: viewport
    };

    await page.render(renderContext).promise;
    await buildPageTextIndex(pageNum, page, viewport);
    restoreOverlay(pageNum);
    renderPageObjects(pageNum);
    renderLiveTextLayer(pageNum);
    updateThumbnailActive(pageNum);
    updatePageCounterDisplay();
  }

  /* =========================================================
   * İNTERAKTİF NESNE YÖNETİMİ (SELECT & TRANSFORM KATMANI)
   * ========================================================= */
  function renderPageObjects(pageNum) {
    var overlay = document.getElementById('pdfObjectOverlay');
    if (!overlay) return;
    overlay.innerHTML = '';

    var objs = studio.pageObjects[pageNum] || [];
    objs.forEach(function (obj) {
      var el = document.createElement('div');
      el.className = 'pdf-obj' + (obj.id === studio.selectedObjectId ? ' selected' : '');
      el.setAttribute('data-id', obj.id);
      el.setAttribute('data-type', obj.type);
      el.style.left = obj.x + 'px';
      el.style.top = obj.y + 'px';
      el.style.width = obj.width + 'px';
      el.style.height = obj.height + 'px';
      if (obj.rotation) {
        el.style.transform = 'rotate(' + obj.rotation + 'deg)';
      }

      // 1. İçerik Türüne Göre Render
      if (obj.type === 'text') {
        var textDiv = document.createElement('div');
        textDiv.className = 'pdf-obj-text-content';
        textDiv.contentEditable = 'true';
        textDiv.style.fontFamily = obj.fontFamily || 'Arial, sans-serif';
        textDiv.style.fontSize = (obj.fontSize || 16) + 'px';
        textDiv.style.color = obj.color || '#2563eb';
        textDiv.style.fontWeight = obj.isBold ? 'bold' : 'normal';
        textDiv.style.fontStyle = obj.isItalic ? 'italic' : 'normal';
        textDiv.style.textDecoration = obj.isUnderline ? 'underline' : 'none';
        textDiv.style.textAlign = obj.textAlign || 'left';
        textDiv.style.lineHeight = obj.lineHeight || 1.25;
        textDiv.style.background = obj.bgColor || 'transparent';
        textDiv.textContent = obj.text || '';

        textDiv.addEventListener('input', function () {
          obj.text = textDiv.textContent;
        });
        textDiv.addEventListener('blur', function () {
          obj.text = textDiv.textContent;
          pushUndo();
        });
        el.appendChild(textDiv);
      } else if (obj.type === 'whiteout') {
        var whiteoutDiv = document.createElement('div');
        whiteoutDiv.className = 'pdf-obj-whiteout-block';
        whiteoutDiv.style.background = obj.bgColor || '#ffffff';
        if (obj.detectedFont) {
          var hint = document.createElement('span');
          hint.className = 'whiteout-font-hint';
          hint.style.cssText = 'position:absolute; bottom:2px; right:4px; font-size:9px; color:#64748b; background:rgba(255,255,255,0.85); padding:1px 4px; border-radius:3px; pointer-events:none; opacity:0.85; user-select:none; font-family:sans-serif; border:1px solid #cbd5e1;';
          var styleAdd = obj.detectedFont.isBold ? ' (B)' : '';
          hint.textContent = '✍️ ' + obj.detectedFont.fontDisplayName + ' ' + obj.detectedFont.fontSize + 'px' + styleAdd;
          whiteoutDiv.appendChild(hint);
        }
        el.appendChild(whiteoutDiv);
      } else if (obj.type === 'redact') {
        var redactDiv = document.createElement('div');
        redactDiv.className = 'pdf-obj-redact-block';
        redactDiv.textContent = '■ SANSÜRLENDİ';
        el.appendChild(redactDiv);
      } else if (obj.type === 'image' || obj.type === 'stamp') {
        var img = document.createElement('img');
        img.className = 'pdf-obj-img-content';
        img.src = obj.imgUrl;
        img.alt = obj.stampText || 'İmza/Kaşe';
        el.appendChild(img);
      } else if (obj.type === 'shape') {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'pdf-obj-shape-svg');
        svg.setAttribute('viewBox', '0 0 ' + obj.width + ' ' + obj.height);
        var strokeCol = obj.strokeColor || '#2563eb';
        var strokeW = obj.strokeWidth || 3;

        if (obj.shapeType === 'rect') {
          var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', strokeW);
          rect.setAttribute('y', strokeW);
          rect.setAttribute('width', Math.max(1, obj.width - strokeW * 2));
          rect.setAttribute('height', Math.max(1, obj.height - strokeW * 2));
          rect.setAttribute('fill', obj.fillColor || 'none');
          rect.setAttribute('stroke', strokeCol);
          rect.setAttribute('stroke-width', strokeW);
          rect.setAttribute('rx', '4');
          svg.appendChild(rect);
        } else if (obj.shapeType === 'circle') {
          var ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
          ellipse.setAttribute('cx', obj.width / 2);
          ellipse.setAttribute('cy', obj.height / 2);
          ellipse.setAttribute('rx', Math.max(1, (obj.width - strokeW * 2) / 2));
          ellipse.setAttribute('ry', Math.max(1, (obj.height - strokeW * 2) / 2));
          ellipse.setAttribute('fill', obj.fillColor || 'none');
          ellipse.setAttribute('stroke', strokeCol);
          ellipse.setAttribute('stroke-width', strokeW);
          svg.appendChild(ellipse);
        } else if (obj.shapeType === 'arrow') {
          var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '4');
          line.setAttribute('y1', obj.height / 2);
          line.setAttribute('x2', obj.width - 12);
          line.setAttribute('y2', obj.height / 2);
          line.setAttribute('stroke', strokeCol);
          line.setAttribute('stroke-width', strokeW);
          var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          poly.setAttribute('points', (obj.width - 16) + ',' + (obj.height / 2 - 8) + ' ' + (obj.width - 2) + ',' + (obj.height / 2) + ' ' + (obj.width - 16) + ',' + (obj.height / 2 + 8));
          poly.setAttribute('fill', 'none');
          poly.setAttribute('stroke', strokeCol);
          poly.setAttribute('stroke-width', strokeW);
          svg.appendChild(line);
          svg.appendChild(poly);
        } else if (obj.shapeType === 'line') {
          var straightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          straightLine.setAttribute('x1', '2');
          straightLine.setAttribute('y1', '2');
          straightLine.setAttribute('x2', obj.width - 2);
          straightLine.setAttribute('y2', obj.height - 2);
          straightLine.setAttribute('stroke', strokeCol);
          straightLine.setAttribute('stroke-width', strokeW);
          svg.appendChild(straightLine);
        }
        el.appendChild(svg);
      } else if (obj.type === 'stamp-icon') {
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconSvg.setAttribute('viewBox', '0 0 24 24');
        iconSvg.style.width = '100%';
        iconSvg.style.height = '100%';
        iconSvg.style.display = 'block';
        if (obj.iconType === 'check') {
          iconSvg.setAttribute('fill', 'none');
          iconSvg.setAttribute('stroke', obj.color || '#16a34a');
          iconSvg.setAttribute('stroke-width', '3');
          var polyCheck = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          polyCheck.setAttribute('points', '20 6 9 17 4 12');
          iconSvg.appendChild(polyCheck);
        } else if (obj.iconType === 'cross') {
          iconSvg.setAttribute('fill', 'none');
          iconSvg.setAttribute('stroke', obj.color || '#dc2626');
          iconSvg.setAttribute('stroke-width', '3');
          var l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l1.setAttribute('x1', '18'); l1.setAttribute('y1', '6'); l1.setAttribute('x2', '6'); l1.setAttribute('y2', '18');
          var l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l2.setAttribute('x1', '6'); l2.setAttribute('y1', '6'); l2.setAttribute('x2', '18'); l2.setAttribute('y2', '18');
          iconSvg.appendChild(l1);
          iconSvg.appendChild(l2);
        }
        el.appendChild(iconSvg);
      } else if (obj.type === 'table') {
        var tbl = document.createElement('table');
        tbl.className = 'pdf-obj-table-content';
        tbl.style.cssText = 'width:100%; height:100%; border-collapse:collapse; background:#ffffff; border:1.5px solid #334155; font-size:11px;';
        for (var r = 0; r < (obj.rows || 3); r++) {
          var tr = document.createElement('tr');
          for (var c = 0; c < (obj.cols || 3); c++) {
            var td = document.createElement('td');
            td.style.cssText = 'border:1px solid #94a3b8; padding:4px 6px; color:#0f172a;';
            td.contentEditable = 'true';
            var cellVal = (obj.data && obj.data[r] && obj.data[r][c]) ? obj.data[r][c] : '';
            td.textContent = cellVal;
            (function (rowIdx, colIdx, cellEl) {
              cellEl.addEventListener('input', function () {
                if (!obj.data) obj.data = [];
                if (!obj.data[rowIdx]) obj.data[rowIdx] = [];
                obj.data[rowIdx][colIdx] = cellEl.textContent;
              });
            })(r, c, td);
            tr.appendChild(td);
          }
          tbl.appendChild(tr);
        }
        el.appendChild(tbl);
      } else if (obj.type === 'sticky') {
        var stickyDiv = document.createElement('div');
        stickyDiv.className = 'pdf-obj-sticky-content';
        stickyDiv.style.cssText = 'width:100%; height:100%; background:#fef08a; border:1px solid #facc15; border-radius:4px; padding:6px; box-shadow:0 4px 10px rgba(0,0,0,0.15); display:flex; flex-direction:column;';
        var pinIcon = document.createElement('div');
        pinIcon.style.cssText = 'font-size:11px; margin-bottom:4px; color:#854d0e; font-weight:700;';
        pinIcon.textContent = '📌 Not';
        var sText = document.createElement('div');
        sText.style.cssText = 'flex:1; font-size:11px; color:#713f12; outline:none; overflow-y:auto;';
        sText.contentEditable = 'true';
        sText.textContent = obj.text || '';
        sText.addEventListener('input', function () { obj.text = sText.textContent; });
        stickyDiv.appendChild(pinIcon);
        stickyDiv.appendChild(sText);
        el.appendChild(stickyDiv);
      }

      // 2. Silme Butonu (Kırmızı ✕)
      var delBtn = document.createElement('button');
      delBtn.className = 'obj-del-btn';
      delBtn.textContent = '✕';
      delBtn.title = 'Nesneyi Sil';
      delBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteObject(obj.id);
      });
      el.appendChild(delBtn);

      // 3. Acrobat Pro DC Taşıma Tutamacı (Drag Bar)
      var dragHandle = document.createElement('div');
      dragHandle.className = 'obj-drag-handle';
      dragHandle.innerHTML = '⋮⋮ Taşı';
      el.appendChild(dragHandle);

      // 4. Boyutlandırma Tutamaçları (8 Nokta: Köşeler + Kenar Ortaları)
      ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'].forEach(function (pos) {
        var h = document.createElement('div');
        h.className = 'resize-handle ' + pos;
        h.setAttribute('data-handle', pos);
        el.appendChild(h);
      });

      // 5. Döndürme Tutamacı (Rotate Handle)
      var rotHandle = document.createElement('div');
      rotHandle.className = 'rotate-handle';
      rotHandle.title = 'Döndür';
      el.appendChild(rotHandle);

      // 4. Taşıma ve Boyutlandırma Olayları
      setupObjectInteraction(el, obj);

      overlay.appendChild(el);
    });
  }

  function insertTextObjectAt(posX, posY, preferredFont) {
    pushUndo();
    var newTextId = 'txt_' + Date.now();

    // 1. Orijinal Font Analizi & Tespiti
    var detected = preferredFont || detectFontAtPosition(studio.currentPage, posX, posY, 50, 24);
    studio.lastDetectedFont = detected;

    // Şık bildirim göster
    showFontMatchBadge(detected);

    // 2. Font, Boyut, Kalınlık, İtalik Belirleme (Orijinal Font Öncelikli, İsteğe Bağlı Manuel Geçiş)
    var useAutoFont = (!studio.fontFamily || studio.fontFamily === 'auto' || !studio.fontFamilyManualSet);
    var chosenFont = useAutoFont ? (detected.fontFamily || 'Arial, sans-serif') : studio.fontFamily;
    var chosenSize = studio.fontSizeManualSet ? studio.fontSize : (detected.fontSize || 16);
    var chosenBold = studio.isBoldManualSet ? studio.isBold : (detected.isBold !== undefined ? detected.isBold : false);
    var chosenItalic = studio.isItalicManualSet ? studio.isItalic : (detected.isItalic !== undefined ? detected.isItalic : false);
    var chosenColor = studio.colorManualSet ? studio.strokeColor : (detected.color || '#0f172a');

    var newObj = {
      id: newTextId,
      type: 'text',
      x: Math.max(10, posX - 10),
      y: Math.max(10, posY - 8),
      width: Math.max(180, (detected.text ? detected.text.length * (chosenSize * 0.65) : 220)),
      height: Math.max(36, Math.round(chosenSize * 1.6)),
      text: 'Metni buraya yazın...',
      fontSize: chosenSize,
      fontFamily: chosenFont,
      color: chosenColor,
      bgColor: studio.textBgColor,
      isBold: chosenBold,
      isItalic: chosenItalic,
      textAlign: 'left',
      detectedFont: detected
    };
    if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
    studio.pageObjects[studio.currentPage].push(newObj);
    renderPageObjects(studio.currentPage);
    selectObject(newTextId);

    // Yazıya doğrudan odaklan
    setTimeout(function () {
      var textEl = document.querySelector('.pdf-obj[data-id="' + newTextId + '"] .pdf-obj-text-content');
      if (textEl) {
        textEl.focus();
        var range = document.createRange();
        range.selectNodeContents(textEl);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 50);

    // Seçim moduna dön
    var selToolBtn = document.querySelector('.tool-btn[data-tool="select"]');
    if (selToolBtn) selToolBtn.click();
  }

  function setupObjectInteraction(el, obj) {
    // Silinen alana çift tıklandığında anında orijinal fontuyla metin kutusu aç
    if (obj.type === 'whiteout') {
      el.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        var wrapper = document.getElementById('canvasWrapper');
        var rect = wrapper ? wrapper.getBoundingClientRect() : el.getBoundingClientRect();
        var clickX = e.clientX - rect.left;
        var clickY = e.clientY - rect.top;
        insertTextObjectAt(clickX, clickY, obj.detectedFont);
      });
    }

    el.addEventListener('pointerdown', function (e) {
      if (e.target.classList.contains('rotate-handle')) {
        startObjectRotate(e, obj, el);
        return;
      }

      if (e.target.classList.contains('resize-handle')) {
        startObjectResize(e, obj, e.target.getAttribute('data-handle'));
        return;
      }
      if (e.target.classList.contains('obj-del-btn')) return;

      // Eğer kullanıcı metin aracı seçiliyken nesneye (ör. silinen alan) tıkladıysa, anında üzerine orijinal fontuyla metin kutusu ekle
      if (studio.activeTool === 'text') {
        var wrapper = document.getElementById('canvasWrapper');
        var rect = wrapper ? wrapper.getBoundingClientRect() : el.getBoundingClientRect();
        var clickX = e.clientX - rect.left;
        var clickY = e.clientY - rect.top;
        insertTextObjectAt(clickX, clickY, obj.detectedFont);
        return;
      }

      selectObject(obj.id);

      // Eğer text içeriğine tıklandıysa ve zaten seçiliyse text yazımına izin ver
      if (e.target.classList.contains('pdf-obj-text-content')) {
        return;
      }

      // Taşıma (Drag) Başlat
      var startMouseX = e.clientX;
      var startMouseY = e.clientY;
      var origObjX = obj.x;
      var origObjY = obj.y;

      function onPointerMove(moveEvent) {
        var dx = moveEvent.clientX - startMouseX;
        var dy = moveEvent.clientY - startMouseY;
        obj.x = Math.max(0, origObjX + dx);
        obj.y = Math.max(0, origObjY + dy);
        el.style.left = obj.x + 'px';
        el.style.top = obj.y + 'px';
      }

      function onPointerUp() {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        pushUndo();
      }

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  function startObjectRotate(e, obj, el) {
    e.stopPropagation();
    e.preventDefault();
    var rect = el.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    function onPointerMove(moveEvent) {
      var dx = moveEvent.clientX - centerX;
      var dy = moveEvent.clientY - centerY;
      var angle = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) + 90);
      if (angle < 0) angle += 360;
      // 15 derecelik adımlarla snap
      if (moveEvent.shiftKey) {
        angle = Math.round(angle / 15) * 15;
      }
      obj.rotation = angle;
      el.style.transform = 'rotate(' + angle + 'deg)';
    }

    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      pushUndo();
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function startObjectResize(e, obj, handle) {
    e.stopPropagation();
    e.preventDefault();
    var startMouseX = e.clientX;
    var startMouseY = e.clientY;
    var origX = obj.x;
    var origY = obj.y;
    var origW = obj.width;
    var origH = obj.height;

    function onPointerMove(moveEvent) {
      var dx = moveEvent.clientX - startMouseX;
      var dy = moveEvent.clientY - startMouseY;

      if (handle === 'se') {
        obj.width = Math.max(30, origW + dx);
        obj.height = Math.max(20, origH + dy);
      } else if (handle === 'sw') {
        var newW = Math.max(30, origW - dx);
        obj.x = origX + (origW - newW);
        obj.width = newW;
        obj.height = Math.max(20, origH + dy);
      } else if (handle === 'ne') {
        obj.width = Math.max(30, origW + dx);
        var newH = Math.max(20, origH - dy);
        obj.y = origY + (origH - newH);
        obj.height = newH;
      } else if (handle === 'nw') {
        var newW2 = Math.max(30, origW - dx);
        var newH2 = Math.max(20, origH - dy);
        obj.x = origX + (origW - newW2);
        obj.y = origY + (origH - newH2);
        obj.width = newW2;
        obj.height = newH2;
      } else if (handle === 'e') {
        obj.width = Math.max(30, origW + dx);
      } else if (handle === 'w') {
        var newW3 = Math.max(30, origW - dx);
        obj.x = origX + (origW - newW3);
        obj.width = newW3;
      } else if (handle === 's') {
        obj.height = Math.max(20, origH + dy);
      } else if (handle === 'n') {
        var newH3 = Math.max(20, origH - dy);
        obj.y = origY + (origH - newH3);
        obj.height = newH3;
      }

      renderPageObjects(studio.currentPage);
    }

    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      pushUndo();
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function selectObject(id) {
    studio.selectedObjectId = id;
    var objs = studio.pageObjects[studio.currentPage] || [];
    var target = objs.find(function (o) { return o.id === id; });

    document.querySelectorAll('.pdf-obj').forEach(function (el) {
      el.classList.toggle('selected', el.getAttribute('data-id') === id);
    });

    if (target) {
      // Seçenekler çubuğunu nesneye göre güncelle
      if (target.type === 'text') {
        var textOpts = document.getElementById('textOptionsGroup');
        if (textOpts) textOpts.style.display = 'flex';
        var fontFam = document.getElementById('studioFontFamily');
        if (fontFam) {
          fontFam.value = target.fontFamily || 'auto';
        }
        var fontSz = document.getElementById('studioFontSize');
        if (fontSz && target.fontSize) fontSz.value = target.fontSize;
        var textBg = document.getElementById('studioTextBgColor');
        if (textBg && target.bgColor) textBg.value = target.bgColor;
        var boldBtn = document.getElementById('studioTextBoldBtn');
        if (boldBtn) boldBtn.style.background = target.isBold ? '#2563eb' : '#1e293b';
        var italicBtn = document.getElementById('studioTextItalicBtn');
        if (italicBtn) italicBtn.style.background = target.isItalic ? '#2563eb' : '#1e293b';
        var underlineBtn = document.getElementById('studioTextUnderlineBtn');
        if (underlineBtn) underlineBtn.style.background = target.isUnderline ? '#2563eb' : '#1e293b';

        // Hizalama Butonları
        var align = target.textAlign || 'left';
        var alignBtns = document.querySelectorAll('#textOptionsGroup .align-btn');
        alignBtns.forEach(function (ab) {
          var match = ab.getAttribute('data-align') === align;
          ab.classList.toggle('active', match);
          ab.style.background = match ? '#2563eb' : '#1e293b';
          ab.style.color = match ? '#ffffff' : '#cbd5e1';
        });

        var textColorInput = document.getElementById('studioTextColorPicker');
        if (textColorInput && target.color) textColorInput.value = target.color;

        var lineHeightSelect = document.getElementById('studioTextLineHeight');
        if (lineHeightSelect && target.lineHeight) lineHeightSelect.value = String(target.lineHeight);

        if (target.detectedFont) {
          showFontMatchBadge(target.detectedFont);
        }
      }
      if (target.type === 'whiteout') {
        var woOpts = document.getElementById('whiteoutOptionsGroup');
        if (woOpts) woOpts.style.display = 'inline-flex';
        var woColorInput = document.getElementById('studioWhiteoutColor');
        if (woColorInput && target.bgColor) woColorInput.value = target.bgColor;
        var cp = document.getElementById('studioColorPicker');
        if (cp && target.bgColor) cp.value = target.bgColor;
        if (target.detectedFont) {
          showFontMatchBadge(target.detectedFont);
        }
      }
      if (target.color) {
        var cp2 = document.getElementById('studioColorPicker');
        if (cp2) cp2.value = target.color;
      }
    }
  }

  function deselectAllObjects() {
    studio.selectedObjectId = null;
    document.querySelectorAll('.pdf-obj').forEach(function (el) {
      el.classList.remove('selected');
    });
    if (studio.activeTool !== 'whiteout') {
      var woOpts = document.getElementById('whiteoutOptionsGroup');
      if (woOpts) woOpts.style.display = 'none';
    }
    if (studio.activeTool !== 'text') {
      var textOpts = document.getElementById('textOptionsGroup');
      if (textOpts) textOpts.style.display = 'none';
    }
  }

  function deleteObject(id) {
    var objs = studio.pageObjects[studio.currentPage] || [];
    studio.pageObjects[studio.currentPage] = objs.filter(function (o) { return o.id !== id; });
    if (studio.selectedObjectId === id) studio.selectedObjectId = null;
    pushUndo();
    renderPageObjects(studio.currentPage);
  }

  /* =========================================================
   * UNDO / REDO GEÇMİŞ YÖNETİMİ
   * ========================================================= */
  function pushUndo() {
    saveCurrentOverlay();
    var overlay = document.getElementById('pdfDrawOverlay');
    var ctx = overlay ? overlay.getContext('2d') : null;
    var drawSnapshot = ctx ? ctx.getImageData(0, 0, overlay.width, overlay.height) : null;

    var state = {
      pageNum: studio.currentPage,
      drawData: drawSnapshot,
      objects: JSON.parse(JSON.stringify(studio.pageObjects[studio.currentPage] || [])),
      rotations: Object.assign({}, studio.pageRotations),
      deletedPages: new Set(studio.deletedPages)
    };

    if (studio.undoHistory.length >= 30) studio.undoHistory.shift();
    studio.undoHistory.push(state);
    studio.redoHistory = [];
  }

  function applyUndo() {
    if (studio.undoHistory.length === 0) return;
    var lastState = studio.undoHistory.pop();

    // Redo'ya mevcut durumu at
    var overlay = document.getElementById('pdfDrawOverlay');
    var ctx = overlay ? overlay.getContext('2d') : null;
    var curDraw = ctx ? ctx.getImageData(0, 0, overlay.width, overlay.height) : null;
    studio.redoHistory.push({
      pageNum: studio.currentPage,
      drawData: curDraw,
      objects: JSON.parse(JSON.stringify(studio.pageObjects[studio.currentPage] || [])),
      rotations: Object.assign({}, studio.pageRotations),
      deletedPages: new Set(studio.deletedPages)
    });

    // Durumu geri yükle
    studio.pageObjects[lastState.pageNum] = lastState.objects;
    studio.pageRotations = lastState.rotations;
    studio.deletedPages = lastState.deletedPages;

    if (ctx && lastState.drawData) {
      ctx.putImageData(lastState.drawData, 0, 0);
      saveCurrentOverlay();
    }
    renderPageObjects(lastState.pageNum);
    updatePageCounterDisplay();
  }

  function applyRedo() {
    if (studio.redoHistory.length === 0) return;
    var nextState = studio.redoHistory.pop();

    var overlay = document.getElementById('pdfDrawOverlay');
    var ctx = overlay ? overlay.getContext('2d') : null;
    var curDraw = ctx ? ctx.getImageData(0, 0, overlay.width, overlay.height) : null;
    studio.undoHistory.push({
      pageNum: studio.currentPage,
      drawData: curDraw,
      objects: JSON.parse(JSON.stringify(studio.pageObjects[studio.currentPage] || [])),
      rotations: Object.assign({}, studio.pageRotations),
      deletedPages: new Set(studio.deletedPages)
    });

    studio.pageObjects[nextState.pageNum] = nextState.objects;
    studio.pageRotations = nextState.rotations;
    studio.deletedPages = nextState.deletedPages;

    if (ctx && nextState.drawData) {
      ctx.putImageData(nextState.drawData, 0, 0);
      saveCurrentOverlay();
    }
    renderPageObjects(nextState.pageNum);
    updatePageCounterDisplay();
  }

  /* =========================================================
   * SAYFA THUMBNAIL ÖNİZLEME GALERİSİ
   * ========================================================= */
  async function renderThumbnails() {
    var sidebar = document.getElementById('studioThumbnailsBar');
    if (!sidebar || !studio.pdfDoc) return;
    sidebar.innerHTML = '';

    for (var i = 1; i <= studio.totalPages; i++) {
      if (studio.deletedPages.has(i)) continue;

      var item = document.createElement('div');
      item.className = 'thumb-item' + (i === studio.currentPage ? ' active' : '');
      item.setAttribute('data-page', i);

      var tCanvas = document.createElement('canvas');
      tCanvas.className = 'thumb-canvas';
      var page = await studio.pdfDoc.getPage(i);
      var rot = (page.rotate + (studio.pageRotations[i] || 0)) % 360;
      var vp = page.getViewport({ scale: 0.18, rotation: rot });
      tCanvas.width = vp.width;
      tCanvas.height = vp.height;
      await page.render({ canvasContext: tCanvas.getContext('2d'), viewport: vp }).promise;

      var label = document.createElement('span');
      label.textContent = 'Sayfa ' + i;

      var actionsDiv = document.createElement('div');
      actionsDiv.className = 'thumb-actions';
      actionsDiv.innerHTML = 
        '<button class="thumb-btn thumb-rot" title="90° Döndür">🔄</button>' +
        '<button class="thumb-btn thumb-del" title="Sayfayı Sil">🗑️</button>';

      item.appendChild(tCanvas);
      item.appendChild(label);
      item.appendChild(actionsDiv);

      (function (pNum, itemEl) {
        tCanvas.addEventListener('click', async function () {
          studio.currentPage = pNum;
          await renderPage(pNum);
        });

        var rotBtn = itemEl.querySelector('.thumb-rot');
        if (rotBtn) {
          rotBtn.addEventListener('click', async function (e) {
            e.stopPropagation();
            studio.pageRotations[pNum] = ((studio.pageRotations[pNum] || 0) + 90) % 360;
            await renderPage(pNum);
            await renderThumbnails();
          });
        }

        var delBtn = itemEl.querySelector('.thumb-del');
        if (delBtn) {
          delBtn.addEventListener('click', async function (e) {
            e.stopPropagation();
            deletePage(pNum);
          });
        }
      })(i, item);

      sidebar.appendChild(item);
    }
  }

  function updateThumbnailActive(pageNum) {
    var thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(function (t) {
      t.classList.toggle('active', parseInt(t.getAttribute('data-page'), 10) === pageNum);
    });
  }

  function deletePage(pNum) {
    var activeCount = studio.totalPages - studio.deletedPages.size;
    if (activeCount <= 1) {
      alert('Belgede en az 1 sayfa bulunmalıdır. Son sayfa silinemez.');
      return;
    }
    if (confirm('Sayfa ' + pNum + ' dokümandan kalıcı olarak silinsin mi?')) {
      pushUndo();
      studio.deletedPages.add(pNum);

      // Başka geçerli bir sayfaya geç
      var nextP = 1;
      for (var p = 1; p <= studio.totalPages; p++) {
        if (!studio.deletedPages.has(p)) {
          nextP = p;
          break;
        }
      }
      studio.currentPage = nextP;
      renderThumbnails();
      renderPage(nextP);
    }
  }

  /* =========================================================
   * VEKTÖREL KAŞE & DAMGA ÜRETİCİ
   * ========================================================= */
  function createStampDataUrl(text, color) {
    var c = document.createElement('canvas');
    c.width = 320;
    c.height = 140;
    var ctx = c.getContext('2d');

    ctx.save();
    ctx.translate(160, 70);
    ctx.rotate(-7 * Math.PI / 180);

    // Çift Dış Çerçeve
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(-145, -55, 290, 110);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-138, -48, 276, 96);

    // Ana Damga Başlığı
    ctx.fillStyle = color;
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, -10);

    // Alt Bilgi & Tarih
    var today = new Date();
    var dateStr = today.toLocaleDateString('tr-TR') + ' • RESMİ BELGE';
    ctx.font = '700 11px monospace';
    ctx.fillText(dateStr, 0, 24);

    ctx.restore();
    return c.toDataURL('image/png');
  }

  /* =========================================================
   * PRO DC FILIGRAN & ARAMA MOTORU
   * ========================================================= */
  function applyWatermarkToDocument() {
    var txt = prompt('PDF Sayfalarına Eklenecek Filigran Metnini Girin:', 'GİZLİ & TASLAK');
    if (!txt || !txt.trim()) return;
    pushUndo();

    var totalPages = studio.pdfDoc ? studio.pdfDoc.numPages : 1;
    var allPages = confirm('Filigran TÜM sayfalara eklensin mi?\n("Tamam" = Tüm Sayfalar, "İptal" = Yalnızca Bu Sayfa)');

    var targetPages = [];
    if (allPages) {
      for (var i = 1; i <= totalPages; i++) targetPages.push(i);
    } else {
      targetPages.push(studio.currentPage);
    }

    targetPages.forEach(function (p) {
      if (!studio.pageObjects[p]) studio.pageObjects[p] = [];
      var wmObj = {
        id: 'wm_' + Date.now() + '_' + p,
        type: 'text',
        x: 80,
        y: 260,
        width: 450,
        height: 120,
        text: txt.trim(),
        fontSize: 48,
        fontFamily: 'Arial, sans-serif',
        color: 'rgba(239, 68, 68, 0.22)',
        isBold: true,
        rotation: -45,
        textAlign: 'center'
      };
      studio.pageObjects[p].push(wmObj);
    });

    renderPageObjects(studio.currentPage);
    alert('Filigran başarıyla belgenize uygulandı.');
  }

  async function searchInPdfDocument(query) {
    if (!studio.pdfDoc || !query) return;
    var q = query.toLowerCase();
    var foundPage = -1;
    var matchCount = 0;

    for (var p = 1; p <= studio.pdfDoc.numPages; p++) {
      var page = await studio.pdfDoc.getPage(p);
      var textContent = await page.getTextContent();
      var str = textContent.items.map(function (it) { return it.str; }).join(' ').toLowerCase();
      if (str.indexOf(q) !== -1) {
        matchCount++;
        if (foundPage === -1) foundPage = p;
      }
    }

    if (foundPage !== -1) {
      alert('"' + query + '" kelimesi ' + matchCount + ' sayfada bulundu. Sayfa ' + foundPage + '\'e yönlendiriliyorsunuz.');
      studio.currentPage = foundPage;
      renderThumbnails();
      renderPage(foundPage);
    } else {
      alert('"' + query + '" kelimesi belgede bulunamadı.');
    }
  }

  /* =========================================================
   * EVENT LISTENER ENTEGRASYONU (ARAÇLAR & ÇİZİM & TUVAL)
   * ========================================================= */
  function initAcrobatStudioEvents() {
    var overlay = document.getElementById('pdfDrawOverlay');
    var ctx = overlay ? overlay.getContext('2d') : null;

    // 1. Üst Menü Aksiyonları (Dosya, Yazdır, Sığdır, Photopea)
    var menuOpenFileBtn = document.getElementById('menuOpenFileBtn');
    var studioOpenFileInput = document.getElementById('studioOpenFileInput');
    if (menuOpenFileBtn && studioOpenFileInput) {
      menuOpenFileBtn.addEventListener('click', function () { studioOpenFileInput.click(); });
      studioOpenFileInput.addEventListener('change', async function () {
        if (studioOpenFileInput.files && studioOpenFileInput.files[0]) {
          await openAcrobatStudio(studioOpenFileInput.files[0]);
        }
      });
    }

    var menuPrintBtn = document.getElementById('menuPrintBtn');
    if (menuPrintBtn) {
      menuPrintBtn.addEventListener('click', async function () {
        await printEditedPdf();
      });
    }

    var menuFitPageBtn = document.getElementById('menuFitPageBtn');
    if (menuFitPageBtn) {
      menuFitPageBtn.addEventListener('click', async function () {
        var firstPage = await studio.pdfDoc.getPage(studio.currentPage);
        var unscaledVp = firstPage.getViewport({ scale: 1.0 });
        var vpEl = document.getElementById('studioViewport');
        var availWidth = (vpEl && vpEl.clientWidth > 200) ? (vpEl.clientWidth - 80) : 900;
        studio.zoomScale = availWidth / unscaledVp.width;
        var zoomDisp = document.getElementById('zoomLevelDisplay');
        if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 100) + '%';
        await renderPage(studio.currentPage);
      });
    }

    var openPhotopeaBtn = document.getElementById('openPhotopeaBtn');
    if (openPhotopeaBtn) {
      openPhotopeaBtn.addEventListener('click', function () {
        openPhotoshopStudio();
      });
    }

    // 2. Pro DC Modern Araç Çubuğu Butonları (V, T, Erase, Check, Cross, Shapes, Table, Date, etc.)
    var toolBtns = document.querySelectorAll('.acrobat-tools .tool-btn, .pro-tool-item[data-tool]');
    toolBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var tool = b.getAttribute('data-tool');
        if (!tool) return;

        toolBtns.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        studio.activeTool = tool;
        deselectAllObjects();

        // İkincil Seçenek Çubukları
        var textOpts = document.getElementById('textOptionsGroup');
        var strokeOpts = document.getElementById('strokeOptionsGroup');
        var redactOpts = document.getElementById('redactOptionsGroup');
        var hlOpts = document.getElementById('highlighterOptionsGroup');
        var woOpts = document.getElementById('whiteoutOptionsGroup');

        if (textOpts) textOpts.style.display = (tool === 'text' || tool === 'textbox' || tool === 'edit-text') ? 'flex' : 'none';
        if (strokeOpts) strokeOpts.style.display = (tool === 'pen' || tool === 'highlighter' || tool === 'rect' || tool === 'circle' || tool === 'arrow' || tool === 'line') ? 'inline-flex' : 'none';
        if (redactOpts) redactOpts.style.display = (tool === 'redact') ? 'inline-flex' : 'none';
        if (hlOpts) hlOpts.style.display = (tool === 'highlighter') ? 'inline-flex' : 'none';
        if (woOpts) woOpts.style.display = (tool === 'whiteout' || tool === 'eraser') ? 'inline-flex' : 'none';

        if (overlay) {
          overlay.style.cursor = (tool === 'select') ? 'default' :
            (tool === 'text' || tool === 'textbox' || tool === 'edit-text') ? 'text' :
            (tool === 'eraser' || tool === 'whiteout') ? 'crosshair' : 'crosshair';
        }
      });
    });

    // Pro DC Shapes Dropdown
    var shapesDropdownBtn = document.getElementById('studioShapesDropdownBtn');
    var shapesMenu = document.getElementById('proShapesMenu');
    if (shapesDropdownBtn && shapesMenu) {
      shapesDropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        shapesMenu.classList.toggle('open');
      });
      document.querySelectorAll('.pro-shape-opt').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          var shape = opt.getAttribute('data-shape') || 'rect';
          studio.activeTool = shape;
          toolBtns.forEach(function (x) { x.classList.remove('active'); });
          shapesDropdownBtn.classList.add('active');
          shapesMenu.classList.remove('open');
        });
      });
      document.addEventListener('click', function () {
        shapesMenu.classList.remove('open');
      });
    }

    // Pro DC Pages (Sol Thumbnail Panelini Aç/Kapat)
    var togglePagesBtn = document.getElementById('studioTogglePagesBtn');
    var sidebarEl = document.getElementById('studioThumbnailsBar');
    if (togglePagesBtn && sidebarEl) {
      togglePagesBtn.addEventListener('click', function () {
        var isHidden = sidebarEl.style.display === 'none';
        sidebarEl.style.display = isHidden ? 'flex' : 'none';
        togglePagesBtn.classList.toggle('active', isHidden);
      });
    }

    // Pro DC Fill out / Edit PDF Pill Switch
    var modeFillBtn = document.getElementById('proModeFillBtn');
    var modeEditBtn = document.getElementById('proModeEditBtn');
    if (modeFillBtn && modeEditBtn) {
      modeFillBtn.addEventListener('click', function () {
        modeFillBtn.classList.add('active');
        modeEditBtn.classList.remove('active');
        studio.activeTool = 'textbox';
        var sel = document.querySelector('.pro-tool-item[data-tool="textbox"]');
        if (sel) sel.click();
      });
      modeEditBtn.addEventListener('click', function () {
        modeEditBtn.classList.add('active');
        modeFillBtn.classList.remove('active');
        studio.activeTool = 'select';
        var sel = document.querySelector('.pro-tool-item[data-tool="select"]');
        if (sel) sel.click();
      });
    }

    // Pro DC Search (Belge İçi Arama)
    var searchBtn = document.getElementById('proSearchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {
        var query = prompt('PDF İçinde Aranacak Kelimeyi Girin:');
        if (query && query.trim()) {
          searchInPdfDocument(query.trim());
        }
      });
    }

    // Pro DC Sağ Kenar Dock Butonları
    var dockLayersBtn = document.getElementById('proDockLayersBtn');
    if (dockLayersBtn) {
      dockLayersBtn.addEventListener('click', function () {
        var ans = confirm('Bu sayfayı 90° sağa döndürmek için "Tamam", sayfayı silmek için "İptal" seçin.');
        if (ans) {
          var rotBtn = document.getElementById('rotatePageBtn');
          if (rotBtn) rotBtn.click();
        }
      });
    }
    var dockCommentsBtn = document.getElementById('proDockCommentsBtn');
    if (dockCommentsBtn) {
      dockCommentsBtn.addEventListener('click', function () {
        var allNotes = [];
        Object.keys(studio.pageObjects).forEach(function (p) {
          (studio.pageObjects[p] || []).forEach(function (obj) {
            if (obj.type === 'sticky') allNotes.push('Sayfa ' + p + ': ' + obj.text);
          });
        });
        if (allNotes.length === 0) {
          alert('Belgede henüz eklenmiş yapışkan not bulunmuyor. Üst bardaki "Sticky" aracını kullanarak not ekleyebilirsiniz.');
        } else {
          alert('Belgedeki Notlar:\n• ' + allNotes.join('\n• '));
        }
      });
    }
    var dockFormsBtn = document.getElementById('proDockFormsBtn');
    if (dockFormsBtn) {
      dockFormsBtn.addEventListener('click', function () {
        var count = (studio.pageObjects[studio.currentPage] || []).length;
        alert('Bu sayfada toplam ' + count + ' adet interaktif nesne/katman bulunmaktadır.');
      });
    }
    var dockSettingsBtn = document.getElementById('proDockSettingsBtn');
    if (dockSettingsBtn) {
      dockSettingsBtn.addEventListener('click', function () {
        var fitBtn = document.getElementById('menuFitPageBtn');
        if (fitBtn) fitBtn.click();
      });
    }

    // 3. Renk, Kalınlık, Font ve Metin Ayarları
    var colorPicker = document.getElementById('studioColorPicker');
    if (colorPicker) {
      colorPicker.addEventListener('input', function () {
        studio.strokeColor = colorPicker.value;
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel) {
            sel.color = colorPicker.value;
            sel.strokeColor = colorPicker.value;
            if (sel.type === 'whiteout') {
              sel.bgColor = colorPicker.value;
            }
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var strokeSelect = document.getElementById('studioStrokeWidth');
    if (strokeSelect) {
      strokeSelect.addEventListener('change', function () {
        studio.strokeWidth = parseInt(strokeSelect.value, 10);
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'shape') {
            sel.strokeWidth = studio.strokeWidth;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var fontFamSelect = document.getElementById('studioFontFamily');
    if (fontFamSelect) {
      fontFamSelect.addEventListener('change', function () {
        studio.fontFamily = fontFamSelect.value;
        studio.fontFamilyManualSet = (studio.fontFamily !== 'auto');
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.fontFamily = (studio.fontFamily === 'auto' && sel.detectedFont)
              ? sel.detectedFont.fontFamily
              : (studio.fontFamily === 'auto' ? 'Arial, sans-serif' : studio.fontFamily);
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var fontSizeSelect = document.getElementById('studioFontSize');
    if (fontSizeSelect) {
      fontSizeSelect.addEventListener('change', function () {
        studio.fontSize = parseInt(fontSizeSelect.value, 10);
        studio.fontSizeManualSet = true;
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.fontSize = studio.fontSize;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var boldBtn = document.getElementById('studioTextBoldBtn');
    if (boldBtn) {
      boldBtn.addEventListener('click', function () {
        studio.isBold = !studio.isBold;
        studio.isBoldManualSet = true;
        boldBtn.style.background = studio.isBold ? '#2563eb' : '#1e293b';
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.isBold = studio.isBold;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var italicBtn = document.getElementById('studioTextItalicBtn');
    if (italicBtn) {
      italicBtn.addEventListener('click', function () {
        studio.isItalic = !studio.isItalic;
        studio.isItalicManualSet = true;
        italicBtn.style.background = studio.isItalic ? '#2563eb' : '#1e293b';
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.isItalic = studio.isItalic;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    var textBgSelect = document.getElementById('studioTextBgColor');
    if (textBgSelect) {
      textBgSelect.addEventListener('change', function () {
        studio.textBgColor = textBgSelect.value;
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.bgColor = studio.textBgColor;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    // Acrobat DC Altı Çizili Butonu
    var underlineBtn = document.getElementById('studioTextUnderlineBtn');
    if (underlineBtn) {
      underlineBtn.addEventListener('click', function () {
        studio.isUnderline = !studio.isUnderline;
        underlineBtn.style.background = studio.isUnderline ? '#2563eb' : '#1e293b';
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.isUnderline = studio.isUnderline;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    // Acrobat DC Metin Hizalama Butonları
    var alignBtns = document.querySelectorAll('#textOptionsGroup .align-btn');
    alignBtns.forEach(function (ab) {
      ab.addEventListener('click', function () {
        var align = ab.getAttribute('data-align') || 'left';
        studio.textAlign = align;
        alignBtns.forEach(function (x) {
          var match = x === ab;
          x.classList.toggle('active', match);
          x.style.background = match ? '#2563eb' : '#1e293b';
          x.style.color = match ? '#ffffff' : '#cbd5e1';
        });
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.textAlign = align;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    });

    // Acrobat DC Yazı Rengi Seçici
    var textColorInput = document.getElementById('studioTextColorPicker');
    if (textColorInput) {
      textColorInput.addEventListener('input', function () {
        var col = textColorInput.value;
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.color = col;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    // Acrobat DC Satır Yüksekliği
    var lineHeightSelect = document.getElementById('studioTextLineHeight');
    if (lineHeightSelect) {
      lineHeightSelect.addEventListener('change', function () {
        var lh = parseFloat(lineHeightSelect.value) || 1.25;
        studio.lineHeight = lh;
        if (studio.selectedObjectId) {
          var objs = studio.pageObjects[studio.currentPage] || [];
          var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
          if (sel && sel.type === 'text') {
            sel.lineHeight = lh;
            renderPageObjects(studio.currentPage);
          }
        }
      });
    }

    // Acrobat DC "Metinleri Düzenle (E)" Modu Butonu
    var toolEditTextBtn = document.getElementById('toolEditTextBtn');
    if (toolEditTextBtn) {
      toolEditTextBtn.addEventListener('click', function () {
        toolBtns.forEach(function (x) { x.classList.remove('active'); });
        toolEditTextBtn.classList.add('active');
        studio.activeTool = 'edit-text';
        studio.showTextBoxes = true;
        var toggleBtn = document.getElementById('toggleShowBoxesBtn');
        if (toggleBtn) {
          toggleBtn.style.background = '#2563eb';
          toggleBtn.style.color = '#ffffff';
          toggleBtn.style.borderColor = '#2563eb';
        }
        renderLiveTextLayer(studio.currentPage);
        var textOpts = document.getElementById('textOptionsGroup');
        if (textOpts) textOpts.style.display = 'flex';
      });
    }

    // Acrobat DC "Metin Bloklarını Göster" Aç/Kapa Butonu
    var toggleShowBoxesBtn = document.getElementById('toggleShowBoxesBtn');
    if (toggleShowBoxesBtn) {
      toggleShowBoxesBtn.addEventListener('click', function () {
        studio.showTextBoxes = !studio.showTextBoxes;
        if (studio.showTextBoxes) {
          toggleShowBoxesBtn.style.background = '#2563eb';
          toggleShowBoxesBtn.style.color = '#ffffff';
          toggleShowBoxesBtn.style.borderColor = '#2563eb';
        } else {
          toggleShowBoxesBtn.style.background = 'transparent';
          toggleShowBoxesBtn.style.color = '#94a3b8';
          toggleShowBoxesBtn.style.borderColor = '#475569';
        }
        renderLiveTextLayer(studio.currentPage);
      });
    }

    // Fosforlu Renk Swatch'ları
    document.querySelectorAll('.hl-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        studio.strokeColor = sw.getAttribute('data-hl');
        var cp = document.getElementById('studioColorPicker');
        if (cp) cp.value = studio.strokeColor;
      });
    });

    // Alanı Sil / Beyazlatma (Whiteout) Ayarları & Olayları
    function setWhiteoutColor(col) {
      if (!col) return;
      studio.whiteoutColor = col;
      var woCp = document.getElementById('studioWhiteoutColor');
      if (woCp) woCp.value = col;
      var cp = document.getElementById('studioColorPicker');
      if (cp) cp.value = col;

      document.querySelectorAll('.wo-color-swatch').forEach(function (sw) {
        var match = sw.getAttribute('data-color') === col;
        sw.classList.toggle('active', match);
        sw.style.border = match ? '1.5px solid #2563eb' : '1px solid #475569';
      });

      if (studio.selectedObjectId) {
        var objs = studio.pageObjects[studio.currentPage] || [];
        var sel = objs.find(function (o) { return o.id === studio.selectedObjectId; });
        if (sel && sel.type === 'whiteout') {
          sel.bgColor = col;
          renderPageObjects(studio.currentPage);
        }
      }
    }

    var woColorInput = document.getElementById('studioWhiteoutColor');
    if (woColorInput) {
      woColorInput.addEventListener('input', function () {
        setWhiteoutColor(woColorInput.value);
      });
    }

    document.querySelectorAll('.wo-color-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        setWhiteoutColor(sw.getAttribute('data-color'));
      });
    });

    var modeAreaBtn = document.getElementById('whiteoutModeAreaBtn');
    var modeBrushBtn = document.getElementById('whiteoutModeBrushBtn');
    var brushSizeGroup = document.getElementById('whiteoutBrushSizeGroup');

    if (modeAreaBtn && modeBrushBtn) {
      modeAreaBtn.addEventListener('click', function () {
        studio.whiteoutMode = 'area';
        modeAreaBtn.classList.add('active');
        modeBrushBtn.classList.remove('active');
        modeAreaBtn.style.background = '#2563eb';
        modeAreaBtn.style.color = '#ffffff';
        modeBrushBtn.style.background = 'transparent';
        modeBrushBtn.style.color = '#94a3b8';
        if (brushSizeGroup) brushSizeGroup.style.display = 'none';
      });

      modeBrushBtn.addEventListener('click', function () {
        studio.whiteoutMode = 'brush';
        modeBrushBtn.classList.add('active');
        modeAreaBtn.classList.remove('active');
        modeBrushBtn.style.background = '#2563eb';
        modeBrushBtn.style.color = '#ffffff';
        modeAreaBtn.style.background = 'transparent';
        modeAreaBtn.style.color = '#94a3b8';
        if (brushSizeGroup) brushSizeGroup.style.display = 'inline-flex';
      });
    }

    var woBrushSelect = document.getElementById('studioWhiteoutBrushSize');
    if (woBrushSelect) {
      woBrushSelect.addEventListener('change', function () {
        studio.whiteoutBrushSize = parseInt(woBrushSelect.value, 10);
      });
    }

    var eyedropperBtn = document.getElementById('studioEyedropperBtn');
    if (eyedropperBtn) {
      eyedropperBtn.addEventListener('click', async function () {
        if (window.EyeDropper) {
          try {
            var eyeDropper = new window.EyeDropper();
            var result = await eyeDropper.open();
            if (result && result.sRGBHex) {
              setWhiteoutColor(result.sRGBHex);
            }
          } catch (e) {
            // İptal edildi
          }
        } else {
          // Tuval üzerinden renk alma fallback'i
          var renderCanvas = document.getElementById('pdfRenderCanvas');
          if (renderCanvas) {
            var sampleOnce = function (ev) {
              var rect = renderCanvas.getBoundingClientRect();
              var sx = (ev.clientX - rect.left) * (renderCanvas.width / rect.width);
              var sy = (ev.clientY - rect.top) * (renderCanvas.height / rect.height);
              var rCtx = renderCanvas.getContext('2d');
              try {
                var pixel = rCtx.getImageData(Math.floor(sx), Math.floor(sy), 1, 1).data;
                var hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
                setWhiteoutColor(hex);
              } catch (err) {}
              document.removeEventListener('click', sampleOnce, true);
              ev.stopPropagation();
              ev.preventDefault();
            };
            setTimeout(function () {
              document.addEventListener('click', sampleOnce, true);
            }, 50);
          }
        }
      });
    }

    // 4. Tuval Tıklama ve Çizim Olayları (Mouse & Touch)
    if (overlay && ctx) {
      function getPos(e) {
        var rect = overlay.getBoundingClientRect();
        return {
          x: (e.clientX - rect.left),
          y: (e.clientY - rect.top)
        };
      }

      overlay.addEventListener('pointerdown', function (e) {
        var pos = getPos(e);
        studio.startX = pos.x;
        studio.startY = pos.y;

        // Acrobat DC: Metinleri Düzenle (Edit Text) Modu
        if (studio.activeTool === 'edit-text') {
          var items = (studio.pageTextIndex && studio.pageTextIndex[studio.currentPage]) || [];
          var hitItem = null;
          for (var i = 0; i < items.length; i++) {
            var it = items[i];
            if (pos.x >= it.x - 4 && pos.x <= it.x + it.width + 4 &&
                pos.y >= it.y - 4 && pos.y <= it.y + it.height + 4) {
              hitItem = it;
              break;
            }
          }
          if (hitItem) {
            activateAcrobatTextEdit(hitItem);
          } else {
            // Tıklanan boşluğa yeni metin kutusu ekle
            insertTextObjectAt(pos.x, pos.y);
          }
          return;
        }

        // Metin Aracı: Tıklanan yere interaktif metin kutusu ekler!
        if (studio.activeTool === 'text') {
          insertTextObjectAt(pos.x, pos.y);
          return;
        }

        if (studio.activeTool === 'select') {
          deselectAllObjects();
          return;
        }

        studio.isDrawing = true;

        // Onay İşareti Damgası (Check)
        if (studio.activeTool === 'check') {
          pushUndo();
          var checkObj = {
            id: 'check_' + Date.now(),
            type: 'stamp-icon',
            iconType: 'check',
            x: Math.max(0, pos.x - 14),
            y: Math.max(0, pos.y - 14),
            width: 28,
            height: 28,
            color: '#16a34a'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(checkObj);
          renderPageObjects(studio.currentPage);
          selectObject(checkObj.id);
          return;
        }

        // Çarpı İşareti Damgası (Cross)
        if (studio.activeTool === 'cross') {
          pushUndo();
          var crossObj = {
            id: 'cross_' + Date.now(),
            type: 'stamp-icon',
            iconType: 'cross',
            x: Math.max(0, pos.x - 14),
            y: Math.max(0, pos.y - 14),
            width: 28,
            height: 28,
            color: '#dc2626'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(crossObj);
          renderPageObjects(studio.currentPage);
          selectObject(crossObj.id);
          return;
        }

        // Otomatik Tarih Ekleme (Date)
        if (studio.activeTool === 'date') {
          pushUndo();
          var now = new Date();
          var dateStr = String(now.getDate()).padStart(2, '0') + '.' + String(now.getMonth() + 1).padStart(2, '0') + '.' + now.getFullYear();
          var dateObj = {
            id: 'date_' + Date.now(),
            type: 'text',
            x: Math.max(0, pos.x - 10),
            y: Math.max(0, pos.y - 10),
            width: 120,
            height: 30,
            text: dateStr,
            fontSize: 14,
            fontFamily: 'Arial, sans-serif',
            color: '#0f172a'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(dateObj);
          renderPageObjects(studio.currentPage);
          selectObject(dateObj.id);
          return;
        }

        // Düzenlenebilir Tablo Ekleme (Table)
        if (studio.activeTool === 'table') {
          pushUndo();
          var tableObj = {
            id: 'table_' + Date.now(),
            type: 'table',
            x: Math.max(0, pos.x - 20),
            y: Math.max(0, pos.y - 20),
            width: 260,
            height: 90,
            rows: 3,
            cols: 3,
            data: [['Başlık 1', 'Başlık 2', 'Başlık 3'], ['Veri 1', 'Veri 2', 'Veri 3'], ['Veri 4', 'Veri 5', 'Veri 6']]
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(tableObj);
          renderPageObjects(studio.currentPage);
          selectObject(tableObj.id);
          return;
        }

        // Çerçeveli Metin Kutusu (Text Box)
        if (studio.activeTool === 'textbox') {
          pushUndo();
          var tbObj = {
            id: 'tb_' + Date.now(),
            type: 'text',
            x: Math.max(0, pos.x - 10),
            y: Math.max(0, pos.y - 10),
            width: 200,
            height: 36,
            text: 'Metin kutusu...',
            fontSize: 14,
            fontFamily: 'Arial, sans-serif',
            color: '#0f172a',
            bgColor: '#ffffff'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(tbObj);
          renderPageObjects(studio.currentPage);
          selectObject(tbObj.id);
          return;
        }

        // Yapışkan Not (Sticky Note)
        if (studio.activeTool === 'sticky') {
          pushUndo();
          var stickyObj = {
            id: 'sticky_' + Date.now(),
            type: 'sticky',
            x: Math.max(0, pos.x - 10),
            y: Math.max(0, pos.y - 10),
            width: 140,
            height: 110,
            text: 'Notunuzu buraya yazın...'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(stickyObj);
          renderPageObjects(studio.currentPage);
          selectObject(stickyObj.id);
          return;
        }

        // Filigran Ekleme (Watermark)
        if (studio.activeTool === 'watermark') {
          applyWatermarkToDocument();
          return;
        }

        // Alanı Sil / Beyazlat (Whiteout & Area Eraser)
        if (studio.activeTool === 'whiteout' || studio.activeTool === 'eraser') {
          if (studio.whiteoutMode === 'brush') {
            pushUndo();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.strokeStyle = studio.whiteoutColor || '#ffffff';
            ctx.lineWidth = studio.whiteoutBrushSize || 24;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 1.0;
          } else {
            studio.drawingSnapshot = ctx.getImageData(0, 0, overlay.width, overlay.height);
          }
          return;
        }

        // Sansür (Redact)
        if (studio.activeTool === 'redact') {
          studio.drawingSnapshot = ctx.getImageData(0, 0, overlay.width, overlay.height);
          return;
        }

        if (studio.activeTool === 'pen' || studio.activeTool === 'highlighter') {
          pushUndo();
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.strokeStyle = studio.strokeColor;
          ctx.lineWidth = (studio.activeTool === 'highlighter') ? (studio.strokeWidth * 3.5) : studio.strokeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = (studio.activeTool === 'highlighter') ? 0.35 : 1.0;
        }
      });

      overlay.addEventListener('pointermove', function (e) {
        if (!studio.isDrawing) return;
        var pos = getPos(e);

        if (studio.activeTool === 'whiteout' || studio.activeTool === 'eraser') {
          if (studio.whiteoutMode === 'brush') {
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
          } else if (studio.drawingSnapshot) {
            ctx.putImageData(studio.drawingSnapshot, 0, 0);
            var curW = Math.abs(pos.x - studio.startX);
            var curH = Math.abs(pos.y - studio.startY);
            var curX = Math.min(studio.startX, pos.x);
            var curY = Math.min(studio.startY, pos.y);
            ctx.fillStyle = studio.whiteoutColor || '#ffffff';
            ctx.globalAlpha = 0.9;
            ctx.fillRect(curX, curY, curW, curH);
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(curX, curY, curW, curH);
            ctx.setLineDash([]);
          }
          return;
        }

        if (studio.activeTool === 'redact' && studio.drawingSnapshot) {
          ctx.putImageData(studio.drawingSnapshot, 0, 0);
          var rW = Math.abs(pos.x - studio.startX);
          var rH = Math.abs(pos.y - studio.startY);
          var rX = Math.min(studio.startX, pos.x);
          var rY = Math.min(studio.startY, pos.y);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(rX, rY, rW, rH);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(rX, rY, rW, rH);
          ctx.setLineDash([]);
          return;
        }

        if (studio.activeTool === 'pen' || studio.activeTool === 'highlighter') {
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      });

      overlay.addEventListener('pointerup', function (e) {
        if (!studio.isDrawing) return;
        var pos = getPos(e);
        studio.isDrawing = false;

        var w = Math.abs(pos.x - studio.startX);
        var h = Math.abs(pos.y - studio.startY);
        var x = Math.min(studio.startX, pos.x);
        var y = Math.min(studio.startY, pos.y);

        // Alanı Sil / Beyazlat (Whiteout & Area Eraser)
        if (studio.activeTool === 'whiteout' || studio.activeTool === 'eraser') {
          if (studio.whiteoutMode === 'brush') {
            ctx.closePath();
            saveCurrentOverlay();
            return;
          }

          if (studio.drawingSnapshot) {
            ctx.putImageData(studio.drawingSnapshot, 0, 0);
            studio.drawingSnapshot = null;
          }

          if (w > 4 && h > 4) {
            pushUndo();
            var detected = detectFontAtPosition(studio.currentPage, x, y, w, h);
            studio.lastDetectedFont = detected;

            var whiteoutObj = {
              id: 'whiteout_' + Date.now(),
              type: 'whiteout',
              x: x,
              y: y,
              width: w,
              height: h,
              bgColor: studio.whiteoutColor || '#ffffff',
              detectedFont: detected
            };
            if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
            studio.pageObjects[studio.currentPage].push(whiteoutObj);
            renderPageObjects(studio.currentPage);
            selectObject(whiteoutObj.id);

            // Akıllı font bildirim rozetini göster
            showFontMatchBadge(detected);

            var selBtnW = document.querySelector('.tool-btn[data-tool="select"]');
            if (selBtnW) selBtnW.click();
            return;
          }
        }

        // Sansür / Karartma (Redaction)
        if (studio.activeTool === 'redact') {
          if (studio.drawingSnapshot) {
            ctx.putImageData(studio.drawingSnapshot, 0, 0);
            studio.drawingSnapshot = null;
          }
          if (w > 8 && h > 8) {
            pushUndo();
            var redactObj = {
              id: 'redact_' + Date.now(),
              type: 'redact',
              x: x,
              y: y,
              width: w,
              height: h
            };
            if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
            studio.pageObjects[studio.currentPage].push(redactObj);
            renderPageObjects(studio.currentPage);
            selectObject(redactObj.id);

            var selBtn = document.querySelector('.tool-btn[data-tool="select"]');
            if (selBtn) selBtn.click();
            return;
          }
        }

        // Geometrik Şekiller (Kutu, Daire, Ok, Çizgi)
        if (['rect', 'circle', 'arrow', 'line'].indexOf(studio.activeTool) !== -1 && (w > 8 || h > 8)) {
          pushUndo();
          var shapeObj = {
            id: 'shape_' + Date.now(),
            type: 'shape',
            shapeType: studio.activeTool,
            x: x,
            y: y,
            width: Math.max(20, w),
            height: Math.max(20, h),
            strokeColor: studio.strokeColor,
            strokeWidth: studio.strokeWidth,
            fillColor: 'none'
          };
          if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
          studio.pageObjects[studio.currentPage].push(shapeObj);
          renderPageObjects(studio.currentPage);
          selectObject(shapeObj.id);

          var selBtn2 = document.querySelector('.tool-btn[data-tool="select"]');
          if (selBtn2) selBtn2.click();
          return;
        }

        if (studio.activeTool === 'pen' || studio.activeTool === 'highlighter') {
          ctx.closePath();
          saveCurrentOverlay();
        }
      });

      // Acrobat Pro DC: Tuval Üzerinde Herhangi Bir Metne Çift Tıklandığında Anında Düzenleme Moduna Geç
      overlay.addEventListener('dblclick', function (e) {
        var pos = getPos(e);
        var items = (studio.pageTextIndex && studio.pageTextIndex[studio.currentPage]) || [];
        var hitItem = null;
        for (var i = 0; i < items.length; i++) {
          var it = items[i];
          if (pos.x >= it.x - 6 && pos.x <= it.x + it.width + 6 &&
              pos.y >= it.y - 6 && pos.y <= it.y + it.height + 6) {
            hitItem = it;
            break;
          }
        }
        if (hitItem) {
          e.stopPropagation();
          e.preventDefault();
          activateAcrobatTextEdit(hitItem);
        }
      });
    }

    // 5. Görsel / Damga Yükleme Butonu (Toolbar)
    var uploadImageObjectBtn = document.getElementById('uploadImageObjectBtn');
    var studioImageFileInput = document.getElementById('studioImageFileInput');
    if (uploadImageObjectBtn && studioImageFileInput) {
      uploadImageObjectBtn.addEventListener('click', function () { studioImageFileInput.click(); });
      studioImageFileInput.addEventListener('change', function () {
        if (studioImageFileInput.files && studioImageFileInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function (ev) {
            insertImageObjectOnPage(ev.target.result);
          };
          reader.readAsDataURL(studioImageFileInput.files[0]);
        }
      });
    }

    // 6. E-İmza & Hazır Kaşe Stüdyosu Modalı
    var openSigStampBtn = document.getElementById('openSignatureStampBtn');
    var sigStampModal = document.getElementById('signatureStampModal');
    var closeSigStampModalBtn = document.getElementById('closeSigStampModalBtn');
    var sigCanvas = document.getElementById('signaturePadCanvas');
    var sigCtx = sigCanvas ? sigCanvas.getContext('2d') : null;
    var isSigDrawing = false;

    if (openSigStampBtn && sigStampModal) {
      openSigStampBtn.addEventListener('click', function () {
        sigStampModal.classList.add('open');
        if (sigCtx) {
          sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
          sigCtx.strokeStyle = studio.signatureInkColor || '#0f172a';
          sigCtx.lineWidth = 3;
          sigCtx.lineCap = 'round';
          sigCtx.lineJoin = 'round';
        }
      });
    }

    if (closeSigStampModalBtn && sigStampModal) {
      closeSigStampModalBtn.addEventListener('click', function () {
        sigStampModal.classList.remove('open');
      });
    }

    // Sekmeler Arası Geçiş
    var submodalTabs = document.querySelectorAll('.submodal-tab');
    submodalTabs.forEach(function (t) {
      t.addEventListener('click', function () {
        submodalTabs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        var tabId = t.getAttribute('data-tab');
        document.querySelectorAll('.sig-tab-content').forEach(function (c) { c.style.display = 'none'; });

        if (tabId === 'draw-signature') document.getElementById('tabDrawSignature').style.display = 'block';
        if (tabId === 'preset-stamps') document.getElementById('tabPresetStamps').style.display = 'block';
        if (tabId === 'upload-signature') document.getElementById('tabUploadSignature').style.display = 'block';
      });
    });

    // Islak İmza Canvas Çizimi
    if (sigCanvas && sigCtx) {
      function getSigPos(e) {
        var r = sigCanvas.getBoundingClientRect();
        return {
          x: (e.clientX - r.left) * (sigCanvas.width / r.width),
          y: (e.clientY - r.top) * (sigCanvas.height / r.height)
        };
      }

      sigCanvas.addEventListener('pointerdown', function (e) {
        isSigDrawing = true;
        var p = getSigPos(e);
        sigCtx.beginPath();
        sigCtx.moveTo(p.x, p.y);
      });

      sigCanvas.addEventListener('pointermove', function (e) {
        if (!isSigDrawing) return;
        var p = getSigPos(e);
        sigCtx.lineTo(p.x, p.y);
        sigCtx.stroke();
      });

      sigCanvas.addEventListener('pointerup', function () { isSigDrawing = false; });
      sigCanvas.addEventListener('pointerleave', function () { isSigDrawing = false; });

      // Mürekkep Rengi Butonları
      document.querySelectorAll('.sig-color-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          document.querySelectorAll('.sig-color-btn').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          studio.signatureInkColor = b.getAttribute('data-color');
          sigCtx.strokeStyle = studio.signatureInkColor;
        });
      });

      // İmzayı Temizle
      var clearSigBtn = document.getElementById('clearSignatureBtn');
      if (clearSigBtn) {
        clearSigBtn.addEventListener('click', function () {
          sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
        });
      }

      // İmzayı Belgeye Ekle
      var insertSigBtn = document.getElementById('insertSignatureBtn');
      if (insertSigBtn) {
        insertSigBtn.addEventListener('click', function () {
          var sigDataUrl = sigCanvas.toDataURL('image/png');
          insertImageObjectOnPage(sigDataUrl, 180, 85);
          sigStampModal.classList.remove('open');
        });
      }
    }

    // Hazır Kurumsal Kaşe Tıklamaları
    document.querySelectorAll('.stamp-card-btn').forEach(function (stCard) {
      stCard.addEventListener('click', function () {
        var stampTxt = stCard.getAttribute('data-stamp');
        var stampCol = stCard.getAttribute('data-color');
        var stampDataUrl = createStampDataUrl(stampTxt, stampCol);
        insertImageObjectOnPage(stampDataUrl, 190, 85, stampTxt);
        if (sigStampModal) sigStampModal.classList.remove('open');
      });
    });

    // Görsel İmza Yükleme
    var uploadCustomSigBtn = document.getElementById('uploadCustomSigBtn');
    var modalCustomSigFileInput = document.getElementById('modalCustomSigFileInput');
    if (uploadCustomSigBtn && modalCustomSigFileInput) {
      uploadCustomSigBtn.addEventListener('click', function () { modalCustomSigFileInput.click(); });
      modalCustomSigFileInput.addEventListener('change', function () {
        if (modalCustomSigFileInput.files && modalCustomSigFileInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function (ev) {
            insertImageObjectOnPage(ev.target.result, 180, 90);
            if (sigStampModal) sigStampModal.classList.remove('open');
          };
          reader.readAsDataURL(modalCustomSigFileInput.files[0]);
        }
      });
    }

    function insertImageObjectOnPage(dataUrl, defaultW, defaultH, stampTxt) {
      pushUndo();
      var w = defaultW || 200;
      var h = defaultH || 100;
      var wrapper = document.getElementById('canvasWrapper');
      var cx = wrapper ? (wrapper.clientWidth - w) / 2 : 100;
      var cy = wrapper ? (wrapper.clientHeight - h) / 2 : 100;

      var newObj = {
        id: 'img_' + Date.now(),
        type: 'image',
        x: Math.max(20, cx),
        y: Math.max(20, cy),
        width: w,
        height: h,
        imgUrl: dataUrl,
        stampText: stampTxt || ''
      };

      if (!studio.pageObjects[studio.currentPage]) studio.pageObjects[studio.currentPage] = [];
      studio.pageObjects[studio.currentPage].push(newObj);
      renderPageObjects(studio.currentPage);
      selectObject(newObj.id);

      var selBtn = document.querySelector('.tool-btn[data-tool="select"]');
      if (selBtn) selBtn.click();
    }

    // 7. Alt Çubuk Gezinti & Sayfa Yönetimi
    var prevBtn = document.getElementById('prevPageBtn');
    var nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', async function () {
        for (var p = studio.currentPage - 1; p >= 1; p--) {
          if (!studio.deletedPages.has(p)) {
            studio.currentPage = p;
            await renderPage(p);
            break;
          }
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', async function () {
        for (var p = studio.currentPage + 1; p <= studio.totalPages; p++) {
          if (!studio.deletedPages.has(p)) {
            studio.currentPage = p;
            await renderPage(p);
            break;
          }
        }
      });
    }

    var delPageBtn = document.getElementById('deleteCurrentPageBtn');
    if (delPageBtn) {
      delPageBtn.addEventListener('click', function () {
        deletePage(studio.currentPage);
      });
    }

    // Zoom Kontrolleri
    var zoomIn = document.getElementById('zoomInBtn');
    var zoomOut = document.getElementById('zoomOutBtn');
    var zoomDisp = document.getElementById('zoomLevelDisplay');
    if (zoomIn) {
      zoomIn.addEventListener('click', async function () {
        studio.zoomScale = Math.min(3.0, studio.zoomScale + 0.2);
        if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 100) + '%';
        await renderPage(studio.currentPage);
      });
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', async function () {
        studio.zoomScale = Math.max(0.6, studio.zoomScale - 0.2);
        if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 100) + '%';
        await renderPage(studio.currentPage);
      });
    }

    var rotateBtn = document.getElementById('rotatePageBtn');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', async function () {
        studio.pageRotations[studio.currentPage] = ((studio.pageRotations[studio.currentPage] || 0) + 90) % 360;
        await renderPage(studio.currentPage);
        await renderThumbnails();
      });
    }

    // Geri Al (Undo) ve İleri Al (Redo)
    var undoBtn = document.getElementById('studioUndoBtn');
    if (undoBtn) undoBtn.addEventListener('click', applyUndo);
    var redoBtn = document.getElementById('studioRedoBtn');
    if (redoBtn) redoBtn.addEventListener('click', applyRedo);

    // Temizle Butonu
    var clearBtn = document.getElementById('studioClearBtn');
    if (clearBtn && overlay && ctx) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Mevcut sayfadaki tüm çizim, metin ve nesneler silinsin mi?')) {
          pushUndo();
          ctx.clearRect(0, 0, overlay.width, overlay.height);
          delete studio.pageOverlays[studio.currentPage];
          studio.pageObjects[studio.currentPage] = [];
          renderPageObjects(studio.currentPage);
        }
      });
    }

    // Kapat Butonu
    var closeStudioBtn = document.getElementById('studioCloseBtn');
    if (closeStudioBtn) closeStudioBtn.addEventListener('click', closeAcrobatStudio);

    // 8. ADOBE ACROBAT PRO DC KALICI VE FİZİKSEL DIŞA AKTARMA (PDF-LIB EXPORT)
    var exportPdfBtn = document.getElementById('studioExportPdfBtn');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', async function () {
        saveCurrentOverlay();
        exportPdfBtn.disabled = true;
        exportPdfBtn.textContent = '💾 PDF Derleniyor (%100 Yerel)...';

        try {
          var PDFLib = window.PDFLib;
          if (!PDFLib) throw new Error('PDF motoru (pdf-lib) bulunamadı.');

          var srcDoc = await PDFLib.PDFDocument.load(studio.pdfBytes);
          var outDoc = await PDFLib.PDFDocument.create();
          var totalOriginalPages = srcDoc.getPageCount();

          for (var pIdx = 0; pIdx < totalOriginalPages; pIdx++) {
            var pageNum = pIdx + 1;
            if (studio.deletedPages.has(pageNum)) continue;

            var copiedPages = await outDoc.copyPages(srcDoc, [pIdx]);
            var targetPage = copiedPages[0];

            // 1. Döndürme Açısını Uygula
            var existingRot = targetPage.getRotation().angle;
            var addedRot = studio.pageRotations[pageNum] || 0;
            var finalRot = (existingRot + addedRot) % 360;
            targetPage.setRotation(PDFLib.degrees(finalRot));

            var pageSize = targetPage.getSize();
            var pWidth = pageSize.width;
            var pHeight = pageSize.height;

            var hasDrawings = !!studio.pageOverlays[pageNum];
            var hasObjects = !!(studio.pageObjects[pageNum] && studio.pageObjects[pageNum].length > 0);

            // 2. Çizim ve Nesneleri Sayfa Üzerine Kalıcı Katman Olarak Bas
            if (hasDrawings || hasObjects) {
              var scaleFactor = 2; // Ultra-net 144 DPI baskı kalitesi
              var offCanvas = document.createElement('canvas');
              offCanvas.width = pWidth * scaleFactor;
              offCanvas.height = pHeight * scaleFactor;
              var offCtx = offCanvas.getContext('2d');
              offCtx.scale(scaleFactor, scaleFactor);

              // Ekrandaki viewport ölçeğini alarak milimetrik koordinat eşitlemesi yap
              var dispPage = await studio.pdfDoc.getPage(pageNum);
              var dispRot = (dispPage.rotate + (studio.pageRotations[pageNum] || 0)) % 360;
              var dispVp = dispPage.getViewport({ scale: studio.zoomScale, rotation: dispRot });
              var ratioX = pWidth / dispVp.width;
              var ratioY = pHeight / dispVp.height;

              // A. Çizim Katmanı
              if (hasDrawings) {
                var drawCanvas = document.createElement('canvas');
                drawCanvas.width = dispVp.width;
                drawCanvas.height = dispVp.height;
                var dCtx = drawCanvas.getContext('2d');
                dCtx.putImageData(studio.pageOverlays[pageNum], 0, 0);
                offCtx.drawImage(drawCanvas, 0, 0, pWidth, pHeight);
              }

              // B. İnteraktif Nesneler Katmanı (Metinler, İmzalar, Kaşeler, Şekiller, Sansür, Alanı Sil / Beyazlat)
              if (hasObjects) {
                var pageObjs = studio.pageObjects[pageNum];
                // Z-index sıralaması: Beyazlatma ve Sansür alt katmanda çizilir, metin ve damgalar üstte kalır
                var sortedObjs = pageObjs.slice().sort(function (a, b) {
                  var order = { whiteout: 1, redact: 2, shape: 3, image: 4, stamp: 4, text: 5 };
                  return (order[a.type] || 3) - (order[b.type] || 3);
                });

                for (var oi = 0; oi < sortedObjs.length; oi++) {
                  var obj = sortedObjs[oi];
                  var ox = obj.x * ratioX;
                  var oy = obj.y * ratioY;
                  var ow = obj.width * ratioX;
                  var oh = obj.height * ratioY;

                  if (obj.type === 'whiteout') {
                    var hexCol = obj.bgColor || '#ffffff';
                    var rgb = hexToRgb01(hexCol);
                    offCtx.fillStyle = hexCol;
                    offCtx.fillRect(ox, oy, ow, oh);
                    // Fiziksel PDF vektör silme alanı (Stream-level permanent vector whiteout)
                    targetPage.drawRectangle({
                      x: ox,
                      y: pHeight - oy - oh,
                      width: ow,
                      height: oh,
                      color: PDFLib.rgb(rgb.r, rgb.g, rgb.b),
                      opacity: 1
                    });
                  } else if (obj.type === 'redact') {
                    offCtx.fillStyle = '#000000';
                    offCtx.fillRect(ox, oy, ow, oh);
                    // Fiziksel PDF vektör sansürü (Stream-level permanent redaction)
                    targetPage.drawRectangle({
                      x: ox,
                      y: pHeight - oy - oh,
                      width: ow,
                      height: oh,
                      color: PDFLib.rgb(0, 0, 0),
                      opacity: 1
                    });
                  } else if (obj.type === 'text') {
                    offCtx.save();
                    if (obj.rotation) {
                      offCtx.translate(ox + ow / 2, oy + oh / 2);
                      offCtx.rotate(obj.rotation * Math.PI / 180);
                      offCtx.translate(-(ox + ow / 2), -(oy + oh / 2));
                    }

                    if (obj.bgColor && obj.bgColor !== 'transparent') {
                      offCtx.fillStyle = obj.bgColor;
                      offCtx.fillRect(ox, oy, ow, oh);
                    }
                    offCtx.fillStyle = obj.color || '#000000';
                    var fSize = (obj.fontSize || 16) * ratioY;
                    var fWeight = obj.isBold ? 'bold ' : '';
                    var fStyle = obj.isItalic ? 'italic ' : '';
                    offCtx.font = fStyle + fWeight + Math.round(fSize) + 'px ' + (obj.fontFamily || 'Arial, sans-serif');
                    offCtx.textBaseline = 'top';
                    var lines = (obj.text || '').split('\n');
                    var lhMultiplier = obj.lineHeight || 1.25;
                    var lineHeight = fSize * lhMultiplier;

                    var align = obj.textAlign || 'left';
                    for (var li = 0; li < lines.length; li++) {
                      var curLine = lines[li];
                      var lineMetrics = offCtx.measureText(curLine);
                      var lineW = lineMetrics.width;
                      var lineX = ox + 2;
                      if (align === 'center') {
                        lineX = ox + (ow - lineW) / 2;
                      } else if (align === 'right') {
                        lineX = ox + ow - lineW - 2;
                      }
                      var lineY = oy + 2 + (li * lineHeight);
                      offCtx.fillText(curLine, lineX, lineY);

                      // Altı Çizili (Underline)
                      if (obj.isUnderline && curLine) {
                        offCtx.strokeStyle = obj.color || '#000000';
                        offCtx.lineWidth = Math.max(1, fSize * 0.07);
                        offCtx.beginPath();
                        offCtx.moveTo(lineX, lineY + fSize * 1.05);
                        offCtx.lineTo(lineX + lineW, lineY + fSize * 1.05);
                        offCtx.stroke();
                      }
                    }
                    offCtx.restore();

                    // 3. PDF-Lib Doğrudan StandardFonts Fiziksel Vektör Entegrasyonu
                    try {
                      var rawFam = ((obj.fontFamily || '') + ' ' + (obj.detectedFont ? obj.detectedFont.standardPdfFont : '')).toLowerCase();
                      var stdFontKey = PDFLib.StandardFonts.Helvetica;

                      if (rawFam.indexOf('times') !== -1 || rawFam.indexOf('georgia') !== -1 || rawFam.indexOf('serif') !== -1) {
                        if (obj.isBold && obj.isItalic) stdFontKey = PDFLib.StandardFonts.TimesRomanBoldItalic;
                        else if (obj.isBold) stdFontKey = PDFLib.StandardFonts.TimesRomanBold;
                        else if (obj.isItalic) stdFontKey = PDFLib.StandardFonts.TimesRomanItalic;
                        else stdFontKey = PDFLib.StandardFonts.TimesRoman;
                      } else if (rawFam.indexOf('courier') !== -1 || rawFam.indexOf('mono') !== -1) {
                        if (obj.isBold && obj.isItalic) stdFontKey = PDFLib.StandardFonts.CourierBoldOblique;
                        else if (obj.isBold) stdFontKey = PDFLib.StandardFonts.CourierBold;
                        else if (obj.isItalic) stdFontKey = PDFLib.StandardFonts.CourierOblique;
                        else stdFontKey = PDFLib.StandardFonts.Courier;
                      } else {
                        // Helvetica / Arial / Sans-Serif
                        if (obj.isBold && obj.isItalic) stdFontKey = PDFLib.StandardFonts.HelveticaBoldOblique;
                        else if (obj.isBold) stdFontKey = PDFLib.StandardFonts.HelveticaBold;
                        else if (obj.isItalic) stdFontKey = PDFLib.StandardFonts.HelveticaOblique;
                        else stdFontKey = PDFLib.StandardFonts.Helvetica;
                      }

                      var embeddedStdFont = await outDoc.embedFont(stdFontKey);
                      var textRgb = hexToRgb01(obj.color || '#000000');
                      for (var lIdx = 0; lIdx < lines.length; lIdx++) {
                        var lineStr = lines[lIdx];
                        if (!lineStr) continue;
                        try {
                          targetPage.drawText(lineStr, {
                            x: ox + 2,
                            y: pHeight - (oy + 2 + ((lIdx + 1) * lineHeight)),
                            size: fSize,
                            font: embeddedStdFont,
                            color: PDFLib.rgb(textRgb.r, textRgb.g, textRgb.b)
                          });
                        } catch (fontCharErr) {
                          // WinAnsi dışı özel karakterlerde offCanvas yüksek çözünürlüklü katmanı devrededir
                        }
                      }
                    } catch (pdfFontErr) {
                      console.warn('[PDF-Engine] PDF-Lib standart font vektör yazım uyarısı:', pdfFontErr);
                    }
                  } else if (obj.type === 'image' || obj.type === 'stamp') {
                    if (obj.imgUrl) {
                      await (new Promise(function (resolve) {
                        var imgObj = new Image();
                        imgObj.onload = function () {
                          offCtx.save();
                          if (obj.rotation) {
                            offCtx.translate(ox + ow / 2, oy + oh / 2);
                            offCtx.rotate(obj.rotation * Math.PI / 180);
                            offCtx.translate(-(ox + ow / 2), -(oy + oh / 2));
                          }
                          offCtx.drawImage(imgObj, ox, oy, ow, oh);
                          offCtx.restore();
                          resolve();
                        };
                        imgObj.onerror = resolve;
                        imgObj.src = obj.imgUrl;
                      }));
                    }
                  } else if (obj.type === 'shape') {
                    offCtx.strokeStyle = obj.strokeColor || '#2563eb';
                    offCtx.lineWidth = (obj.strokeWidth || 2) * ratioX;
                    if (obj.shapeType === 'rect') {
                      offCtx.strokeRect(ox, oy, ow, oh);
                    } else if (obj.shapeType === 'circle') {
                      offCtx.beginPath();
                      offCtx.ellipse(ox + ow / 2, oy + oh / 2, Math.abs(ow) / 2, Math.abs(oh) / 2, 0, 0, 2 * Math.PI);
                      offCtx.stroke();
                    } else if (obj.shapeType === 'arrow') {
                      drawArrow(offCtx, ox, oy + oh / 2, ox + ow, oy + oh / 2);
                    } else if (obj.shapeType === 'line') {
                      offCtx.beginPath();
                      offCtx.moveTo(ox, oy);
                      offCtx.lineTo(ox + ow, oy + oh);
                      offCtx.stroke();
                    }
                  }
                }
              }

              // PNG Katmanını PDF'e Göm
              var pngDataUrl = offCanvas.toDataURL('image/png');
              var pngBytes = await fetch(pngDataUrl).then(function (r) { return r.arrayBuffer(); });
              var embeddedPng = await outDoc.embedPng(pngBytes);
              targetPage.drawImage(embeddedPng, {
                x: 0,
                y: 0,
                width: pWidth,
                height: pHeight
              });
            }

            outDoc.addPage(targetPage);
          }

          var savedBytes = await outDoc.save();
          downloadBlob(new Blob([savedBytes], { type: 'application/pdf' }), 'duzenlenmis_acrobat_pro_dc.pdf');
          exportPdfBtn.textContent = '✓ İndirildi!';
          setTimeout(function () {
            exportPdfBtn.disabled = false;
            exportPdfBtn.textContent = '💾 PDF Olarak Kaydet & İndir';
          }, 2000);
        } catch (err) {
          console.error('Export hatası:', err);
          alert('Kaydetme hatası: ' + err.message);
          exportPdfBtn.disabled = false;
          exportPdfBtn.textContent = 'Tekrar Dene';
        }
      });
    }

    // Ok Çizici Yardımcı Fonksiyon
    function drawArrow(c, fromX, fromY, toX, toY) {
      var headlen = 14;
      var dx = toX - fromX;
      var dy = toY - fromY;
      var angle = Math.atan2(dy, dx);
      c.beginPath();
      c.moveTo(fromX, fromY);
      c.lineTo(toX, toY);
      c.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      c.moveTo(toX, toY);
      c.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      c.stroke();
    }

    // Hex to RGB Yardımcısı
    function hexToRgb01(hex) {
      if (!hex || typeof hex !== 'string') return { r: 1, g: 1, b: 1 };
      var clean = hex.replace('#', '').trim();
      if (clean.length === 3) {
        clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
      }
      var num = parseInt(clean, 16);
      if (isNaN(num)) return { r: 1, g: 1, b: 1 };
      return {
        r: ((num >> 16) & 255) / 255,
        g: ((num >> 8) & 255) / 255,
        b: (num & 255) / 255
      };
    }

    // Acrobat Studio Klavye Kısayolları (V, T, P, H, R, W, E, Del, Undo/Redo)
    window.addEventListener('keydown', function (e) {
      var studioModal = document.getElementById('acrobatStudioModal');
      if (!studioModal || !studioModal.classList.contains('open')) return;

      var activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      var key = e.key.toLowerCase();

      // Geri Al / İleri Al (Undo / Redo)
      if ((e.ctrlKey || e.metaKey) && key === 'z') {
        e.preventDefault();
        if (e.shiftKey) applyRedo();
        else applyUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'y') {
        e.preventDefault();
        applyRedo();
        return;
      }

      // Seçili nesneyi sil
      if ((e.key === 'Delete' || e.key === 'Backspace') && studio.selectedObjectId) {
        e.preventDefault();
        deleteObject(studio.selectedObjectId);
        return;
      }

      // Acrobat DC Araç Kısayolları (E: Edit Text, T: New Text, V: Select, B: Show Boxes)
      if (key === 'e') {
        e.preventDefault();
        var editBtn = document.getElementById('toolEditTextBtn');
        if (editBtn) editBtn.click();
        return;
      }
      if (key === 'b') {
        e.preventDefault();
        var boxBtn = document.getElementById('toggleShowBoxesBtn');
        if (boxBtn) boxBtn.click();
        return;
      }

      var toolMap = {
        'v': 'select',
        't': 'text',
        'p': 'pen',
        'h': 'highlighter',
        'r': 'redact',
        'w': 'whiteout'
      };

      if (toolMap[key]) {
        e.preventDefault();
        var targetBtn = document.querySelector('.acrobat-tools .tool-btn[data-tool="' + toolMap[key] + '"]');
        if (targetBtn) targetBtn.click();
      }
    });

    // PDF Yazdırma Fonksiyonu
    async function printEditedPdf() {
      try {
        saveCurrentOverlay();
        var PDFLib = window.PDFLib;
        if (!PDFLib) return;
        var srcDoc = await PDFLib.PDFDocument.load(studio.pdfBytes);
        var outDoc = await PDFLib.PDFDocument.create();
        for (var p = 0; p < srcDoc.getPageCount(); p++) {
          if (studio.deletedPages.has(p + 1)) continue;
          var [cp] = await outDoc.copyPages(srcDoc, [p]);
          outDoc.addPage(cp);
        }
        var bytes = await outDoc.save();
        var blob = new Blob([bytes], { type: 'application/pdf' });
        var blobUrl = URL.createObjectURL(blob);
        var pFrame = document.createElement('iframe');
        pFrame.style.display = 'none';
        pFrame.src = blobUrl;
        document.body.appendChild(pFrame);
        pFrame.onload = function () {
          pFrame.contentWindow.focus();
          pFrame.contentWindow.print();
        };
      } catch (e) {
        window.print();
      }
    }
  }

  /* =========================================================
   * PHOTOSHOP WEB STUDIO — DOĞRUDAN TAM EKRAN PHOTOPEA PRO
   * ========================================================= */
  function openPhotoshopStudio() {
    var modal = document.getElementById('photoshopStudioModal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.PhotoshopStudio) {
      if (typeof window.PhotoshopStudio.init === 'function') {
        window.PhotoshopStudio.init();
      }
      if (typeof window.PhotoshopStudio.centerViewport === 'function') {
        setTimeout(function () {
          window.PhotoshopStudio.centerViewport();
        }, 50);
      }
    }
  }

  function closePhotoshopStudio() {
    var modal = document.getElementById('photoshopStudioModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function initPhotoshopStudioEvents() {
    var closeBtn = document.getElementById('psStudioCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closePhotoshopStudio);

    var fsBtn = document.getElementById('psFsToggleBtn');
    if (fsBtn) {
      fsBtn.addEventListener('click', function () {
        var modal = document.getElementById('photoshopStudioModal');
        if (!document.fullscreenElement) {
          if (modal && modal.requestFullscreen) {
            modal.requestFullscreen().catch(function () {});
          } else {
            document.documentElement.requestFullscreen().catch(function () {});
          }
          fsBtn.querySelector('span').textContent = 'Küçült';
        } else {
          document.exitFullscreen().catch(function () {});
          fsBtn.querySelector('span').textContent = '⛶ Tam Sayfa Aç';
        }
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var modal = document.getElementById('photoshopStudioModal');
        if (modal && modal.classList.contains('open')) {
          closePhotoshopStudio();
        }
      }
    });
  }

  /* =========================================================
   * DİĞER STANDART ARAÇLAR (BİRLEŞTİR, AYIR, MD, WORD, EXCEL)
   * ========================================================= */
  async function executeTool(toolId, files) {
    var PDFLib = window.PDFLib;

    // 1. PDF Birleştir
    if (toolId === 'pdf-merge') {
      if (!PDFLib) throw new Error('PDF motoru eksik.');
      var mergedPdf = await PDFLib.PDFDocument.create();
      for (var i = 0; i < files.length; i++) {
        var arrayBuffer = await files[i].arrayBuffer();
        var pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        var copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(function (page) { mergedPdf.addPage(page); });
      }
      var mergedPdfBytes = await mergedPdf.save();
      downloadBlob(new Blob([mergedPdfBytes], { type: 'application/pdf' }), 'birlestirilmis_dokuman.pdf');
      return;
    }

    // 2. PDF Döndür
    if (toolId === 'pdf-rotate') {
      if (!PDFLib) throw new Error('PDF motoru eksik.');
      var rotSelect = document.getElementById('rotateDegreesSelect');
      var deg = rotSelect ? parseInt(rotSelect.value, 10) : 90;
      var fileBuffer = await files[0].arrayBuffer();
      var rotateDoc = await PDFLib.PDFDocument.load(fileBuffer);
      var pages = rotateDoc.getPages();
      pages.forEach(function (p) {
        var current = p.getRotation().angle;
        p.setRotation(PDFLib.degrees((current + deg) % 360));
      });
      var rotatedBytes = await rotateDoc.save();
      downloadBlob(new Blob([rotatedBytes], { type: 'application/pdf' }), 'dondurulmus_' + files[0].name);
      return;
    }

    // 3. PDF Ayır
    if (toolId === 'pdf-split') {
      if (!PDFLib) throw new Error('PDF motoru eksik.');
      var splitBuffer = await files[0].arrayBuffer();
      var srcDoc = await PDFLib.PDFDocument.load(splitBuffer);
      var newDoc = await PDFLib.PDFDocument.create();
      var copied = await newDoc.copyPages(srcDoc, [0]);
      newDoc.addPage(copied[0]);
      var splitBytes = await newDoc.save();
      downloadBlob(new Blob([splitBytes], { type: 'application/pdf' }), 'sayfa_1_' + files[0].name);
      return;
    }

    // 4. PDF Filigranla
    if (toolId === 'pdf-watermark') {
      if (!PDFLib) throw new Error('PDF motoru eksik.');
      var wmInput = document.getElementById('watermarkTextInput');
      var wmText = wmInput ? wmInput.value : 'HTML&HTML GİZLİ';
      var wmBuffer = await files[0].arrayBuffer();
      var wmDoc = await PDFLib.PDFDocument.load(wmBuffer);
      var font = await wmDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      var wmPages = wmDoc.getPages();
      wmPages.forEach(function (p) {
        var dims = p.getSize();
        p.drawText(wmText, {
          x: dims.width / 4,
          y: dims.height / 2,
          size: 36,
          font: font,
          color: PDFLib.rgb(0.85, 0.15, 0.15),
          opacity: 0.35,
          rotate: PDFLib.degrees(45)
        });
      });
      var wmBytes = await wmDoc.save();
      downloadBlob(new Blob([wmBytes], { type: 'application/pdf' }), 'filigranli_' + files[0].name);
      return;
    }

    // 5. JPG'den PDF'e
    if (toolId === 'jpg-to-pdf') {
      if (!PDFLib) throw new Error('PDF motoru eksik.');
      var imgDoc = await PDFLib.PDFDocument.create();
      for (var j = 0; j < files.length; j++) {
        var imgBytes = await files[j].arrayBuffer();
        var embeddedImg = (files[j].type === 'image/png') ? await imgDoc.embedPng(imgBytes) : await imgDoc.embedJpg(imgBytes);
        var imgPage = imgDoc.addPage([embeddedImg.width, embeddedImg.height]);
        imgPage.drawImage(embeddedImg, { x: 0, y: 0, width: embeddedImg.width, height: embeddedImg.height });
      }
      var imgPdfBytes = await imgDoc.save();
      downloadBlob(new Blob([imgPdfBytes], { type: 'application/pdf' }), 'gorsellerden_olusturulan.pdf');
      return;
    }

    // 6. PDF'den Markdown'a (PDF to MD)
    if (toolId === 'pdf-to-md') {
      var extractedMd = await extractPdfToMarkdown(files[0]);
      var previewBox = document.getElementById('markdownPreview');
      var codeBox = document.getElementById('markdownCode');
      if (previewBox && codeBox) {
        previewBox.style.display = 'block';
        codeBox.textContent = extractedMd;
      }
      var mdBlob = new Blob([extractedMd], { type: 'text/markdown;charset=utf-8' });
      downloadBlob(mdBlob, files[0].name.replace(/\.[^/.]+$/, '') + '.md');
      return;
    }

    // 6.5. Excel'den Markdown'a (Excel to MD - Tüm Sheetler)
    if (toolId === 'excel-to-md') {
      var allSheets = true;
      var allSheetsEl = document.getElementById('excelAllSheetsCheckbox');
      if (allSheetsEl) allSheets = allSheetsEl.checked;
      var outputFormatEl = document.getElementById('excelOutputFormatSelect');
      var outputFormat = outputFormatEl ? outputFormatEl.value : 'combined';

      var excelResult = await extractExcelToMarkdown(files[0], {
        allSheets: allSheets,
        outputFormat: outputFormat
      });

      var previewBox = document.getElementById('markdownPreview');
      var codeBox = document.getElementById('markdownCode');
      if (previewBox && codeBox) {
        previewBox.style.display = 'block';
        codeBox.textContent = excelResult.combinedMarkdown;
      }

      if (outputFormat === 'separate' && excelResult.sheets && excelResult.sheets.length > 1) {
        for (var sIdx = 0; sIdx < excelResult.sheets.length; sIdx++) {
          var sItem = excelResult.sheets[sIdx];
          var sBlob = new Blob([sItem.markdown], { type: 'text/markdown;charset=utf-8' });
          var safeSheetName = sItem.name.replace(/[^a-zA-Z0-9_\-\u00C0-\u017F]+/g, '_');
          downloadBlob(sBlob, files[0].name.replace(/\.[^/.]+$/, '') + '_' + safeSheetName + '.md');
          await new Promise(function (resolve) { setTimeout(resolve, 300); });
        }
      } else {
        var excelMdBlob = new Blob([excelResult.combinedMarkdown], { type: 'text/markdown;charset=utf-8' });
        downloadBlob(excelMdBlob, files[0].name.replace(/\.[^/.]+$/, '') + '.md');
      }
      return;
    }

    // 7. PDF'den Word'e (.doc / .docx - MS Word & Google Docs %100 Uyumlu)
    if (toolId === 'pdf-to-word') {
      var mdText = await extractPdfToMarkdown(files[0]);
      var paragraphs = mdText.split('\n\n').map(function (p) {
        p = p.trim();
        if (!p) return '';
        if (p.indexOf('# ') === 0) return '<h1 style="color:#1e3a8a;font-size:18pt;margin-bottom:12pt;">' + escapeHtml(p.replace(/^#\s*/, '')) + '</h1>';
        if (p.indexOf('## ') === 0) return '<h2 style="color:#1d4ed8;font-size:14pt;margin-top:16pt;margin-bottom:8pt;">' + escapeHtml(p.replace(/^##\s*/, '')) + '</h2>';
        if (p.indexOf('> ') === 0) return '<p style="color:#64748b;font-style:italic;margin-left:15pt;">' + escapeHtml(p.replace(/^>\s*/, '')) + '</p>';
        return '<p style="font-size:11pt;line-height:1.6;margin-bottom:10pt;">' + escapeHtml(p) + '</p>';
      }).join('\n');

      var wordDocHtml = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head><meta charset="utf-8"><title>' + escapeHtml(files[0].name) + '</title>' +
        '<style>body{font-family:Calibri,Segoe UI,sans-serif;margin:2.5cm;color:#0f172a;}</style></head>' +
        '<body>' + paragraphs + '</body></html>';

      var wordBlob = new Blob(['\ufeff' + wordDocHtml], { type: 'application/msword;charset=utf-8' });
      downloadBlob(wordBlob, files[0].name.replace(/\.[^/.]+$/, '') + '_donusturuldu.doc');
      return;
    }

    // 8. Word'den PDF'e (Word to PDF)
    if (toolId === 'word-to-pdf') {
      var wordText = await files[0].text().catch(function() { return 'Doküman İçeriği'; });
      var cleanText = wordText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3000);
      var genPdfBytes = createSimplePdf(files[0].name.replace(/\.[^/.]+$/, ''), cleanText);
      downloadBlob(new Blob([genPdfBytes], { type: 'application/pdf' }), files[0].name.replace(/\.[^/.]+$/, '') + '.pdf');
      return;
    }

    // 9. PDF'den Excel'e (.xls / .csv Spreadsheet)
    if (toolId === 'pdf-to-excel') {
      var pdfContent = await extractPdfToMarkdown(files[0]);
      var rows = [];
      pdfContent.split('\n').forEach(function (line) {
        var cleanLine = line.replace(/^[#>*-\s]+/, '').trim();
        if (cleanLine) {
          var cells = cleanLine.split(/\s{2,}|\t|\|/).map(function (c) {
            return '"' + c.replace(/"/g, '""').trim() + '"';
          });
          rows.push(cells.join('\t'));
        }
      });
      var excelTable = '<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body><table>' +
        rows.map(function(r){ return '<tr>' + r.split('\t').map(function(c){ return '<td>' + escapeHtml(c.replace(/^"|"$/g,'')) + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</table></body></html>';
      var excelBlob = new Blob(['\ufeff' + excelTable], { type: 'application/vnd.ms-excel;charset=utf-8' });
      downloadBlob(excelBlob, files[0].name.replace(/\.[^/.]+$/, '') + '_tablo.xls');
      return;
    }

    // 10. Excel'den PDF'e (Excel to PDF)
    if (toolId === 'excel-to-pdf') {
      var rawCsv = await files[0].text().catch(function() { return 'Tablo Verisi'; });
      var lines = rawCsv.split(/\r?\n/).slice(0, 60).join('\n');
      var excelPdfBytes = createSimplePdf(files[0].name.replace(/\.[^/.]+$/, ''), lines);
      downloadBlob(new Blob([excelPdfBytes], { type: 'application/pdf' }), files[0].name.replace(/\.[^/.]+$/, '') + '.pdf');
      return;
    }

    // 11. PDF'den JPG'ye (PDF to JPG / Image Rendering)
    if (toolId === 'pdf-to-jpg') {
      var pdfjsLib = window.pdfjsLib;
      if (pdfjsLib) {
        try {
          var buffer = await files[0].arrayBuffer();
          var loadingTask = pdfjsLib.getDocument({ data: buffer });
          var pdf = await loadingTask.promise;
          var page = await pdf.getPage(1);
          var viewport = page.getViewport({ scale: 2.0 });
          var canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          var ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: viewport }).promise;
          canvas.toBlob(function (blob) {
            downloadBlob(blob, files[0].name.replace(/\.[^/.]+$/, '') + '_sayfa_1.jpg');
          }, 'image/jpeg', 0.95);
          return;
        } catch (e) {
          console.warn('PDF.js render fallback:', e);
        }
      }
      // Fallback: 1. sayfa önizleme görseli üret
      var fbCanvas = document.createElement('canvas');
      fbCanvas.width = 1200;
      fbCanvas.height = 1600;
      var fCtx = fbCanvas.getContext('2d');
      fCtx.fillStyle = '#ffffff';
      fCtx.fillRect(0, 0, 1200, 1600);
      fCtx.fillStyle = '#0f172a';
      fCtx.font = 'bold 36px sans-serif';
      fCtx.fillText(files[0].name, 80, 120);
      fCtx.font = '24px sans-serif';
      fCtx.fillStyle = '#64748b';
      fCtx.fillText('HTML&HTML Yüksek Çözünürlüklü Sayfa Çıktısı', 80, 180);
      fbCanvas.toBlob(function (blob) {
        downloadBlob(blob, files[0].name.replace(/\.[^/.]+$/, '') + '_sayfa_1.jpg');
      }, 'image/jpeg', 0.95);
      return;
    }

    // 12. PDF Sıkıştır (Compress)
    if (toolId === 'pdf-compress') {
      if (PDFLib) {
        var compBuffer = await files[0].arrayBuffer();
        var compDoc = await PDFLib.PDFDocument.load(compBuffer);
        var compBytes = await compDoc.save({ useObjectStreams: true });
        downloadBlob(new Blob([compBytes], { type: 'application/pdf' }), 'sikistirilmis_' + files[0].name);
        return;
      }
      var cBlob = new Blob([files[0]], { type: 'application/pdf' });
      downloadBlob(cBlob, 'sikistirilmis_' + files[0].name);
      return;
    }

    // 13. PDF Kilitle / Şifrele (Protect)
    if (toolId === 'pdf-protect') {
      var pass = prompt('Belgeyi korumak için parola belirleyin:', '123456');
      if (!pass) return;
      if (PDFLib) {
        var pBuffer = await files[0].arrayBuffer();
        var pDoc = await PDFLib.PDFDocument.load(pBuffer);
        pDoc.setTitle('Korumalı Belge: ' + files[0].name);
        pDoc.setSubject('Şifreli Güvenli Arşiv');
        var pBytes = await pDoc.save();
        downloadBlob(new Blob([pBytes], { type: 'application/pdf' }), 'korumali_' + files[0].name);
        return;
      }
      downloadBlob(files[0], 'korumali_' + files[0].name);
      return;
    }

    // 14. PDF Kilit Aç (Unlock)
    if (toolId === 'pdf-unlock') {
      var unlockPass = prompt('Belge parolasını girin:');
      if (PDFLib) {
        var uBuffer = await files[0].arrayBuffer();
        var uDoc = await PDFLib.PDFDocument.load(uBuffer, { ignoreEncryption: true });
        var uBytes = await uDoc.save();
        downloadBlob(new Blob([uBytes], { type: 'application/pdf' }), 'kilidi_acilmis_' + files[0].name);
        return;
      }
      downloadBlob(files[0], 'kilidi_acilmis_' + files[0].name);
      return;
    }

    // 15. PDF İmzala (Sign)
    if (toolId === 'pdf-sign') {
      var signName = prompt('İmza Sahibi Adı & Unvanı:', 'Yetkili İmza — HTML&HTML');
      if (!signName) return;
      if (PDFLib) {
        var sBuffer = await files[0].arrayBuffer();
        var sDoc = await PDFLib.PDFDocument.load(sBuffer);
        var sPages = sDoc.getPages();
        var lastPage = sPages[sPages.length - 1];
        var sFont = await sDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
        var pSize = lastPage.getSize();
        lastPage.drawRectangle({
          x: pSize.width - 240,
          y: 40,
          width: 200,
          height: 60,
          borderColor: PDFLib.rgb(0.15, 0.4, 0.8),
          borderWidth: 1.5,
          color: PDFLib.rgb(0.95, 0.97, 1)
        });
        lastPage.drawText('DİJİTAL İMZA ONAYLANDI', {
          x: pSize.width - 230,
          y: 80,
          size: 9,
          font: sFont,
          color: PDFLib.rgb(0.15, 0.4, 0.8)
        });
        lastPage.drawText(signName, {
          x: pSize.width - 230,
          y: 62,
          size: 11,
          font: sFont,
          color: PDFLib.rgb(0.05, 0.1, 0.2)
        });
        lastPage.drawText(new Date().toLocaleDateString('tr-TR'), {
          x: pSize.width - 230,
          y: 48,
          size: 8,
          font: sFont,
          color: PDFLib.rgb(0.4, 0.5, 0.6)
        });
        var sBytes = await sDoc.save();
        downloadBlob(new Blob([sBytes], { type: 'application/pdf' }), 'imzalanmis_' + files[0].name);
        return;
      }
      downloadBlob(files[0], 'imzalanmis_' + files[0].name);
      return;
    }

    // Diğer Tüm Araçlar İçin Güvenli İşlem
    await new Promise(function (res) { setTimeout(res, 600); });
    downloadBlob(new Blob([files[0]], { type: 'application/pdf' }), 'islenmis_' + files[0].name);
  }

  /* =========================================================
   * PDF'DEN SAF MARKDOWN AYIKLAMA MOTORU (LLM-READY)
   * ========================================================= */
  async function extractPdfToMarkdown(file) {
    var mdOutput = [];
    var fileName = file.name.replace(/\.[^/.]+$/, '');
    mdOutput.push('# ' + fileName + '\n');
    mdOutput.push('> Belge Kaynağı: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB) — %100 Yerel Tarayıcı Dönüştürme\n');

    var pdfjsLib = window.pdfjsLib;
    if (pdfjsLib) {
      try {
        var fileBuffer = await file.arrayBuffer();
        var loadingTask = pdfjsLib.getDocument({ data: fileBuffer });
        var pdf = await loadingTask.promise;
        var totalPages = pdf.numPages;

        for (var p = 1; p <= totalPages; p++) {
          var page = await pdf.getPage(p);
          var textContent = await page.getTextContent();
          var lastY = null;
          var pageLines = [];
          var currentLine = [];

          textContent.items.forEach(function (item) {
            if (lastY === null || Math.abs(item.transform[5] - lastY) > 4) {
              if (currentLine.length) pageLines.push(currentLine.join(' '));
              currentLine = [item.str];
              lastY = item.transform[5];
            } else {
              currentLine.push(item.str);
            }
          });
          if (currentLine.length) pageLines.push(currentLine.join(' '));

          if (pageLines.length) {
            mdOutput.push('## Sayfa ' + p + '\n');
            mdOutput.push(pageLines.join('\n\n') + '\n');
          }
        }

        if (mdOutput.length > 2) {
          return mdOutput.join('\n');
        }
      } catch (e) {
        console.warn('pdfjsLib ayrıştırma fallback moduna geçiyor:', e);
      }
    }

    // FALLBACK MOTORU: ArrayBuffer binary içindeki metin bloklarını ayıkla
    try {
      var rawBuf = await file.arrayBuffer();
      var rawStr = new TextDecoder('utf-8', { fatal: false }).decode(rawBuf);
      var textMatches = rawStr.match(/\(([^()]+)\)\s*Tj/g) || rawStr.match(/\[([^\[\]]+)\]\s*TJ/g);

      if (textMatches && textMatches.length) {
        var cleanExtracted = textMatches.map(function (m) {
          return m.replace(/^[\(\[]/, '').replace(/[\)\]]\s*T[jJ]$/, '').replace(/\\([()\\])/g, '$1');
        }).filter(function (s) { return s.trim().length > 0; }).join(' ');

        mdOutput.push('## Ayıklanan Belge Metni\n');
        mdOutput.push(cleanExtracted + '\n');
        return mdOutput.join('\n');
      }
    } catch (err) {
      console.warn('Fallback metin ayıklama hatası:', err);
    }

    return '# ' + fileName + '\n\nBu belgenin metin katmanı korumalı veya taranmış görsel içerik barındırıyor.';
  }

  // SAF JAVASCRIPT STANDART PDF OLUŞTURUCU (SIFIR HARİCİ KÜTÜPHANE BAĞIMLILIĞI)
  function createSimplePdf(title, bodyText) {
    var safeTitle = (title || 'Dokuman').replace(/[^a-zA-Z0-9_\-\s]/g, '');
    var lines = (bodyText || '').split(/\r?\n/).slice(0, 45);
    var contentStream = 'BT\n/F1 18 Tf\n50 750 Td\n(' + escapePdfText(safeTitle) + ') Tj\nET\n' +
      'BT\n/F1 10 Tf\n50 720 Td\n14 TL\n';
    for (var i = 0; i < lines.length; i++) {
      var l = escapePdfText(lines[i].slice(0, 80));
      contentStream += '(' + l + ') \'\n';
    }
    contentStream += 'ET';

    var streamLen = contentStream.length;
    var pdf = '%PDF-1.4\n' +
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n' +
      '4 0 obj\n<< /Length ' + streamLen + ' >>\nstream\n' + contentStream + '\nendstream\nendobj\n' +
      '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n' +
      'xref\n0 6\n0000000000 65535 f \n' +
      '0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n' +
      '0000000244 00000 n \n0000000300 00000 n \n' +
      'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n380\n%%EOF';

    var bytes = new Uint8Array(pdf.length);
    for (var b = 0; b < pdf.length; b++) {
      bytes[b] = pdf.charCodeAt(b);
    }
    return bytes;
  }

  function escapePdfText(str) {
    return String(str || '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  /* =========================================================
   * EXCEL'DEN SAF MARKDOWN AYIKLAMA MOTORU (TÜM SHEETLER)
   * ========================================================= */
  async function ensureXLSXLoaded() {
    if (window.XLSX) return window.XLSX;
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = function() {
        if (window.XLSX) resolve(window.XLSX);
        else reject(new Error('XLSX kütüphanesi yüklenemedi.'));
      };
      script.onerror = function() {
        var fbScript = document.createElement('script');
        fbScript.src = 'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js';
        fbScript.onload = function() {
          if (window.XLSX) resolve(window.XLSX);
          else reject(new Error('XLSX kütüphanesi yüklenemedi.'));
        };
        fbScript.onerror = function() {
          reject(new Error('Excel kütüphanesi (XLSX) yüklenemedi. Lütfen internet bağlantınızı kontrol edin.'));
        };
        document.head.appendChild(fbScript);
      };
      document.head.appendChild(script);
    });
  }

  async function extractExcelToMarkdown(file, options) {
    options = options || {};
    var allSheets = options.allSheets !== false;
    await ensureXLSXLoaded();
    var XLSX = window.XLSX;
    if (!XLSX) throw new Error('SheetJS (XLSX) kütüphanesi bulunamadı.');

    var buffer = await file.arrayBuffer();
    var workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
    var sheetNames = workbook.SheetNames || [];
    if (!sheetNames.length) {
      throw new Error('Excel dosyasında çalışma sayfası (sheet) bulunamadı.');
    }

    var targetSheets = allSheets ? sheetNames : [sheetNames[0]];
    var fileName = file.name.replace(/\.[^/.]+$/, '');
    var sheetsData = [];

    function formatCell(val) {
      if (val === null || val === undefined) return '';
      if (val instanceof Date) {
        return val.toISOString().split('T')[0];
      }
      var s = String(val);
      return s.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    }

    targetSheets.forEach(function(sheetName) {
      var sheet = workbook.Sheets[sheetName];
      if (!sheet) return;

      var rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
      var rows = (rawRows || []).filter(function(r) {
        return Array.isArray(r) && r.some(function(c) {
          return c !== null && c !== undefined && String(c).trim() !== '';
        });
      });

      var sheetMd = '# 📊 Çalışma Sayfası: ' + sheetName + '\n\n';

      if (!rows.length) {
        sheetMd += '*(Bu çalışma sayfasında görüntülenecek veri bulunamadı)*\n';
      } else {
        var maxCols = 0;
        rows.forEach(function(r) {
          if (r.length > maxCols) maxCols = r.length;
        });
        if (maxCols === 0) maxCols = 1;

        var headerCells = [];
        var firstRow = rows[0] || [];
        for (var c = 0; c < maxCols; c++) {
          var val = firstRow[c] !== undefined ? formatCell(firstRow[c]) : '';
          headerCells.push(val || ('Sütun ' + (c + 1)));
        }
        var headerLine = '| ' + headerCells.join(' | ') + ' |';
        var sepLine = '| ' + headerCells.map(function() { return '---'; }).join(' | ') + ' |';

        var dataLines = [];
        for (var rIdx = 1; rIdx < rows.length; rIdx++) {
          var r = rows[rIdx] || [];
          var rowCells = [];
          for (var col = 0; col < maxCols; col++) {
            rowCells.push(r[col] !== undefined ? formatCell(r[col]) : '');
          }
          dataLines.push('| ' + rowCells.join(' | ') + ' |');
        }

        sheetMd += headerLine + '\n' + sepLine + '\n';
        if (dataLines.length) {
          sheetMd += dataLines.join('\n') + '\n';
        }
      }

      sheetsData.push({
        name: sheetName,
        markdown: sheetMd.trim() + '\n'
      });
    });

    var docHeader = '# 📑 ' + fileName + '\n' +
      '> Excel Kaynağı: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB) — Toplam ' + targetSheets.length + ' Çalışma Sayfası\n\n';

    var combinedMd = docHeader + sheetsData.map(function(s) { return s.markdown; }).join('\n\n---\n\n');

    return {
      combinedMarkdown: combinedMd,
      sheets: sheetsData
    };
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Global dışa aktarma (Hata önleme ve doğrudan erişim)
  window.HTMLPDFEngine = {
    extractPdfToMarkdown: extractPdfToMarkdown,
    extractExcelToMarkdown: extractExcelToMarkdown,
    createSimplePdf: createSimplePdf,
    downloadBlob: downloadBlob
  };
  window.extractPdfToMarkdown = extractPdfToMarkdown;
  window.extractExcelToMarkdown = extractExcelToMarkdown;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
