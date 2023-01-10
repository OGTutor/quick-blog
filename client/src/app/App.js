import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Home from "./layouts/home";
import UserArticles from "./layouts/userArticles";
import Profile from "./components/page/profile";
import ArticlePage from "./components/page/article";
import AddArticle from "./layouts/addArticle";
import NotFound from "./layouts/notFound";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import LogOut from "./layouts/logOut";
import AuthLoader from "./components/ui/hoc/authLoader";
import EditArticle from "./layouts/editArticle";

const App = () => {
    return (
        <>
            <AuthLoader>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<Home />} />
                        <Route
                            path="articles/user/:id"
                            element={<UserArticles />}
                        />
                        <Route path="article/:id" element={<ArticlePage />} />
                        <Route path="add/article" element={<AddArticle />} />
                        <Route
                            path="edit/article/:id"
                            element={<EditArticle />}
                        />
                        <Route path="profile/user/:id" element={<Profile />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="logout" element={<LogOut />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AuthLoader>

            <ToastContainer />
        </>
    );
};

export default App;
