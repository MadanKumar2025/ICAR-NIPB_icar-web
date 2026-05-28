document.addEventListener("DOMContentLoaded", function () {
// 1 Sticky Header
const header = document.querySelector(".header-section");
const toggleClass = "is-sticky";
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 150) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});
  /* ================= HEADER ================= */
  const menu = document.querySelector(".sidebar-menu");
  const overlay = document.querySelector(".menu-overlay");
  const openBtn = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".menu-close");
  if (menu && overlay && openBtn && closeBtn) {
    const closeMenu = () => {
      menu.classList.remove("active");
      overlay.classList.remove("active");
    };
    openBtn.onclick = () => {
      menu.classList.add("active");
      overlay.classList.add("active");
    };
    closeBtn.onclick = closeMenu;
    overlay.onclick = closeMenu;
  }
  // Mobile dropdown
  document.querySelectorAll('.dropdown > a, .dropdown-submenu > a')
    .forEach(el => {
      el.onclick = function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          this.nextElementSibling?.classList.toggle("show");
        }
      };
    });
  /* ================= SWIPER ================= */
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-container", {
      loop: true,
      speed: 1000,
      parallax: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });
  }
  document.querySelectorAll(".slide-bg-image").forEach(el => {
    const bg = el.getAttribute("data-background");
    if (bg) el.style.backgroundImage = `url(${bg})`;
  });

  /* ================= WOW ================= */
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  /* ================= CUSTOM GALLERY ================= */
  const images = document.querySelectorAll(".gallery-img");
  const modal = document.getElementById("customModal");
  const modalImg = document.getElementById("modalImg");
  const closeGallery = document.querySelector(".close-btn");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  if (images.length && modal && modalImg) {
    let currentIndex = 0;
    images.forEach((img, index) => {
      img.onclick = () => {
        currentIndex = index;
        showImage();
        modal.classList.add("active");
      };
    });
    function showImage() {
      modalImg.src = images[currentIndex].getAttribute("src");
    }
    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    });
    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    });
    closeGallery?.addEventListener("click", () => {
      modal.classList.remove("active");
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;
      if (e.key === "ArrowRight") nextBtn?.click();
      if (e.key === "ArrowLeft") prevBtn?.click();
      if (e.key === "Escape") modal.classList.remove("active");
    });
  }

  /* ================= NEWS MODAL ================= */
  const newsModal = document.querySelector(".newPopup");
  const triggers = document.querySelectorAll(".news-popup-trigger");
  const closeNews = document.querySelector(".popup-close-btn");
  if (newsModal && closeNews) {
    const toggleModal = () => newsModal.classList.toggle("show-modal");
    triggers.forEach(btn => btn.onclick = toggleModal);
    closeNews.onclick = toggleModal;
  }
  /* =================  ================= */
  if (typeof Swiper !== "undefined") {
    new Swiper(".logo-slider", {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: { slidesPerView: 2 },
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
        1200: { slidesPerView: 6 }
      }
    });
  }
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 500;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.classList.remove("theme-blue", "theme-green", "theme-orange");
      document.body.classList.add("theme-" + btn.dataset.theme);
    });
  });
});