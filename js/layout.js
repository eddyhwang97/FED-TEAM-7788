$(() => {
  // variables
  const $body = $("body"),
    $dimm = $(".dimm"),
    $searchDimm = $(".search-dimm"),
    $innerHeaderWrap = $(".inner-header-wrap"),
    $menuBtn = $(".menu-btn"),
    $menuClose = $(".menu-close-btn"),
    $gnbWrap = $(".gnb-wrap"),
    $gnb = $(".gnb"),
    $dep1 = $gnb.find(".dep1>a"),
    $dep2 = $(".dep2"),
    $totalSearchBtn = $(".total-search-btn"),
    $searchCloseBtn = $(".search-close-btn"),
    $searchWrap = $(".search-wrap");

  mobGnb();
  webGnb();

  // mobile gnb
  function mobGnb() {
    function reset() {
      $body.removeClass("on");
      $dimm.removeClass("on");
      $innerHeaderWrap.removeClass("open");
      $gnbWrap.removeClass("open");
      $dep1.parent().removeClass("on");
      $dep2.removeClass("show");
      searchClose();
    }

    $menuBtn.on("click", function () {
      $body.addClass("on");
      $gnbWrap.addClass("open");
      $(".gnb-list>li:first-child").addClass("on");
      $(".gnb-list>li:first-child").find($dep2).addClass("show");
      searchClose();
    });

    $menuClose.on("click", reset);

    $dep1.on("click", function () {
      if (!$(this).parent().hasClass("on")) {
        $(this).parent().addClass("on").siblings().removeClass("on");
        $dep2.removeClass("show");
        $(this).next($dep2).addClass("show");
      } else {
        $(this).parent().removeClass("on");
        $dep2.removeClass("show");
      }
    });
  }

  // web gnb
  function webGnb() {
    function reset() {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.removeClass("open");
        $gnbWrap.removeClass("open");
        $dimm.removeClass("on");
        $body.removeClass("on");
        $dep1.parent().removeClass("on");
      }
    }

    $(window).on("resize", function () {
      reset();
    });

    $dep1.on("mouseenter focusin", function () {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.addClass("open");
        $dimm.addClass("on");
        if ($searchWrap.hasClass("on")) {
          searchClose();
        }
      }
    });

    $innerHeaderWrap.on("mouseleave", function () {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.removeClass("open");
        $dimm.removeClass("on");
      }
    });
  }

  // total search
  searchOpen();

  function searchClose(){
    $searchDimm.removeClass("on");
    $searchWrap.removeClass("on");
    $searchWrap.stop().slideUp();
    $totalSearchBtn.removeClass("on");
    $searchCloseBtn.removeClass("on");
  }

  function searchOpen() {
    $totalSearchBtn.on("click", function () {
      $(this).addClass("on");
      $searchWrap.addClass("on");
      $searchWrap.stop().slideDown();
      $searchCloseBtn.addClass("on");
      $dimm.removeClass("on");
      $searchDimm.addClass("on");
      if ($innerHeaderWrap.hasClass("open")) {
        $innerHeaderWrap.removeClass("open");
      }
    });

    $searchCloseBtn.on("click", function () {
      searchClose();
    });

    $searchDimm.on("click", function () {
      searchClose();
    });
  }
});
