const fs = require('fs');

let theme = fs.readFileSync('assets/css/theme.css', 'utf8');

const lightVars = `
/* Light Theme Base Variables Override (validator-base.css compatibility) */
html[data-theme="light"] {
  --paper: #ffffff !important;
  --card: #ffffff !important;
  --ink: #0f172a !important;
  --muted: #475569 !important;
  --line: #e2e8f0 !important;
  --soft: #f8fafc !important;
}

html[data-theme="light"] .term-blocks section {
  background: var(--soft) !important;
  border-color: var(--line) !important;
}
html[data-theme="light"] .term-blocks h2 {
  color: var(--ink) !important;
}
html[data-theme="light"] .term-blocks p {
  color: var(--muted) !important;
}
html[data-theme="light"] .term-sources h3 {
  color: var(--ink) !important;
}
html[data-theme="light"] .term-sources a {
  color: #0071e3 !important;
}
html[data-theme="light"] .term-def {
  color: var(--muted) !important;
}
html[data-theme="light"] .term-head h2 {
  color: var(--ink) !important;
}
html[data-theme="light"] .term-head span {
  background: var(--soft) !important;
  color: var(--muted) !important;
  border-color: var(--line) !important;
}

html[data-theme="light"] .glossary-card {
  background: var(--card) !important;
  border-color: var(--line) !important;
}
html[data-theme="light"] .reference-note {
  background: var(--soft) !important;
  border-color: var(--line) !important;
}
html[data-theme="light"] .reference-note h2 {
  color: var(--ink) !important;
}
html[data-theme="light"] .reference-note p {
  color: var(--muted) !important;
}
`;

theme += "\n" + lightVars;

fs.writeFileSync('assets/css/theme.css', theme);
