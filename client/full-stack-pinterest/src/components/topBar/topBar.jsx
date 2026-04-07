import './topBar.css'
import UserButton from '../userButton/userButton';
import { useNavigate } from 'react-router';
function TopBar() {
    const navigate = useNavigate();
    // 处理搜索提交
    function handleSubmit(e) {
        e.preventDefault();
        if (e.target[0].value.trim() === '') {
            navigate('/')
            return;
        }
        const keyword = e.target[0].value;
        // 跳转到搜索结果页面，并传递搜索关键词
        navigate(`/search?searchKeyword=${keyword}`);
    }
    return (
        <>
            <div className="topBar">
                <form onSubmit={handleSubmit} className="search">
                    <img src="/general/search.svg" alt="" />
                    <input type="text" placeholder='搜索' />
                </form>
                <UserButton />
            </div>

        </>
    );
}

export default TopBar;