/// MainArea 컴포넌트 : MainArea.jsx /////

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";
import Community from "../page/Community";

export default function MainArea(){

    return (
        <main className="main-container" id="main">
            <Outlet />
        </main>
    );

} //////////// MainArea 컴포넌트 ///////////