/**
 * UI Animations & Micro-Interactions
 * Handles scroll reveal, stat counter animations, and interactive avatar stage dynamics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatCounters();
  initAvatarInteractions();
});

/**
 * 1. Scroll-Reveal via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 2. Animated Number Counters for Stats Bento
 */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-counter-target'));
        const suffix = counter.getAttribute('data-counter-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1200; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;

          if (isDecimal) {
            counter.textContent = currentVal.toFixed(1) + suffix;
          } else {
            counter.textContent = Math.floor(currentVal) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * 3. Interactive Avatar Speech Bubble & Highlights
 */
function initAvatarInteractions() {
  const bubble = document.getElementById('avatarSpeechBubble');
  const stage = document.getElementById('heroAvatarStage');
  if (!bubble || !stage) return;

  const quotes = [
    '⚡ "Designing resilient microservices & high-volume fintech pipelines."',
    '🚗 "Sole backend owner for Tata Motors & Isuzu insurance platforms."',
    '✨ "Google Build with AI Certified — combining LLM agents with robust APIs."',
    '☕ "Specialized in Node.js, Express, React, PostgreSQL & cloud architecture."'
  ];

  let quoteIndex = 0;

  function cycleQuote() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    bubble.style.transform = 'scale(0.92) translateY(2px)';
    bubble.style.opacity = '0.3';

    setTimeout(() => {
      bubble.textContent = quotes[quoteIndex];
      bubble.style.transform = 'scale(1) translateY(0)';
      bubble.style.opacity = '1';
    }, 160);
  }

  // Click on stage or speech bubble
  stage.addEventListener('click', cycleQuote);
}
