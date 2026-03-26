import "./leftBar.css"
function LeftBar() {
    return (
        <div className="leftBar">
            {/* 菜单 */}
            <div className="menuIcons">
                {/* 单个菜单图标 */}
                <a href="/" className="menuIcon">
                    <img className="logo" src="/general/logo.png" alt="" />
                </a>
                <a href="/" className="menuIcon">
                    <img className="logo" src="/general/home.svg" alt="" />
                </a>
                <a href="/create" className="menuIcon">
                    <img className="logo" src="/general/create.svg" alt="" />
                </a>
                <a href="/" className="menuIcon">
                    <img className="logo" src="/general/updates.svg" alt="" />
                </a>
                <a href="/" className="menuIcon">
                    <img className="logo" src="/general/messages.svg" alt="" />
                </a>
            </div>
            <a href="/" className="menuIcon">
                <img className="logo" src="/general/settings.svg" alt="" />
            </a>
        </div>
    );
}

export default LeftBar;
