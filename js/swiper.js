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

(function ($) {
  if (!$ || typeof Swiper === 'undefined') return;

  // ラインナップ：タブ＋Swiper＋画像クリックでモーダル（サムネイル連動）
  (function initLineup() {
    const $lineupTabs = $('.js-lineup-tab');
    const $lineupInfos = $('.js-lineup-info');
    const $lineupSliders = $('.js-lineup-slider');
    const $lineupModal = $('#lineup-modal');
    if (!$lineupTabs.length || !$lineupModal.length) return;

    const lineupSwipers = {};
    let modalMainSwiper = null;
    let modalThumbSwiper = null;
    let lastFocusEl = null;
    let modalCloseTimer = null;

	    function escapeHtml(str) {
	      return String(str)
	        .replace(/&/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/"/g, '&quot;')
	        .replace(/'/g, '&#39;');
	    }

	    function setModalDetail(item) {
	      if (!item) return;
	      const category = item.category || '';
	      const isRing = category === 'ring';
	      const isPendant = category === 'pendant';
	      const rows = {
	        type: $lineupModal.find('[data-modal-row="type"]'),
	        number: $lineupModal.find('[data-modal-row="number"]'),
	        color: $lineupModal.find('[data-modal-row="color"]'),
	        size: $lineupModal.find('[data-modal-row="size"]'),
	        chain: $lineupModal.find('[data-modal-row="chain"]'),
	      };

	      $lineupModal.find('.js-lineup-modal-title').text(item.title || '');
	      $lineupModal.find('.js-lineup-modal-type-label').text('種類');
	      $lineupModal.find('.js-lineup-modal-type').text(isPendant ? 'ネックレス' : (item.type || ''));
	      $lineupModal.find('.js-lineup-modal-number').text(item.number || '');
	      $lineupModal.find('.js-lineup-modal-color').text(item.color || 'プラチナ');
	      $lineupModal.find('.js-lineup-modal-size').text(item.size || '');
	      $lineupModal.find('.js-lineup-modal-chain').text(item.chain || '4種類から選択可能');

	      rows.type.prop('hidden', isRing);
	      rows.number.prop('hidden', false);
	      rows.color.prop('hidden', false);
	      rows.size.prop('hidden', false);
	      rows.chain.prop('hidden', !isPendant);
	    }

    function destroyModalSwipers() {
      $(document).off('keydown.lineupModal');
      if (modalMainSwiper) {
        modalMainSwiper.destroy(true, true);
        modalMainSwiper = null;
      }
      if (modalThumbSwiper) {
        modalThumbSwiper.destroy(true, true);
        modalThumbSwiper = null;
      }
      $lineupModal.find('.js-lineup-modal-main .swiper-wrapper').empty();
      $lineupModal.find('.js-lineup-modal-thumbs .swiper-wrapper').empty();
    }

    function closeLineupModal() {
      if ($lineupModal.prop('hidden')) return;
      $(document).off('keydown.lineupModal');
      $lineupModal.removeClass('is-visible');
      $('body').css('overflow', '');

      window.clearTimeout(modalCloseTimer);
	      modalCloseTimer = window.setTimeout(function () {
	        destroyModalSwipers();
	        $lineupModal.prop('hidden', true);
	        lastFocusEl = null;
	      }, 280);
	    }

    function initLineupSwiper($root) {
      const key = $root.attr('data-lineup');
      if (!key || lineupSwipers[key]) return;
      const $wrap = $root.closest('.p-lineup__sliderWrap');
      const $scope = $wrap.length ? $wrap : $root;
      lineupSwipers[key] = new Swiper($root[0], {
        slidesPerView: 1.2,
        spaceBetween: 16,
        loop: true,
        watchOverflow: false,
        navigation: {
          nextEl: $scope.find('.swiper-button-next')[0],
          prevEl: $scope.find('.swiper-button-prev')[0],
        },
        pagination: {
          el: $scope.find('.p-lineup__pagination')[0],
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 17,
          },
        },
        observer: true,
        observeParents: true,
      });
    }

    function setActiveLineupTab(tabEl) {
      const $tab = $(tabEl);
      const lineupKey = $tab.attr('data-lineup');

      $lineupTabs.each(function () {
        const isActive = this === tabEl;
        $(this)
          .toggleClass('is-active', isActive)
          .attr('aria-selected', isActive ? 'true' : 'false')
          .attr('tabindex', isActive ? '0' : '-1');
      });

      $lineupInfos.each(function () {
        const isTarget = $(this).attr('data-lineup') === lineupKey;
        $(this).toggleClass('is-active', isTarget).prop('hidden', !isTarget);
      });

      $lineupSliders.each(function () {
        const isTarget = $(this).attr('data-lineup') === lineupKey;
        $(this).toggleClass('is-active', isTarget).prop('hidden', !isTarget);
      });

      $('.js-lineup-swiper').each(function () {
        initLineupSwiper($(this));
      });

      if (lineupKey && lineupSwipers[lineupKey]) {
        window.requestAnimationFrame(function () {
          lineupSwipers[lineupKey].update();
        });
      }
    }

    $('.js-lineup-swiper').each(function () {
      initLineupSwiper($(this));
    });

    $lineupTabs.on('click', function () {
      setActiveLineupTab(this);
    });

    $lineupTabs.on('keydown', function (e) {
      const key = e.key;
      if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;

      e.preventDefault();
      const currentIndex = $lineupTabs.index(this);
      let nextIndex = currentIndex;

      if (key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
      if (key === 'ArrowRight') nextIndex = Math.min($lineupTabs.length - 1, currentIndex + 1);
      if (key === 'Home') nextIndex = 0;
      if (key === 'End') nextIndex = $lineupTabs.length - 1;

      const nextTab = $lineupTabs.get(nextIndex);
      nextTab.focus();
      setActiveLineupTab(nextTab);
    });

    $(document).on('click', '.js-lineup-open-modal', function (e) {
      e.preventDefault();
      if (typeof Swiper === 'undefined') return;

	      const $btn = $(this);
	      const $swiperRoot = $btn.closest('.js-lineup-swiper');
	      const slideAttrIndex = $btn.closest('.swiper-slide').attr('data-swiper-slide-index');
	      let slideIndex = slideAttrIndex !== undefined ? Number(slideAttrIndex) : $btn.closest('.swiper-slide').index();

	      let slides = [];
	      const modalImages = ($btn.attr('data-modal-images') || '')
	        .split('|')
	        .map(function (src) {
	          return src.trim();
	        })
	        .filter(Boolean);

	      if (modalImages.length) {
	        slideIndex = 0;
        const modalTypeLabel = $btn.attr('data-lineup-type') || $btn.attr('data-lineup-title') || '商品';
        modalImages.forEach(function (src, index) {
		          slides.push({
		            src: src,
		            alt: ($btn.attr('data-product-number') || '') + ' ' + modalTypeLabel + ' 画像' + (index + 1),
		            width: '945',
		            height: '945',
		            title: $btn.attr('data-lineup-title') || 'Product detail',
		            type: $btn.attr('data-lineup-type') || '',
		            number: $btn.attr('data-product-number') || '',
		            color: $btn.attr('data-product-color') || 'プラチナ',
		            size: $btn.attr('data-diamond-size') || '',
		            chain: $btn.attr('data-chain-spec') || '4種類から選択可能',
		            category: $swiperRoot.attr('data-lineup') || '',
		          });
		        });
	      } else {
	        $swiperRoot.find('.swiper-slide:not(.swiper-slide-duplicate) .js-lineup-slide-img').each(function () {
	          const el = this;
	          const $itemBtn = $(el).closest('.js-lineup-open-modal');
	          slides.push({
	            src: el.getAttribute('src') || '',
	            alt: el.getAttribute('alt') || '',
	            width: el.getAttribute('width') || '640',
	            height: el.getAttribute('height') || '420',
		            title: $itemBtn.attr('data-lineup-title') || 'Product detail',
		            type: $itemBtn.attr('data-lineup-type') || '',
		            number: $itemBtn.attr('data-product-number') || '',
		            color: $itemBtn.attr('data-product-color') || 'プラチナ',
		            size: $itemBtn.attr('data-diamond-size') || '',
		            chain: $itemBtn.attr('data-chain-spec') || '4種類から選択可能',
		            category: $swiperRoot.attr('data-lineup') || '',
		          });
		        });
	      }

      const $mainWrap = $lineupModal.find('.js-lineup-modal-main .swiper-wrapper');
      const $thumbWrap = $lineupModal.find('.js-lineup-modal-thumbs .swiper-wrapper');

      window.clearTimeout(modalCloseTimer);
      $lineupModal.removeClass('is-visible');
      destroyModalSwipers();

      slides.forEach(function (item) {
        $mainWrap.append(
          '<div class="swiper-slide"><img decoding="async" loading="eager" src="' +
            escapeHtml(item.src) +
            '" alt="' +
            escapeHtml(item.alt) +
            '" width="' +
            escapeHtml(item.width) +
            '" height="' +
            escapeHtml(item.height) +
            '"></div>'
        );
        $thumbWrap.append(
          '<div class="swiper-slide"><img decoding="async" loading="eager" src="' +
            escapeHtml(item.src) +
            '" alt="" width="' +
            escapeHtml(item.width) +
            '" height="' +
            escapeHtml(item.height) +
            '"></div>'
        );
      });

      const mainEl = $lineupModal.find('.js-lineup-modal-main')[0];
      const thumbEl = $lineupModal.find('.js-lineup-modal-thumbs')[0];

      modalThumbSwiper = new Swiper(thumbEl, {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
      });

	      modalMainSwiper = new Swiper(mainEl, {
	        initialSlide: Math.max(0, slideIndex),
	        spaceBetween: 10,
	        navigation: {
          nextEl: $lineupModal.find('.js-lineup-modal-main .swiper-button-next')[0],
          prevEl: $lineupModal.find('.js-lineup-modal-main .swiper-button-prev')[0],
        },
	        thumbs: {
	          swiper: modalThumbSwiper,
	        },
	        on: {
	          init: function () {
	            setModalDetail(slides[this.realIndex] || slides[this.activeIndex]);
	          },
	          slideChange: function () {
	            setModalDetail(slides[this.realIndex] || slides[this.activeIndex]);
	          },
	        },
	      });

      lastFocusEl = this;
      $lineupModal.prop('hidden', false);
      $('body').css('overflow', 'hidden');

      $(document).on('keydown.lineupModal', function (ev) {
        if (ev.key !== 'Escape') return;
        ev.preventDefault();
        closeLineupModal();
      });

      window.requestAnimationFrame(function () {
        $lineupModal.addClass('is-visible');
        modalMainSwiper.update();
        modalThumbSwiper.update();
      });

      $lineupModal.find('.p-lineup__modalClose').trigger('focus');
    });

    $('.js-lineup-modal-close').on('click', function (e) {
      e.preventDefault();
      closeLineupModal();
    });
  })();
})(window.jQuery);
