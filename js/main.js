(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var navClose = document.querySelector(".nav-close");
  var navLinks = document.getElementById("nav-links");

  var closeMenu = function () {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.querySelectorAll("a[data-nav]").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    if (navClose) navClose.addEventListener("click", closeMenu);
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Header: solid dark panel once scrolled past the hero
  var header = document.querySelector(".site-header");
  var heroSection = document.querySelector(".hero");
  if (header) {
    var scrollThreshold = heroSection ? heroSection.offsetHeight - 80 : 10;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      scrollThreshold = heroSection ? heroSection.offsetHeight - 80 : 10;
    });
    onScroll();
  }

  // Scroll-spy: highlight the nav link for the section in view
  var navAnchorLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-section]"));
  var spySections = navAnchorLinks
    .map(function (link) { return document.getElementById(link.getAttribute("data-section")); })
    .filter(Boolean);

  if (spySections.length && "IntersectionObserver" in window) {
    var setActiveLink = function (id) {
      navAnchorLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("data-section") === id);
      });
    };

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    spySections.forEach(function (section) { spyObserver.observe(section); });
  }

  // About photo: subtle scroll parallax, only below the breakpoint where the
  // column is sticky (sticky already keeps it in view at desktop widths;
  // adding a transform on top of sticky positioning would just cause jitter)
  var aboutSection = document.querySelector(".about");
  var aboutPhotoCol = document.querySelector(".about-photo-col");
  var stickyBreakpoint = window.matchMedia("(min-width: 860px)");

  if (aboutSection && aboutPhotoCol && !prefersReducedMotion) {
    var updateAboutParallax = function () {
      if (stickyBreakpoint.matches) {
        aboutPhotoCol.style.transform = "";
        return;
      }
      var rect = aboutSection.getBoundingClientRect();
      var viewportH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewportH) return;
      var progress = (viewportH - rect.top) / (viewportH + rect.height); // 0 → 1 across the section's time in view
      var offset = (progress - 0.5) * 40; // max ~20px travel either way
      aboutPhotoCol.style.transform = "translate3d(0, " + offset.toFixed(1) + "px, 0)";
    };
    window.addEventListener("scroll", updateAboutParallax, { passive: true });
    window.addEventListener("resize", updateAboutParallax);
    updateAboutParallax();
  }
})();
