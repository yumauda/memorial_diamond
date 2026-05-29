"use strict";

const slider2 = new Swiper(".slider2", {
  slidesPerView: 1.6,
  centeredSlides: true,
  loop: false,
  spaceBetween: 52,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 2,
      spaceBetween: 32,
      centeredSlides: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
const slider3 = new Swiper(".slider3", {
  slidesPerView: 1.2,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// ピックアップタブスライダー
const sliderPickup = new Swiper(".slider-pickup", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '[data-content="all"] .swiper-button-next',
    prevEl: '[data-content="all"] .swiper-button-prev',
  },
});

const sliderStay = new Swiper(".slider-stay", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '[data-content="stay"] .swiper-button-next',
    prevEl: '[data-content="stay"] .swiper-button-prev',
  },
});

const sliderFood = new Swiper(".slider-food", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '[data-content="food"] .swiper-button-next',
    prevEl: '[data-content="food"] .swiper-button-prev',
  },
});

const sliderRestaurant = new Swiper(".slider-restaurant", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '[data-content="restaurant"] .swiper-button-next',
    prevEl: '[data-content="restaurant"] .swiper-button-prev',
  },
});

const sliderNews = new Swiper(".slider-news", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: '[data-content="news"] .swiper-button-next',
    prevEl: '[data-content="news"] .swiper-button-prev',
  },
});

const slider4 = new Swiper(".slider4", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  spaceBetween: 10,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 2.2,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
const slider5 = new Swiper(".slider5", {
  slidesPerView: 1.1,
  centeredSlides: true,
  loop: true,
  initialSlide: 0,
  breakpoints: {
    768: {
      effect: "slide",
      slidesPerView: 1.8,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  },
  navigation: {
    nextEl: ".slider5 .swiper-button-next",
    prevEl: ".slider5 .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let proSlider;
const proSliderBreakpoint = window.matchMedia("(min-width: 768px)");

function initProSlider() {
  if (proSlider) return;
  if (!document.querySelector(".js-pro-swiper")) return;

  proSlider = new Swiper(".js-pro-swiper", {
    slidesPerView: "auto",
    centeredSlides: false,
    spaceBetween: 10,
    loop: true,
    speed: 5000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
  });
}

function destroyProSlider() {
  if (!proSlider) return;
  proSlider.destroy(true, true);
  proSlider = undefined;
}

function handleProSliderBreakpoint(e) {
  if (e.matches) {
    initProSlider();
  } else {
    destroyProSlider();
  }
}

handleProSliderBreakpoint(proSliderBreakpoint);
if (proSliderBreakpoint.addEventListener) {
  proSliderBreakpoint.addEventListener("change", handleProSliderBreakpoint);
} else {
  proSliderBreakpoint.addListener(handleProSliderBreakpoint);
}

const topColumnSlider = new Swiper(".js-top-column-swiper", {
  slidesPerView: 1.3,
  centeredSlides: false,
  loop: false,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 3.2,
      centeredSlides: false,
      spaceBetween: 48,
    },
  },
  navigation: {
    nextEl: ".p-top-column__next",
    prevEl: ".p-top-column__prev",
  },
});

if (document.querySelector(".js-top-interview-swiper")) {
  new Swiper(".js-top-interview-swiper", {
    slidesPerView: 1.3,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: "auto",
        centeredSlides: false,
        spaceBetween: 48,
        slidesPerView: 3.2,
      },
    },
    navigation: {
      nextEl: ".p-top-interview__next",
      prevEl: ".p-top-interview__prev",
    },
  });
}
