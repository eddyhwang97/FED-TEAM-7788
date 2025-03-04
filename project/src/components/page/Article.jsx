import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// data
import communityData from "../../js/data/community_data.json";

// component
import SubTop from "../module/SubTop";
// css

import "../../css/page/community.scss";

function Article({ gnb1, gnb2 }) {
  const { id } = useParams();
  const typeBranch = gnb2 === "공지사항" ? "notice" : "freeboard";
  const articleData = communityData.find((v) => v.type === typeBranch && v.idx === Number(id));

  //   test session storage
  let user = { name: "John" };
  sessionStorage.setItem("user", JSON.stringify(user));

  // 로그인 상태변수
  const [onUser, userStatus] = useState(false);
  // Fn
  const handleGoBack = () => {
    window.history.back();
  };
  const goLogin = () => {
    if (!onUser) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  // 로그인 상태 확인
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      userStatus(true);
    } else userStatus(false);
    console.log(onUser, user);
  },[onUser]);
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="content">
          <div className="article-section">
            <div className="article-header">
              <div className="article-title">
                <h3>{articleData.title}</h3>
              </div>
              <div className="writer-info">
                <div className="profile">{articleData.user}</div>
                <div className="date">{articleData.date}</div>
              </div>
            </div>
            <div className="article-content">
              {/* <img src="" alt="" /> */}
              {String(articleData.content)
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
                <textarea id="text-comment" name="content" placeholder={onUser === false ? "로그인하고 댓글을 남겨보세요!" : "댓글을 작성해보세요!"} required></textarea>
                <button
                  onClick={() => {
                    goLogin();
                  }}
                  type="button"
                  className="register-btn"
                >
                  등록
                </button>
              </div>
              <button
                className="to-list"
                type="button"
                onClick={() => {
                  handleGoBack();
                }}
              >
                목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
