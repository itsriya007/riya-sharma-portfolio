/**
 * Main Application Script for Riya Sharma Portfolio
 * Handles Contact Form AJAX, Pop-Up Modal, CV Download Tracking, and Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCvDownloadTracking();
  initContactForm();
  initModalHandlers();
  initScrollSpy();
});

/* ===================================================================
   1. Mobile Menu Dropdown
   =================================================================== */
function initMobileMenu() {
  const mobileToggleBtn = document.getElementById('mobileMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  if (!mobileToggleBtn || !mobileNavMenu) return;

  mobileToggleBtn.addEventListener('click', () => {
    const isHidden = mobileNavMenu.classList.contains('hidden');
    if (isHidden) {
      mobileNavMenu.classList.remove('hidden');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileNavMenu.classList.add('hidden');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking any navigation link
  mobileNavMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNavMenu.classList.add('hidden');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===================================================================
   2. CV Download Feedback Toast Notification
   =================================================================== */
function initCvDownloadTracking() {
  const downloadLinks = document.querySelectorAll('a[download]');
  const toastEl = document.getElementById('globalNotificationToast');
  let toastTimer = null;

  function showToast(title, message, isSuccess = true) {
    if (!toastEl) return;
    const titleEl = document.getElementById('toastTitle');
    const msgEl = document.getElementById('toastMessage');
    const iconEl = document.getElementById('toastIcon');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    if (iconEl) {
      iconEl.textContent = isSuccess ? 'check_circle' : 'error';
      iconEl.className = `material-symbols-outlined ${isSuccess ? 'text-[#FF78AC]' : 'text-rose-500'} text-xl`;
    }

    toastEl.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
    toastEl.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      hideToast();
    }, 4500);
  }

  window.showAppToast = showToast;

  function hideToast() {
    if (!toastEl) return;
    toastEl.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    toastEl.classList.remove('opacity-100', 'translate-y-0');
  }

  const toastCloseBtn = document.getElementById('toastCloseBtn');
  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', hideToast);
  }

  downloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      showToast(
        'Curriculum Vitae Downloaded',
        'Riya_Sharma_Resume.pdf download has started.'
      );
    });
  });
}

/* ===================================================================
   3. Contact Form Submission via Node/Express Backend
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const errorAlert = document.getElementById('contactFormErrorAlert');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide any previous error
    if (errorAlert) {
      errorAlert.classList.add('hidden');
      errorAlert.textContent = '';
    }

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const honeypotInput = document.getElementById('contactGotcha');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const _gotcha = honeypotInput ? honeypotInput.value.trim() : '';

    // Client-side quick validation
    if (name.length < 2) {
      displayFormError('Please enter your full name (at least 2 characters).');
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayFormError('Please provide a valid email address.');
      emailInput.focus();
      return;
    }

    if (message.length < 2) {
      displayFormError('Please describe your requirements or message (at least 2 characters).');
      messageInput.focus();
      return;
    }

    // Set Loading State on Button
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="btn-spinner"></span>
      <span>Sending Message...</span>
    `;

    // Dynamic API Endpoint: Works seamlessly on localhost OR Vercel OR file:///
    const API_ENDPOINT = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
      ? '/api/contact'
      : 'http://localhost:3000/api/contact';

    try {
      console.log(`[Contact Form] Dispatched POST request to ${API_ENDPOINT}`);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _gotcha
        })
      });

      const data = await response.json();
      console.log('[Contact Form] Received response:', data);

      if (response.ok && data.success) {
        // Reset form inputs
        form.reset();
        // Trigger Thank You Modal with response message
        openThankYouModal(data.message, data.simulated);
      } else {
        const errorMsg = data.error || 'Server rejected submission. Please try again.';
        displayFormError(errorMsg);
        if (window.showAppToast) {
          window.showAppToast('Submission Failed', errorMsg, false);
        }
      }
    } catch (err) {
      console.error('Fetch error submitting contact form:', err);
      const networkErrMsg = 'Network connection error. You can email directly to riya0077224@gmail.com.';
      displayFormError(networkErrMsg);
      if (window.showAppToast) {
        window.showAppToast('Network Error', networkErrMsg, false);
      }
    } finally {
      // Restore Button State
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });

  function displayFormError(msg) {
    if (errorAlert) {
      errorAlert.textContent = msg;
      errorAlert.classList.remove('hidden');
      errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

/* ===================================================================
   4. Pop-Up Thank You Modal Controls
   =================================================================== */
function initModalHandlers() {
  const modal = document.getElementById('thankYouModal');
  const modalCard = document.getElementById('thankYouModalCard');
  const modalDesc = document.getElementById('thankYouDescription');
  const closeBtn = document.getElementById('closeModalBtn');
  const confirmBtn = document.getElementById('confirmCloseModalBtn');

  if (!modal || !modalCard) return;

  window.openThankYouModal = function(customMessage, isSimulated = false) {
    if (modalDesc && customMessage) {
      modalDesc.textContent = customMessage;
    }
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
  };

  window.closeThankYouModal = function() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    modalCard.classList.add('scale-95');
    modalCard.classList.remove('scale-100');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeThankYouModal);
  if (confirmBtn) confirmBtn.addEventListener('click', window.closeThankYouModal);

  // Click outside to dismiss
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeThankYouModal();
    }
  });

  // ESC key to dismiss
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      window.closeThankYouModal();
    }
  });
}

/* ===================================================================
   5. ScrollSpy for Active Desktop Nav
   =================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  if (!navLinks.length) return;

  const activeCls = ['text-[#8E7CC3]', 'font-bold', 'border-b-2', 'border-[#8E7CC3]'];

  function update() {
    const scrollPosition = window.scrollY + 140;
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
    let activeHref = null;
    let bestTop = -1;

    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= scrollPosition && section.offsetTop > bestTop) {
        bestTop = section.offsetTop;
        activeHref = link.getAttribute('href');
      }
    });

    if (atBottom) activeHref = '#contact';

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === activeHref;
      activeCls.forEach(c => link.classList.toggle(c, isActive));
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
