/* =========================================================
   FlowFix Plumbing Co. — Main Site Functionality
   Theme, RTL, navbar interactions, FAQ, forms, selectors,
   smooth scroll, back-to-top, toasts.
   ========================================================= */
(function () {
  'use strict';

  var THEME_KEY = 'site-theme';
  var DIR_KEY = 'site-direction';

  /* ---------- Toast notifications ---------- */
  function ensureToastContainer() {
    var c = document.querySelector('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      c.setAttribute('role', 'status');
      c.setAttribute('aria-live', 'polite');
      document.body.appendChild(c);
    }
    return c;
  }

  window.showToast = function (message, type, duration) {
    type = type || 'info';
    duration = duration || 5000;
    var container = ensureToastContainer();

    var icons = {
      success: '<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      error: '<svg class="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      info: '<svg class="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = (icons[type] || icons.info) + '<p class="text-sm font-medium leading-snug">' + message + '</p>';
    container.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });
    });

    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  };

  /* ---------- Theme toggle ---------- */
  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function storeTheme(val) {
    try { localStorage.setItem(THEME_KEY, val); } catch (e) { /* ignore */ }
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    updateThemeToggleLabel();
  }

  function updateThemeToggleLabel() {
    var isDark = document.documentElement.classList.contains('dark');
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    document.querySelectorAll('[data-action="theme-toggle"]').forEach(function (btn) {
      btn.setAttribute('aria-label', label);
    });
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="theme-toggle"]');
      if (!btn) return;
      var isDark = document.documentElement.classList.contains('dark');
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- RTL toggle ---------- */
  function getStoredDir() {
    try { return localStorage.getItem(DIR_KEY); } catch (e) { return null; }
  }

  function storeDir(val) {
    try { localStorage.setItem(DIR_KEY, val); } catch (e) { /* ignore */ }
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    var label = dir === 'rtl'
      ? 'Switch to left-to-right direction'
      : 'Switch to right-to-left direction';
    document.querySelectorAll('[data-action="rtl-toggle"]').forEach(function (btn) {
      btn.setAttribute('aria-label', label);
    });
  }

  function initDirection() {
    var stored = getStoredDir();
    if (stored === 'rtl' || stored === 'ltr') {
      applyDirection(stored);
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="rtl-toggle"]');
      if (!btn) return;
      var cur = document.documentElement.getAttribute('dir') || 'ltr';
      var next = cur === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(next);
      storeDir(next);
    });
  }

  /* ---------- Navbar: scroll shadow, dropdown, mobile menu ---------- */
  function initNavbarScroll() {
    var navbar = document.getElementById('site-navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 12) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function closeAllDropdowns(except) {
    document.querySelectorAll('.nav-dropdown.is-open').forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove('is-open');
      var btn = dd.querySelector('[data-dropdown-btn]');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function initHomeDropdown() {
    document.querySelectorAll('[data-dropdown]').forEach(function (dd) {
      var btn = dd.querySelector('[data-dropdown-btn]');
      if (!btn) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dd.classList.contains('is-open');
        closeAllDropdowns();
        if (!isOpen) {
          dd.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          closeAllDropdowns(dd);
          dd.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          var first = dd.querySelector('.nav-dropdown-menu a');
          if (first) first.focus();
        } else if (e.key === 'Escape') {
          dd.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      dd.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          dd.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
    });

    document.addEventListener('click', function () {
      closeAllDropdowns();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDropdowns();
    });
  }

  function initMobileMenu() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      btn.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close navigation menu');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation menu');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }

    btn.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close after navigation
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || btn.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        btn.focus();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Mobile home dropdown
    var mBtn = menu.querySelector('[data-m-dropdown-btn]');
    var mSub = document.getElementById('m-home-sub');
    if (mBtn && mSub) {
      mBtn.addEventListener('click', function () {
        var hidden = mSub.hasAttribute('hidden');
        if (hidden) {
          mSub.removeAttribute('hidden');
          mBtn.setAttribute('aria-expanded', 'true');
        } else {
          mSub.setAttribute('hidden', '');
          mBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ---------- FAQ accordions ---------- */
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close siblings within same accordion group
        var group = item.closest('[data-faq-group]');
        if (group) {
          group.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
            if (openItem === item) return;
            openItem.classList.remove('is-open');
            var q = openItem.querySelector('.faq-question');
            var a = openItem.querySelector('.faq-answer');
            if (q) q.setAttribute('aria-expanded', 'false');
            if (a) a.style.maxHeight = '0px';
          });
        }

        if (isOpen) {
          item.classList.remove('is-open');
          question.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0px';
        } else {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Service selector (Home 2) ---------- */
  function initServiceSelector() {
    var root = document.getElementById('service-selector');
    if (!root) return;

    var detailTitle = document.getElementById('selector-title');
    var detailText = document.getElementById('selector-desc');
    var detailLink = document.getElementById('selector-link');

    var data = {
      pipe: {
        title: 'Leaking Pipe',
        desc: 'Visible drips, damp patches, or joint leaks often need prompt pipe repair. We inspect the affected line, explain the cause, and confirm an estimate before work begins.',
        href: 'services.html#pipe-repair',
        label: 'Book Pipe Repair'
      },
      drain: {
        title: 'Blocked Drain',
        desc: 'Slow drainage or standing water can signal a blockage. We assess the drain, identify the likely cause, and recommend the right unblocking approach.',
        href: 'services.html#drain-unblocking',
        label: 'Book Drain Unblocking'
      },
      tap: {
        title: 'Faulty Tap',
        desc: 'Dripping or worn taps waste water and can damage fixtures. We supply and fit replacement taps or repair existing ones where practical.',
        href: 'services.html#tap-replacement',
        label: 'Book Tap Replacement'
      },
      tank: {
        title: 'Tank Cleaning',
        desc: 'Scheduled tank cleaning helps maintain water flow and storage hygiene. We inspect the tank first and confirm the scope of work with you.',
        href: 'services.html#tank-cleaning',
        label: 'Book Tank Cleaning'
      }
    };

    function selectOption(btn) {
      root.querySelectorAll('.service-option').forEach(function (el) {
        el.classList.remove('is-selected');
        el.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');

      var key = btn.getAttribute('data-service');
      var info = data[key];
      if (!info) return;

      if (detailTitle) detailTitle.textContent = info.title;
      if (detailText) detailText.textContent = info.desc;
      if (detailLink) {
        detailLink.setAttribute('href', info.href);
        var span = detailLink.querySelector('[data-link-label]');
        if (span) span.textContent = info.label;
        detailLink.setAttribute('aria-label', info.label + ' — ' + info.title);
      }
    }

    root.querySelectorAll('.service-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectOption(btn);
      });
    });

    // Initialize first option
    var first = root.querySelector('.service-option');
    if (first) selectOption(first);
  }

  /* ---------- Booking form validation ---------- */
  function initBookingForm() {
    var form = document.getElementById('booking-form');
    if (!form) return;

    function showError(field, message) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      var errId = field.getAttribute('aria-describedby');
      var err = errId ? document.getElementById(errId) : field.parentElement.querySelector('.form-error');
      if (err) {
        err.textContent = message;
        err.classList.add('is-visible');
      }
    }

    function clearError(field) {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      var errId = field.getAttribute('aria-describedby');
      var err = errId ? document.getElementById(errId) : field.parentElement.querySelector('.form-error');
      if (err) {
        err.textContent = '';
        err.classList.remove('is-visible');
      }
    }

    function validateField(field) {
      var value = (field.value || '').trim();
      var name = field.getAttribute('name');
      var label = field.getAttribute('data-label') || field.name;

      if (field.hasAttribute('required')) {
        if (!value) {
          showError(field, label + ' is required.');
          return false;
        }
      }

      if (value && field.type === 'email') {
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(value)) {
          showError(field, 'Please enter a valid email address.');
          return false;
        }
      }

      if (value && (name === 'phone' || field.id === 'phone')) {
        var digits = value.replace(/\D/g, '');
        if (digits.length < 7) {
          showError(field, 'Please enter a valid phone number.');
          return false;
        }
      }

      clearError(field);
      return true;
    }

    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.hasAttribute('required') || field.value) validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validateField(field);
      });
      field.addEventListener('change', function () {
        if (field.classList.contains('is-invalid') || field.tagName === 'SELECT') validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      var firstInvalid = null;

      fields.forEach(function (field) {
        var ok = validateField(field);
        if (!ok) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        window.showToast('Please fix the highlighted fields and try again.', 'error');
        return;
      }

      // Honest demo behavior — no backend exists.
      window.showToast(
        'Demo only: Your booking request was validated successfully, but nothing was sent. ' +
        'Connect this form to your booking system or email service to receive real enquiries.',
        'success',
        8000
      );

      var successBox = document.getElementById('form-success');
      if (successBox) {
        successBox.hidden = false;
        successBox.focus && successBox.focus();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
      fields.forEach(clearError);
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href || href === '#') return;

      var hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      var hash = href.slice(hashIndex + 1);
      if (!hash) return;

      var targetId = hash;
      // Only handle same-page anchors (href starts with # or path matches current page)
      var pathPart = href.slice(0, hashIndex);
      if (pathPart && pathPart !== '' && !pathPart.endsWith(location.pathname.split('/').pop()) && pathPart !== location.pathname) {
        return;
      }

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });

      // Update URL hash without jump
      if (history.pushState) {
        history.pushState(null, '', '#' + targetId);
      }
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    function onScroll() {
      if (window.scrollY > 480) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      var nav = document.querySelector('#site-navbar a, #navbar a');
      if (nav) nav.focus({ preventScroll: true });
    });
  }

  /* ---------- Fade-up on scroll ---------- */
  function initFadeUp() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.fade-up').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-up').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Current year (fallback if footer.js not loaded first) ---------- */
  function initYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Boot ---------- */
  function boot() {
    initTheme();
    initDirection();
    initNavbarScroll();
    initHomeDropdown();
    initMobileMenu();
    initFaq();
    initServiceSelector();
    initBookingForm();
    initSmoothScroll();
    initBackToTop();
    initFadeUp();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
