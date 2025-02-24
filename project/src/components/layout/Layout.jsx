// Layout 컴포넌트 - Layout.jsx

import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import SubArea from "./SubArea";
import TopArea from "./TopArea";

export default function Layout() {
  return (
    <>
      <TopArea />
      <MainArea />
      <SubArea />
      <FooterArea />
    </>
  );
}
