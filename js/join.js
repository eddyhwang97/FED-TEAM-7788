// join JS - join.js

// 비밀번호 문자값 변환 토글 함수 //
import { useState } from "react";

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <input 
                type={showPassword ? "text" : "password"} 
                className="password-input"
            />
            <button 
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="toggle-password"
            >
                {showPassword ? "👁️" : "🙈"}
            </button>
        </div>
    );
};

export default PasswordInput;