// 일부수정예정
// 수정예정기능 - 검색창에러
$(() => {
  //header
  const $body = $("body"),
    $dimm = $(".dimm"),
    $header = $(".header"),
    $innerHeader = $(".inner-header"),
    $headerUtil = $(".header-util"),
    $pcHeaderUtil = $(".pc-header-util"),
    $menuBtn = $(".menu-btn"),
    $gnbWrap = $(".gnb-wrap"),
    $gnb = $(".gnb"),
    $dep1 = $gnb.find(".dep1>a"),
    $dep2 = $(".dep2"),
    $dep2A = $gnb.find(".dep2>ul>li>a");

  const $totalSearchBtn = $(".total-search-btn"),
    $totalSearchBtnOn = $(".total-search-btn.on"),
    $searchWrap = $(".search-wrap"),
    $searchClose = $(".search-close-btn");

  mobGnb();
  webGnb();

  function mobGnb() {
    function reset() {
      $body.removeClass("on");
      $gnbWrap.removeClass("open");
      $dimm.removeClass("on");
      $dimm.removeAttr("style");
      $headerUtil.removeClass("on");
      $headerUtil.css('display','block');
      $searchWrap.css('z-index', '20');
    }

    $menuBtn.on({
      click: function () {
        $body.addClass("on");
        $gnbWrap.addClass("open");
        $dimm.addClass("on");
        $headerUtil.addClass("on");
        $searchWrap.removeClass("on");
        $searchWrap.removeAttr("style");
        $totalSearchBtn.css("right", "");
        $totalSearchBtn
          .removeClass("on")
          .removeAttr("onclick", "totalSearch()");
        $searchClose.removeClass("on");
        $dimm.removeClass("on");
        $headerUtil.css('display','none');
      },
    });

    $(".menu-close-btn, .dimm").on("click", function () {
      reset();
    });

    $dep1.on({
      click: function (e) {
        let $currentDep2 = $(this).siblings($dep2A);
        if ($currentDep2.length > 0) e.preventDefault();
        if (window.innerWidth < 1024) {
          $dep2.removeClass("show");
          if (!$(this).parent().hasClass("on")) {
            $(this)
              .parent()
              .addClass("on")
              .siblings()
              .removeClass("on");
            $currentDep2.addClass("show");
          } else {
            $(this).parent().removeClass("on");
            $dep2A.removeClass("show");
          }
        }
      },
    });
  }

  function webGnb() {

    function reset() {
      if (window.innerWidth >= 1024) {
        $dep2.removeClass("show");
        $dep2.removeAttr("style");
        $dep1.removeClass("on");
        $dep2A.removeClass("active");
        $dep2A.parent().removeClass("active");
        $innerHeader.removeClass("open");
        $header.removeClass("active");
        $dimm.removeClass("on");
        $gnbWrap.removeClass("open");
        $body.removeClass("on");
        $linkWrap.removeClass("on");
      }
    }

    $(window).on("resize", function () {
      reset();
    });

    $dep1.on({
      mouseenter: function () {
        if (window.innerWidth >= 1024) {
          $dimm.addClass("on");
          $dep1.removeClass("active").siblings().removeClass("active");
          $(this).addClass("active").siblings().addClass("active");
          $header.addClass("open");
        }

        if($searchWrap.hasClass('on')){
            $searchWrap.css('z-index','-1')
        }
      },
      focusin: function () {
        if (window.innerWidth >= 1024) {
          $dimm.addClass("on");
          $dep1.removeClass("active").siblings().removeClass("active");
          $(this).addClass("active").siblings().addClass("active");
          $header.addClass("open");
        }

        if($searchWrap.hasClass('on')){
            $searchWrap.css('z-index','-1')
        }
      },
    });

    $(".dep1:nth-child(5) .dep2>ul>li:last-child>a").on(
      "keydown",
      function (e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 9 && !e.shiftKey) {
          e.preventDefault();
          $header.removeClass("open");
          $dimm.removeClass("on");
          $dimm.css("z-index", "1");
          $totalSearchBtn.focus();
        }
      }
    );

    $dep2A.on({
      mouseenter: function () {
        if (window.innerWidth >= 1024) {
          $dep1.removeClass("active").siblings().removeClass("active");
          $(this).addClass("active").siblings().addClass("active");
          $(this).parents().find($dep2).addClass("active");
          $(this).parents().siblings().find($dep2).removeClass("active");
          $(this).parents().find($dep1).addClass("active");
          $(this).parents().siblings().find($dep1).removeClass("active");
        }
      },
    });

    $header.on({
      mouseleave: function () {
        if (window.innerWidth >= 1024) {
            $header.removeClass("open");
          $dimm.removeClass("on");
          $dimm.css("z-index", "1");
          $searchWrap.css('z-index', '20');
        }
        $dep1.removeClass("active").siblings().removeClass("active");
      },
    });
  }

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

  // search-bar pop up
  $totalSearchBtn.on("click", function () {
    if (!$(this).hasClass("on")) {
      $(this).addClass("on").attr("onclick", "totalSearch()");
      $body.addClass("on");
      $searchClose.addClass("on");
      $header.addClass("on");
      $innerHeader
        .addClass("on")
        .removeClass("open")
      $searchWrap.slideDown(200).addClass("on");
      $dimm.addClass("on");
      $("#mainSearchText").focus();
    }
  });

  $totalSearchBtnOn.on("keydown", function (e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 9 && !e.shiftKey) {
      e.preventDefault();
      $searchClose.focus();
    }
  });

  $searchClose.on("click", function () {
    $totalSearchBtn.removeClass("on").removeAttr("onclick", "totalSearch()");
    $dimm.removeClass("on");
    $searchClose.removeClass("on");
    $body.removeClass("on");
    $innerHeader.removeClass("on");
    $totalSearchBtn.css("right", "");
    setTimeout(function () {
      $header.removeClass("on");
    }, 700);
    $searchWrap.slideUp(200).removeClass("on");
  });

  // top-btn
  const $topBtn = $(".btn-top");

  $topBtn.on("click", function (e) {
    e.preventDefault();
    $("html,body").animate({ scrollTop: 0 }, 500);
  });

  $(window).on("resize", function () {
    if (window.innerWidth < 1024) {
      $innerHeaderWrap.removeAttr("style");
    }
  });

  $dimm.on("click", function () {
    $totalSearchBtn.removeClass("on").removeAttr("onclick", "totalSearch()");
    $dimm.removeClass("on");
    $searchClose.removeClass("on");
    $body.removeClass("on");
    $innerHeaderWrap.removeClass("on");
    $totalSearchBtn.css("right", "");
    setTimeout(function () {
      $header.removeClass("on");
    }, 700);
    $searchWrap.slideUp().removeClass("on");
  });
});
