import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../../api";

import UserCard from "../../ui/userCard";
import ArticleCard from "./articleCard";
import {
    getArticlesLoadingStatus,
    loadArticlesList,
    loadArticleById
} from "../../../store/articles";
import { useDispatch, useSelector } from "react-redux";

const ArticlePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const currentArticle = useSelector(loadArticleById(id));
    const [randomArticles, setRandomArticles] = useState([]);

    useEffect(() => {
        dispatch(loadArticlesList(id));
        API.articles
            .fetchRandomArticles()
            .then((res) => setRandomArticles(res));
    }, [id]);

    if (!articlesLoading && currentArticle) {
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
    }
};

export default ArticlePage;
