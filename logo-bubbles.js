document.addEventListener('DOMContentLoaded', () => {
  // Add animate class to all bubbles immediately
  document.querySelectorAll('.logo-bubble').forEach(bubble => {
    bubble.classList.add('animate');
  });
}); 