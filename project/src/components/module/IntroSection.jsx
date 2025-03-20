// 메인페이지 소개 섹션
import React from "react";
import { Link } from "react-router-dom";
function IntroSection() {
  const tabMenu = ["대출하기", "예약하기", "추천도서", "열린공간"];
  const tabLink = ["/search/booksearch", "/error", "/monthly/recommend", "/community/notice"];
  return (
    <>
      {/* section-intro s */}
      <section className="section intro">
        <div className="inner">
          <h2 className="intro-tit">
            당신의 취향을 발견하는 공간, <strong>칙칙북북</strong>입니다.
          </h2>
          <div className="link-box-wrap">
            {tabLink.map((v, i) => (
              <Link className="link-box" key={i} to={v}>
                <p>{tabMenu[i]}</p>
                <span className={`link-box-bg bg0${i + 1}`}></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* section-intro e */}
    </>
  );
}

export default IntroSection;
