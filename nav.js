document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    // Add current page highlighting
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html'; // Get the filename or default to index.html
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || 
            (currentPage === 'index.html' && linkPath === '') ||
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('current');
        }
    });
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Show navbar when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
            navbar.classList.remove('hidden');
        } 
        // Hide navbar when scrolling down and not at the top
        else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navbar.classList.add('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
});