/**
 * htmlandhtml.com - Live Component Runner & Sandbox Engine
 * Zero-dependency, secure iframe runner for HTML/CSS/JS components
 */
(function() {
  function initLivePreviewEngine() {
    const codeContainers = document.querySelectorAll("[data-live-preview=\"true\"]");
    if (!codeContainers.length) return;

    codeContainers.forEach((container, idx) => {
      const codeBlock = container.querySelector("code, textarea");
      if (!codeBlock) return;

      const previewWrapper = document.createElement("div");
      previewWrapper.className = "live-preview-wrapper mt-4 border border-slate-700 rounded-xl overflow-hidden bg-slate-950";

      const toolbar = document.createElement("div");
      toolbar.className = "flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400";
      toolbar.innerHTML = "<span class=\"font-semibold text-slate-300\">⚡ Canlı Bileşen Önizlemesi</span><div class=\"flex gap-2\"><button type=\"button\" class=\"run-preview-btn px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition-all\">Yenile / Çalıştır</button></div>";

      const iframe = document.createElement("iframe");
      iframe.className = "w-full h-64 border-none bg-white";
      iframe.setAttribute("sandbox", "allow-scripts");

      previewWrapper.appendChild(toolbar);
      previewWrapper.appendChild(iframe);
      container.parentNode.insertBefore(previewWrapper, container.nextSibling);

      function updateIframe() {
        const rawCode = codeBlock.value || codeBlock.textContent || "";
        const doc = iframe.contentWindow || iframe.contentDocument;
        if (doc && doc.document) {
          doc.document.open();
          doc.document.write(rawCode);
          doc.document.close();
        }
      }

      toolbar.querySelector(".run-preview-btn").addEventListener("click", updateIframe);
      setTimeout(updateIframe, 300);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLivePreviewEngine);
  } else {
    initLivePreviewEngine();
  }
})();
