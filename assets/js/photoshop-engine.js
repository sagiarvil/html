/**
 * HTML&HTML Web Photoshop Studio — Yerel & Profesyonel Grafik İşleme Motoru
 * Sıfır Sunucu Yüklemesi (%100 Yerel İstemci Belleğinde Çalışır)
 */
(function (window, document) {
  'use strict';

  var canvas = null;
  var ctx = null;
  var originalImage = null;
  var history = [];

  var state = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    invert: 0,
    rotation: 0,
    flipH: 1,
    flipV: 1,
    activeTool: 'move',
    brushColor: '#2563eb',
    brushSize: 5,
    isDrawing: false
  };

  function init() {
    canvas = document.getElementById('psMainCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    bindEvents();
    bindFilters();
    bindPhotopeaSwitch();
  }

  function bindEvents() {
    var fileInput = document.getElementById('psFileInput');
    var openBtn = document.getElementById('psOpenFileBtn');
    var dropzone = document.getElementById('psEmptyDropzone');

    if (openBtn && fileInput) {
      openBtn.addEventListener('click', function () { fileInput.click(); });
    }
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', function () { fileInput.click(); });
      dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('dragover'); });
      dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('dragover'); });
      dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          loadFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files[0]) {
          loadFile(fileInput.files[0]);
        }
      });
    }

    // Çizim & Araç Olayları
    canvas.addEventListener('mousedown', function (e) {
      if (state.activeTool !== 'brush') return;
      state.isDrawing = true;
      var pos = getCanvasPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = state.brushColor;
      ctx.lineWidth = state.brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    });

    canvas.addEventListener('mousemove', function (e) {
      if (!state.isDrawing || state.activeTool !== 'brush') return;
      var pos = getCanvasPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    });

    canvas.addEventListener('mouseup', function () {
      if (state.isDrawing) {
        state.isDrawing = false;
        saveState();
      }
    });

    // Araç Çubuğu Butonları
    var toolBtns = document.querySelectorAll('.ps-tool-btn');
    toolBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toolBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.activeTool = btn.getAttribute('data-tool');

        if (state.activeTool === 'text') {
          var txt = prompt('Eklenecek metni girin:');
          if (txt) {
            ctx.fillStyle = state.brushColor;
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText(txt, canvas.width / 2 - 50, canvas.height / 2);
            saveState();
          }
        }
      });
    });

    // Fırça & Renk
    var brushColorInput = document.getElementById('psBrushColor');
    if (brushColorInput) {
      brushColorInput.addEventListener('input', function () { state.brushColor = brushColorInput.value; });
    }
    var brushSizeSelect = document.getElementById('psBrushSize');
    if (brushSizeSelect) {
      brushSizeSelect.addEventListener('change', function () { state.brushSize = parseInt(brushSizeSelect.value, 10); });
    }

    // Döndürme & Çevirme
    var rotateLeftBtn = document.getElementById('psRotateLeft');
    var rotateRightBtn = document.getElementById('psRotateRight');
    var flipHBtn = document.getElementById('psFlipH');
    var flipVBtn = document.getElementById('psFlipV');

    if (rotateLeftBtn) {
      rotateLeftBtn.addEventListener('click', function () { state.rotation = (state.rotation - 90) % 360; applyFilters(); });
    }
    if (rotateRightBtn) {
      rotateRightBtn.addEventListener('click', function () { state.rotation = (state.rotation + 90) % 360; applyFilters(); });
    }
    if (flipHBtn) {
      flipHBtn.addEventListener('click', function () { state.flipH *= -1; applyFilters(); });
    }
    if (flipVBtn) {
      flipVBtn.addEventListener('click', function () { state.flipV *= -1; applyFilters(); });
    }

    // Dışa Aktar (Export)
    var exportPngBtn = document.getElementById('psExportPng');
    var exportJpgBtn = document.getElementById('psExportJpg');
    if (exportPngBtn) {
      exportPngBtn.addEventListener('click', function () { exportImage('image/png', 'proje.png'); });
    }
    if (exportJpgBtn) {
      exportJpgBtn.addEventListener('click', function () { exportImage('image/jpeg', 'proje.jpg'); });
    }

    // Sıfırla & Geri Al
    var resetBtn = document.getElementById('psResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state.brightness = 100;
        state.contrast = 100;
        state.saturation = 100;
        state.blur = 0;
        state.grayscale = 0;
        state.invert = 0;
        state.rotation = 0;
        state.flipH = 1;
        state.flipV = 1;
        resetFilterInputs();
        applyFilters();
      });
    }

    var undoBtn = document.getElementById('psUndoBtn');
    if (undoBtn) {
      undoBtn.addEventListener('click', function () {
        if (history.length > 1) {
          history.pop();
          var prev = history[history.length - 1];
          ctx.putImageData(prev, 0, 0);
        }
      });
    }
  }

  function loadFile(file) {
    var ext = file.name.split('.').pop().toLowerCase();
    var reader = new FileReader();

    // Eğer dosya PSD, AI, XD veya Sketch ise doğrudan Photopea motorunu başlat
    if (['psd', 'ai', 'xd', 'sketch', 'xcf'].indexOf(ext) !== -1) {
      switchToPhotopea(file);
      return;
    }

    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        originalImage = img;
        canvas.width = img.width;
        canvas.height = img.height;
        applyFilters();
        document.getElementById('psEmptyDropzone').style.display = 'none';
        document.getElementById('psCanvasWrapper').style.display = 'block';
        document.getElementById('psImageInfo').textContent = file.name + ' (' + img.width + 'x' + img.height + ' px)';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function bindFilters() {
    var filters = ['brightness', 'contrast', 'saturation', 'blur', 'grayscale', 'invert'];
    filters.forEach(function (f) {
      var el = document.getElementById('psRange_' + f);
      if (el) {
        el.addEventListener('input', function () {
          state[f] = parseFloat(el.value);
          var valDisp = document.getElementById('psVal_' + f);
          if (valDisp) valDisp.textContent = el.value;
          applyFilters();
        });
      }
    });
  }

  function resetFilterInputs() {
    var defaults = { brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, invert: 0 };
    for (var k in defaults) {
      var el = document.getElementById('psRange_' + k);
      var disp = document.getElementById('psVal_' + k);
      if (el) el.value = defaults[k];
      if (disp) disp.textContent = defaults[k];
    }
  }

  function applyFilters() {
    if (!originalImage || !ctx) return;

    var filterStr = 'brightness(' + state.brightness + '%) ' +
      'contrast(' + state.contrast + '%) ' +
      'saturate(' + state.saturation + '%) ' +
      'blur(' + state.blur + 'px) ' +
      'grayscale(' + state.grayscale + '%) ' +
      'invert(' + state.invert + '%)';

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = filterStr;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.scale(state.flipH, state.flipV);

    ctx.drawImage(originalImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();

    saveState();
  }

  function saveState() {
    if (!ctx) return;
    if (history.length > 15) history.shift();
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }

  function getCanvasPos(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function exportImage(format, filename) {
    var dataUrl = canvas.toDataURL(format, 0.95);
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // PHOTOPEA PRO ENTEGRASYONU (Tam Kapsamlı Adobe Photoshop Klonu)
  function bindPhotopeaSwitch() {
    var modeNativeBtn = document.getElementById('modeNativeBtn');
    var modePhotopeaBtn = document.getElementById('modePhotopeaBtn');
    var nativeEditor = document.getElementById('psNativeEditor');
    var photopeaContainer = document.getElementById('psPhotopeaContainer');

    if (modeNativeBtn && modePhotopeaBtn) {
      modeNativeBtn.addEventListener('click', function () {
        modeNativeBtn.classList.add('active');
        modePhotopeaBtn.classList.remove('active');
        nativeEditor.style.display = 'flex';
        photopeaContainer.style.display = 'none';
      });

      modePhotopeaBtn.addEventListener('click', function () {
        modePhotopeaBtn.classList.add('active');
        modeNativeBtn.classList.remove('active');
        nativeEditor.style.display = 'none';
        photopeaContainer.style.display = 'block';
        loadPhotopeaIframe();
      });
    }
  }

  function loadPhotopeaIframe() {
    var iframe = document.getElementById('photopeaIframe');
    if (iframe && !iframe.src) {
      iframe.src = 'https://www.photopea.com';
    }
  }

  function switchToPhotopea(file) {
    var modePhotopeaBtn = document.getElementById('modePhotopeaBtn');
    var modeNativeBtn = document.getElementById('modeNativeBtn');
    var nativeEditor = document.getElementById('psNativeEditor');
    var photopeaContainer = document.getElementById('psPhotopeaContainer');

    if (modePhotopeaBtn) modePhotopeaBtn.classList.add('active');
    if (modeNativeBtn) modeNativeBtn.classList.remove('active');
    if (nativeEditor) nativeEditor.style.display = 'none';
    if (photopeaContainer) photopeaContainer.style.display = 'block';

    loadPhotopeaIframe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window, document);
