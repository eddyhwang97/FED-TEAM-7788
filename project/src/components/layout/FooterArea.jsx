// FooterArea 컴포넌트 - FooterArea.jsx

import React from "react";

export default function FooterArea(props) {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-inner">
          <div className="left">
            <ul className="footer-link">
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
          <div className="right">
            <div className="family-site">
              <button type="button" className="family-site-btn">
                유관기관 바로가기<span className="blind">열림</span>
              </button>
              <ul className="site-list">
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
        <div className="footer-btm">
          <div className="footer-logo">
            <img src="../img/common/logo-temp.svg" alt="하단 로고" />
          </div>
          <p className="copyright">ⓒ 2025. ChkChkBookBook All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
