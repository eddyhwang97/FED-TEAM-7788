import React from "react";
import { useParams } from "react-router-dom";

// data
import communityData from "../../js/data/community_data.json";

// css
import "../../css/page/community.scss";
import SubTop from "../module/SubTop";

function Article({ gnb1, gnb2 }) {
  const { id } = useParams;
  const article = communityData.find((v) => v.id === id);

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="content">
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
              <button className="to-list" type="button" onClick={() => {}}>
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
