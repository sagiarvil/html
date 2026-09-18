from pathlib import Path

css_path = Path('/Users/macair1/projects/html/assets/css/premium-experience.css')
css_content = css_path.read_text(encoding='utf-8')

radical_css = """
/* ==========================================================================
   RADICAL SIGNALS ARRAY REDESIGN (AWE-INSPIRING RADAR BAND)
   ========================================================================== */
.signals {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: nowrap !important;
  gap: 24px !important;
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  padding: 12px 32px !important;
  border-radius: 99px !important;
  max-width: fit-content !important;
  margin: 48px auto 0 !important;
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,1) !important;
  overflow-x: auto !important;
  white-space: nowrap !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  position: relative !important;
  z-index: 10 !important;
}
.signals::-webkit-scrollbar {
  display: none !important;
}

.signals span {
  font-family: 'SF Mono', ui-monospace, monospace !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 0.1em !important;
  color: #475569 !important;
  text-transform: uppercase !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  transition: color 0.3s ease !important;
  cursor: default !important;
}
.signals span:hover {
  color: #0f172a !important;
}

/* Glowing Neon Radar Dots */
.signals span::before {
  content: '' !important;
  display: inline-block !important;
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: #38bdf8 !important;
  box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8 !important;
  animation: radar-pulse 2s infinite alternate ease-in-out !important;
}

/* Add different colors for different domains */
.signals span:nth-child(1)::before { background: #f43f5e !important; box-shadow: 0 0 10px #f43f5e !important; }
.signals span:nth-child(3)::before { background: #8b5cf6 !important; box-shadow: 0 0 10px #8b5cf6 !important; }
.signals span:nth-child(5)::before { background: #10b981 !important; box-shadow: 0 0 10px #10b981 !important; }
.signals span:nth-child(7)::before { background: #eab308 !important; box-shadow: 0 0 10px #eab308 !important; }
.signals span:nth-child(9)::before { background: #3b82f6 !important; box-shadow: 0 0 10px #3b82f6 !important; }

@keyframes radar-pulse {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.4); opacity: 1; }
}

/* Hide old dots */
.signals i {
  display: none !important;
}

@media (max-width: 900px) {
  .signals {
    justify-content: flex-start !important;
    padding: 12px 24px !important;
    margin: 32px 16px 0 !important;
    max-width: calc(100vw - 32px) !important;
    gap: 20px !important;
    border-radius: 20px !important;
    -webkit-overflow-scrolling: touch !important;
  }
}
"""

if "RADICAL SIGNALS ARRAY REDESIGN" not in css_content:
    css_path.write_text(css_content + "\n" + radical_css, encoding='utf-8')
    print("Added radical signals CSS to premium-experience.css")

