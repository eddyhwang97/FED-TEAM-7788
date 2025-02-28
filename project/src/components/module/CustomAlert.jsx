import { useState } from "react";

function CustomAlert({ message, onClose }) {
  return (
    <div className="overlay">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default CustomAlert;