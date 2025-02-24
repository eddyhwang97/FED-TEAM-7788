// SubTop 컴포넌트 - SubTop.jsx
import React from "react";

function SubTop(props) {
  return (
    <div class="sub-top">
      <ul class="breadcrumb">
        <li class="home">
          <a href="/">
            <span class="icon home"></span>
          </a>
        </li>
        <li class="1depth">
          <a href="#">원뎁스</a>
        </li>
        <li class="2depth">
          <a href="#">투뎁스</a>
        </li>
      </ul>
      <div class="title-box">
        <h3 class="sub-title">페이지 서브 타이틀이 들어갑니다.</h3>
        <ul class="sub-link">
          <li class="link-copy">
            <button type="button">
              <img src="../img/common/icon-link.svg" alt="링크 공유 버튼" />
            </button>
            <div class="url-copy">
              <input type="text" id="urlCopy" value="" />
              <label for="urlCopy"></label>
              <button type="button" onclick="fn_copyUrl();">
                복사
              </button>
            </div>
          </li>
          <li class="link-print">
            <button type="button" onclick="fn_print()">
              <img src="../img/common/icon-print.svg" alt="페이지 프린트 버튼" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubTop;
