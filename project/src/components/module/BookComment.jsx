import React, { useEffect, useState } from "react";

export default function BookComment() {
  return (
  <>
    <div className="comment-wrap">
        <h4 className="comment-tit">한줄코멘트</h4>
        <ul className="comment-list">
            <li>
                <div className="comment">
                    <span className="name">장원영</span>
                    <p>깊은 어둠 속 빛나는 별처럼 우린 어디서든 서로를 알아볼 수 있어</p>
                </div>
            </li>
            <li>
                <div className="comment">
                    <span className="name">제니</span>
                    <p>This that pretty girl mantra This that flaunt ya Just touched down in LA Pretty girls don't do drama Less we wanna</p>
                </div>
            </li>
            <li>
                <div className="comment">
                    <span className="name">차은우</span>
                    <p>이곳에는 댓글이 들어갑니다. 이곳에는 댓글이 들어갑니다. 이곳에는 댓글이 들어갑니다. 이곳에는 댓글이 들어갑니다. 이곳에는 댓글이 들어갑니다. 이곳에는 댓글이 들어갑니다.</p>
                </div>
            </li>
            <li>
                <div className="comment">
                    <span className="name">관리자</span>
                    <p>장난으로 댓글 작성하지 마세요.</p>
                </div>
            </li>
            <li className="my-comment">
                <div className="comment">
                    <span className="name">토마토</span>
                    <p>둥글둥글 멋진 몸매에 빨간 옷을 입고 새콤달콤 향기 풍기는 멋쟁이 토마토 토마토</p>
                </div>
                {/* 나의 댓글에서만 노출 */}
                <div className="comment-util">
                    <button className="btn-edit">수정</button>
                    <button className="btn-delete">삭제</button>
                </div>
            </li>
        </ul>
        <strong className="noti">광고, 비방, 근거 없는 악성댓글, 욕설 등은 임의로 삭제될 수 있어요</strong>
        <div className="reply-wrap">
            <textarea name="reply" id="reply"></textarea>
            <button type="button" className="reply-btn">등록하기</button>
        </div>
    </div>
    </>
);
}
