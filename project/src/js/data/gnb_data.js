export const menu = [
  {
    txt: "자료검색",
    link: "/search",
    sub: [
      {
        txt: "통합검색",
        link: "/search/totalsearch",
      },
      {
        txt: "베스트셀러",
        link: "/search/best",
      },
      {
        txt: "신착도서",
        link: "/search/new",
      },
    ],
  },
  {
    txt: "예약/대출",
    link: "/book",
    sub: [
      {
        txt: "도서대출",
        link: "/book/borrow",
      },
      {
        txt: "도서예약",
        link: "/book/reserve",
      },
    ],
  },
  {
    txt: "이달의 도서",
    link: "/monthly",
    sub: [
      {
        txt: "편집장 추천 도서",
        link: "/monthly/recommend",
      },
    ],
  },
  {
    txt: "열린공간",
    link: "/community",
    sub: [
      {
        txt: "공지사항",
        link: "/community/notice",
      },
      {
        txt: "FAQ",
        link: "/community/faq",
      },
      {
        txt: "자유게시판",
        link: "/community/freeboard",
      },
    ],
  },
  {
    txt: "로그인",
    link: "/login",
  },
  {
    txt: "회원가입",
    link: "/join",
  },
  {
    txt: "마이페이지",
    link: "/mypage",
  },
];
