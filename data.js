/* 
[ 데이터 형식 ]
* ISBN (앞 3자리는 고유번호, 뒤 7자리는 랜덤수) 10자리
    문학 996
    인문사화과학 997
    예술 998
    매거진 999
* 책 이름 title
* 작가 author
* 출판사  publisher
* 책소개내용 (이달의도서 + 책 상세페이지) info
* 장르 (카테고리) genre
* 발행일 (최신순정렬용) pDate
* 대출횟수 (랜덤수돌려서) bNum
* 페이지수 pNum
*/

// 데이터 추출 ////////////////////////////

const cont = document.querySelector(".cont");
const p = cont.querySelectorAll("p");
//   랜덤수 7자리
const rn = Math.floor(Math.random() * 9999998) + 1;
// 첫번째 p
p1 = p[0].innerHTML
.replace(/<\/?[^>]+(>|$)/g, "") // 모든 HTML 태그 제거
.trim() // 문자열 양쪽 공백 제거
.split("\n") // 줄바꿈(\n)을 기준으로 분리
.map((line) => line.trim()) // 각 항목의 공백 제거
.filter((line) => line.length > 0); // 빈 항목 제거;
// 두번째 p
p2 = p[1].innerHTML
  .replace(/<\/?[^>]+(>|$)/g, "") // 모든 HTML 태그 제거
  .trim() // 문자열 양쪽 공백 제거
  .split("\n") // 줄바꿈(\n)을 기준으로 분리
  .map((line) => line.trim()) // 각 항목의 공백 제거
  .filter((line) => line.length > 0)
  .join(""); // 빈 항목 제거;

// 데이터 추출 ////////////////////////////

const bookInfo = {
  ISBN: "998" + rn,
  title: p1[0],
  author: p1[1],
  publisher: p1[2],
  info: p2,
  genre: "예술",
  pDate: p1[3],
  bNum: rn,
  pNum: p1[6],
};
console.log(bookInfo);
