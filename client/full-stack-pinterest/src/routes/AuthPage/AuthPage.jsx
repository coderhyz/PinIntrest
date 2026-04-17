import "./AuthPage.css";
import { useState } from "react";
import ImageKit from "../../components/ImageKit/ImageKit";
import request from "../../utils/request";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router";
// 验证页面
function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState(null);
    // 全局用户仓库更新函数
    const { setUser: setCurrentUser } = useUserStore();
    const navigate = useNavigate();
    // 点击登录或者注册
    const handleSubmit = async (e) => {
        e.preventDefault();
        /**
         * 使用 FormData 从表单中提取数据，并转换为普通对象
         */
        const userFormData = new FormData(e.target);
        // console.log(userFormData)
        const userData = Object.fromEntries(userFormData);
        // console.log(userData)
        try {
            const res = await request.post(`/users/auth/${isRegister ? "register" : "login"}`, userData);
            // console.log(res)
            // 保存到全局用户状态
            setCurrentUser(res.data.data);
            setError(null);
            // 跳转到首页
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }
    return (
        <div className="authPage">
            <div className="authContainer">
                < ImageKit path="/general/logo.png" w={36} h={36} alt="" />
                <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
                {/* 登录还是注册 */}
                {isRegister ? (
                    // 注册表单
                    <form key="register" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="username">用户名</label>
                            <input
                                type="username"
                                placeholder="用户名"
                                required
                                name="username"
                                id="username"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="displayName">姓名</label>
                            <input
                                type="displayName"
                                placeholder="姓名"
                                required
                                name="displayName"
                                id="displayName"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">邮箱</label>
                            <input
                                type="email"
                                placeholder="邮箱"
                                required
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">密码</label>
                            <input
                                type="password"
                                placeholder="密码"
                                required
                                name="password"
                                id="password"
                            />
                        </div>
                        <button type="submit">注册</button>
                        <p onClick={() => {
                            setIsRegister(false)
                            setError(null)
                        }}>
                            已经有一个账号? <b>登录</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                ) : (
                    // 登录表单
                    <form key="loginForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="email">邮箱</label>
                            <input
                                type="email"
                                placeholder="邮箱"
                                required
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">密码</label>
                            <input
                                type="password"
                                placeholder="密码"
                                required
                                name="password"
                                id="password"
                            />
                        </div>
                        <button type="submit">登录</button>
                        <p onClick={() => {
                            setIsRegister(true);
                            setError(null);
                        }}>
                            没有账号? <b>注册</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;