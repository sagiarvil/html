const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const templates = [
  { name: 'paradigm-shift', title: 'Paradigm Shift', color1: '#2c3e50', color2: '#3498db', accent: '#e7746f' },
  { name: 'massively', title: 'Massively', color1: '#181A1F', color2: '#242831', accent: '#e74c3c' },
  { name: 'ethereal', title: 'Ethereal', color1: '#8e44ad', color2: '#9b59b6', accent: '#f1c40f' },
  { name: 'story', title: 'Story', color1: '#16a085', color2: '#1abc9c', accent: '#e67e22' },
  { name: 'dimension', title: 'Dimension', color1: '#1F242D', color2: '#111317', accent: '#e7746f' },
  { name: 'editorial', title: 'Editorial', color1: '#34495e', color2: '#2c3e50', accent: '#3498db' },
  { name: 'forty', title: 'Forty', color1: '#242943', color2: '#2A2F4A', accent: '#9bf1ff' },
  { name: 'stellar', title: 'Stellar', color1: '#636363', color2: '#272727', accent: '#efa8b0' },
  { name: 'multiverse', title: 'Multiverse', color1: '#242629', color2: '#1e2022', accent: '#3498db' },
  { name: 'phantom', title: 'Phantom', color1: '#585858', color2: '#2b2b2b', accent: '#f2849e' },
  { name: 'hyperspace', title: 'Hyperspace', color1: '#312450', color2: '#5e42a6', accent: '#b74e91' },
  { name: 'future-imperfect', title: 'Future Imperfect', color1: '#ffffff', color2: '#f4f4f4', accent: '#2ebaae' },
  { name: 'solid-state', title: 'Solid State', color1: '#2e3141', color2: '#212431', accent: '#4696e5' },
  { name: 'lens', title: 'Lens', color1: '#1b1f22', color2: '#101214', accent: '#47d1a8' },
  { name: 'fractal', title: 'Fractal', color1: '#3a3d40', color2: '#282b2d', accent: '#629dd1' },
  { name: 'eventually', title: 'Eventually', color1: '#1b1f22', color2: '#25292c', accent: '#ff6766' },
  { name: 'spectral', title: 'Spectral', color1: '#2e3842', color2: '#212931', accent: '#ed4933' },
  { name: 'photon', title: 'Photon', color1: '#34495e', color2: '#1a252f', accent: '#18bc9c' },
  { name: 'highlights', title: 'Highlights', color1: '#3b3f48', color2: '#282a30', accent: '#55b2d7' },
  { name: 'landed', title: 'Landed', color1: '#272833', color2: '#1c1d26', accent: '#e44c65' },
  { name: 'strata', title: 'Strata', color1: '#1f232b', color2: '#16191f', accent: '#49bf9d' },
  { name: 'read-only', title: 'Read Only', color1: '#444b54', color2: '#2c3138', accent: '#4acaa8' },
  { name: 'alpha', title: 'Alpha', color1: '#383b43', color2: '#22252a', accent: '#e89980' },
  { name: 'directive', title: 'Directive', color1: '#ffffff', color2: '#f2f2f2', accent: '#ff7373' },
  { name: 'aerial', title: 'Aerial', color1: '#3b3b3b', color2: '#1f1f1f', accent: '#e7746f' },
  { name: 'twenty', title: 'Twenty', color1: '#ffffff', color2: '#f5f5f5', accent: '#83d3c9' },
  { name: 'big-picture', title: 'Big Picture', color1: '#212529', color2: '#121416', accent: '#cf4a5c' },
  { name: 'tessellate', title: 'Tessellate', color1: '#1b2426', color2: '#111617', accent: '#1cb495' },
  { name: 'prologue', title: 'Prologue', color1: '#222629', color2: '#17191b', accent: '#8ebebc' },
  { name: 'helios', title: 'Helios', color1: '#252525', color2: '#151515', accent: '#df7366' },
  { name: 'telephasic', title: 'Telephasic', color1: '#ffffff', color2: '#e8e8e8', accent: '#e24d47' },
  { name: 'strongly-typed', title: 'Strongly Typed', color1: '#ffffff', color2: '#f0f0f0', accent: '#d52349' },
  { name: 'parallelism', title: 'Parallelism', color1: '#282b30', color2: '#181a1d', accent: '#43b581' },
  { name: 'escape-velocity', title: 'Escape Velocity', color1: '#2b2e36', color2: '#1c1e24', accent: '#d33f49' },
  { name: 'astral', title: 'Astral', color1: '#ffffff', color2: '#f7f7f7', accent: '#c85a53' },
  { name: 'striped', title: 'Striped', color1: '#26292e', color2: '#191b1e', accent: '#ea5a47' },
  { name: 'dopetrope', title: 'Dopetrope', color1: '#ffffff', color2: '#f3f3f3', accent: '#d52349' },
  { name: 'miniport', title: 'Miniport', color1: '#282828', color2: '#1a1a1a', accent: '#3b94d9' },
  { name: 'txt', title: 'TXT', color1: '#ffffff', color2: '#f2f2f2', accent: '#37c0fb' },
  { name: 'verti', title: 'Verti', color1: '#ffffff', color2: '#ececec', accent: '#444444' },
  { name: 'zerofour', title: 'Zerofour', color1: '#ffffff', color2: '#f4f4f4', accent: '#e24e47' },
  { name: 'arcana', title: 'Arcana', color1: '#ffffff', color2: '#f5f5f5', accent: '#d52349' },
  { name: 'halcyonic', title: 'Halcyonic', color1: '#ffffff', color2: '#f2f2f2', accent: '#e24e47' },
  { name: 'minimaxing', title: 'Minimaxing', color1: '#ffffff', color2: '#f5f5f5', accent: '#c83838' }
];

