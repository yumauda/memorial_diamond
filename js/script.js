
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  const $topBtn = $('.js-pagetop');
  const $mv = $('.p-mv');
  const $header = $('.js-header');

  const params = new URLSearchParams(window.location.search);
  const sentType = params.get('sent');

  const SCROLL_KEY = 'hakoSkan_scrollY';

  function formatDateTimeJP(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const pad2 = (n) => String(n).padStart(2, '0');
    return (
      date.getFullYear() +
      '/' + pad2(date.getMonth() + 1) +
      '/' + pad2(date.getDate()) +
      ' (' + days[date.getDay()] + ') ' +
      pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds())
    );
  }

  // お申し込み：箱数 → 合計金額（N×66,000）自動計算
  const $applyBoxes = $('#apply-boxes');
  const $applyTotal = $('#apply-total');

  function toHalfWidthNumbers(value) {
    return String(value).replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

  // 郵便番号 → 住所 自動補完（ZipCloud / JSONP）
  const zipAddressCache = {};

  function normalizeZip(value) {
    const normalized = toHalfWidthNumbers(value);
    return normalized.replace(/[^\d]/g, '').slice(0, 7);
  }

  function fetchAddressByZip(zip) {
    if (zipAddressCache[zip]) return zipAddressCache[zip];
    zipAddressCache[zip] = $.getJSON('https://zipcloud.ibsnet.co.jp/api/search?callback=?', { zipcode: zip })
      .then(function (data) {
        if (!data || data.status !== 200 || !data.results || !data.results.length) return null;
        const r = data.results[0];
        return (r.address1 || '') + (r.address2 || '') + (r.address3 || '');
      })
      .catch(function () {
        return null;
      });
    return zipAddressCache[zip];
  }

  function initZipAutoFill(zipSelector, addressSelector) {
    const $zip = $(zipSelector);
    const $addr = $(addressSelector);
    if (!$zip.length || !$addr.length) return;

    let timer = null;
    function run() {
      const zip = normalizeZip($zip.val());
      if (zip.length !== 7) return;
      fetchAddressByZip(zip).then(function (address) {
        if (!address) return;
        const current = String($addr.val() || '').trim();
        if (current !== '') return;
        $addr.val(address).trigger('input');
      });
    }

    $zip.on('input change blur', function () {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(run, 250);
    });
  }

  function updateApplyTotalFromBoxes() {
    if (!$applyBoxes.length || !$applyTotal.length) return;
    const raw = $applyBoxes.val();
    const normalized = toHalfWidthNumbers(raw);
    const match = normalized.match(/\d+/);
    if (!match) {
      $applyTotal.val('');
      return;
    }

    const n = parseInt(match[0], 10);
    if (!Number.isFinite(n) || n <= 0) {
      $applyTotal.val('');
      return;
    }

    const total = n * 66000;
    $applyTotal.val(total.toLocaleString('ja-JP') + '円');
    $applyTotal.trigger('input');
  }

  updateApplyTotalFromBoxes();
  $applyBoxes.on('input change', function () {
    updateApplyTotalFromBoxes();
  });

  initZipAutoFill('#apply-zip', '#apply-address');
  initZipAutoFill('#inq-zip', '#inq-address');

  $('#contact-panel-inquiry .p-contact__form, #contact-panel-apply .p-contact__form').on('submit', function () {
    try {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    } catch (e) {
      // ignore
    }
    $(this).find('input[name="page_url"]').val(window.location.href);
  });

  function updateTopBtnVisibility() {
    if (!$topBtn.length || !$mv.length) return;
    const mvBottom = $mv.offset().top + $mv.outerHeight();
    const scrollTop = $(window).scrollTop();
    const shouldShow = scrollTop > mvBottom;
    $topBtn.toggleClass('is-visible', shouldShow);
  }

  function updateHeaderScroll() {
    if (!$header.length || !$mv.length) return;
    const mvBottom = $mv.offset().top + $mv.outerHeight();
    const scrollTop = $(window).scrollTop();
    const shouldScroll = scrollTop > mvBottom;
    $header.toggleClass('js-header-scroll', shouldScroll);
  }

  updateTopBtnVisibility();
  updateHeaderScroll();
  $(window).on('scroll resize', function () {
    updateTopBtnVisibility();
    updateHeaderScroll();
  });

  $topBtn.on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({ scrollTop: 0 }, 300, 'swing');
  });

 
  // お申し込み / お問い合わせ タブ切り替え
  const $tabs = $('.js-contact-tab');
  const $panels = $('.js-contact-panel');

  function setActiveTab(tabEl) {
    const $tab = $(tabEl);
    const targetId = $tab.attr('aria-controls');

    $tabs.each(function () {
      const isActive = this === tabEl;
      $(this)
        .toggleClass('is-active', isActive)
        .attr('aria-selected', isActive ? 'true' : 'false')
        .attr('tabindex', isActive ? '0' : '-1');
    });

    $panels.each(function () {
      const isTarget = this.id === targetId;
      $(this).prop('hidden', !isTarget);
    });
  }

  $tabs.on('click', function () {
    setActiveTab(this);
  });

  // 送信ボタンのdisabled制御（未入力/未同意のとき押せない＋灰色表示）
  (function initSubmitDisabled() {
    const $forms = $('#contact-panel-apply .p-contact__form, #contact-panel-inquiry .p-contact__form');
    if (!$forms.length) return;

    function sync($form) {
      const formEl = $form.get(0);
      const $submit = $form.find('.p-contact__submit');
      if (!formEl || !$submit.length) return;
      const isValid = typeof formEl.checkValidity === 'function' ? formEl.checkValidity() : true;
      $submit.prop('disabled', !isValid);
    }

    $forms.each(function () {
      const $form = $(this);
      sync($form);
      $form.on('input change', function () {
        sync($form);
      });
    });
  })();

  // 送信後の表示（ボタン直下にメッセージ表示）
  (function showSubmitResult() {
    if (sentType !== 'apply' && sentType !== 'inquiry') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const tabEl = sentType === 'apply'
      ? document.getElementById('contact-tab-apply')
      : document.getElementById('contact-tab-inquiry');
    if (tabEl) setActiveTab(tabEl);

    const $form = sentType === 'apply'
      ? $('#contact-panel-apply .p-contact__form')
      : $('#contact-panel-inquiry .p-contact__form');
    const $note = $form.find('.js-submit-note');
    if ($note.length) {
      const msg = sentType === 'apply' ? '送信されました。' : '送信されました。';
      $note.text(msg).prop('hidden', false);
    }

    // 送信前のスクロール位置を復元（送信ボタン付近に留める）
    try {
      const y = Number(sessionStorage.getItem(SCROLL_KEY));
      sessionStorage.removeItem(SCROLL_KEY);
      if (Number.isFinite(y)) {
        requestAnimationFrame(function () {
          const html = document.documentElement;
          const prev = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';
          window.scrollTo(0, y);
          html.style.scrollBehavior = prev;
        });
      }
    } catch (e) {
      // ignore
    }

    // リロードで再表示され続けないようURLを掃除（#contactは保持）
    if (window.history && window.history.replaceState) {
      const cleaned = window.location.pathname + window.location.hash;
      window.history.replaceState(null, '', cleaned);
    }
  })();

  $tabs.on('keydown', function (e) {
    const key = e.key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;

    e.preventDefault();
    const currentIndex = $tabs.index(this);
    let nextIndex = currentIndex;

    if (key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
    if (key === 'ArrowRight') nextIndex = Math.min($tabs.length - 1, currentIndex + 1);
    if (key === 'Home') nextIndex = 0;
    if (key === 'End') nextIndex = $tabs.length - 1;

    const nextTab = $tabs.get(nextIndex);
    nextTab.focus();
    setActiveTab(nextTab);
  });

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

  $('.p-faq__summary').on('click', function () {
    const $btn = $(this);
    const $item = $btn.closest('.p-faq__item');
    $item.toggleClass('is-open');
    $btn.attr('aria-expanded', $item.hasClass('is-open') ? 'true' : 'false');
  });

});
