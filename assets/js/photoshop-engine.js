/**
 * HTML&HTML Web Photoshop Studio — %100 Yerel İstemci Motoru
 * Sıfır İframe, Sıfır Dış Sunucu Hatası, Katmanlı & Gerçek Photoshop Klonu
 */
(function (window, document) {
  'use strict';

  // Master State
  var state = {
    docWidth: 1080,
    docHeight: 1080,
    zoom: 1,
    panX: 0,
    panY: 0,
    activeTool: 'move', // move, select, lasso, crop, eyedropper, brush, clone, eraser, bucket, text, shape, hand, zoom
    primaryColor: '#38bdf8',
    secondaryColor: '#ffffff',
    brushSize: 10,
    brushOpacity: 1,
    brushHardness: 0.8,
    activeLayerId: 1,
    nextLayerId: 2,
    shapeType: 'rect', // rect, circle, line
    cropRect: null,
    isInteracting: false,
    lastMousePos: { x: 0, y: 0 },
    history: [],
    historyIndex: -1,
    maxHistory: 30,
    cloneSource: null,
    lassoPoints: [],
    selectionRect: null
  };

  // Layers Array: [{ id: 1, name: 'Katman 1', visible: true, opacity: 1, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }]
  var layers = [];

  // DOM Elements
  var dom = {};

  function init() {
    cacheDom();
    if (!dom.viewport) return; // Not on photoshop page/modal

    bindMenuEvents();
    bindToolbarEvents();
    bindDockEvents();
    bindViewportEvents();
    bindNewDocModalEvents();
    bindKeyboardShortcuts();

    // Default document initialization
    createNewDocument(1080, 1080, '#ffffff');
  }

  function cacheDom() {
    dom.container = document.querySelector('.ps-clone-app');
    dom.viewport = document.getElementById('psViewport');
    dom.canvasContainer = document.getElementById('psCanvasContainer');
    dom.displayCanvas = document.getElementById('psDisplayCanvas');
    if (dom.displayCanvas) {
      dom.displayCtx = dom.displayCanvas.getContext('2d');
    }

    // Panels
    dom.layerList = document.getElementById('psLayerList');
    dom.historyList = document.getElementById('psHistoryList');
    dom.layerOpacity = document.getElementById('psLayerOpacity');
    dom.layerOpacityVal = document.getElementById('psLayerOpacityVal');
    dom.zoomLevel = document.getElementById('psZoomLevel');
    dom.docDims = document.getElementById('psDocDims');

    // Controls
    dom.primaryColorPicker = document.getElementById('psPrimaryColor');
    dom.secondaryColorPicker = document.getElementById('psSecondaryColor');
    dom.swapColorsBtn = document.getElementById('psSwapColors');
    dom.brushSizeInput = document.getElementById('psBrushSize');
    dom.brushOpacityInput = document.getElementById('psBrushOpacity');
    dom.shapeSelect = document.getElementById('psShapeSelect');

    // File input
    dom.fileInput = document.getElementById('psGlobalFileInput');
  }

  // ==========================================
  // DOCUMENT & LAYER MANAGEMENT
  // ==========================================
  function createNewDocument(width, height, bgType) {
    state.docWidth = parseInt(width, 10) || 1080;
    state.docHeight = parseInt(height, 10) || 1080;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    layers = [];
    state.nextLayerId = 1;
    state.history = [];
    state.historyIndex = -1;

    // Sizing display canvas
    if (dom.displayCanvas) {
      dom.displayCanvas.width = state.docWidth;
      dom.displayCanvas.height = state.docHeight;
      dom.canvasContainer.style.width = state.docWidth + 'px';
      dom.canvasContainer.style.height = state.docHeight + 'px';
    }

    // Create Background Layer
    var bgLayer = createLayerObject('Arka Plan', 1);
    var bgCtx = bgLayer.ctx;

    if (bgType === '#ffffff' || bgType === 'white') {
      bgCtx.fillStyle = '#ffffff';
      bgCtx.fillRect(0, 0, state.docWidth, state.docHeight);
    } else if (bgType === '#000000' || bgType === 'black') {
      bgCtx.fillStyle = '#000000';
      bgCtx.fillRect(0, 0, state.docWidth, state.docHeight);
    } // else transparent (empty canvas)

    layers.push(bgLayer);
    state.activeLayerId = bgLayer.id;

    // Reset center zoom
    centerViewport();
    renderLayers();
    updateLayerListUI();
    pushHistory('Yeni Belge');
    updateDocStatusUI();
  }

  function createLayerObject(name, opacity) {
    var c = document.createElement('canvas');
    c.width = state.docWidth;
    c.height = state.docHeight;
    var ctx = c.getContext('2d');
    var id = state.nextLayerId++;
    return {
      id: id,
      name: name || ('Katman ' + id),
      visible: true,
      opacity: typeof opacity === 'number' ? opacity : 1,
      canvas: c,
      ctx: ctx
    };
  }

  function getActiveLayer() {
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].id === state.activeLayerId) return layers[i];
    }
    return layers[layers.length - 1] || null;
  }

  function addNewLayer() {
    var newL = createLayerObject('Katman ' + state.nextLayerId, 1);
    layers.push(newL);
    state.activeLayerId = newL.id;
    updateLayerListUI();
    pushHistory('Yeni Katman');
  }

  function duplicateActiveLayer() {
    var active = getActiveLayer();
    if (!active) return;
    var copy = createLayerObject(active.name + ' Kopya', active.opacity);
    copy.ctx.drawImage(active.canvas, 0, 0);
    layers.push(copy);
    state.activeLayerId = copy.id;
    renderLayers();
    updateLayerListUI();
    pushHistory('Katmanı Çoğalt');
  }

  function deleteActiveLayer() {
    if (layers.length <= 1) {
      alert('En az bir katman bulunmalıdır.');
      return;
    }
    var idx = -1;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].id === state.activeLayerId) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      layers.splice(idx, 1);
      state.activeLayerId = layers[Math.max(0, idx - 1)].id;
      renderLayers();
      updateLayerListUI();
      pushHistory('Katmanı Sil');
    }
  }

  function renderLayers() {
    if (!dom.displayCtx) return;
    dom.displayCtx.clearRect(0, 0, state.docWidth, state.docHeight);

    for (var i = 0; i < layers.length; i++) {
      var l = layers[i];
      if (l.visible && l.opacity > 0) {
        dom.displayCtx.save();
        dom.displayCtx.globalAlpha = l.opacity;
        dom.displayCtx.drawImage(l.canvas, 0, 0);
        dom.displayCtx.restore();
      }
    }
  }

  // ==========================================
  // VIEWPORT, ZOOM & PAN
  // ==========================================
  function updateViewportTransform() {
    if (!dom.canvasContainer) return;
    dom.canvasContainer.style.transform = 'translate(' + state.panX + 'px, ' + state.panY + 'px) scale(' + state.zoom + ')';
    if (dom.zoomLevel) {
      dom.zoomLevel.textContent = Math.round(state.zoom * 100) + '%';
    }
  }

  function centerViewport() {
    if (!dom.viewport) return;
    var rect = dom.viewport.getBoundingClientRect();
    if (rect.width <= 0) return;
    state.zoom = Math.min((rect.width - 80) / state.docWidth, (rect.height - 80) / state.docHeight, 1);
    if (state.zoom <= 0) state.zoom = 1;
    state.panX = (rect.width - state.docWidth * state.zoom) / 2;
    state.panY = (rect.height - state.docHeight * state.zoom) / 2;
    updateViewportTransform();
  }

  function setZoom(newZoom, centerX, centerY) {
    newZoom = Math.max(0.1, Math.min(newZoom, 10));
    if (!dom.viewport) return;
    var rect = dom.viewport.getBoundingClientRect();
    var cx = typeof centerX === 'number' ? centerX : rect.width / 2;
    var cy = typeof centerY === 'number' ? centerY : rect.height / 2;

    var curX = (cx - state.panX) / state.zoom;
    var curY = (cy - state.panY) / state.zoom;

    state.zoom = newZoom;
    state.panX = cx - curX * state.zoom;
    state.panY = cy - curY * state.zoom;
    updateViewportTransform();
  }

  // ==========================================
  // HISTORY (UNDO / REDO)
  // ==========================================
  function pushHistory(actionName) {
    // Truncate future if branching
    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }

    // Save snapshot of all layers
    var layersSnapshot = layers.map(function (l) {
      var copy = document.createElement('canvas');
      copy.width = l.canvas.width;
      copy.height = l.canvas.height;
      copy.getContext('2d').drawImage(l.canvas, 0, 0);
      return {
        id: l.id,
        name: l.name,
        visible: l.visible,
        opacity: l.opacity,
        canvas: copy
      };
    });

    state.history.push({
      action: actionName,
      layers: layersSnapshot,
      activeLayerId: state.activeLayerId,
      docWidth: state.docWidth,
      docHeight: state.docHeight
    });

    if (state.history.length > state.maxHistory) {
      state.history.shift();
    }
    state.historyIndex = state.history.length - 1;
    updateHistoryListUI();
  }

  function undo() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      restoreHistorySnapshot(state.history[state.historyIndex]);
      updateHistoryListUI();
    }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      restoreHistorySnapshot(state.history[state.historyIndex]);
      updateHistoryListUI();
    }
  }

  function restoreHistorySnapshot(snap) {
    if (!snap) return;
    state.docWidth = snap.docWidth;
    state.docHeight = snap.docHeight;
    dom.displayCanvas.width = state.docWidth;
    dom.displayCanvas.height = state.docHeight;
    dom.canvasContainer.style.width = state.docWidth + 'px';
    dom.canvasContainer.style.height = state.docHeight + 'px';

    layers = snap.layers.map(function (s) {
      var c = document.createElement('canvas');
      c.width = s.canvas.width;
      c.height = s.canvas.height;
      var ctx = c.getContext('2d');
      ctx.drawImage(s.canvas, 0, 0);
      return {
        id: s.id,
        name: s.name,
        visible: s.visible,
        opacity: s.opacity,
        canvas: c,
        ctx: ctx
      };
    });

    state.activeLayerId = snap.activeLayerId;
    renderLayers();
    updateLayerListUI();
    updateDocStatusUI();
  }

  // ==========================================
  // TOOL IMPLEMENTATIONS
  // ==========================================
  function getCanvasCoords(clientX, clientY) {
    var rect = dom.canvasContainer.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / state.zoom,
      y: (clientY - rect.top) / state.zoom
    };
  }

  function bindViewportEvents() {
    var vp = dom.viewport;
    if (!vp) return;

    // Mouse Wheel Zoom
    vp.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = vp.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;
      var factor = e.deltaY < 0 ? 1.15 : 0.85;
      setZoom(state.zoom * factor, cx, cy);
    }, { passive: false });

    // Pointer events on canvas container
    vp.addEventListener('mousedown', function (e) {
      if (e.button === 1 || state.activeTool === 'hand' || e.spaceKey) {
        state.isInteracting = true;
        state.isPanning = true;
        state.lastMousePos = { x: e.clientX, y: e.clientY };
        vp.style.cursor = 'grabbing';
        return;
      }

      var coords = getCanvasCoords(e.clientX, e.clientY);
      var layer = getActiveLayer();
      if (!layer) return;

      state.isInteracting = true;
      state.startCoords = coords;
      state.lastCoords = coords;

      if (state.activeTool === 'brush') {
        drawBrush(layer.ctx, coords.x, coords.y, false);
        renderLayers();
      } else if (state.activeTool === 'eraser') {
        drawEraser(layer.ctx, coords.x, coords.y, false);
        renderLayers();
      } else if (state.activeTool === 'eyedropper') {
        pickColor(coords.x, coords.y);
      } else if (state.activeTool === 'bucket') {
        floodFill(layer.ctx, Math.round(coords.x), Math.round(coords.y), state.primaryColor);
        renderLayers();
        pushHistory('Boya Kovası');
      } else if (state.activeTool === 'text') {
        placeText(coords.x, coords.y);
      } else if (state.activeTool === 'zoom') {
        var rect = vp.getBoundingClientRect();
        var factor = e.shiftKey ? 0.7 : 1.4;
        setZoom(state.zoom * factor, e.clientX - rect.left, e.clientY - rect.top);
      } else if (state.activeTool === 'clone') {
        if (e.altKey) {
          state.cloneSource = { x: coords.x, y: coords.y };
          alert('Klonlama kaynağı belirlendi: (' + Math.round(coords.x) + ', ' + Math.round(coords.y) + ')');
        } else if (state.cloneSource) {
          applyCloneStamp(layer.ctx, coords.x, coords.y);
          renderLayers();
        } else {
          alert('Lütfen önce Alt tuşuna basılı tutarak klonlanacak kaynak noktaya tıklayın.');
        }
      }
    });

    window.addEventListener('mousemove', function (e) {
      if (!state.isInteracting) return;

      if (state.isPanning) {
        var dx = e.clientX - state.lastMousePos.x;
        var dy = e.clientY - state.lastMousePos.y;
        state.panX += dx;
        state.panY += dy;
        state.lastMousePos = { x: e.clientX, y: e.clientY };
        updateViewportTransform();
        return;
      }

      var coords = getCanvasCoords(e.clientX, e.clientY);
      var layer = getActiveLayer();
      if (!layer) return;

      if (state.activeTool === 'brush') {
        drawBrush(layer.ctx, coords.x, coords.y, true);
        renderLayers();
      } else if (state.activeTool === 'eraser') {
        drawEraser(layer.ctx, coords.x, coords.y, true);
        renderLayers();
      } else if (state.activeTool === 'move') {
        var mdx = coords.x - state.lastCoords.x;
        var mdy = coords.y - state.lastCoords.y;
        moveLayer(layer, mdx, mdy);
        renderLayers();
      } else if (state.activeTool === 'shape' || state.activeTool === 'select' || state.activeTool === 'crop') {
        // Preview overlay
        renderLayers();
        drawShapePreview(coords.x, coords.y);
      }

      state.lastCoords = coords;
    });

    window.addEventListener('mouseup', function (e) {
      if (!state.isInteracting) return;

      if (state.isPanning) {
        state.isPanning = false;
        state.isInteracting = false;
        vp.style.cursor = '';
        return;
      }

      state.isInteracting = false;
      var layer = getActiveLayer();
      var coords = getCanvasCoords(e.clientX, e.clientY);

      if (state.activeTool === 'brush') {
        pushHistory('Fırça Çizimi');
      } else if (state.activeTool === 'eraser') {
        pushHistory('Silgi');
      } else if (state.activeTool === 'move') {
        pushHistory('Katmanı Taşı');
      } else if (state.activeTool === 'shape' && layer) {
        commitShape(layer.ctx, state.startCoords.x, state.startCoords.y, coords.x, coords.y);
        renderLayers();
        pushHistory('Şekil Çizimi');
      } else if (state.activeTool === 'crop') {
        executeCrop(state.startCoords.x, state.startCoords.y, coords.x, coords.y);
      }
    });
  }

  // Brush logic
  function drawBrush(ctx, x, y, isLine) {
    ctx.save();
    ctx.globalAlpha = state.brushOpacity;
    ctx.strokeStyle = state.primaryColor;
    ctx.fillStyle = state.primaryColor;
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isLine && state.lastCoords) {
      ctx.beginPath();
      ctx.moveTo(state.lastCoords.x, state.lastCoords.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, state.brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Eraser logic
  function drawEraser(ctx, x, y, isLine) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isLine && state.lastCoords) {
      ctx.beginPath();
      ctx.moveTo(state.lastCoords.x, state.lastCoords.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, state.brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Eyedropper logic
  function pickColor(x, y) {
    if (!dom.displayCtx) return;
    var cx = Math.max(0, Math.min(state.docWidth - 1, Math.round(x)));
    var cy = Math.max(0, Math.min(state.docHeight - 1, Math.round(y)));
    var px = dom.displayCtx.getImageData(cx, cy, 1, 1).data;
    var hex = '#' + ((1 << 24) + (px[0] << 16) + (px[1] << 8) + px[2]).toString(16).slice(1);
    state.primaryColor = hex;
    if (dom.primaryColorPicker) dom.primaryColorPicker.value = hex;
  }

  // Text placement
  function placeText(x, y) {
    var txt = prompt('Eklenecek metni yazın:');
    if (!txt) return;
    var size = prompt('Font boyutu (px):', '36');
    var layer = getActiveLayer();
    if (!layer) return;

    layer.ctx.save();
    layer.ctx.font = 'bold ' + (parseInt(size, 10) || 36) + 'px sans-serif';
    layer.ctx.fillStyle = state.primaryColor;
    layer.ctx.fillText(txt, x, y);
    layer.ctx.restore();

    renderLayers();
    pushHistory('Metin Ekle: ' + txt.slice(0, 10));
  }

  // Shapes preview & commit
  function drawShapePreview(currentX, currentY) {
    if (!dom.displayCtx) return;
    var x = Math.min(state.startCoords.x, currentX);
    var y = Math.min(state.startCoords.y, currentY);
    var w = Math.abs(currentX - state.startCoords.x);
    var h = Math.abs(currentY - state.startCoords.y);

    dom.displayCtx.save();
    dom.displayCtx.strokeStyle = state.primaryColor;
    dom.displayCtx.lineWidth = 2;
    dom.displayCtx.setLineDash([4, 4]);

    if (state.activeTool === 'crop' || state.shapeType === 'rect' || state.activeTool === 'select') {
      dom.displayCtx.strokeRect(x, y, w, h);
    } else if (state.shapeType === 'circle') {
      dom.displayCtx.beginPath();
      dom.displayCtx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      dom.displayCtx.stroke();
    } else if (state.shapeType === 'line') {
      dom.displayCtx.beginPath();
      dom.displayCtx.moveTo(state.startCoords.x, state.startCoords.y);
      dom.displayCtx.lineTo(currentX, currentY);
      dom.displayCtx.stroke();
    }
    dom.displayCtx.restore();
  }

  function commitShape(ctx, startX, startY, endX, endY) {
    var x = Math.min(startX, endX);
    var y = Math.min(startY, endY);
    var w = Math.abs(endX - startX);
    var h = Math.abs(endY - startY);

    ctx.save();
    ctx.fillStyle = state.primaryColor;
    ctx.strokeStyle = state.secondaryColor;
    ctx.lineWidth = Math.max(1, state.brushSize);

    if (state.shapeType === 'rect') {
      ctx.fillRect(x, y, w, h);
      if (state.brushSize > 0) ctx.strokeRect(x, y, w, h);
    } else if (state.shapeType === 'circle') {
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      if (state.brushSize > 0) ctx.stroke();
    } else if (state.shapeType === 'line') {
      ctx.strokeStyle = state.primaryColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Move layer
  function moveLayer(layer, dx, dy) {
    var temp = document.createElement('canvas');
    temp.width = layer.canvas.width;
    temp.height = layer.canvas.height;
    temp.getContext('2d').drawImage(layer.canvas, 0, 0);

    layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    layer.ctx.drawImage(temp, dx, dy);
  }

  // Clone Stamp
  function applyCloneStamp(ctx, x, y) {
    if (!state.cloneSource) return;
    var radius = state.brushSize;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    // Copy from display canvas (composite) at cloneSource
    var sx = state.cloneSource.x - radius;
    var sy = state.cloneSource.y - radius;
    ctx.drawImage(dom.displayCanvas, sx, sy, radius * 2, radius * 2, x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  // Crop execution
  function executeCrop(startX, startY, endX, endY) {
    var x = Math.round(Math.min(startX, endX));
    var y = Math.round(Math.min(startY, endY));
    var w = Math.round(Math.abs(endX - startX));
    var h = Math.round(Math.abs(endY - startY));

    if (w < 10 || h < 10) return;
    if (!confirm(w + 'x' + h + ' boyutunda kırpılsın mı?')) {
      renderLayers();
      return;
    }

    state.docWidth = w;
    state.docHeight = h;
    dom.displayCanvas.width = w;
    dom.displayCanvas.height = h;
    dom.canvasContainer.style.width = w + 'px';
    dom.canvasContainer.style.height = h + 'px';

    layers.forEach(function (l) {
      var temp = document.createElement('canvas');
      temp.width = w;
      temp.height = h;
      temp.getContext('2d').drawImage(l.canvas, x, y, w, h, 0, 0, w, h);
      l.canvas.width = w;
      l.canvas.height = h;
      l.ctx.drawImage(temp, 0, 0);
    });

    centerViewport();
    renderLayers();
    pushHistory('Kırpma (' + w + 'x' + h + ')');
    updateDocStatusUI();
  }

  // Flood Fill
  function floodFill(ctx, startX, startY, fillColor) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    if (startX < 0 || startX >= w || startY < 0 || startY >= h) return;

    var imgData = ctx.getImageData(0, 0, w, h);
    var data = imgData.data;

    var fillR = parseInt(fillColor.slice(1, 3), 16);
    var fillG = parseInt(fillColor.slice(3, 5), 16);
    var fillB = parseInt(fillColor.slice(5, 7), 16);

    var startIdx = (startY * w + startX) * 4;
    var targetR = data[startIdx];
    var targetG = data[startIdx + 1];
    var targetB = data[startIdx + 2];
    var targetA = data[startIdx + 3];

    if (targetR === fillR && targetG === fillG && targetB === fillB && targetA === 255) return;


    function matches(byteIdx) {
      return Math.abs(data[byteIdx] - targetR) < 30 &&
             Math.abs(data[byteIdx + 1] - targetG) < 30 &&
             Math.abs(data[byteIdx + 2] - targetB) < 30 &&
             Math.abs(data[byteIdx + 3] - targetA) < 30;
    }

    var visited = new Uint8Array(w * h);
    var queue = [startX, startY];
    visited[startY * w + startX] = 1;

    while (queue.length > 0) {
      var y = queue.pop();
      var x = queue.pop();
      var pidx = y * w + x;
      var byteIdx = pidx * 4;

      if (!matches(byteIdx)) continue;

      data[byteIdx] = fillR;
      data[byteIdx + 1] = fillG;
      data[byteIdx + 2] = fillB;
      data[byteIdx + 3] = 255;

      if (x > 0 && !visited[pidx - 1]) {
        visited[pidx - 1] = 1;
        queue.push(x - 1, y);
      }
      if (x < w - 1 && !visited[pidx + 1]) {
        visited[pidx + 1] = 1;
        queue.push(x + 1, y);
      }
      if (y > 0 && !visited[pidx - w]) {
        visited[pidx - w] = 1;
        queue.push(x, y - 1);
      }
      if (y < h - 1 && !visited[pidx + w]) {
        visited[pidx + w] = 1;
        queue.push(x, y + 1);
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // ==========================================
  // IMAGE & FILTER OPERATIONS
  // ==========================================
  function rotateDocument(degrees) {
    var rad = (degrees * Math.PI) / 180;
    var is90 = Math.abs(degrees) === 90;
    var newW = is90 ? state.docHeight : state.docWidth;
    var newH = is90 ? state.docWidth : state.docHeight;

    layers.forEach(function (l) {
      var temp = document.createElement('canvas');
      temp.width = l.canvas.width;
      temp.height = l.canvas.height;
      temp.getContext('2d').drawImage(l.canvas, 0, 0);

      l.canvas.width = newW;
      l.canvas.height = newH;
      l.ctx.save();
      l.ctx.translate(newW / 2, newH / 2);
      l.ctx.rotate(rad);
      l.ctx.drawImage(temp, -temp.width / 2, -temp.height / 2);
      l.ctx.restore();
    });

    state.docWidth = newW;
    state.docHeight = newH;
    dom.displayCanvas.width = newW;
    dom.displayCanvas.height = newH;
    dom.canvasContainer.style.width = newW + 'px';
    dom.canvasContainer.style.height = newH + 'px';

    centerViewport();
    renderLayers();
    pushHistory('Döndür: ' + degrees + '°');
    updateDocStatusUI();
  }

  function flipDocument(horizontal) {
    layers.forEach(function (l) {
      var temp = document.createElement('canvas');
      temp.width = l.canvas.width;
      temp.height = l.canvas.height;
      temp.getContext('2d').drawImage(l.canvas, 0, 0);

      l.ctx.save();
      l.ctx.clearRect(0, 0, l.canvas.width, l.canvas.height);
      if (horizontal) {
        l.ctx.translate(l.canvas.width, 0);
        l.ctx.scale(-1, 1);
      } else {
        l.ctx.translate(0, l.canvas.height);
        l.ctx.scale(1, -1);
      }
      l.ctx.drawImage(temp, 0, 0);
      l.ctx.restore();
    });

    renderLayers();
    pushHistory(horizontal ? 'Yatay Aynala' : 'Dikey Aynala');
  }

  function applyFilterToActiveLayer(filterType, param) {
    var layer = getActiveLayer();
    if (!layer) return;

    var temp = document.createElement('canvas');
    temp.width = layer.canvas.width;
    temp.height = layer.canvas.height;
    var tctx = temp.getContext('2d');
    tctx.drawImage(layer.canvas, 0, 0);

    layer.ctx.save();
    layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);

    if (filterType === 'invert') {
      layer.ctx.filter = 'invert(100%)';
    } else if (filterType === 'grayscale') {
      layer.ctx.filter = 'grayscale(100%)';
    } else if (filterType === 'sepia') {
      layer.ctx.filter = 'sepia(100%)';
    } else if (filterType === 'brightness') {
      var val = prompt('Parlaklık Yüzdesi (%50-%200):', '120');
      if (!val) { layer.ctx.drawImage(temp, 0, 0); layer.ctx.restore(); return; }
      layer.ctx.filter = 'brightness(' + parseInt(val, 10) + '%)';
    } else if (filterType === 'contrast') {
      var val2 = prompt('Kontrast Yüzdesi (%50-%200):', '120');
      if (!val2) { layer.ctx.drawImage(temp, 0, 0); layer.ctx.restore(); return; }
      layer.ctx.filter = 'contrast(' + parseInt(val2, 10) + '%)';
    } else if (filterType === 'blur') {
      var px = prompt('Bulanıklık Yarıçapı (px):', '5');
      if (!px) { layer.ctx.drawImage(temp, 0, 0); layer.ctx.restore(); return; }
      layer.ctx.filter = 'blur(' + parseInt(px, 10) + 'px)';
    }

    layer.ctx.drawImage(temp, 0, 0);
    layer.ctx.restore();

    renderLayers();
    pushHistory('Filtre: ' + filterType);
  }

  // ==========================================
  // FILE IMPORT & EXPORT
  // ==========================================
  function openImageFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        // If blank or user chooses new doc:
        if (confirm('Görsel yeni belge olarak açılsın mı? (İptal derseniz mevcut belgeye yeni katman olarak eklenir)')) {
          createNewDocument(img.width, img.height, 'transparent');
          var l = getActiveLayer();
          l.ctx.drawImage(img, 0, 0);
          l.name = file.name;
        } else {
          var newLayer = createLayerObject(file.name, 1);
          newLayer.ctx.drawImage(img, 0, 0, Math.min(img.width, state.docWidth), Math.min(img.height, state.docHeight));
          layers.push(newLayer);
          state.activeLayerId = newLayer.id;
        }
        renderLayers();
        updateLayerListUI();
        pushHistory('Görsel Açıldı: ' + file.name);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function exportDocument(format, quality) {
    if (!dom.displayCanvas) return;
    renderLayers(); // Ensure fresh composite
    var mime = 'image/png';
    var ext = 'png';
    if (format === 'jpg' || format === 'jpeg') {
      mime = 'image/jpeg';
      ext = 'jpg';
    } else if (format === 'webp') {
      mime = 'image/webp';
      ext = 'webp';
    }

    var dataUrl = dom.displayCanvas.toDataURL(mime, quality || 0.95);
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'photoshop-proje.' + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function printDocument() {
    renderLayers();
    var win = window.open('', '_blank');
    if (!win) return;
    win.document.write('<html><head><title>Yazdır - HTML&HTML Web Photoshop</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;"><img src="' + dom.displayCanvas.toDataURL() + '" style="max-width:100%;max-height:100vh;" onload="window.print();window.close();" /></body></html>');
    win.document.close();
  }

  // ==========================================
  // UI BINDINGS & DOCK UPDATES
  // ==========================================
  function updateLayerListUI() {
    if (!dom.layerList) return;
    dom.layerList.innerHTML = '';

    // Render layers from top to bottom (reverse of render order)
    for (var i = layers.length - 1; i >= 0; i--) {
      (function (l, index) {
        var li = document.createElement('div');
        li.className = 'ps-dock-layer-item' + (l.id === state.activeLayerId ? ' active' : '');
        li.setAttribute('data-id', l.id);

        var eyeBtn = document.createElement('button');
        eyeBtn.className = 'ps-layer-eye-btn';
        eyeBtn.innerHTML = l.visible ? '👁️' : '🚫';
        eyeBtn.title = 'Görünürlük';
        eyeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          l.visible = !l.visible;
          eyeBtn.innerHTML = l.visible ? '👁️' : '🚫';
          renderLayers();
        });

        var nameSpan = document.createElement('span');
        nameSpan.className = 'ps-layer-name';
        nameSpan.textContent = l.name;

        var thumb = document.createElement('canvas');
        thumb.className = 'ps-layer-thumb';
        thumb.width = 24;
        thumb.height = 24;
        thumb.getContext('2d').drawImage(l.canvas, 0, 0, 24, 24);

        li.appendChild(eyeBtn);
        li.appendChild(thumb);
        li.appendChild(nameSpan);

        li.addEventListener('click', function () {
          state.activeLayerId = l.id;
          updateLayerListUI();
          if (dom.layerOpacity) {
            dom.layerOpacity.value = Math.round(l.opacity * 100);
            if (dom.layerOpacityVal) dom.layerOpacityVal.textContent = Math.round(l.opacity * 100) + '%';
          }
        });

        dom.layerList.appendChild(li);
      })(layers[i], i);
    }

    var active = getActiveLayer();
    if (active && dom.layerOpacity) {
      dom.layerOpacity.value = Math.round(active.opacity * 100);
      if (dom.layerOpacityVal) dom.layerOpacityVal.textContent = Math.round(active.opacity * 100) + '%';
    }
  }

  function updateHistoryListUI() {
    if (!dom.historyList) return;
    dom.historyList.innerHTML = '';
    state.history.forEach(function (h, idx) {
      var item = document.createElement('div');
      item.className = 'ps-dock-history-item' + (idx === state.historyIndex ? ' active' : '');
      item.textContent = (idx + 1) + '. ' + h.action;
      item.addEventListener('click', function () {
        state.historyIndex = idx;
        restoreHistorySnapshot(h);
        updateHistoryListUI();
      });
      dom.historyList.appendChild(item);
    });
  }

  function updateDocStatusUI() {
    if (dom.docDims) {
      dom.docDims.textContent = state.docWidth + ' x ' + state.docHeight + ' px';
    }
  }

  function bindMenuEvents() {
    // Dropdown toggles
    var menuHeaders = document.querySelectorAll('.ps-menu-item');
    menuHeaders.forEach(function (m) {
      m.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasOpen = m.classList.contains('open');
        menuHeaders.forEach(function (other) { other.classList.remove('open'); });
        if (!wasOpen) m.classList.add('open');
      });
    });

    document.addEventListener('click', function () {
      menuHeaders.forEach(function (m) { m.classList.remove('open'); });
    });

    // Menu Actions
    document.querySelectorAll('[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var action = btn.getAttribute('data-action');
        executeAction(action);
      });
    });
  }

  function executeAction(action) {
    if (action === 'new-doc') {
      showNewDocModal();
    } else if (action === 'open-file') {
      if (dom.fileInput) dom.fileInput.click();
    } else if (action === 'export-png') {
      exportDocument('png');
    } else if (action === 'export-jpg') {
      exportDocument('jpg');
    } else if (action === 'export-webp') {
      exportDocument('webp');
    } else if (action === 'print') {
      printDocument();
    } else if (action === 'undo') {
      undo();
    } else if (action === 'redo') {
      redo();
    } else if (action === 'rotate-90') {
      rotateDocument(90);
    } else if (action === 'rotate-180') {
      rotateDocument(180);
    } else if (action === 'rotate-270') {
      rotateDocument(-90);
    } else if (action === 'flip-h') {
      flipDocument(true);
    } else if (action === 'flip-v') {
      flipDocument(false);
    } else if (action === 'invert-colors') {
      applyFilterToActiveLayer('invert');
    } else if (action === 'filter-grayscale') {
      applyFilterToActiveLayer('grayscale');
    } else if (action === 'filter-sepia') {
      applyFilterToActiveLayer('sepia');
    } else if (action === 'filter-brightness') {
      applyFilterToActiveLayer('brightness');
    } else if (action === 'filter-contrast') {
      applyFilterToActiveLayer('contrast');
    } else if (action === 'filter-blur') {
      applyFilterToActiveLayer('blur');
    } else if (action === 'new-layer') {
      addNewLayer();
    } else if (action === 'duplicate-layer') {
      duplicateActiveLayer();
    } else if (action === 'delete-layer') {
      deleteActiveLayer();
    } else if (action === 'zoom-fit') {
      centerViewport();
    } else if (action === 'zoom-100') {
      setZoom(1);
    }
  }

  function bindToolbarEvents() {
    var toolBtns = document.querySelectorAll('.ps-left-toolbar .ps-tool-btn');
    toolBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var tool = b.getAttribute('data-tool');
        if (!tool) return;
        state.activeTool = tool;
        toolBtns.forEach(function (btn) { btn.classList.remove('active'); });
        b.classList.add('active');

        // Update cursor
        if (tool === 'hand') dom.viewport.style.cursor = 'grab';
        else if (tool === 'eyedropper') dom.viewport.style.cursor = 'crosshair';
        else if (tool === 'zoom') dom.viewport.style.cursor = 'zoom-in';
        else dom.viewport.style.cursor = 'crosshair';
      });
    });

    if (dom.primaryColorPicker) {
      dom.primaryColorPicker.addEventListener('input', function () {
        state.primaryColor = dom.primaryColorPicker.value;
      });
    }
    if (dom.secondaryColorPicker) {
      dom.secondaryColorPicker.addEventListener('input', function () {
        state.secondaryColor = dom.secondaryColorPicker.value;
      });
    }
    if (dom.swapColorsBtn) {
      dom.swapColorsBtn.addEventListener('click', function () {
        var temp = state.primaryColor;
        state.primaryColor = state.secondaryColor;
        state.secondaryColor = temp;
        if (dom.primaryColorPicker) dom.primaryColorPicker.value = state.primaryColor;
        if (dom.secondaryColorPicker) dom.secondaryColorPicker.value = state.secondaryColor;
      });
    }
    if (dom.brushSizeInput) {
      dom.brushSizeInput.addEventListener('input', function () {
        state.brushSize = parseInt(dom.brushSizeInput.value, 10) || 5;
      });
    }
    if (dom.brushOpacityInput) {
      dom.brushOpacityInput.addEventListener('input', function () {
        state.brushOpacity = parseFloat(dom.brushOpacityInput.value) || 1;
      });
    }
    if (dom.shapeSelect) {
      dom.shapeSelect.addEventListener('change', function () {
        state.shapeType = dom.shapeSelect.value;
      });
    }

    if (dom.fileInput) {
      dom.fileInput.addEventListener('change', function () {
        if (dom.fileInput.files && dom.fileInput.files[0]) {
          openImageFile(dom.fileInput.files[0]);
          dom.fileInput.value = '';
        }
      });
    }
  }

  function bindDockEvents() {
    var addLayerBtn = document.getElementById('psAddLayerBtn');
    if (addLayerBtn) addLayerBtn.addEventListener('click', addNewLayer);

    var dupLayerBtn = document.getElementById('psDupLayerBtn');
    if (dupLayerBtn) dupLayerBtn.addEventListener('click', duplicateActiveLayer);

    var delLayerBtn = document.getElementById('psDelLayerBtn');
    if (delLayerBtn) delLayerBtn.addEventListener('click', deleteActiveLayer);

    if (dom.layerOpacity) {
      dom.layerOpacity.addEventListener('input', function () {
        var l = getActiveLayer();
        if (l) {
          l.opacity = parseInt(dom.layerOpacity.value, 10) / 100;
          if (dom.layerOpacityVal) dom.layerOpacityVal.textContent = dom.layerOpacity.value + '%';
          renderLayers();
        }
      });
    }

    var zoomInBtn = document.getElementById('psZoomInBtn');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function () { setZoom(state.zoom * 1.25); });
    }
    var zoomOutBtn = document.getElementById('psZoomOutBtn');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function () { setZoom(state.zoom * 0.8); });
    }
    var zoomResetBtn = document.getElementById('psZoomResetBtn');
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', centerViewport);
    }
  }

  function bindNewDocModalEvents() {
    var modal = document.getElementById('psNewDocModal');
    var createBtn = document.getElementById('psCreateDocBtn');
    var cancelBtn = document.getElementById('psCancelDocBtn');
    var closeBtn = document.getElementById('psCloseNewDocModal');

    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', function () { modal.style.display = 'none'; });
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function () { modal.style.display = 'none'; });
    }

    // Template clicks
    document.querySelectorAll('.ps-template-card').forEach(function (card) {
      card.addEventListener('click', function () {
        document.querySelectorAll('.ps-template-card').forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        var w = card.getAttribute('data-w');
        var h = card.getAttribute('data-h');
        var wInput = document.getElementById('psNewDocWidth');
        var hInput = document.getElementById('psNewDocHeight');
        if (wInput && w) wInput.value = w;
        if (hInput && h) hInput.value = h;
      });
    });

    if (createBtn) {
      createBtn.addEventListener('click', function () {
        var wInput = document.getElementById('psNewDocWidth');
        var hInput = document.getElementById('psNewDocHeight');
        var bgSelect = document.getElementById('psNewDocBg');

        var w = wInput ? parseInt(wInput.value, 10) : 1080;
        var h = hInput ? parseInt(hInput.value, 10) : 1080;
        var bg = bgSelect ? bgSelect.value : '#ffffff';

        createNewDocument(w, h, bg);
        if (modal) modal.style.display = 'none';
      });
    }
  }

  function showNewDocModal() {
    var modal = document.getElementById('psNewDocModal');
    if (modal) modal.style.display = 'flex';
  }

  function bindKeyboardShortcuts() {
    window.addEventListener('keydown', function (e) {
      // Don't trigger if typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf(document.activeElement.tagName) !== -1) return;

      var key = e.key.toUpperCase();
      if ((e.ctrlKey || e.metaKey) && key === 'Z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'Y') {
        e.preventDefault();
        redo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'S') {
        e.preventDefault();
        exportDocument('png');
        return;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'N') {
        e.preventDefault();
        showNewDocModal();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && key === 'O') {
        e.preventDefault();
        if (dom.fileInput) dom.fileInput.click();
        return;
      }

      // Single key tool selectors
      var toolMap = {
        'V': 'move',
        'M': 'select',
        'L': 'lasso',
        'C': 'crop',
        'I': 'eyedropper',
        'B': 'brush',
        'S': 'clone',
        'E': 'eraser',
        'G': 'bucket',
        'T': 'text',
        'U': 'shape',
        'H': 'hand',
        'Z': 'zoom'
      };

      if (toolMap[key]) {
        var btn = document.querySelector('.ps-left-toolbar .ps-tool-btn[data-tool="' + toolMap[key] + '"]');
        if (btn) btn.click();
      }
    });
  }

  // Public Interface
  window.PhotoshopStudio = {
    init: init,
    openImageFile: openImageFile,
    createNewDocument: createNewDocument,
    exportDocument: exportDocument,
    centerViewport: centerViewport
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window, document);
