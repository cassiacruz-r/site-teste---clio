(function () {
  "use strict";

  // ======= CONFIGURAÇÃO =======
  // ⚠️ Troque pelo número real da Clio (com DDI + DDD, só números).
  // Exemplo: 55 73 99999-9999  ->  "5573999999999"
  const WHATSAPP_NUMBER = "5573999999999";

  function buildWhatsAppLink(product) {
    let message;
    if (!product || product === "generic") {
      message = "Oi! Vim pelo site da Clio Personalizados e queria fazer um pedido 💗";
    } else {
      message = `Oi! Vim pelo site da Clio Personalizados e tenho interesse em: ${product} 💗`;
    }
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  function setupWhatsAppLinks() {
    document.querySelectorAll("[data-wa]").forEach((el) => {
      const product = el.getAttribute("data-wa");
      el.setAttribute("href", buildWhatsAppLink(product));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  // ======= MENU MOBILE =======
  function setupMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMobile = document.getElementById("nav-mobile");
    if (!hamburger || !navMobile) return;

    hamburger.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ======= REVEAL ON SCROLL =======
  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  // ======= ANO NO RODAPÉ =======
  function setupYear() {
    const el = document.getElementById("yr");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupWhatsAppLinks();
    setupMobileMenu();
    setupReveal();
    setupYear();
  });
})();
