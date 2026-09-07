const fs = require('fs');

let themeJs = fs.readFileSync('assets/js/theme.js', 'utf8');

// Inside theme.js, when setting localStorage, also set the cookie and the v2 storage
themeJs = themeJs.replace(
  /localStorage\.setItem\(KEY,value\);/g,
  `localStorage.setItem(KEY,value);
        try {
          localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({theme: value, effective: value==='system' ? (media.matches?'dark':'light') : value, timestamp: Date.now()}));
          document.cookie = 'htmlandhtml-theme=' + encodeURIComponent(JSON.stringify({theme: value})) + '; path=/; max-age=31536000; SameSite=Lax; Secure';
        } catch(e) {}`
);
fs.writeFileSync('assets/js/theme.js', themeJs);

let engJs = fs.readFileSync('assets/js/enterprise-theme-engine.js', 'utf8');

engJs = engJs.replace(
  /var cookieValue = Cookie\.get\(CONFIG\.COOKIE_NAME\);/,
  `var hhTheme = localStorage.getItem('hh-theme');
      if (hhTheme) {
        return { theme: hhTheme, effective: hhTheme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : hhTheme };
      }
      var cookieValue = Cookie.get(CONFIG.COOKIE_NAME);`
);

fs.writeFileSync('assets/js/enterprise-theme-engine.js', engJs);
