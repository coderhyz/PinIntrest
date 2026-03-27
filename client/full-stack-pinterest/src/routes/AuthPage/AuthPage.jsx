import "./AuthPage.css";
import { useState } from "react";
import ImageKit from "../../components/ImageKit/ImageKit";
// 验证页面
function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState(null);
    return (
        <div className="authPage">
            <div className="authContainer">
                < ImageKit path="/general/logo.png" w={36} h={36} alt="" />
                <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
                {isRegister ? (
                    // 注册表单
                    <form key="register" >
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
                    <form key="loginForm" >
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