import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./layouts/home";
import Articles from "./layouts/articles";
import Profile from "./components/page/profile";
import ArticlePage from "./components/page/article";

import NavBar from "./components/ui/navBar";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="article/:id" element={<ArticlePage />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
