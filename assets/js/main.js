// Fizz 649LA promo — interactions
(function(){
  // Auto-update year and current date placeholders
  const now = new Date();
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = now.getFullYear());
  document.querySelectorAll("[data-date]").forEach(el => {
    const lang = document.documentElement.lang || "en";
    el.textContent = now.toLocaleDateString(lang, {year:"numeric", month:"long", day:"numeric"});
  });
  document.querySelectorAll("[data-month-year]").forEach(el => {
    const lang = document.documentElement.lang || "en";
    el.textContent = now.toLocaleDateString(lang, {year:"numeric", month:"long"});
  });

  // Scroll reveal
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.12, rootMargin: "0px 0px -40px 0px"});
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }

  // Copy referral code
  const toast = document.getElementById("toast");
  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const code = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(code);
        const original = btn.textContent;
        btn.classList.add("copied");
        btn.textContent = btn.dataset.copiedLabel || "Copied!";
        showToast(btn.dataset.toast || "Code copied");
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.textContent = original;
        }, 1600);
      } catch(_){
        showToast("Press Ctrl+C / Cmd+C");
      }
    });
  });

  // Close lang-picker dropdown on outside click or Escape
  document.querySelectorAll("details.lang-picker").forEach(d => {
    document.addEventListener("click", (e) => {
      if (d.open && !d.contains(e.target)) d.removeAttribute("open");
    });
    d.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && d.open) {
        d.removeAttribute("open");
        const s = d.querySelector("summary");
        if (s) s.focus();
      }
    });
  });
})();
