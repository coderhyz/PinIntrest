import './topBar.css'
import UserButton from '../userButton/userButton';
function TopBar() {
    return (
        <>
            <div className="topBar">
                <div className="search">
                    <img src="/general/search.svg" alt="" />
                    <input type="text" placeholder='搜索' />
                </div>
                <UserButton />
            </div>

        </>
    );
}

export default TopBar;