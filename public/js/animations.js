/**
 * UI Animations & Micro-Interactions Engine
 * Handles scroll reveal, stat counter animations, scroll progress bar,
 * 3D card tilt micro-interactions, and avatar stage dynamics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initScrollReveal();
  initStatCounters();
  initAvatarInteractions();
  initCardTiltInteractions();
});

/**
 * 1. Scroll Progress Bar at the Top of Viewport
 */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 2. Scroll-Reveal via IntersectionObserver (Staggered Entrances)
 */
function initScrollReveal() {
  const revealSelectors = [
    '.reveal-on-scroll',
    '.reveal-slide-left',
    '.reveal-slide-right',
    '.reveal-scale-up'
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(', '));
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
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
 * 3. Animated Number Counters for Stats Bento
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
        const duration = 1400; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic curve
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
  }, { threshold: 0.35 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * 4. Interactive Avatar Speech Bubble & Dynamic Highlights
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
    bubble.style.transform = 'scale(0.92) translateY(3px)';
    bubble.style.opacity = '0.3';

    setTimeout(() => {
      bubble.textContent = quotes[quoteIndex];
      bubble.style.transform = 'scale(1) translateY(0)';
      bubble.style.opacity = '1';
    }, 160);
  }

  stage.addEventListener('click', cycleQuote);
}

/**
 * 5. Subtle Card 3D Magnetic Micro-Tilt on Hover
 */
function initCardTiltInteractions() {
  const cards = document.querySelectorAll('.interactive-card, .interactive-card-lavender, .interactive-card-teal');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
