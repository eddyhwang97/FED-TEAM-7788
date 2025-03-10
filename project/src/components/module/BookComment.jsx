import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentData from "../../js/data/book_comment_data.json";

export default function BookComment() {
  const { isbn } = useParams();
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const userData = loggedInUser ? JSON.parse(loggedInUser) : null;
  const username = userData ? userData.name : "";

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 댓글 데이터 불러오기
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];

    // 현재 도서의 댓글만 필터링 (로컬 스토리지)
    const bookLocalComments = savedComments.filter(
      (comment) => comment.bookISBN === isbn
    );

    // book_comment_data.json에서 현재 도서의 댓글 필터링
    const bookDataComments = commentData.filter(
      (comment) => comment.bookISBN === isbn
    );

    // 로컬 스토리지 댓글과 book_comment_data.json 댓글 통합
    setComments([...bookLocalComments, ...bookDataComments]);
  }, [isbn]);

  // 댓글 등록
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
  
    const newCommentObj = {
      id: Date.now(),
      bookISBN: isbn,
      name: username,
      text: newComment,
      timestamp: Date.now(),
    };
  
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    localStorage.setItem(
      "comments",
      JSON.stringify([...savedComments, newCommentObj])
    );
  
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  // 댓글 수정
  const handleEditComment = (id, text) => {
    setEditCommentId(id);
    setNewComment(text);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );

    setComments(updatedComments);

    // 로컬 스토리지 업데이트
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedSavedComments = savedComments.map((comment) =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );
    localStorage.setItem("comments", JSON.stringify(updatedSavedComments));

    setNewComment("");
    setEditCommentId(null);
  };

  // 댓글 삭제
  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);

    // 로컬 스토리지 업데이트
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedSavedComments = savedComments.filter(
      (comment) => comment.id !== id
    );
    localStorage.setItem("comments", JSON.stringify(updatedSavedComments));
  };

  return (
    <>
      {/* comment-wrap s */}
      <div className="comment-wrap">
        <h4 className="comment-tit">한줄코멘트</h4>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li
              key={comment.id || comment.text} // 로컬 스토리지 댓글은 id, json 댓글은 text를 key로 사용
              className={comment.name === username ? "my-comment" : ""}
            >
              <div className="comment">
                <span className="name">{comment.name}</span>
                <p>{comment.text}</p>
              </div>
              {comment.name === username && comment.id && ( // 로컬 스토리지 댓글만 수정/삭제 가능
                <div className="comment-util">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditComment(comment.id, comment.text)}
                  >
                    수정
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {userData ? (
          <>
            <strong className="noti">
              광고, 비방, 근거 없는 악성댓글, 욕설 등은 임의로 삭제될 수 있어요
            </strong>
            <div className="reply-wrap">
              <textarea
                name="reply"
                id="reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="button"
                className="reply-btn"
                onClick={editCommentId ? handleSaveEdit : handleCommentSubmit}
              >
                {editCommentId ? "수정하기" : "등록하기"}
              </button>
            </div>
          </>
        ) : (
          <p className="login-message">로그인 후 이용 가능해요</p>
        )}
      </div>
      {/* comment-wrap e */}
    </>
  );
}