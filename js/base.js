$(() => {
  const $linkCopyBtn = $(".link-copy > button");

  $linkCopyBtn.on("click", function () {
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(".url-copy").addClass("on");
    } else {
      $(this).removeClass("active");
      $(".url-copy").removeClass("on");
    }
  });


  window.fn_copyUrl = function () {
    $("#urlCopy").select();
    document.execCommand("copy");
    alert("URL 주소가 복사 되었습니다.");
    return false;
  };

  $(document).mouseup(function (e) {
    if (
      $linkCopyBtn.has(e.target).length === 0 &&
      !$(e.target).is(".url-copy")
    ) {
      $linkCopyBtn.removeClass("active");
      $(".url-copy").removeClass("on");
    }
  });

  window.fn_print = function () {
    let $container = $(".sub-container").clone();

    let cssText = ""; // 스타일 복사
    $("link").each(function (index, node) {
      cssText += '<link rel="stylesheet" href="' + $(node).attr("href") + '" >';
    });
    

    let innerHtml = $container[0].innerHTML;
    let popupWindow = window.open("", "_blank", "width=700,height=800");
    popupWindow.document.write(
      "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        cssText +
        "</head>" +
        "<body>" +
        innerHtml +
        "</body>" +
        "</html>"
    );
    popupWindow.document.close();
    popupWindow.focus();

    popupWindow.onafterprint = function () {
      popupWindow.close();
    };

    popupWindow.onload = function () {
      popupWindow.print();
    };
  };
});

function getInputValue() {
    const copyUrl = document.getElementById("urlCopy");
    let url = window.document.location.href;
    copyUrl.setAttribute("value", url);
  }

  $(window).on("load", function () {
    if ($(".url-copy").length > 0) {
      getInputValue();
    }
  });
