import React, { useEffect, useState } from "react";
import { Router, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// data
import { menu } from "../../js/data/gnb_data";
import communityData from "../../js/data/community_data.json";

// css
import "../../css/page/community.scss";
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

function Community({ gnb1, gnb2, data }) {
  // variables
  const location = useLocation();
  const noticeList = communityData.filter((v) => v.type === "notice").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const faqList = communityData.filter((v) => v.type === "faq").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const freeboardList = communityData.filter((v) => v.type === "freeboard").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const searchOption=["제목","내용","작성자"]
  // useState
  const [boardMain, setBoardMain] = useState(true);
  const [activeTab, setActiveTab] = useState(data);
  const [activeList, setActiveList] = useState(data);
  const [article, setArticle] = useState("");
  const [post, setpost] = useState(false);

  // function
  const toggleListFn = (e) => {
    const list = document.querySelectorAll("#faq-tab .list");
    list.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
  };
  const listExtractionFn = (e) => {
    const list = e.currentTarget;
    const listType = list.dataset.type;
    const listIdx = list.dataset.key;
    let contents = communityData.find((v) => (v.type === listType) & (v.idx === Number(listIdx)));
    setArticle(contents);
  };
  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 레이아웃 렌더링
  useEffect(() => {
    console.log(data, location);
    setActiveTab(data);
    window.scrollTo(0, 0);
  }, [useLocation()]);
  useEffect(() => {
    console.log(article);
    window.scrollTo(0, 0);
  }, [listExtractionFn]);

  return (
    <>
      {/* <!-- sub-top s --> */}
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      {/* <!-- sub-top e --> */}
      {/* <!-- search-box s --> */}
      {/* <!-- search-box e --> */}
      {/* <!-- contents s --> */}
      <div className="contents">
        <div className="content">
          {boardMain === true && <SearchBox searchOption />}
          {/* <!-- tab-section s --> */}
          {boardMain === true && (
            <div className="tab-section">
              <div className="tabs">
                <div
                  id="notice-tab"
                  className={activeTab === "notice" ? "tab notice-tab-button active" : "tab notice-tab-button"}
                  onClick={() => {
                    setActiveTab("notice");
                    setActiveList("notice");
                  }}
                >
                  <Link to={"/community/notice"}>공지사항</Link>
                </div>

                <div
                  id="faq-tab"
                  className={activeTab === "faq" ? "tab faq-tab-button active" : "tab faq-tab-button"}
                  onClick={() => {
                    setActiveTab("faq");
                    setActiveList("faq");
                  }}
                >
                  <Link to={"/community/faq"}>FAQ</Link>
                </div>
                <div
                  id="freeboard-tab"
                  className={activeTab === "freeboard" ? "tab freeboard-tab-button active" : "tab freeboard-tab-button"}
                  onClick={() => {
                    setActiveTab("freeboard");
                    setActiveList("freeboard");
                  }}
                >
                  <Link to={"/community/freeboard"}>자유게시판</Link>
                </div>
              </div>
            </div>
          )}
          {/* <!-- tab-section e --> */}
          {/* <!-- board-section s --> */}
          {boardMain === true && (
            <div className="board-section">
              <div className="tab-content">
                <div id="notice-list" className={activeList === "notice" ? "table active" : "table"}>
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
                      <li
                        key={v.idx}
                        className="list"
                        data-type={v.type}
                        data-key={v.idx}
                        onClick={(e) => {
                          listExtractionFn(e);
                          setBoardMain(false);
                        }}
                      >
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
                <div id="faq-list" className={activeList === "faq" ? "table active" : "table"}>
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
                      <li
                        className="list"
                        key={v.idx}
                        onClick={(e) => {
                          toggleListFn(e.currentTarget);
                        }}
                      >
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
                <div id="freeboard-list" className={activeList === "freeboard" ? "table active" : "table"}>
                  <div className="table-top">
                    <ul>
                      <li className="list-num">번호</li>
                      <li className="list-title">제목</li>
                      <li className="list-date">날짜</li>
                      <li className="list-user">작성자</li>
                    </ul>
                  </div>
                  <ul>
                    {freeboardList.map((v, i) => (
                      <li
                        key={v.idx}
                        className="list"
                        data-type={v.type}
                        data-key={v.idx}
                        onClick={(e) => {
                          listExtractionFn(e);
                          setBoardMain(false);
                        }}
                      >
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
          )}
          {/* <!-- board-section e --> */}
          {/* <!-- pagenate-section s --> */}
          {boardMain === true && (
            <div className="pagenate-section">
              <button type="button" className="btn-prev"></button>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <button type="button" className="btn-next"></button>
              <button
                type="button"
                className="write-btn"
                onClick={() => {
                  setpost(true);
                  setBoardMain(false);
                }}
              >
                글쓰기
              </button>
            </div>
          )}
          {/* <!-- pagnat-section e --> */}
          {/* <!-- article-section s --> */}
          {article !== "" && (
            <div className="article-section" article={article}>
              <div className="article-header">
                <div className="article-title">
                  <h3>{article.title}</h3>
                </div>
                <div className="writer-info">
                  <div className="profile">{article.user}</div>
                  <div className="date">{article.date}</div>
                </div>
              </div>
              <div className="article-content">
                {/* <img src="" alt="" /> */}
                {String(article.content)
                  .split(".")
                  .map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
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
                <button
                  className="to-list"
                  type="button"
                  onClick={() => {
                    setArticle("");
                    setBoardMain(true);
                  }}
                >
                  목록
                </button>
              </div>
            </div>
          )}
          {/* <!-- article-section e --> */}
          {/* <!-- post-section s --> */}
          {post === true && (
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
                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => {
                          setpost(false);
                          setBoardMain(true);
                          toTop();
                        }}
                      >
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
