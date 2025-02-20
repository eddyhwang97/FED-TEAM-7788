$(() => {
  // 이달의 추천 도서 swiper
  const monthlySwiper = new Swiper(".monthlySwiper", {
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      500: {
        slidesPerView: 1.5,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
  });

  // 베스트도서, 신착도서 swiper
  const newBookSwiper = new Swiper(".newBookSwiper", {
    observer: true,
    observeParents: true,
    loop: true,
    slidesPerView: 2.2,
    spaceBetween: 10,
    breakpoints: {
      500: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
    },
  });

  const bestBookSwiper = new Swiper(".bestBookSwiper", {
    observer: true,
    observeParents: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      500: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });

  // book-wrap tab
  $bookTabLi = $(".book-wrap .book-tab>li");
  $bookTabBtn = $(".book-wrap .book-tab>li>button");
  $bookTabCont = $(".book-wrap .book-tab-cont");
  $bookSlide = $(".book-wrap .swiper-wrapper");
  $bookTabBtn.on({
    click: function () {
      $bookTabBtn.removeAttr("aria-label");
      let txt = $(this).text();
      let label = txt + " 선택됨";
      $(this).attr("aria-label", label);
      $bookTabLi.removeClass("on");
      $(this).closest("li").addClass("on");
      let idx = $(this).closest("li").index();
      $bookTabCont.eq(idx).addClass("on").siblings().removeClass("on");
    },
  });
});
