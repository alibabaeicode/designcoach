"use strict";

/**
 * Each booking <form> posts to its own `action` URL — the Formspree
 * endpoint at https://formspree.io/f/myeggnpv (set on the <form> in
 * index.html and book.html). Formspree requires the first submission
 * to a new form to be confirmed by email before it starts delivering.
 */

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

function initBookingForms() {
  document.querySelectorAll("[data-booking-form]").forEach((wrapper) => {
    const form = wrapper.querySelector("form");
    const success = wrapper.querySelector(".booking-success");
    const errorBox = wrapper.querySelector(".form-error");
    const resetBtn = wrapper.querySelector(".btn-reset");
    const topicsHidden = form.querySelector('input[name="topics"]');
    const chips = wrapper.querySelectorAll(".topic-chip");
    const submitBtn = form.querySelector('button[type="submit"]');

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
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorBox.classList.remove("is-visible");
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
        form.hidden = false;
        success.classList.remove("is-visible");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBookingForms();
});
