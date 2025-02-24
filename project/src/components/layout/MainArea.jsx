// MainArea 컴포넌트 - MainArea.jsx 

import { Outlet } from "react-router-dom";
import Main from "../page/Main"

export default function MainArea(){

    return (
        <main className="main-container" id="main">
            <Outlet element={<Main/>}/>
        </main>
    );

} //////////// MainArea 컴포넌트 ///////////