$(() => {
  const $body = $("body"),
    $dimm = $(".dimm"),
    $header = $(".header"),
    $innerHeader = $(".inner-header"),
    $headerUtil = $(".header-util"),
    $menuBtn = $(".menu-btn"),
    $gnbWrap = $(".gnb-wrap"),
    $gnb = $(".gnb"),
    $dep1 = $gnb.find(".dep1>a"),
    $dep2 = $(".dep2"),
    $dep2A = $gnb.find(".dep2>ul>li>a");

  const $totalSearchBtn = $(".total-search-btn"),
    $searchWrap = $(".search-wrap"),
    $searchClose = $(".search-close-btn");

  mobGnb();
  webGnb();

  function mobGnb() {
    function reset() {
      $body.removeClass("on");
      $gnbWrap.removeClass("open");
      $dimm.removeClass("on");
      $headerUtil.removeClass("on").css("display", "block");
      $searchWrap.css("z-index", "20");
    }

    $menuBtn.on("click", function () {
      $body.addClass("on");
      $gnbWrap.addClass("open");
      $dimm.addClass("on");
      $headerUtil.addClass("on").css("display", "none");
      $searchWrap.removeClass("on").removeAttr("style");
    });

    $(".menu-close-btn, .dimm").on("click", reset);

    $dep1.on("click", function (e) {
      let $currentDep2 = $(this).siblings(".dep2");
      if ($currentDep2.length > 0) e.preventDefault();
      if (window.innerWidth < 1024) {
        $dep2.removeClass("show");
        $(this).parent().toggleClass("on").siblings().removeClass("on");
        $currentDep2.toggleClass("show");
      }
    });
  }

  function webGnb() {
    function reset() {
      if (window.innerWidth >= 1024) {
        $dep2.removeClass("show");
        $dep1.removeClass("on active");
        $innerHeader.removeClass("open");
        $header.removeClass("active");
        $dimm.removeClass("on");
        $gnbWrap.removeClass("open");
        $body.removeClass("on");
      }
    }

    $(window).on("resize", reset);

    $dep1.on("mouseenter focusin", function () {
      if (window.innerWidth >= 1024) {
        $dimm.addClass("on");
        $(this).addClass("active").siblings().removeClass("active");
        $header.addClass("open");
      }
      if ($searchWrap.hasClass("on")) {
        $searchWrap.css("z-index", "-1");
      }
    });

    $header.on("mouseleave", function () {
      if (window.innerWidth >= 1024) {
        $header.removeClass("open");
        $dimm.removeClass("on");
        $searchWrap.css("z-index", "20");
      }
      $dep1.removeClass("active");
    });
  }

  $totalSearchBtn.on("click", function () {
    $(this).toggleClass("on");
    $body.toggleClass("on");
    $searchWrap.stop(true, false).slideToggle(200).toggleClass("on");
    $searchClose.addClass("on");
    $dimm.addClass("on");
    if ($(this).hasClass("on")) {
      $("#mainSearchText").focus();
    }
  });

  $searchClose.on("click", function () {
    $(this).removeClass("on");
    $totalSearchBtn.removeClass("on");
    $dimm.removeClass("on");
    $body.removeClass("on");
    $searchWrap.stop(true, false).slideUp(200).removeClass("on");
  });

  $(document).mouseup(function (e) {
    if (!$(e.target).closest(".site-list, .family-site>button").length) {
      $(".site-list").slideUp();
      $(".family-site>button").removeClass("active").find("span").text("닫힘");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth < 1024) {
      $innerHeader.removeAttr("style");
    }
  });

  //footer
  const $btnSite = $(".family-site>button"),
    $siteList = $(".site-list");

  $btnSite.on({
    click: function () {
      const $familyList = $(this).siblings(".site-list");
      if (!$(this).hasClass("active")) {
        $siteList.stop().slideUp();
        $btnSite.removeClass("active").find("span").text("닫힘");

        $(this).addClass("active").find("span").text("열림");
        $familyList.stop().slideDown();
      } else {
        $(this).removeClass("active").find("span").text("닫힘");
        $familyList.stop().slideUp();
      }
    },
  });
  $(".site-list>li:last-child>a").on("keydown", function (e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 9 && !e.shiftKey) {
      e.preventDefault();
      $(this)
        .parents(".site-list")
        .stop()
        .slideUp()
        .siblings()
        .removeClass("active")
        .find("span")
        .text("닫힘");
    }
  });

  $(document).mouseup(function (e) {
    if (
      $siteList.has(e.target).length === 0 &&
      !$(e.target).is(".family-site>button")
    ) {
      $siteList.slideUp();
      $btnSite.removeClass("active").find("span").text("닫힘");
    }
  });
});
