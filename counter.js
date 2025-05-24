function animateCounter(elementId, targetNumber, duration) {
    const counterElement = document.getElementById(elementId);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.round(easeOutQuad * targetNumber);
        
        // Ensure we end exactly at the target number
        counterElement.textContent = progress === 1 ? targetNumber : currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Start animation when the element is in view
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter('experience-counter', 10, 1000); // 1000ms = 1 second
            observer.unobserve(entry.target);
        }
    });
}

// Set up the Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('experience-counter');
    const targetNum = 10;
    let currentNum = 0;

    function updateCounter() {
        if (currentNum < targetNum) {
            currentNum++;
            counter.textContent = currentNum;
            setTimeout(updateCounter, 200);
        }
    }

    // Start counter when section becomes visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter.closest('.carousel-slide'));
}); 