// join JS - join.js

// 비밀번호 문자값 변환 토글 함수 //
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-password").forEach((eyeIcon) => {
        eyeIcon.addEventListener("click", function () {
            let passwordInput = this.previousElementSibling; // 아이콘 앞의 input 선택
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    });
});