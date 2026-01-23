(function () {
  // Set active menu based on current file
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute("href").toLowerCase() === path) a.classList.add("active");
  });

  // Simple site-wide search (redirect to blog page with query)
  const form = document.querySelector('[data-search-form]');
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = (document.querySelector('[data-search-input]')?.value || "").trim();
      const target = form.getAttribute("data-search-target") || "blog.html";
      const url = `${target}?q=${encodeURIComponent(q)}`;
      location.href = url;
    });
  }

  // Filter blog cards by query param ?q=
  const params = new URLSearchParams(location.search);
  const q = (params.get("q") || "").toLowerCase();
  const qEl = document.querySelector("[data-query-label]");
  if (qEl && q) qEl.textContent = `Hasil pencarian untuk: "${q}"`;

  const cards = document.querySelectorAll("[data-searchable]");
  if (cards.length && q) {
    let shown = 0;
    cards.forEach(card => {
      const text = (card.textContent || "").toLowerCase();
      const ok = text.includes(q);
      card.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    const empty = document.querySelector("[data-empty]");
    if (empty) empty.style.display = shown ? "none" : "";
  }
})();
    