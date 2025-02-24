// FooterArea 컴포넌트 - FooterArea.jsx

import React from "react";

export default function FooterArea(props) {
  return (
    <footer class="footer">
      <div class="inner">
        <div class="footer-inner">
          <div class="left">
            <ul class="footer-link">
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">저작권보호정책</a>
              </li>
              <li>
                <a href="#">이메일무단수집거부</a>
              </li>
              <li>
                <a href="#">자주묻는질문</a>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="family-site">
              <button type="button" class="family-site-btn">
                유관기관 바로가기<span class="blind">열림</span>
              </button>
              <ul class="site-list">
                <li>
                  <a href="#" target="_blank" title="새창열림">
                    아무사이트나넣기
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="새창열림">
                    아무사이트나넣기
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="새창열림">
                    아무사이트나넣기
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="새창열림">
                    아무사이트나넣기
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="새창열림">
                    아무사이트나넣기
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-btm">
          <div class="footer-logo">
            <img src="../img/common/logo-temp.svg" alt="하단 로고" />
          </div>
          <p class="copyright">ⓒ 2025. ChkChkBookBook All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
