(async function () {
  const container = document.getElementById("mx-map-container");
  const tooltip = document.getElementById("map-tooltip");
  if (!container) return;

  const regions = {
    MXAGU: "Aguascalientes",
    MXBCN: "Baja California",
    MXBCS: "Baja California Sur",
    MXCAM: "Campeche",
    MXCHH: "Chihuahua",
    MXCHP: "Chiapas",
    MXCMX: "Ciudad de México",
    MXCOA: "Coahuila",
    MXCOL: "Colima",
    MXDUR: "Durango",
    MXGRO: "Guerrero",
    MXGUA: "Guanajuato",
    MXHID: "Hidalgo",
    MXJAL: "Jalisco",
    MXMEX: "México",
    MXMIC: "Michoacán",
    MXMOR: "Morelos",
    MXNAY: "Nayarit",
    MXNLE: "Nuevo León",
    MXOAX: "Oaxaca",
    MXPUE: "Puebla",
    MXQUE: "Querétaro",
    MXROO: "Quintana Roo",
    MXSIN: "Sinaloa",
    MXSLP: "San Luis Potosí",
    MXSON: "Sonora",
    MXTAB: "Tabasco",
    MXTAM: "Tamaulipas",
    MXTLA: "Tlaxcala",
    MXVER: "Veracruz",
    MXYUC: "Yucatán",
    MXZAC: "Zacatecas"
  };

  function slugifySpanish(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  const res = await fetch("/images/mx-admin1.svg");
  const svgText = await res.text();
  container.innerHTML = svgText;

  const svg = container.querySelector("svg");
  if (!svg) return;

  // Tooltip helpers
  function showTooltip(e, text) {
    if (!tooltip) return;
    tooltip.hidden = false;
    tooltip.textContent = text;
    const rect = container.getBoundingClientRect();
    tooltip.style.left = `${e.clientX - rect.left + 12}px`;
    tooltip.style.top = `${e.clientY - rect.top + 12}px`;
  }

  function hideTooltip() {
    if (tooltip) tooltip.hidden = true;
  }

  Object.entries(regions).forEach(([id, name]) => {
    const el = svg.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;

    const slug = slugifySpanish(name);

    // Add hover class to paths
    const shapes = el.querySelectorAll("path, polygon");
    const targets = shapes.length ? shapes : [el];
    targets.forEach(t => t.classList.add("mx-state"));

    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      window.location.href = `/estado/${slug}`;
    });

    el.addEventListener("mousemove", e => showTooltip(e, name));
    el.addEventListener("mouseleave", hideTooltip);

    // ---- ADD LABEL ----
    try {
      const bbox = el.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", cx);
      label.setAttribute("y", cy);
      label.textContent = name;
      label.classList.add("mx-label");

      svg.appendChild(label);
    } catch (err) {
      // Some complex shapes may fail bbox — safe to ignore
    }
  });
})();