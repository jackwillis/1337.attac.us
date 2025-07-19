'use strict';

/**
 * Initializes the color mode toggle functionality on DOM ready.
 */
document.addEventListener('DOMContentLoaded', () => {
  let mode = getColorModePreference();
  applyColorMode(mode);

  const colorSchemeButton = createColorSchemeButton(mode);

  const header = document.querySelector('body > header');
  if (header) {
    header.appendChild(colorSchemeButton);
  }
});

/**
 * Creates a color scheme toggle button.
 *
 * @param {'light' | 'dark'} mode - The initial mode.
 * @returns {HTMLButtonElement}
 */
function createColorSchemeButton(mode) {
  const button = document.createElement('button');
  button.classList.add('color-scheme-button');

  button.updateUiText = function () {
    const oppositeMode = getOppositeMode(mode);
    this.innerText = mode === 'light' ? '🌘 DM' : '☀️ LM';
    const uiText = `Switch to ${oppositeMode} mode`;
    this.setAttribute('title', uiText);
    this.setAttribute('aria-label', uiText);
    this.setAttribute('data-color-mode', oppositeMode);
  };

  button.addEventListener('click', () => {
    mode = getOppositeMode(mode);
    setColorModePreference(mode);
    applyColorMode(mode);
    button.updateUiText();
  });

  button.updateUiText();
  return button;
}

/**
 * Gets the user's preferred color mode.
 * Checks cookies first, then falls back to system preference.
 *
 * @returns {'light' | 'dark'}
 */
function getColorModePreference() {
  const match = document.cookie.match(/(?:^|; )color-mode=(dark|light)/);
  if (match) {
    return match[1];
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Sets the user's preferred color mode in a cookie.
 *
 * @param {'light' | 'dark'} mode
 */
function setColorModePreference(mode) {
  document.cookie = `color-mode=${mode}; path=/; max-age=31536000`; // 1 year
}

/**
 * Applies the color mode to the document element.
 *
 * @param {'light' | 'dark'} mode
 */
function applyColorMode(mode) {
  document.documentElement.setAttribute('data-color-mode', mode);
}

/**
 * Returns the opposite of the given mode.
 *
 * @param {'light' | 'dark'} mode
 * @returns {'light' | 'dark'}
 */
function getOppositeMode(mode) {
  return mode === 'light' ? 'dark' : 'light';
}
