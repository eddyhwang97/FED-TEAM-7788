// mypage JS - mypage.js

// 셋팅버튼 클릭시 셋팅메뉴 호출 //
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggle-setting");
    const settingMenu = document.querySelector(".setting-menu-wrap");
  
    toggleBtn.addEventListener("click", function () {
      if (settingMenu.style.opacity === "1") {
        settingMenu.style.opacity = "0";
        settingMenu.style.pointerEvents = "none"; // 클릭 방지
      } else {
        settingMenu.style.opacity = "1";
        settingMenu.style.pointerEvents = "auto";
      }
    });
  });