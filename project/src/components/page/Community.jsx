//  Community 컴포넌트 - Community.jsx
import { useEffect, useLayoutEffect } from "react";
import communityData from "../../js/data/community_data.json";
import { ChangeTabContent, ToggleActiveFn, ParentToggleActiveFn } from "../../js/function/Community_Fn.jsx";

function Community() {
  // set communityData in LocalStorage
  localStorage.setItem("community_data", JSON.stringify(communityData));

  const noticeList = communityData.filter((x) => x.type === "notice").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1));
  const faqList = communityData.filter((x) => x.type === "faq").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1));
  const freeBoardList = communityData.filter((x) => x.type === "freeboard").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1));

  // 의존성 x , 랜더링 후 매번 실행
  useEffect(()=>{
    ChangeTabContent();
  });
  // 의존성 o 
  useEffect(()=>{
  });
  // 의존성 o , 한번만 실행
  useEffect(()=>{
  },[]);

  // DOM 랜더링 전 실행
  useLayoutEffect(()=>{
    // window.scrollTo(0,0);
  });
  return (
    <>
      {/* <!-- sub-top s --> */}
      <div className="sub-top">
        <ul className="breadcrumb">
          <li className="home">
            <a href="/">
              <span className="icon home"></span>
            </a>
          </li>
          <li className="1depth">
            <a href="#">열린공간</a>
          </li>
          <li className="2depth">
            <a href="#">공지사항</a>
          </li>
        </ul>
        <div className="title-box">
          <h3 className="sub-title">공지사항</h3>
          <ul className="sub-link">
            <li className="link-copy">
              <button type="button">
                <img src="../img/common/icon-link.svg" alt="링크 공유 버튼" />
              </button>
              <div className="url-copy">
                <input type="text" id="urlCopy"  />
                <label htmlFor="urlCopy"></label>
                <button type="button">복사</button>
              </div>
            </li>
            <li className="link-print">
              <button type="button">
                <img src="../img/common/icon-print.svg" alt="페이지 프린트 버튼" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- sub-top e --> */}
      {/* <!-- contents s --> */}
      <div className="contents">
        <div className="content">
          {/* <!-- search-box s --> */}
          <div className="search-box-wrap">
            <div className="search-box input-type">
              <select name="option" id="search-option">
                <option value="제목">제목</option>
                <option value="작성자">작성자</option>
                <option value="내용">내용</option>
              </select>
              <input type="text" />
              <button className="search-button"></button>
            </div>
          </div>
          {/* <!-- search-box e --> */}
          {/* <!-- tab-section s --> */}
          <div className="tab-section">
            <div className="tabs">
              <div onClick={ChangeTabContent} data-tab-target="#notice-tab" className="tab notice-tab-button active">
                공지사항
              </div>
              <div onClick={ChangeTabContent} data-tab-target="#faq-tab" className="tab faq-tab-button">
                FAQ
              </div>
              <div onClick={ChangeTabContent} data-tab-target="#freeboard-tab" className="tab freeboard-tab-button">
                자유게시판
              </div>
            </div>
          </div>
          {/* <!-- tab-section e --> */}
          {/* <!-- board-section s --> */}
          <div className="board-section">
            <div className="tab-content">
              <div id="notice-tab" data-tab-content className="table active">
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {noticeList.map((v, i) => (
                    <li className="list" key={i}>
                      <div className="list-header">
                        <p className="list-num">{i + 1}</p>
                        <p className="list-title">{v.title}</p>
                        <p className="list-date">{v.date}</p>
                        <p className="list-user">{v.user}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="faq-tab" data-tab-content className="table">
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {faqList.map((v, i) => (
                    <li className="list" key={i} onClick={ToggleActiveFn}>
                      <div className="list-header">
                        <p className="list-num">{i + 1}</p>
                        <p className="list-title">{v.title}</p>
                        <p className="list-date">{v.date}</p>
                        <p className="list-user">{v.user}</p>
                      </div>
                      <div className="list-info">
                        <strong>{v.content}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="freeboard-tab" data-tab-content className="table">
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {freeBoardList.map((v, i) => (
                    <li className="list" key={i}>
                      <div className="list-header">
                        <p className="list-num">{i + 1}</p>
                        <p className="list-title">{v.title}</p>
                        <p className="list-date">{v.date}</p>
                        <p className="list-user">{v.user}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- board-section e --> */}
          {/* <!-- pagenate-section s --> */}
          <div className="pagenate-section">
            <button type="button" className="btn-prev"></button>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <button type="button" className="btn-next"></button>
          </div>
          {/* <!-- pagnat-section e --> */}
          {/* <!-- article-section s --> */}
          <div className="article-section">
            <div className="article-header">
              <div className="article-title">
                <h3>책에 대한 리뷰는 어디서 보시나요?</h3>
              </div>
              <div className="writer-info">
                <div className="profile">한상화</div>
                <div className="date">2023-01-18</div>
              </div>
            </div>
            <div className="article-content">
              <img src="../img/img-9962318222.png" alt="테스트 이미지" />
              <p>책을 구매하기 전에 리뷰를 꼭 찾아보는 편인데,</p>
              <p>어디에서 가장 신뢰할 만한 리뷰를 볼 수 있을까요?</p>
              <p>저는 주로 서점 사이트나 블로그에서 찾는 편이에요.</p>
              <p>여러분은 책 리뷰를 어디서 확인하시나요?</p>
              <p>추천할 만한 사이트나 채널이 있다면 알려주세요!</p>
            </div>
            <div className="underline"></div>
            <div className="comment">
              <h4>댓글</h4>
              <ul className="comment-list">
                <li className="comment-item">
                  <div className="comment-top">
                    <p className="comment-writer">나오미</p>
                    <span className="comment-date">2023-01-19</span>
                  </div>
                  <div className="comment-content">
                    <p>아주 좋은 정보 감사합니다!</p>
                  </div>
                </li>
                <li className="comment-item">
                  <div className="comment-top">
                    <p className="comment-writer">나오미</p>
                    <span className="comment-date">2023-01-19</span>
                  </div>
                  <div className="comment-content">
                    <p>아주 좋은 정보 감사합니다!</p>
                  </div>
                </li>
                <li className="comment-item">
                  <div className="comment-top">
                    <p className="comment-writer">나오미</p>
                    <span className="comment-date">2023-01-19</span>
                  </div>
                  <div className="comment-content">
                    <p>아주 좋은 정보 감사합니다!</p>
                  </div>
                </li>
              </ul>
              <div className="form-group write-comment">
                <textarea id="text-comment" name="content" placeholder="댓글을 남겨봐유~!" required></textarea>
                <button type="button" className="register-btn">
                  등록
                </button>
              </div>
            </div>
          </div>
          {/* <!-- article-section e --> */}
          {/* <!-- post-section s --> */}
          <div className="post-section">
            <button type="button" className="write-btn">
              글쓰기
            </button>
            <div className="write-board">
              <form action="write_process.php" method="post" encType="multipart/form-data">
                <div className="write-form">
                  <div className="form-group title">
                    <input type="text" id="title" name="title"  placeholder="제목" required />
                  </div>
                  <div className="form-group text-content">
                    <textarea id="text-content" name="content" placeholder="내용을 입력하세요." required></textarea>
                  </div>
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn">
                      등록
                    </button>
                    <button type="button" className="close-btn">
                      닫기
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- post-section e --> */}
        </div>
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
