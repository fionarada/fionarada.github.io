document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.features-carousel-container');
  const slides = document.querySelectorAll('.features-slide');
  const dots = document.querySelectorAll('.features-nav .nav-dot');
  const contents = document.querySelectorAll('.feature-content');
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

  // Update active elements based on scroll position
  function updateActiveElements() {
    const currentSlide = getCurrentSlide();
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });

    // Update slide content visibility
    contents.forEach((content, index) => {
      if (index === currentSlide) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
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
    }, 50);
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

  // Handle scroll events with throttling
  let scrollTimer = null;
  container.addEventListener('scroll', () => {
    if (scrollTimer !== null) return;
    
    scrollTimer = setTimeout(() => {
      updateActiveElements();
      scrollTimer = null;
    }, 150);
  });

  // Handle touch events for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (isScrolling) {
      e.preventDefault();
      return;
    }
    touchEndY = e.touches[0].clientY;
  }, { passive: false });

  container.addEventListener('touchend', () => {
    if (isScrolling) return;
    
    const difference = touchStartY - touchEndY;
    const currentSlide = getCurrentSlide();
    
    if (Math.abs(difference) > 50) { // Minimum swipe distance
      if (difference > 0) {
        // Swipe up
        const nextSlide = Math.min(currentSlide + 1, slides.length - 1);
        scrollToSlide(nextSlide);
      } else {
        // Swipe down
        const prevSlide = Math.max(currentSlide - 1, 0);
        scrollToSlide(prevSlide);
      }
    }
  });

  // Set initial state
  updateActiveElements();
  contents[0].classList.add('active');
}); 