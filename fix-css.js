const fs = require('fs');
let css = fs.readFileSync('assets/css/enterprise-system.css', 'utf8');

css = css.replace(/\.ai-lens-grid\{display:grid;grid-template-columns:repeat\(7,1fr\);gap:8px\}/, 
  ".ai-lens-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}");

css = css.replace(/\.ai-lens-grid\{grid-template-columns:repeat\(4,1fr\)\}/g, 
  ".ai-lens-grid{grid-template-columns:repeat(3,1fr)}");

// Desktop is 6 (above), Tablet is 3 (max-width 1080px or 960px). Mobile is 2 (max-width 640px). 390px can stay 2 or 1.
css = css.replace(/@media\(max-width:960px\)\{[\s\S]*?\.ai-lens-grid\{grid-template-columns:repeat\(2,1fr\)\}/g, match => {
  return match.replace('.ai-lens-grid{grid-template-columns:repeat(2,1fr)}', '.ai-lens-grid{grid-template-columns:repeat(3,1fr)}');
});

// At 640px, mobile 2 columns. It already says `.ai-lens-grid{grid-template-columns:1fr 1fr}` which is 2 columns!
// But gap should remain 16px.

// The prompt also says "KURAL U1: 18 kart eşit yükseklikte mi? aspect-ratio: 1 / 0.8".
// I added style="aspect-ratio:1/0.8" inline in JS, so it's good.

fs.writeFileSync('assets/css/enterprise-system.css', css);
