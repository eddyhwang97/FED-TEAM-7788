import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import $, { data } from "jquery";

// data
// component
import SubTop from "../module/SubTop";
// css
import "../../css/page/community.scss";
import "../../css/page/article.scss";

function Article({ gnb1, gnb2, data }) {
  const navigate = useNavigate();
  const articleLocation = useLocation();
  const user = articleLocation.state.user;
  const listIdx = articleLocation.state.listIdx;
  const listData = JSON.parse(localStorage.getItem("community_data"))
    .filter((x) => x.type === data)
    .sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const userName = JSON.parse(sessionStorage.getItem("user1")).user;
  const commentList = JSON.parse(localStorage.getItem("comment_data"));
  const { id } = useParams();
  const typeBranch = gnb2 === "공지사항" ? "notice" : "freeboard";
  const communityData = JSON.parse(localStorage.getItem("community_data"));
  const articleData = communityData.find((v) => v.type === typeBranch && v.idx === Number(id));

  console.log(listData)
  // 로그인 상태변수
  const [onUser, userStatus] = useState(false);
  const [comment, setComment] = useState(commentList);
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
  const enterKey = (e) => {
    let commentText = $(e.target).val();
    if (e.key === "Enter") {
      if (commentText !== "") postData(commentText, userName);
      else {
        alert("한글자 이상 입력해주세요.");
      }
    }
  };

  const getTxt = () => {
    let commentText = $("#text-comment").val();
    console.log(commentText);
    if (commentText !== "") postData(commentText, userName);
    else {
      alert("한글자 이상 입력해주세요.");
    }
  };
  const postData = (commentText, userName) => {
    let today = new Date();
    const formattedDate = `
    ${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() + 1 < 10 ? "0" + (today.getDate() + 1) : today.getDate() + 1}`;
    postComment(userName, formattedDate, commentText);
  };
  const postComment = (userName, formattedDate, commentText) => {
    if (localStorage.comment_data) {
      commentList.push({
        idx: commentList[commentList.length - 1].idx + 1,
        user: userName,
        image: "",
        date: formattedDate,
        comment: commentText,
      });
      localStorage.setItem("comment_data", JSON.stringify(commentList));
      setComment(commentList);
      $("#text-comment").val("");
    }
  };
  const deleteArticle = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const updatedArticle =  listData.filter(v=>v.idx !==listIdx)
     localStorage.setItem("community_data",JSON.stringify(updatedArticle))
      navigate(`/community/${data}`);
    }
  };
  const deleteComment = (idx) => {
    console.log("delete", idx);
    const updatedComments = commentList.filter((comment) => comment.idx !== idx);
    setComment(updatedComments);
    localStorage.setItem("comment_data", JSON.stringify(updatedComments));
  };
  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleLocation]);
  // 로그인 상태 확인
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user1")).user;
    if (user) {
      userStatus(true);
    } else userStatus(false);
    console.log(onUser, user);
  }, [onUser]);
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
                {user === userName && (
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => {
                      deleteArticle()
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
            <div className="article-content">
              {data === "freeboard" && articleData.image !== "" && <img src={`/img/freeboard/${articleData.image}.jpg`} alt="사용자 이미지" />}
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
                {comment.map((v) => (
                  <li className="comment-item" key={v.idx}>
                    <div className="comment-top">
                      <p className="comment-writer">{v.user}</p>
                      <span className="comment-date">{v.date}</span>
                    </div>
                    <div className="comment-content">
                      <p>{v.comment}</p>
                    </div>
                    {v.user === userName && (
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => {
                          if (window.confirm("삭제하시겠습니까?")) {
                            deleteComment(v.idx);
                            alert("삭제제되었습니다.");
                          } else return;
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="form-group write-comment">
                <input id="text-comment" name="comment" placeholder={onUser === false ? "로그인하고 댓글을 남겨보세요!" : "댓글을 작성해보세요!"} onKeyUp={enterKey} required />
                <button
                  onClick={() => {
                    if (onUser) {
                      getTxt();
                      // alert("등록되었습니다.");
                    } else if (!onUser) {
                      goLogin();
                    }
                  }}
                  type="button"
                  className="register-btn"
                >
                  등록
                </button>
              </div>
              <button className="to-list" type="submit" onClick={handleGoBack}>
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
