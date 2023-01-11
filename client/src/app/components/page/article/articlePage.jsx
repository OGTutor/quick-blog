import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../ui/userCard";
import ArticleCard from "./articleCard";
import {
    getArticlesLoadingStatus,
    loadArticlesList,
    loadArticleById,
    getArticles
} from "../../../store/articles";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArticles } from "../../../utils/helpers";
import Comments from "../../ui/comments";

const ArticlePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const currentArticle = useSelector(loadArticleById(id));
    const articles = useSelector(getArticles());

    useEffect(() => {
        dispatch(loadArticlesList());
    }, [id]);

    if (!articlesLoading && currentArticle) {
        const randomArticles = getRandomArticles(articles);
        return (
            <>
                <UserCard />
                <div className="position-relative ms-6">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <div
                            className="card mb-3 mt-3 bg-dark"
                            style={{ width: "70rem" }}
                        >
                            <ArticleCard
                                article={currentArticle}
                                randomArticles={randomArticles}
                            />
                            <Comments />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default ArticlePage;
