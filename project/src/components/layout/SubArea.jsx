// SubArea 컴포넌트 - SubArea.jsx 

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";


export default function MainArea(){

    return (
        <main className="sub-container" id="main">
            <Outlet />
            <SubTop/>
          
            
        </main>
    );

} //////////// MainArea 컴포넌트 ///////////