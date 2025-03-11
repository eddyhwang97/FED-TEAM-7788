//  Error 컴포넌트 - Error.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";

function Error() {
  return (
    <div className="error-wrap">
      <img src={""} alt="서비스 오류 이미지" />
      <div className="text-wrap">
        <h1>서비스 이용 불가</h1>
        <p>
          현재 서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해 주세요.
        </p>
        <p>불편을 드려 죄송합니다.</p>
        <br />
        <a href="#">홈페이지로 돌아가기</a>
      </div>
    </div>
  );
}

export default Error;
