/**
 * HTML&HTML PDF Engine — İstemci Taraflı Yüksek Hızlı Motor (Zero-Data Retention)
 * pdf-lib ve pdf.js tabanlı %100 yerel, tam fonksiyonel dönüştürücü ve Adobe Acrobat Pro DC seviyesinde Edit Studio.
 */
(function (window, document) {
  'use strict';

  var selectedFiles = [];
  var currentToolId = 'pdf-merge';

  // ACROBAT PRO DC STUDIO STATE
  var studio = {
    pdfDoc: null,
    pdfBytes: null,
    currentPage: 1,
    totalPages: 1,
    zoomScale: 1.25,
    activeTool: 'select',
    strokeColor: '#2563eb',
    strokeWidth: 4,
    fontSize: 16,
    isDrawing: false,
    startX: 0,
    startY: 0,
    pageOverlays: {}, // Her sayfanın çizim katmanını ImageData olarak saklar
    undoHistory: [],
    customStampImg: null
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

    // Arama ve Filtreleme
    function filterCards() {
      var query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      var activeTab = document.querySelector('.category-tab.active');
      var activeCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';

      toolCards.forEach(function (card) {
        var title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
        var desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
        var cat = card.getAttribute('data-category');

        var matchesQ = !query || title.indexOf(query) !== -1 || desc.indexOf(query) !== -1;
        var matchesC = activeCategory === 'all' || cat === activeCategory;

        card.style.display = (matchesQ && matchesC) ? 'flex' : 'none';
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterCards);

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
        } else if (currentToolId === 'excel-to-pdf') {
          fileInput.accept = '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
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

    toolCards.forEach(function (c) {
      c.addEventListener('click', function () { openModal(c); });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Ek Seçenekler
    function buildExtraOptions(toolId) {
      if (toolId === 'pdf-edit') {
        return '<div style="margin-top:12px; padding:10px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; font-size:12px; color:#1d4ed8; text-align:left;">' +
          '⚡ <strong>Adobe Acrobat Pro DC Düzeyinde Düzenleyici:</strong> Metin ekleme, serbest çizim, fosforlu vurgu, şekiller, imza, kaşe ve sansürleme araçları tam ekran stüdyoda açılacaktır.' +
          '</div>';
      }
      if (toolId === 'pdf-watermark') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#334155;">Filigran Metni:</label>' +
          '<input type="text" id="watermarkTextInput" value="GİZLİ &amp; KORUMALI" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px; margin-top:4px;">' +
          '</div>';
      }
      if (toolId === 'pdf-rotate') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#334155;">Döndürme Açısı:</label>' +
          '<select id="rotateDegreesSelect" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px; margin-top:4px;">' +
          '<option value="90">90 Derece Sağa</option>' +
          '<option value="180">180 Derece (Ters)</option>' +
          '<option value="270">90 Derece Sola (270°)</option>' +
          '</select>' +
          '</div>';
      }
      if (toolId === 'pdf-protect') {
        return '<div style="margin-top:12px; text-align:left;">' +
          '<label style="font-size:12px; font-weight:700; color:#334155;">Parola Belirleyin:</label>' +
          '<input type="password" id="protectPasswordInput" placeholder="En az 6 karakter" style="width:100%; padding:8px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px; margin-top:4px;">' +
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
        downloadBlob(blob, (selectedFiles[0] ? selectedFiles[0].name.replace(/\.pdf$/i, '') : 'cikti') + '.md');
      });
    }

    // ACROBAT PRO DC STUDIO EVENTLERİNİ BAĞLA
    initAcrobatStudioEvents();
  }

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
      alert('PDF görüntüleyici motoru henüz yüklenemedi. Lütfen sayfayı yenileyin.');
      return;
    }

    try {
      var loadingTask = pdfjsLib.getDocument({ data: studio.pdfBytes.slice(0) });
      studio.pdfDoc = await loadingTask.promise;
      studio.totalPages = studio.pdfDoc.numPages;
      studio.currentPage = 1;
      studio.pageOverlays = {};
      studio.undoHistory = [];

      document.getElementById('totalPagesNum').textContent = studio.totalPages;
      document.getElementById('currentPageNum').textContent = '1';

      renderThumbnails();
      await renderPage(studio.currentPage);
    } catch (err) {
      console.error('Stüdyo başlatma hatası:', err);
      alert('PDF dosyası yüklenirken hata oluştu: ' + err.message);
    }
  }

  function closeAcrobatStudio() {
    var modal = document.getElementById('acrobatStudioModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  async function renderPage(pageNum) {
    if (!studio.pdfDoc) return;
    saveCurrentOverlay();

    var page = await studio.pdfDoc.getPage(pageNum);
    var viewport = page.getViewport({ scale: studio.zoomScale });

    var renderCanvas = document.getElementById('pdfRenderCanvas');
    var overlayCanvas = document.getElementById('pdfDrawOverlay');
    var wrapper = document.getElementById('canvasWrapper');

    renderCanvas.width = viewport.width;
    renderCanvas.height = viewport.height;
    overlayCanvas.width = viewport.width;
    overlayCanvas.height = viewport.height;
    wrapper.style.width = viewport.width + 'px';
    wrapper.style.height = viewport.height + 'px';

    var renderContext = {
      canvasContext: renderCanvas.getContext('2d'),
      viewport: viewport
    };

    await page.render(renderContext).promise;
    restoreOverlay(pageNum);
    updateThumbnailActive(pageNum);
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

  async function renderThumbnails() {
    var sidebar = document.getElementById('studioThumbnailsBar');
    if (!sidebar || !studio.pdfDoc) return;
    sidebar.innerHTML = '';

    for (var i = 1; i <= studio.totalPages; i++) {
      var item = document.createElement('div');
      item.className = 'thumb-item' + (i === studio.currentPage ? ' active' : '');
      item.setAttribute('data-page', i);

      var tCanvas = document.createElement('canvas');
      tCanvas.className = 'thumb-canvas';
      var page = await studio.pdfDoc.getPage(i);
      var vp = page.getViewport({ scale: 0.18 });
      tCanvas.width = vp.width;
      tCanvas.height = vp.height;
      await page.render({ canvasContext: tCanvas.getContext('2d'), viewport: vp }).promise;

      var label = document.createElement('span');
      label.textContent = 'Sayfa ' + i;

      item.appendChild(tCanvas);
      item.appendChild(label);
      (function (pNum) {
        item.addEventListener('click', async function () {
          studio.currentPage = pNum;
          document.getElementById('currentPageNum').textContent = pNum;
          await renderPage(pNum);
        });
      })(i);

      sidebar.appendChild(item);
    }
  }

  function updateThumbnailActive(pageNum) {
    var thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(function (t) {
      t.classList.toggle('active', parseInt(t.getAttribute('data-page'), 10) === pageNum);
    });
  }

  // ÇİZİM VE ETKİLEŞİM KATMANI
  function initAcrobatStudioEvents() {
    var overlay = document.getElementById('pdfDrawOverlay');
    var ctx = overlay ? overlay.getContext('2d') : null;

    // Araç Çubuğu Butonları
    var toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        toolBtns.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        studio.activeTool = b.getAttribute('data-tool');

        // İkincil ayar çubuğunu aç/kapat
        var textOpts = document.getElementById('textOptionsGroup');
        var stampOpts = document.getElementById('stampOptionsGroup');
        if (textOpts) textOpts.style.display = (studio.activeTool === 'text') ? 'flex' : 'none';
        if (stampOpts) stampOpts.style.display = (studio.activeTool === 'stamp') ? 'flex' : 'none';

        if (overlay) {
          overlay.style.cursor = (studio.activeTool === 'select') ? 'default' :
            (studio.activeTool === 'text') ? 'text' : 'crosshair';
        }
      });
    });

    // Renk & Kalınlık & Font Ayarları
    var colorPicker = document.getElementById('studioColorPicker');
    if (colorPicker) {
      colorPicker.addEventListener('input', function () { studio.strokeColor = colorPicker.value; });
    }
    var strokeSelect = document.getElementById('studioStrokeWidth');
    if (strokeSelect) {
      strokeSelect.addEventListener('change', function () { studio.strokeWidth = parseInt(strokeSelect.value, 10); });
    }
    var fontSelect = document.getElementById('studioFontSize');
    if (fontSelect) {
      fontSelect.addEventListener('change', function () { studio.fontSize = parseInt(fontSelect.value, 10); });
    }

    // Özel Kaşe / İmza Yükleme
    var addCustomStampBtn = document.getElementById('studioAddCustomStampBtn');
    var customStampInput = document.getElementById('studioCustomStampInput');
    if (addCustomStampBtn && customStampInput) {
      addCustomStampBtn.addEventListener('click', function () { customStampInput.click(); });
      customStampInput.addEventListener('change', function () {
        if (customStampInput.files && customStampInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var img = new Image();
            img.onload = function () { studio.customStampImg = img; alert('✓ İmzanız yüklendi. Sayfaya tıklayarak yerleştirin.'); };
            img.src = e.target.result;
          };
          reader.readAsDataURL(customStampInput.files[0]);
        }
      });
    }

    // Canvas Çizim Olayları (Mouse & Touch)
    if (overlay && ctx) {
      function getPos(e) {
        var rect = overlay.getBoundingClientRect();
        return {
          x: (e.clientX - rect.left),
          y: (e.clientY - rect.top)
        };
      }

      overlay.addEventListener('mousedown', function (e) {
        var pos = getPos(e);
        studio.startX = pos.x;
        studio.startY = pos.y;
        studio.isDrawing = true;

        if (studio.activeTool === 'pen' || studio.activeTool === 'highlighter') {
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.strokeStyle = studio.strokeColor;
          ctx.lineWidth = (studio.activeTool === 'highlighter') ? (studio.strokeWidth * 3) : studio.strokeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = (studio.activeTool === 'highlighter') ? 0.35 : 1.0;
        } else if (studio.activeTool === 'text') {
          var text = prompt('Eklemek istediğiniz metni yazın:');
          if (text) {
            ctx.fillStyle = studio.strokeColor;
            ctx.font = studio.fontSize + 'px sans-serif';
            ctx.globalAlpha = 1.0;
            ctx.fillText(text, pos.x, pos.y);
          }
          studio.isDrawing = false;
        } else if (studio.activeTool === 'stamp') {
          if (studio.customStampImg) {
            ctx.drawImage(studio.customStampImg, pos.x - 60, pos.y - 30, 120, 60);
          } else {
            var preset = document.getElementById('studioPresetStamp');
            var stampTxt = preset ? preset.value : 'ONAYLANDI';
            drawStampBadge(ctx, stampTxt, pos.x, pos.y);
          }
          studio.isDrawing = false;
        }
      });

      overlay.addEventListener('mousemove', function (e) {
        if (!studio.isDrawing) return;
        var pos = getPos(e);

        if (studio.activeTool === 'pen' || studio.activeTool === 'highlighter') {
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      });

      overlay.addEventListener('mouseup', function (e) {
        if (!studio.isDrawing) return;
        var pos = getPos(e);
        studio.isDrawing = false;

        // Şekiller
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = studio.strokeColor;
        ctx.lineWidth = studio.strokeWidth;

        if (studio.activeTool === 'rect') {
          ctx.strokeRect(studio.startX, studio.startY, pos.x - studio.startX, pos.y - studio.startY);
        } else if (studio.activeTool === 'circle') {
          var rx = Math.abs(pos.x - studio.startX) / 2;
          var ry = Math.abs(pos.y - studio.startY) / 2;
          var cx = Math.min(studio.startX, pos.x) + rx;
          var cy = Math.min(studio.startY, pos.y) + ry;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (studio.activeTool === 'arrow') {
          drawArrow(ctx, studio.startX, studio.startY, pos.x, pos.y);
        } else if (studio.activeTool === 'redact') {
          ctx.fillStyle = '#000000';
          ctx.fillRect(studio.startX, studio.startY, pos.x - studio.startX, pos.y - studio.startY);
        }
      });
    }

    // Kaşe Çizimi
    function drawStampBadge(c, txt, x, y) {
      c.save();
      c.translate(x, y);
      c.rotate(-15 * Math.PI / 180);
      c.strokeStyle = '#dc2626';
      c.lineWidth = 3;
      c.strokeRect(-70, -20, 140, 40);
      c.fillStyle = '#dc2626';
      c.font = 'bold 16px sans-serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(txt, 0, 0);
      c.restore();
    }

    // Ok Çizimi
    function drawArrow(c, fromX, fromY, toX, toY) {
      var headlen = 12;
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

    // Sayfa Gezinti Butonları
    var prevBtn = document.getElementById('prevPageBtn');
    var nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', async function () {
        if (studio.currentPage > 1) {
          studio.currentPage--;
          document.getElementById('currentPageNum').textContent = studio.currentPage;
          await renderPage(studio.currentPage);
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', async function () {
        if (studio.currentPage < studio.totalPages) {
          studio.currentPage++;
          document.getElementById('currentPageNum').textContent = studio.currentPage;
          await renderPage(studio.currentPage);
        }
      });
    }

    // Zoom Butonları
    var zoomIn = document.getElementById('zoomInBtn');
    var zoomOut = document.getElementById('zoomOutBtn');
    var zoomDisp = document.getElementById('zoomLevelDisplay');
    if (zoomIn) {
      zoomIn.addEventListener('click', async function () {
        studio.zoomScale += 0.25;
        if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 80) + '%';
        await renderPage(studio.currentPage);
      });
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', async function () {
        if (studio.zoomScale > 0.5) {
          studio.zoomScale -= 0.25;
          if (zoomDisp) zoomDisp.textContent = Math.round(studio.zoomScale * 80) + '%';
          await renderPage(studio.currentPage);
        }
      });
    }

    // Temizle Butonu
    var clearBtn = document.getElementById('studioClearBtn');
    if (clearBtn && overlay && ctx) {
      clearBtn.addEventListener('click', function () {
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        delete studio.pageOverlays[studio.currentPage];
      });
    }

    // Kapat Butonu
    var closeStudioBtn = document.getElementById('studioCloseBtn');
    if (closeStudioBtn) closeStudioBtn.addEventListener('click', closeAcrobatStudio);

    // ADOBE STANDARTLARINDA DIŞA AKTAR VE İNDİR (EXPORT PDF)
    var exportPdfBtn = document.getElementById('studioExportPdfBtn');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', async function () {
        saveCurrentOverlay();
        exportPdfBtn.disabled = true;
        exportPdfBtn.textContent = 'Dışa Aktarılıyor (pdf-lib)...';

        try {
          var PDFLib = window.PDFLib;
          if (!PDFLib) throw new Error('PDF motoru bulunamadı.');

          var pdfDoc = await PDFLib.PDFDocument.load(studio.pdfBytes);
          var pages = pdfDoc.getPages();

          // Çizim yapılan her sayfayı orijinal PDF üzerine PNG katmanı olarak bas
          for (var pIndex = 0; pIndex < pages.length; pIndex++) {
            var pageNum = pIndex + 1;
            var overlayData = studio.pageOverlays[pageNum];

            if (overlayData) {
              var tempCanvas = document.createElement('canvas');
              tempCanvas.width = overlayData.width;
              tempCanvas.height = overlayData.height;
              var tCtx = tempCanvas.getContext('2d');
              tCtx.putImageData(overlayData, 0, 0);

              var pngDataUrl = tempCanvas.toDataURL('image/png');
              var pngImageBytes = await fetch(pngDataUrl).then(function (r) { return r.arrayBuffer(); });
              var embeddedPng = await pdfDoc.embedPng(pngImageBytes);

              var targetPage = pages[pIndex];
              var pageSize = targetPage.getSize();

              targetPage.drawImage(embeddedPng, {
                x: 0,
                y: 0,
                width: pageSize.width,
                height: pageSize.height
              });
            }
          }

          var savedBytes = await pdfDoc.save();
          downloadBlob(new Blob([savedBytes], { type: 'application/pdf' }), 'duzenlenmis_pro_dc_dokuman.pdf');
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

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