templates.forEach(t => {
  const svg = `<svg width="600" height="338" viewBox="0 0 600 338" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad_${t.name}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.color1}"/>
      <stop offset="100%" stop-color="${t.color2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="338" fill="url(#grad_${t.name})"/>
  <rect width="600" height="24" fill="rgba(0,0,0,0.2)"/>
  <circle cx="16" cy="12" r="4" fill="#FF5F56"/>
  <circle cx="28" cy="12" r="4" fill="#FFBD2E"/>
  <circle cx="40" cy="12" r="4" fill="#27C93F"/>
  <rect x="60" y="6" width="200" height="12" rx="3" fill="rgba(255,255,255,0.2)"/>
  
  <!-- Website Header & Content Preview -->
  <g transform="translate(40, 55)">
    <text x="0" y="40" fill="#FFFFFF" font-family="'Source Sans Pro', -apple-system, sans-serif" font-size="28" font-weight="900" letter-spacing="1">${t.title.toUpperCase()}</text>
    <text x="0" y="65" fill="${t.accent}" font-family="'Source Sans Pro', sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">RESPONSIVE HTML5 + CSS3 SITE TEMPLATE</text>
    
    <!-- Hero Box -->
    <rect x="0" y="85" width="520" height="95" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
    <rect x="20" y="105" width="160" height="12" rx="2" fill="#FFFFFF"/>
    <rect x="20" y="125" width="260" height="8" rx="2" fill="rgba(255,255,255,0.6)"/>
    <rect x="20" y="140" width="210" height="8" rx="2" fill="rgba(255,255,255,0.6)"/>
    
    <rect x="400" y="112" width="100" height="36" rx="4" fill="${t.accent}"/>
    <text x="450" y="135" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">EXPLORE</text>
    
    <!-- Mini Cards Grid Below -->
    <rect x="0" y="195" width="160" height="65" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <rect x="15" y="210" width="80" height="8" rx="2" fill="#FFFFFF"/>
    <rect x="15" y="225" width="130" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
    <rect x="15" y="237" width="100" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>

    <rect x="180" y="195" width="160" height="65" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <rect x="195" y="210" width="80" height="8" rx="2" fill="#FFFFFF"/>
    <rect x="195" y="225" width="130" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
    <rect x="195" y="237" width="100" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>

    <rect x="360" y="195" width="160" height="65" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
    <rect x="375" y="210" width="80" height="8" rx="2" fill="#FFFFFF"/>
    <rect x="375" y="225" width="130" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
    <rect x="375" y="237" width="100" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(dir, `${t.name}.svg`), svg);
  fs.writeFileSync(path.join(dir, `${t.name}.jpg`), svg); // fallback
});

console.log('Generated ' + templates.length + ' template preview images in uploads/images/');
