//  Main 컴포넌트 - Main.jsx
import "../../css/page/main.scss";

export default function Main() {
  return (
    <>
      <section className="section intro">
        <div className="inner">
          <h2 className="intro-tit">
            당신의 취향을 발견하는 공간, <strong>칙칙북북</strong>입니다.
          </h2>
          <div className="main-search-wrap">
            <div className="quick-search-form">
              <form action="abc.php">
                <fieldset>
                  <legend className="blind">도서 통합검색 폼</legend>
                  <input type="text" id="mainSearchText" name="searchTxt" title="검색어" placeholder="찾으시는 도서가 있나요?" />
                  <button type="button" className="search-btn">
                    <span className="blind">빠른 검색 버튼</span>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="link-box-wrap">
            <a href="#" className="link-box">
              <p>대출하기</p>
              <span className="link-box-bg bg01"></span>
            </a>
            <a href="#" className="link-box">
              <p>예약하기</p>
              <span className="link-box-bg bg02"></span>
            </a>
            <a href="#" className="link-box">
              <p>추천도서</p>
              <span className="link-box-bg bg03"></span>
            </a>
            <a href="#" className="link-box">
              <p>열린공간</p>
              <span className="link-box-bg bg04"></span>
            </a>
          </div>
        </div>
      </section>
      <section className="section board">
        <div className="inner">
          <div className="board-wrap">
            <div className="board-top">
              <ul className="board-tab">
                <li className="notice on">
                  <button type="button" id="notice">
                    공지사항
                  </button>
                </li>
                <li className="free">
                  <button type="button" id="free">
                    자유게시판
                  </button>
                </li>
              </ul>
              <a href="#" className="more-btn">
                <span className="blind">게시글 더보기</span>
              </a>
            </div>
            <div className="board-box">
              <ul className="board-content on" id="notice">
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label pink">공지</span>
                      <p>이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. </p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label pink">공지</span>
                      <p>해피 밸런타인데이!</p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label mint">안내</span>
                      <p>혼자 공부하는 자바스크립트</p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label pink">공지</span>
                      <p>도레미파솔라시도</p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
              </ul>
              <ul className="board-content" id="free">
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label mint">자유</span>
                      <p>이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. 이곳에는 공지사항 내용이 들어갑니다. </p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <div className="list-tit">
                      <span className="label mint">자유</span>
                      <p>해피 밸런타인데이!</p>
                    </div>
                    <span className="date">2025-02-14</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section book">
        <h2 className="blind">이달의 추천 도서, 신착도서, 베스트셀러 영역</h2>
        <div className="inner">
          <div className="monthly-book-wrap">
            <h3>이달의 추천 도서</h3>
            {/* <!-- swiper 2개 연결 예정 --> */}
            <div className="monthly-slide">
              <div className="book-info-wrap">
                <div className="book-info">
                  <div className="book-title">
                    <p>괴담에 떨어져도 출근을 해야 하는구나</p>
                    <a href="#" className="more-btn">
                      <span className="blind">추천도서 더보기</span>
                    </a>
                  </div>
                  <ul className="book-info-list">
                    <li>
                      <em>작가</em>
                      <span>백덕수</span>
                    </li>
                    <li>
                      <em>출판사</em>
                      <span>카카오페이지</span>
                    </li>
                    <li>
                      <em>카테고리</em>
                      <span>인문사회과학</span>
                    </li>
                    <li>
                      <em>발행일</em>
                      <span>2025-02-19</span>
                    </li>
                    <li>
                      <em>페이지</em>
                      <span>666p</span>
                    </li>
                  </ul>
                </div>
                <div className="slide-control">
                  <div className="btn-prev"></div>
                  <div className="swiper-pagination"></div>
                  <div className="btn-next"></div>
                </div>
              </div>
              <div className="book-image">
                <div className="swiper monthlySwiper">
                  <ul className="book-img-list swiper-wrapper">
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inner">
          <div className="book-wrap">
            <ul className="book-tab">
              <li className="on">
                <button type="button">신착도서</button>
              </li>
              <li className="">
                <button type="button">베스트도서</button>
              </li>
            </ul>
            <div className="book-contents">
              <div className="book-tab-cont on">
                <div className="newBookSwiper">
                  <ul className="book-slide swiper-wrapper">
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/main/img-test.jpg" alt="도서 이미지" />
                    </li>
                  </ul>
                </div>
                <div className="button-control slide1"></div>
              </div>
              <div className="book-tab-cont">
                <div className="bestBookSwiper">
                  <ul className="book-slide swiper-wrapper">
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                    <li className="swiper-slide">
                      <img src="../img/img-9966098525.png" alt="도서 이미지" />
                    </li>
                  </ul>
                </div>
                <div className="button-control slide2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-text">
          <span>
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
          </span>
        </div>
      </section>
    </>
  );
}
