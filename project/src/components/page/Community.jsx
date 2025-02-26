//  Community 컴포넌트 - Community.jsx
import { useEffect, useLayoutEffect, useState } from "react";
import communityData from "../../js/data/community_data.json";
import CategorySearch from "../module/CategorySearch.jsx";
import "../../js/function/community.js";

function Community() {
  // set communityData in LocalStorage
  localStorage.setItem("community_data", JSON.stringify(communityData));
  const tabMenu = [{ 공지사항: "notice" }, { FAQ: "faq" }, { 자유게시판: "freeboard" }];
  const noticeList = [...communityData.filter((x) => x.type === "notice").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1))];
  const faqList = [...communityData.filter((x) => x.type === "faq").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1))];
  const freeBoardList = [...communityData.filter((x) => x.type === "freeboard").sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1))];

  const [tab, setTab] = useState(0);
  const [board, setBoard] = useState(0);
  const [article, setArticle] = useState(true);
  const [post, setPost] = useState(true);
  const [Notice, setNoticeList] = useState(noticeList);
  const [Faq, setFaqList] = useState(faqList);
  const [FreeBoard, setFreeBoardList] = useState(freeBoardList);
  const boardList = [Notice, Faq, FreeBoard];

  // tab useEffect
  useEffect(() => {
    const tabs = document.querySelectorAll(".tab");
    const activeTab = document.querySelectorAll(".tab")[tab];
    console.log(board, tab, activeTab);

    // 탭,보드부분 클래스 동적제어
    tabs.forEach((e) => {
      e.classList.remove("active");
    });
    activeTab.classList.add("active");
  }, [tab, board]);

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
                <input type="text" id="urlCopy" />
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
          <CategorySearch setNoticeList={setNoticeList} setFaqList={setFaqList} setFreeBoardList={setFreeBoardList} />
          {/* <!-- search-box e --> */}
          {/* <!-- tab-section s --> */}
          <div className="tab-section">
            <div className="tabs">
              {tabMenu.map((v, i) => (
                <div
                  key={i}
                  tab={i}
                  onClick={(e) => {
                    setBoard(i);
                    setTab(i);
                  }}
                  data-tab-target={(i === 0 ? "notice" : i === 1 ? "faq" : i === 2 ? "freeboard" : "") + "-tab"}
                  className="tab notice-tab-button"
                >
                  {Object.keys(v)}
                </div>
              ))}
            </div>
          </div>
          {/* <!-- tab-section e --> */}
          {/* <!-- board-section s --> */}
          <div className="board-section">
            <div className="tab-content">
              {board === tab ? (
                <div key={tab} id={(tab === 0 ? "notice" : tab === 1 ? "faq" : tab === 2 ? "freeboard" : "") + "-tab"} data-tab-content className="table active">
                  <div className="table-top">
                    <ul>
                      <li className="list-num">번호</li>
                      <li className="list-title">제목</li>
                      <li className="list-date">날짜</li>
                      <li className="list-user">작성자</li>
                    </ul>
                  </div>
                  <ul>
                    {boardList[tab].map((v, i) => (
                      <li
                        className="list"
                        key={i}
                        onClick={(e) => {
                          if (tab === 2 || tab ===0) setArticle(false);
                        }}
                      >
                        <div className="list-header">
                          <p className="list-num">{i + 1}</p>
                          <p className="list-title">{v.title}</p>
                          <p className="list-date">{v.date}</p>
                          <p className="list-user">{v.user}</p>
                        </div>
                        {board === 1 ? (
                          <div className="list-info">
                            <strong>${v.content}</strong>
                          </div>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
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
            {tab === 2 ? (
              <button onClick={() => setPost(false)} type="button" className="write-btn">
                글쓰기
              </button>
            ) : (
              ""
            )}
          </div>
          {/* <!-- pagnat-section e --> */}
          {/* <!-- article-section s --> */}
          {article ? (
            ""
          ) : (
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
                <img src="../img/book/img-9962318222.jpg" alt="테스트 이미지" />
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
          )}
          {/* <!-- article-section e --> */}
          {/* <!-- post-section s --> */}
          {post ? (
            ""
          ) : (
            <div className="post-section">
              <div className="write-board">
                <form action="write_process.php" method="post" encType="multipart/form-data">
                  <div className="write-form">
                    <div className="form-group title">
                      <input type="text" id="title" name="title" placeholder="제목" required />
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
          )}
          {/* <!-- post-section e --> */}
        </div>
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
