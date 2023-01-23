import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Home from "./layouts/home";
import UserArticles from "./layouts/userArticles";
import ProfileSettings from "./components/page/profile/profileSettings";
import ArticlePage from "./components/page/article";
import AddArticle from "./layouts/addArticle";
import NotFound from "./layouts/notFound";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import LogOut from "./layouts/logOut";
import AuthLoader from "./components/ui/hoc/authLoader";
import EditArticle from "./layouts/editArticle";
import ProtectedRoute from "./components/common/protectedRoute";
import { SkeletonTheme } from "react-loading-skeleton";
import ProfilePage from "./components/page/profile/profilePage";

const App = () => {
    return (
        <>
            <AuthLoader>
                <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                    <Routes>
                        <Route path="/" element={<NavBar />}>
                            <Route index element={<Home />} />
                            <Route
                                path="articles/user/:id"
                                element={
                                    <ProtectedRoute>
                                        <UserArticles />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="article/:id"
                                element={
                                    <ProtectedRoute>
                                        <ArticlePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="add/article"
                                element={
                                    <ProtectedRoute>
                                        <AddArticle />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="edit/article/:id"
                                element={
                                    <ProtectedRoute>
                                        <EditArticle />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="profile/page/user/:id"
                                element={<ProfilePage />}
                            />
                            <Route
                                path="profile/settings/user/:id"
                                element={
                                    <ProtectedRoute>
                                        <ProfileSettings />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="login" element={<LoginForm />} />
                            <Route path="register" element={<RegisterForm />} />
                            <Route path="logout" element={<LogOut />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </SkeletonTheme>
            </AuthLoader>

            <ToastContainer />
        </>
    );
};

export default App;
