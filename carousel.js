document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.nav-dot');
  let isScrolling = false;
  let scrollTimeout;
  let lastScrollTime = Date.now();
  const scrollCooldown = 700; // ms between scroll actions

  // Function to get current slide index
  function getCurrentSlide() {
    const scrollPosition = container.scrollTop;
    const slideHeight = container.clientHeight;
    return Math.round(scrollPosition / slideHeight);
  }

  // Update active dot and slide animations based on scroll position
  function updateActiveElements() {
    const currentSlide = getCurrentSlide();
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });

    // Update slide animations
    slides.forEach((slide, index) => {
      const isVisible = index === currentSlide;
      slide.classList.toggle('slide-visible', isVisible);
      
      // Handle bubble animations
      const bubbleContainer = slide.querySelector('.logo-bubbles-container');
      if (bubbleContainer) {
        bubbleContainer.classList.toggle('animate-bubbles', isVisible);
      }
    });
  }

  // Scroll to specific slide
  function scrollToSlide(index) {
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;
    
    lastScrollTime = now;
    isScrolling = true;

    const targetPosition = index * container.clientHeight;
    container.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
      updateActiveElements();
    }, scrollCooldown);
  }

  // Handle wheel events with debouncing
  let wheelTimer = null;
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      const currentSlide = getCurrentSlide();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSlide = Math.min(Math.max(currentSlide + direction, 0), slides.length - 1);
      
      if (nextSlide !== currentSlide) {
        scrollToSlide(nextSlide);
      }
    }, 50); // Debounce wheel events
  }, { passive: false });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    const currentSlide = getCurrentSlide();
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextSlide = Math.min(currentSlide + 1, slides.length - 1);
      scrollToSlide(nextSlide);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevSlide = Math.max(currentSlide - 1, 0);
      scrollToSlide(prevSlide);
    }
  });

  // Handle dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!isScrolling) {
        scrollToSlide(index);
      }
    });
  });

  // Update on scroll with throttling
  let scrollTimer = null;
  container.addEventListener('scroll', () => {
    if (scrollTimer !== null) return;
    
    scrollTimer = setTimeout(() => {
      updateActiveElements();
      scrollTimer = null;
    }, 150);
  });

  // Initial update
  updateActiveElements();
}); 