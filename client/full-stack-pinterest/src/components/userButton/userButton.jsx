import './userButton.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import request from '../../utils/request';
import { Link } from 'react-router';
import useUserStore from '../../store/userStore';
function UserButton() {
    const [open, setOpen] = useState(false);
    const { setUser: setCurrentUser, user: currentUser } = useUserStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        // 处理退出登录逻辑
        setCurrentUser(null); // 模拟退出登录
        await request.post("/users/auth/logout");
        navigate('/auth');
    };
    return (
        // 当前用户是否登录
        currentUser ?
            <div className="userButton">
                <img src="/general/noAvatar.png" alt="User Avatar" />
                <img onClick={() => setOpen(prev => !prev)} className="arrow" src="/general/arrow.svg" alt="Arrow" />
                {
                    open && <div className="userOptions">
                        {/* 用户信息 */}
                        <div className="userOption">Profile</div>
                        {/* 设置 */}
                        <div className="userOption">Setting</div>
                        {/* 退出登录 */}
                        <div className="userOption" onClick={handleLogout}>Logout</div>
                    </div>
                }
            </div>
            : (
                <Link className='loginLink' to="/auth">
                    Login/SingUP
                </Link>
            )

    );
}

export default UserButton;