// ==========================
// DARKMODE.JS - FIXED
// ==========================

(function() {
    // Create button if it doesn't exist
    let darkBtn = document.querySelector('.darkBtn');
    if (!darkBtn) {
        darkBtn = document.createElement('button');
        darkBtn.className = 'darkBtn';
        darkBtn.setAttribute('aria-label', 'Toggle dark mode');
        darkBtn.innerHTML = '🌙';
        document.body.appendChild(darkBtn);
    }

    // Load saved theme
    function loadTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
            darkBtn.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark');
            darkBtn.innerHTML = '🌙';
        }
    }

    // Toggle function
    function toggleDark() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkBtn.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Add click event
    darkBtn.addEventListener('click', toggleDark);

    // Load on page load
    document.addEventListener('DOMContentLoaded', loadTheme);
})();