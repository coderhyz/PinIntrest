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
    const { setUser: setCurrentUser } = useUserStore();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 
        const userFormData = new FormData(e.target);
        const userData = Object.fromEntries(userFormData);
        try {
            const res = await request.post(`/users/auth/${isRegister ? "register" : "login"}`, userData);
            // console.log(res)
            setCurrentUser(res.data.data);
            setError(null);
            // 导航到首页
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
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                placeholder="Username"
                                required
                                name="username"
                                id="username"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="displayName">Name</label>
                            <input
                                type="displayName"
                                placeholder="Name"
                                required
                                name="displayName"
                                id="displayName"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                id="password"
                            />
                        </div>
                        <button type="submit">Register</button>
                        <p onClick={() => setIsRegister(false)}>
                            Do you have an account? <b>Login</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                ) : (
                    // 登录表单
                    <form key="loginForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                id="password"
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p onClick={() => setIsRegister(true)}>
                            Don&apos;t have an account? <b>Register</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;