import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Home from "./layouts/home";
import UserArticles from "./layouts/userArticles";
import Profile from "./components/page/profile";
import ArticlePage from "./components/page/article";
import NotFoundPage from "./layouts/notFoundPage";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="articles" element={<UserArticles />} />
                    <Route path="article/:id" element={<ArticlePage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
