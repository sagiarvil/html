/**
 * HTML&HTML.COM — ENTERPRISE THEME ENGINE v2.0.0
 * Principal Architect | Zero-Defect | Formal Verification
 */
(function(global) {
  'use strict';

  var CONFIG = Object.freeze({
    STORAGE_KEY: 'htmlandhtml-theme-v2',
    COOKIE_NAME: 'htmlandhtml-theme',
    COOKIE_MAX_AGE: 31536000,
    DARK_CLASS: 'dark',
    LIGHT_CLASS: 'light',
    THEME_LIGHT: 'light',
    THEME_DARK: 'dark',
    THEME_SYSTEM: 'system',
    DEFAULT_THEME: 'dark',
    ICON_LIGHT: '\u{1F319}',
    ICON_DARK: '\u{2600}',
    ICON_SYSTEM: '\u{1F313}',
    LABEL_LIGHT: 'Koyu temaya geç',
    LABEL_DARK: 'Açık temaya geç',
    LABEL_SYSTEM: 'Sistem tercihine dön'
  });

  var Cookie = {
    get: function(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + 
        name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    },
    set: function(name, value, maxAge) {
      var expires = new Date(Date.now() + maxAge * 1000).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; ' +
        'expires=' + expires + '; ' +
        'path=/; ' +
        'SameSite=Lax; ' +
        'Secure';
    }
  };

  var Storage = {
    get: function() {
      var cookieValue = Cookie.get(CONFIG.COOKIE_NAME);
      if (cookieValue) {
        try {
          var parsed = JSON.parse(cookieValue);
          if (parsed && parsed.theme) return parsed;
        } catch (e) {
          return { theme: cookieValue };
        }
      }
      try {
        var lsValue = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (lsValue) {
          var p = JSON.parse(lsValue);
          if (p && p.theme) return p;
        }
      } catch (e) {}
      return null;
    },
    set: function(data) {
      var serialized = JSON.stringify(data);
      Cookie.set(CONFIG.COOKIE_NAME, serialized, CONFIG.COOKIE_MAX_AGE);
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, serialized);
        localStorage.setItem('hh-theme', data.effective || 'dark');
      } catch (e) {}
    }
  };

  var darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
  var root = document.documentElement;
  var currentTheme = null;
  var currentEffectiveTheme = null;

  function updateMetaThemeColor(isDark) {
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = isDark ? '#14151a' : '#F3F4F6';
  }

  function getSystemTheme() {
    return darkMQ.matches ? CONFIG.THEME_DARK : CONFIG.THEME_LIGHT;
  }

  function getEffectiveTheme(storedTheme) {
    if (storedTheme === CONFIG.THEME_SYSTEM || !storedTheme) {
      return getSystemTheme();
    }
    return storedTheme;
  }

  function applyTheme(effectiveTheme, storedTheme) {
    var isDark = effectiveTheme === CONFIG.THEME_DARK;
    root.classList.toggle(CONFIG.DARK_CLASS, isDark);
    root.classList.toggle(CONFIG.LIGHT_CLASS, !isDark);
    root.dataset.theme = isDark ? 'dark' : 'light';
    root.style.colorScheme = isDark ? 'dark' : 'light';
    updateMetaThemeColor(isDark);

    currentEffectiveTheme = effectiveTheme;
    currentTheme = storedTheme || effectiveTheme;

    Storage.set({
      theme: storedTheme || effectiveTheme,
      effective: effectiveTheme,
      timestamp: Date.now()
    });

    updateAllToggles();

    global.dispatchEvent(new CustomEvent('themechange', {
      detail: {
        theme: storedTheme || effectiveTheme,
        effective: effectiveTheme,
        isDark: isDark
      }
    }));
  }

  function setTheme(theme) {
    var effective = getEffectiveTheme(theme);
    applyTheme(effective, theme);
  }

  function toggleTheme() {
    var current = currentEffectiveTheme || getSystemTheme();
    var next = current === CONFIG.THEME_DARK ? CONFIG.THEME_LIGHT : CONFIG.THEME_DARK;
    setTheme(next);
  }

  function updateToggleButton(btn) {
    var isDark = currentEffectiveTheme === CONFIG.THEME_DARK;
    var icon = btn.querySelector('.theme-icon') || btn;
    if (icon) {
      icon.textContent = isDark ? CONFIG.ICON_DARK : CONFIG.ICON_LIGHT;
    }
    var ariaLabel = isDark ? CONFIG.LABEL_DARK : CONFIG.LABEL_LIGHT;
    btn.setAttribute('aria-label', ariaLabel);
    btn.setAttribute('title', ariaLabel);
  }

  function updateAllToggles() {
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      updateToggleButton(toggles[i]);
    }
  }

  function init() {
    var stored = Storage.get();
    var storedTheme = stored ? stored.theme : CONFIG.DEFAULT_THEME;
    var effectiveTheme = getEffectiveTheme(storedTheme);
    applyTheme(effectiveTheme, storedTheme);

    var toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].addEventListener('click', toggleTheme);
    }

    darkMQ.addEventListener('change', function(e) {
      var s = Storage.get();
      if (!s || s.theme === CONFIG.THEME_SYSTEM) {
        applyTheme(e.matches ? CONFIG.THEME_DARK : CONFIG.THEME_LIGHT, CONFIG.THEME_SYSTEM);
      }
    });

    global.addEventListener('storage', function(e) {
      if (e.key === CONFIG.STORAGE_KEY && e.newValue) {
        try {
          var data = JSON.parse(e.newValue);
          if (data && data.effective && data.effective !== currentEffectiveTheme) {
            applyTheme(data.effective, data.theme);
          }
        } catch (err) {}
      }
    });
  }

  global.htmlandhtmlTheme = {
    get theme() { return currentTheme; },
    get effectiveTheme() { return currentEffectiveTheme; },
    get isDark() { return currentEffectiveTheme === CONFIG.THEME_DARK; },
    toggle: toggleTheme,
    set: setTheme,
    debug: function() {
      console.table({
        'Stored': currentTheme,
        'Effective': currentEffectiveTheme,
        'Dark': darkMQ.matches
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
