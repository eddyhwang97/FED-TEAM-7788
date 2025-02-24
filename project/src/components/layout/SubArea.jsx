// SubArea 컴포넌트 - SubArea.jsx 

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";
import Community from "../page/Community";
import Book from "../page/Book";
import Join from "../page/Join";
import Login from "../page/Login";
import Mypage from "../page/Mypage";
import Error from "../page/Error";


export default function MainArea(){

    return (
        <main className="sub-container" id="main">
            <Outlet />
            <SubTop/>
            <Book/>
            <Community/>
            <Join/>
            <Login/>
            <Mypage/>
            <Error/>
          
            
        </main>
    );

} //////////// MainArea 컴포넌트 ///////////