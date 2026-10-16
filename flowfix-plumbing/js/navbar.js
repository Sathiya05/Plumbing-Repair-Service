/* =========================================================
   FlowFix Plumbing Co. — Shared Navbar
   Contains ONLY navbar markup + injection.
   ========================================================= */
(function () {
  'use strict';

  // EDITABLE: replace with the real business phone number before launch.
  var PHONE_DISPLAY = '(555) 010-PLUMB'; // placeholder — replace
  var PHONE_HREF = 'tel:+15550100000';   // placeholder — replace

  function isHome() {
    return /index\.html$|home2\.html$/i.test(location.pathname) ||
      location.pathname.endsWith('/') ||
      location.pathname.endsWith('flowfix-plumbing');
  }

  function currentPage() {
    var file = location.pathname.split('/').pop() || 'index.html';
    if (!file || file === 'flowfix-plumbing') file = 'index.html';
    return file.toLowerCase();
  }

  function activeClass(page) {
    var cur = currentPage();
    var isHomeLink = page === 'home';
    var match = isHomeLink
      ? (cur === 'index.html' || cur === 'home2.html')
      : cur === page + '.html';
    return match ? ' is-active' : '';
  }

  function homeChildActive(page) {
    return currentPage() === page ? ' is-active' : '';
  }

  var logoSvg =
    '<svg class="w-9 h-9 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">' +
    '<circle cx="32" cy="32" r="30" fill="#0F766E"/>' +
    '<path d="M32 14c-8 10-14 17.5-14 24a14 14 0 0028 0c0-6.5-6-14-14-24z" fill="#F8FAFC"/>' +
    '<path d="M32 26c-4.5 6-7.5 10-7.5 13.5a7.5 7.5 0 0015 0C39.5 36 36.5 32 32 26z" fill="#5EEAD4"/>' +
    '<path d="M26 44h12" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  var sunIcon =
    '<svg class="icon-sun w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
    '</svg>';

  var moonIcon =
    '<svg class="icon-moon w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>' +
    '</svg>';

  var rtlIcon =
    '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/>' +
    '<path d="M16 21l4-4-4-4"/><path d="M20 17H4"/>' +
    '</svg>';

  var caretIcon =
    '<svg class="nav-caret w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>';

  var markup =
    '<header class="site-navbar" id="site-navbar">' +
      '<div class="navbar-surface">' +
      '<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">' +
        '<div class="flex items-center justify-between" style="min-height:var(--ff-navbar-h)">' +

          /* Logo */
          '<a href="index.html" class="flex items-center gap-2.5 shrink-0 group" aria-label="FlowFix Plumbing Co. home">' +
            logoSvg +
            '<span class="leading-tight">' +
              '<span class="block font-heading font-extrabold text-lg text-[#1E293B] dark:text-[#F8FAFC] group-hover:text-[#0F766E] dark:group-hover:text-[#5EEAD4] transition-colors">FlowFix</span>' +
              '<span class="block text-[0.68rem] font-semibold tracking-wider uppercase text-[#0F766E] dark:text-[#5EEAD4]">Plumbing Co.</span>' +
            '</span>' +
          '</a>' +

          /* Desktop nav */
          '<div class="desktop-nav hidden lg:flex items-center gap-0.5">' +

            /* Home dropdown */
            '<div class="nav-dropdown" data-dropdown>' +
              '<button type="button" class="nav-link' + activeClass('home') + '" data-dropdown-btn aria-expanded="false" aria-haspopup="true" aria-controls="home-dropdown-menu">' +
                'Home' + caretIcon +
              '</button>' +
              '<div class="nav-dropdown-menu" id="home-dropdown-menu" role="menu" aria-label="Home pages">' +
                '<a href="index.html" role="menuitem" class="' + homeChildActive('index.html') + '">Home 1</a>' +
                '<a href="home2.html" role="menuitem" class="' + homeChildActive('home2.html') + '">Home 2</a>' +
              '</div>' +
            '</div>' +

            '<a href="about.html" class="nav-link' + activeClass('about') + '">About</a>' +
            '<a href="services.html" class="nav-link' + activeClass('services') + '">Services</a>' +
            '<a href="pricing.html" class="nav-link' + activeClass('pricing') + '">Pricing Guide</a>' +
            '<a href="emergency.html" class="nav-link' + activeClass('emergency') + '">Emergency</a>' +
            '<a href="contact.html" class="nav-link' + activeClass('contact') + '">Contact</a>' +
          '</div>' +

          /* Right actions — desktop only except hamburger */
          '<div class="flex items-center gap-2">' +
            '<div class="hidden lg:flex items-center gap-2">' +
              '<button type="button" class="icon-btn" id="theme-toggle" data-action="theme-toggle" aria-label="Switch to dark mode">' +
                sunIcon + moonIcon +
              '</button>' +
              '<button type="button" class="icon-btn" id="rtl-toggle" data-action="rtl-toggle" aria-label="Switch to right-to-left direction">' +
                rtlIcon +
              '</button>' +
              '<a href="contact.html" class="btn btn-emergency btn-sm" aria-label="Call FlowFix Plumbing now at ' + PHONE_DISPLAY + '">' +
                'Book Now' +
              '</a>' +
            '</div>' +
            '<button type="button" class="hamburger" id="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '</div>' +

      /* Mobile menu */
      '<div class="mobile-menu" id="mobile-menu" aria-hidden="true">' +
        '<nav class="py-4" aria-label="Mobile navigation">' +
          /* Theme + RTL toggles (mobile/tablet only — hidden on desktop via CSS) */
          '<div class="flex items-center gap-2 px-4 pb-4 mb-1 border-b theme-divider">' +
            '<button type="button" class="icon-btn m-theme-toggle" data-action="theme-toggle" aria-label="Switch to dark mode">' +
              sunIcon + moonIcon +
            '</button>' +
            '<button type="button" class="icon-btn m-rtl-toggle" data-action="rtl-toggle" aria-label="Switch to right-to-left direction">' +
              rtlIcon +
            '</button>' +
            '<span class="text-xs font-semibold text-slate-500 dark:text-slate-400 ms-1">Display options</span>' +
          '</div>' +
          '<button type="button" class="m-link' + activeClass('home') + ' flex w-full items-center justify-between" data-m-dropdown-btn aria-expanded="false" aria-controls="m-home-sub">' +
            'Home' +
            caretIcon +
          '</button>' +
          '<div id="m-home-sub" hidden>' +
            '<a href="index.html" class="m-sub' + homeChildActive('index.html') + '">Home 1</a>' +
            '<a href="home2.html" class="m-sub' + homeChildActive('home2.html') + '">Home 2</a>' +
          '</div>' +
          '<a href="about.html" class="m-link' + activeClass('about') + '">About</a>' +
          '<a href="services.html" class="m-link' + activeClass('services') + '">Services</a>' +
          '<a href="pricing.html" class="m-link' + activeClass('pricing') + '">Pricing Guide</a>' +
          '<a href="emergency.html" class="m-link' + activeClass('emergency') + '">Emergency</a>' +
          '<a href="contact.html" class="m-link' + activeClass('contact') + '">Contact</a>' +
          '<div class="px-4 pt-5 pb-3">' +
            '<a href="contact.html" class="btn btn-emergency w-full" aria-label="Call FlowFix Plumbing now at ' + PHONE_DISPLAY + '">' +
              'Book Now  '+
            '</a>' +
          '</div>' +
        '</nav>' +
      '</div>' +
    '</header>';

  var mount = document.getElementById('navbar');
  if (mount) {
    mount.innerHTML = markup;
  }
})();
