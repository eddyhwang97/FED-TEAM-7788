// md JS - md.js

var swiper = new Swiper(".my-carousel__swiper", {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
      nextEl: ".my-carousel__control--next",
      prevEl: ".my-carousel__control--prev"
    },
    slidesPerView: 3,
    effect: "creative",
    creativeEffect: {
      perspective: true,
      limitProgress: 3,
      prev: {
        translate: ["-90%", "20%", -100],
        rotate: [0, 0, -20],
        origin: "bottom"
      },
      next: {
        translate: ["90%", "20%", -100],
        rotate: [0, 0, 20],
        origin: "bottom"
      }
    }
  });
  