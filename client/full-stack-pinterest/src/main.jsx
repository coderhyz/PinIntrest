import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './routes/HomePage/HomePage.jsx'
import CreatePage from './routes/CreatePage/CreatePage.jsx'
import PostPage from './routes/PostPage/PostPage.jsx'
import AuthPage from './routes/AuthPage/AuthPage.jsx'
import ProfilePage from './routes/ProfilePage/ProfilePage.jsx'
import SearchPage from './routes/SearchPage/SearchPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from './routes/Layouts/MainLayout.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 一级路由 */}
        <Route element={<MainLayout />}>
          {/* home */}
          <Route path="/" element={<HomePage />} />
          {/* 创建pin */}
          <Route path="/create" element={<CreatePage />} />
          {/* Pin详情 */}
          <Route path="/post/:id" element={<PostPage />} />
          {/* 用户主页 */}
          <Route path="/:username" element={<ProfilePage />} />
          {/* 搜索 */}
          <Route path="/search" element={<SearchPage />} />
        </Route>
        {/* auth */}
        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
