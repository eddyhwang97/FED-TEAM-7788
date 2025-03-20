//  Error 컴포넌트 - Error.jsx

// css
import "../../css/page/error.scss";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="contents">
      <div className="error-wrap">
        <img src={process.env.PUBLIC_URL+`/img/main/error.png`} alt="error" />
        <div className="text-wrap">
          <h2>서비스 이용 불가</h2>
          <p>
            현재 서비스가 일시적으로 중단되었습니다. 
            <br></br>
            잠시 후 다시 시도해 주세요.
          </p>
          <p>불편을 드려 죄송합니다.</p>
        </div>
        <Link className="homepage" to={'/'}>홈페이지로 돌아가기</Link>
      </div>
    </div>
  );
}

export default Error;
