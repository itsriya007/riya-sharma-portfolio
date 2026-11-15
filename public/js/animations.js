/**
 * UI Animations & Micro-Interactions
 * Handles scroll reveal, stat counter animations, timeline effects, and interactive demo triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatCounters();
  initTerminalSimulation();
});

/**
 * 1. Scroll-Reveal via IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
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
        const duration = 1400; // ms
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
 * 3. Interactive Terminal Simulation in Hero Section
 */
function initTerminalSimulation() {
  const simBtn = document.getElementById('simulateTerminalBtn');
  const simLogsContainer = document.getElementById('terminalLogStream');
  if (!simBtn || !simLogsContainer) return;

  const simulatedEvents = [
    { text: '⚡ [policy-engine]: Incoming quote request from Tata Motors portal...', color: 'text-amber-300' },
    { text: '✔ [underwrite]: Risk assessment computed in 14ms (IRDAI Tier-1 compliant)', color: 'text-emerald-400' },
    { text: '✔ [db-pool]: Transaction committed to SQL cluster with zero deadlocks', color: 'text-emerald-400' },
    { text: '🚀 [pm2-cluster]: Worker pid 28492 load: 18% | Memory: 42MB | Status: OK', color: 'text-[#7CC4FA]' }
  ];

  let isRunning = false;

  simBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    simBtn.disabled = true;
    simBtn.innerHTML = '<span class="btn-spinner" style="width:12px; height:12px; border-width:1.5px;"></span> Running Pipeline...';

    // Clear old extra logs
    const existingDynamicLogs = simLogsContainer.querySelectorAll('.dynamic-log');
    existingDynamicLogs.forEach(el => el.remove());

    simulatedEvents.forEach((item, index) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = `${item.color} dynamic-log text-[11px] font-mono leading-relaxed transition-all duration-200 opacity-0 translate-x-1`;
        p.textContent = item.text;
        simLogsContainer.appendChild(p);

        // Trigger reflow & fade in
        requestAnimationFrame(() => {
          p.classList.remove('opacity-0', 'translate-x-1');
        });

        // Keep scroll at bottom of terminal
        simLogsContainer.scrollTop = simLogsContainer.scrollHeight;

        // Reset button after last line
        if (index === simulatedEvents.length - 1) {
          setTimeout(() => {
            isRunning = false;
            simBtn.disabled = false;
            simBtn.innerHTML = '<span class="material-symbols-outlined text-xs">play_arrow</span> Run Simulation';
          }, 600);
        }
      }, (index + 1) * 380);
    });
  });
}
