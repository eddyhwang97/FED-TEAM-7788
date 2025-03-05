import React, { useEffect, useState } from "react";
import commentData from "../../js/data/book_comment_data.json";

export default function BookComment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("토마토"); // 로그인한 사용자 이름
  const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글의 id

  // 30개의 댓글 중에서 랜덤으로 0개에서 5개 선택
  useEffect(() => {
    const randomCount = Math.floor(Math.random() * 6); // 0~5개의 댓글을 랜덤으로 선택
    const randomComments = [];
    const indices = new Set();

    while (randomComments.length < randomCount) {
      const randomIndex = Math.floor(Math.random() * commentData.length); // 0부터 29까지의 인덱스
      if (!indices.has(randomIndex)) {
        randomComments.push(commentData[randomIndex]);
        indices.add(randomIndex); // 이미 선택된 인덱스를 다시 선택하지 않도록 Set에 저장
      }
    }

    // `localStorage`에서 댓글 불러오기
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments([...savedComments, ...randomComments]); // 랜덤으로 선택된 댓글을 추가
  }, []);

  // 새 댓글 제출 처리
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(), // 고유한 ID 생성
        name: username,
        text: newComment,
      };
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments)); // 댓글을 localStorage에 저장
      setNewComment(""); // 입력란 초기화
    }
  };

  // 댓글 수정 처리
  const handleEditComment = (id, text) => {
    setEditCommentId(id); // 수정할 댓글의 ID 설정
    setNewComment(text); // 기존 댓글 텍스트로 입력란 설정
  };

  // 댓글 저장 (수정 후)
  const handleSaveEdit = () => {
    const updatedComments = comments.map(comment =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments)); // 수정된 댓글을 localStorage에 저장
    setNewComment(""); // 입력란 초기화
    setEditCommentId(null); // 수정 상태 초기화
  };

  // 댓글 삭제 처리
  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments)); // 삭제된 댓글을 localStorage에 반영
  };

  return (
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
      <strong className="noti">광고, 비방, 근거 없는 악성댓글, 욕설 등은 임의로 삭제될 수 있어요</strong>
      <div className="reply-wrap">
        <textarea
          name="reply"
          id="reply"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} // 입력 내용 관리
        ></textarea>
        <button
          type="button"
          className="reply-btn"
          onClick={editCommentId ? handleSaveEdit : handleCommentSubmit} // 수정 중이면 저장, 아니면 새 댓글 등록
        >
          {editCommentId ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
