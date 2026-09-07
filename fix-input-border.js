const fs = require('fs');

let theme = fs.readFileSync('assets/css/theme.css', 'utf8');

theme = theme.replace(
  /html\[data-theme="light"\] \.scanbox input \{\s*background: var\(--bg\) !important;\s*color: var\(--fg\) !important;\s*border: 1px solid var\(--line\) !important;\s*\}/g,
  `html[data-theme="light"] .scanbox input {
  background: transparent !important;
  color: var(--fg) !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}`
);

theme = theme.replace(
  /html\[data-theme="light"\] \.scanbox input:focus \{\s*border-color: var\(--accent\) !important;\s*box-shadow: 0 0 0 3px rgba\(0, 113, 227, 0\.2\) !important;\s*\}/g,
  `html[data-theme="light"] .scanbox input:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}`
);

fs.writeFileSync('assets/css/theme.css', theme);
