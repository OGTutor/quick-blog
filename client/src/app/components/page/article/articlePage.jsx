import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../../api";

import UserCard from "../../ui/userCard";
import ArticleCard from "./articleCard";

const ArticlePage = () => {
    const { id } = useParams();
    const [currentArticle, setCurrentArticle] = useState({});
    const [randomArticles, setRandomArticles] = useState([]);

    useEffect(() => {
        API.articles.getArticleById(id).then((res) => setCurrentArticle(res));
        API.articles
            .fetchRandomArticles()
            .then((res) => setRandomArticles(res));
    }, []);

    return (
        <>
            <UserCard />
            <div className="position-relative ms-6">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <ArticleCard
                        article={currentArticle}
                        randomArticles={randomArticles}
                    />
                </div>
            </div>
        </>
    );
};

export default ArticlePage;
