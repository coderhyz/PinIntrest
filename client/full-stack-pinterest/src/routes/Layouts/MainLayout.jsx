import "./MainLayout.css";
import { Outlet } from "react-router";
import LeftBar from "../../components/leftBar/leftBar";
import TopBar from "../../components/topBar/topBar";
// 主题布局
function MainLayout() {
    return (
        <>
            <div className="app">
                {/* 左边栏 */}
                <LeftBar></LeftBar>
                <div className="content">
                    {/* 顶部栏 */}
                    <TopBar></TopBar>
                    {/* 路由出口 */}
                    <Outlet />
                </div>
            </div>


        </>
    );
}

export default MainLayout;