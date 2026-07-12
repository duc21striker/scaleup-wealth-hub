// ==========================
// DARKMODE.JS
// Dark Mode Functionality
// ==========================

// ===== CREATE DARK MODE BUTTON =====
const darkBtn = document.createElement('button');
darkBtn.className = 'darkBtn';
darkBtn.setAttribute('aria-label', 'Toggle dark mode');
darkBtn.innerHTML = '🌙';
document.body.appendChild(darkBtn);

// ===== LOAD SAVED THEME =====
function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        darkBtn.innerHTML = '☀️';
    } else {
        darkBtn.innerHTML = '🌙';
    }
}

// ===== TOGGLE DARK MODE =====
darkBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    this.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', loadTheme);