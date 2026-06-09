gsap.registerPlugin(ScrollTrigger);



var webStorage = function () {
  var hasAccess = false;

  try {
    hasAccess = Boolean(sessionStorage.getItem('access'));
  } catch (e) {
    hasAccess = false;
  }

  if (hasAccess) {
    gsap.set(".p-loading", {
      display: "none",
    });
    gsap.set(".p-loading__logo", {
      display: "none",
    });
    gsap.set(".js-mv-img", {
      opacity: 1,
    });
    gsap.set(".js-mv-text", {
      opacity: 1,
    });
    gsap.set(".js-mv-text--color", {
      color: '#B18C4E',
    });

  } else {
    try {
      sessionStorage.setItem('access', '1');
    } catch (e) {
      // Safariの設定やプライベートブラウズでsessionStorageが使えない場合も、ローディングは進める。
    }

    const opening = gsap.timeline();
    const mvSplitTexts = document.querySelectorAll('.js-mv-splitText');

    mvSplitTexts.forEach((mvSplitText) => {
      const text = mvSplitText.textContent.trim();
      mvSplitText.setAttribute('aria-label', text);
      mvSplitText.textContent = '';

      Array.from(text).forEach((char) => {
        if (char === ' ') {
          mvSplitText.appendChild(document.createTextNode(' '));
          return;
        }

        const span = document.createElement('span');
        span.className = 'js-mv-splitText-char';
        span.setAttribute('aria-hidden', 'true');
        span.style.display = 'inline-block';
        span.textContent = char;
        mvSplitText.appendChild(span);
      });
    });

    // 最初にロゴの丸のみがふわっと

    opening.to(".p-loading__logo", {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.0,
      ease: 'power2.inOut',
    });
    opening.to(".p-loading", {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut',
      onComplete: function () {
        gsap.set(".p-loading", {
          display: "none",
        });
      },
    });

    opening.to(".js-mv-img", {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut',
    });
    opening.to(".js-mv-text", {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut',
    }, "-=0.2");
    opening.to(".js-mv-text--color", {
      duration: 1.0,
      ease: 'power2.inOut',
      color: '#B18C4E',
    });
    opening.addLabel('mvSplitText');
    mvSplitTexts.forEach((mvSplitText, index) => {
      opening.fromTo(
        mvSplitText.querySelectorAll('.js-mv-splitText-char'),
        {
          opacity: 0,
          y: 4,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.035,
          delay: index * 0.15,
        },
        'mvSplitText'
      );
    });
    opening.fromTo(".js-mv-buttons", {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.inOut',
    }, "-=0.8");

    opening.fromTo(".js-header", {
      opacity: 0,
      y: -100,
    }, {
      opacity: 1,
      y: 0,
      ease: 'power2.inOut',
      duration: 1.0,
    }, "-=0.8");

  }
}
webStorage();

let bgWaves = document.querySelectorAll('.js-wave');

bgWaves.forEach((bgWave) => {
  gsap.fromTo(
    bgWave,
    {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: bgWave,
        start: 'top 90%',
      },
    }
  );
});
let bgWaves2 = document.querySelectorAll('.js-wave2');

bgWaves2.forEach((bgWave2) => {
  gsap.fromTo(
    bgWave2,
    {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 4,
      ease: 'power2.inOut',
      zIndex: 1,
      scrollTrigger: {
        trigger: bgWave2,
        start: 'top 90%',
      },
    }
  );
});

let opacityWords = document.querySelectorAll('.js-opacity-word');

opacityWords.forEach((opacityWord) => {
  gsap.fromTo(
    opacityWord,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: opacityWord,
        start: 'top 90%',
      },
    }
  );
});

let splitTexts = document.querySelectorAll('.js-split-text');

