import React from "react";
import { useNavigate } from "react-router-dom";

function Pagenation({ data }) {
  return (
    <div className="pagenate-section">
      <button type="button" className="btn-prev"></button>
      <ul>
        {[1, 2, 3].map((page) => (
          <li key={page}  className="">
            {page}
          </li>
        ))}
      </ul>
      <button type="button" className="btn-next"></button>

      {data === "freeboard" && (
        <button type="button" className="write-btn">
          글쓰기
        </button>
      )}
    </div>
  );
}

export default Pagenation;
