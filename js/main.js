"use strict";

/**
 * Each booking <form> posts to its own `action` URL — the Formspree
 * endpoint at https://formspree.io/f/myeggnpv (set on the <form> in
 * index.html and book.html). Formspree requires the first submission
 * to a new form to be confirmed by email before it starts delivering.
 *
 * Lenis (loaded via CDN in each HTML file, before this script) gives
 * the whole site smoother, weighted scrolling instead of the browser
 * default. initSmoothScroll() no-ops if the CDN script fails to load
 * or hasn't loaded yet — native scrolling just applies as the fallback.
 */

function initScrollReveal() {
  const targets = document.querySelectorAll("main > section");
  if (!targets.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({ duration: 1.1 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function showValidatorError(v) {
  if (v.wrapper) v.wrapper.classList.add("has-error");
  if (v.errorEl) {
    v.errorEl.textContent = v.message();
    v.errorEl.classList.add("is-visible");
  }
}

function clearValidatorError(v) {
  if (v.wrapper) v.wrapper.classList.remove("has-error");
  if (v.errorEl) v.errorEl.classList.remove("is-visible");
}

function buildValidators(form, topicsHidden) {
  const validators = [];

  form.querySelectorAll("[required]").forEach((field) => {
    validators.push({
      focusEl: field,
      wrapper: field.closest(".field"),
      errorEl: field.closest(".field") && field.closest(".field").querySelector(".field-error"),
      isValid: () => field.validity.valid,
      message: () => {
        if (field.validity.typeMismatch) {
          return field.dataset.invalidMessage || "Please enter a valid value.";
        }
        return field.dataset.requiredMessage || "This field is required.";
      },
    });
  });

  const topicsGroup = form.querySelector("[data-topics-group]");
  if (topicsGroup) {
    const wrapper = topicsGroup.closest(".field");
    validators.push({
      focusEl: topicsGroup.querySelector(".topic-chip"),
      wrapper,
      errorEl: wrapper && wrapper.querySelector(".field-error"),
      isValid: () => !!(topicsHidden && topicsHidden.value.trim()),
      message: () => "Please select at least one topic.",
    });
  }

  // Keep validators in document order so "first invalid" matches reading order.
  validators.sort((a, b) => {
    const posA = a.focusEl.compareDocumentPosition(b.focusEl);
    return posA & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  return validators;
}

function initBookingForms() {
  document.querySelectorAll("[data-booking-form]").forEach((wrapper) => {
    const form = wrapper.querySelector("form");
    const success = wrapper.querySelector(".booking-success");
    const errorBox = wrapper.querySelector(".form-error");
    const resetBtn = wrapper.querySelector(".btn-reset");
    const topicsHidden = form.querySelector('input[name="topics"]');
    const chips = wrapper.querySelectorAll(".topic-chip");
    const submitBtn = form.querySelector('button[type="submit"]');
    const validators = buildValidators(form, topicsHidden);
    const topicsValidator = validators.find((v) => v.focusEl && v.focusEl.classList && v.focusEl.classList.contains("topic-chip"));

    const selected = new Set();

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const label = chip.dataset.topic;
        if (selected.has(label)) {
          selected.delete(label);
          chip.classList.remove("is-selected");
        } else {
          selected.add(label);
          chip.classList.add("is-selected");
        }
        if (topicsHidden) topicsHidden.value = Array.from(selected).join(", ");
        if (topicsValidator && topicsValidator.isValid()) clearValidatorError(topicsValidator);
      });
    });

    validators.forEach((v) => {
      if (v === topicsValidator) return;
      v.focusEl.addEventListener("blur", () => {
        if (v.isValid()) clearValidatorError(v);
        else showValidatorError(v);
      });
      v.focusEl.addEventListener("input", () => {
        if (v.wrapper && v.wrapper.classList.contains("has-error") && v.isValid()) clearValidatorError(v);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorBox.classList.remove("is-visible");
      validators.forEach(clearValidatorError);

      const firstInvalid = validators.find((v) => !v.isValid());
      if (firstInvalid) {
        showValidatorError(firstInvalid);
        firstInvalid.focusEl.focus();
        firstInvalid.wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then((res) => {
          if (res.ok) {
            form.hidden = true;
            success.classList.add("is-visible");
          } else {
            throw new Error("Request failed");
          }
        })
        .catch(() => {
          errorBox.textContent =
            "Something went wrong sending this — please email alibabaeinote@gmail.com directly instead.";
          errorBox.classList.add("is-visible");
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        form.reset();
        selected.clear();
        chips.forEach((c) => c.classList.remove("is-selected"));
        if (topicsHidden) topicsHidden.value = "";
        validators.forEach(clearValidatorError);
        form.hidden = false;
        success.classList.remove("is-visible");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBookingForms();
  initScrollReveal();
  initSmoothScroll();
});