splitTexts.forEach((splitText) => {
  const text = splitText.textContent.trim();
  const originalNodes = Array.from(splitText.childNodes);
  splitText.setAttribute('aria-label', text);
  splitText.textContent = '';

  const splitNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      Array.from(node.textContent).forEach((char) => {
        if (!char.trim()) return;

        const span = document.createElement('span');
        span.className = 'js-split-text-char';
        span.setAttribute('aria-hidden', 'true');
        span.style.display = 'inline-block';
        span.textContent = char;
        fragment.appendChild(span);
      });
      return fragment;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      Array.from(node.childNodes).forEach((childNode) => {
        clone.appendChild(splitNode(childNode));
      });
      return clone;
    }

    return document.createDocumentFragment();
  };

  originalNodes.forEach((node) => {
    splitText.appendChild(splitNode(node));
  });

  gsap.fromTo(
    splitText.querySelectorAll('.js-split-text-char'),
    {
      opacity: 0,
      y: 4,
      filter: "blur(2px)",
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: splitText,
        start: 'top 90%',
      },
    }
  );
});
// let proWords = document.querySelectorAll('.js-pro-word');

// proWords.forEach((proWord) => {
//   gsap.fromTo(
//     proWord,
//     {
//       "--width": "0%",
//       opacity: 0,
//     },
//     {
//       "--width": "100%",
//       opacity: 1,
//       duration: 1.5,
//       ease: 'power3.out',
//       stagger: 0.08,
//       scrollTrigger: {
//         trigger: proWord,
//         start: 'top 90%',
//       },
//     }
//   );
// });

// let yellowWords = document.querySelectorAll('.js-yellow-word');

// yellowWords.forEach((yellowWord) => {
//   gsap.fromTo(
//     yellowWord,
//     {
//       color: "#fff",
//     },
//     {
//       color: "#fff100",
//       delay: 0.5,
//       duration: 1,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: yellowWord,
//         start: 'top 90%',
//       },
//     }
//   );
// });
// let blueWords = document.querySelectorAll('.js-blue-word');

// blueWords.forEach((blueWord) => {
//   gsap.fromTo(
//     blueWord,
//     {
//       color: "#111",
//     },
//     {
//       color: "#54C3F1",
//       delay: 0.5,
//       duration: 1,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: blueWord,
//         start: 'top 90%',
//       },
//     }
//   );
// });

// let markers = document.querySelectorAll('.js-marker');

// markers.forEach((marker) => {
//   gsap.fromTo(
//     marker,
//     {
//       "--width": "0%",
//     },
//     {
//       "--width": "100%",
//       delay: 0.5,
//       duration: 1,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: marker,
//         start: 'top 90%',
//       },
//     }
//   );
// });

// let submits = document.querySelectorAll('.js-submit');

// submits.forEach((submit) => {
//   gsap.fromTo(
//     submit,
//     {
//       clipPath: "inset(100% 100% 100% 100%)",
//     },
//     {
//       clipPath: "inset(0% 0% 0% 0%)",
//       delay: 0.5,
//       duration: 1,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: submit,
//         start: 'top 90%',
//       },
//     }
//   );
// });

let parallaxImgs = document.querySelectorAll('.js-parallax');

parallaxImgs.forEach((parallaxImg) => {
  gsap.fromTo(
    parallaxImg.querySelector('img'),
    {
      y: -25,
    },
    {
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: parallaxImg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    }
  );
});
let opacityImgs = document.querySelectorAll('.js-opacity-img');

opacityImgs.forEach((opacityImg) => {
  gsap.fromTo(
    opacityImg,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: opacityImg,
        start: 'top bottom',
        end: 'bottom top',
      },
    }
  );
});
let opacityDelays = document.querySelectorAll('.js-opacity-img--delay');

opacityDelays.forEach((opacityDelay) => {
  gsap.fromTo(
    opacityDelay,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: opacityDelay,
        start: 'top 70%',
      },
    }
  );
});

let columnTitleIcons = document.querySelectorAll('.js-circle-icon');

columnTitleIcons.forEach((icon) => {
  const row = icon.closest('.js-circle-icon');
  gsap.fromTo(
    icon,
    {
      y: -14,
    },
    {
      y: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: row || icon,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    }
  );
});

let processLines = document.querySelectorAll('.js-process-line');

processLines.forEach((processLine) => {
  gsap.fromTo(
    processLine,
    {
      "--width": '0vw',
    },
    {
      "--width": '100vw',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: processLine,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    }
  );
});
