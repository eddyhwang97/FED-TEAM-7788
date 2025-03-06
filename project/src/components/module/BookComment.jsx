import React, { useEffect, useState } from "react";
import commentData from "../../js/data/book_comment_data.json";

export default function BookComment({ bookId }) {
  const loggedInUser = sessionStorage.getItem("loggedInUser"); // 로그인 정보 가져오기
  const userData = loggedInUser ? JSON.parse(loggedInUser) : null; // JSON 파싱
  const username = userData ? userData.name : ""; // 로그인한 유저의 이름 가져오기

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  // useEffect(() => {
  //   const randomCount = Math.floor(Math.random() * 6); // 0~5개의 댓글을 랜덤으로 선택
  //   const randomComments = [];
  //   const indices = new Set();

  //   while (randomComments.length < randomCount) {
  //     const randomIndex = Math.floor(Math.random() * commentData.length);
  //     if (!indices.has(randomIndex)) {
  //       randomComments.push({ ...commentData[randomIndex], bookId });
  //       indices.add(randomIndex);
  //     }
  //   }

  //   // `localStorage`에서 해당 책(bookId)에 대한 댓글 불러오기
  //   const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  //   const bookComments = savedComments.filter(comment => comment.bookId === bookId);
  //   setComments([...bookComments, ...randomComments]);
  // }, [bookId]);

  // 댓글 등록
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      name: username, // 로그인한 유저의 이름 설정
      text: newComment,
      bookId, // 해당 도서의 ID 저장
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);

    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    localStorage.setItem("comments", JSON.stringify([...savedComments, newCommentObj]));

    setNewComment("");
  };

  // 댓글 수정
  const handleEditComment = (id, text) => {
    setEditCommentId(id);
    setNewComment(text);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map(comment =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setNewComment("");
    setEditCommentId(null);
  };

  // 댓글 삭제
  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <>
    {/* comment-wrap s */}
      <div className="comment-wrap">
        <h4 className="comment-tit">한줄코멘트</h4>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className={comment.name === username ? "my-comment" : ""}>
              <div className="comment">
                <span className="name">{comment.name}</span>
                <p>{comment.text}</p>
              </div>
              {comment.name === username && (
                <div className="comment-util">
                  <button className="btn-edit" onClick={() => handleEditComment(comment.id, comment.text)}>수정</button>
                  <button className="btn-delete" onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {userData ? (
          <>
          <strong className="noti">광고, 비방, 근거 없는 악성댓글, 욕설 등은 임의로 삭제될 수 있어요</strong>
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
          <p className="login-message">로그인 후 이용해주세요</p>
        )}
      </div>
    {/* comment-wrap e */}
    </>
  );
}
