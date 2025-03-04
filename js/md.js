// md JS - md.js

$(() => {
  const bookSwiper = new Swiper(".book-swiper", {
    loop: true,
    slidesPerView: 1.5,
    spaceBetween: 10,
    centeredSlides: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
        
      },
    },
  });
});
  