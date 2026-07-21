document.addEventListener('DOMContentLoaded', () => {
    // 1. Cache DOM Selectors (Updated selector to match .navbar-links)
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.navbar-links a'); // Changed from .nav-links a

    // Guard clause to prevent errors if elements are missing on other pages
    if (!hamburgerBtn || !navLinks) return;

    // 2. Helper Functions
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    };

    // 3. Event Listeners
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        const isClickInside = navLinks.contains(e.target) || hamburgerBtn.contains(e.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
});