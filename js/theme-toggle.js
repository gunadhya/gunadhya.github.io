// Simple theme switching for Hugo Book theme - Light and OLED only
(function() {
  const THEMES = ['light', 'oled'];
  const THEME_KEY = 'book-theme';
  
  let currentThemeIndex = 0;

  function getCurrentTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return saved || 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;

    // Remove all theme classes
    html.classList.remove('book-theme-light', 'book-theme-dark', 'book-theme-auto');
    body.classList.remove('book-theme-oled');

    // Apply new theme
    switch (theme) {
      case 'light':
        html.classList.add('book-theme-light');
        break;
      case 'oled':
        html.classList.add('book-theme-dark');
        body.classList.add('book-theme-oled');
        break;
      default:
        html.classList.add('book-theme-light');
        break;
    }

    updateToggleButton(theme);
  }

  function updateToggleButton(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const icons = {
      light: '☀️',
      oled: '⚫'
    };

    toggle.textContent = icons[theme] || '☀️';
    toggle.title = `Theme: ${theme}`;
  }

  function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    const newTheme = THEMES[currentThemeIndex];
    setTheme(newTheme);
  }

  function createToggleButton() {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.addEventListener('click', cycleTheme);
    button.setAttribute('aria-label', 'Toggle between light and OLED theme');
    document.body.appendChild(button);
    return button;
  }

  function init() {
    const savedTheme = getCurrentTheme();
    currentThemeIndex = THEMES.indexOf(savedTheme);
    
    // Default to light if saved theme is not in our list
    if (currentThemeIndex === -1) {
      currentThemeIndex = 0;
    }
    
    createToggleButton();
    applyTheme(THEMES[currentThemeIndex]);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
