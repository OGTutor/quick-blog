import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../ui/userCard";
import ArticleCard from "./articleCard";
import {
    getArticlesLoadingStatus,
    loadArticlesList,
    loadArticleById,
    getArticles,
    updateArticle
} from "../../../store/articles";
import { getCurrentUserId } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { getRandomArticles } from "../../../utils/helpers";
import Comments from "../../ui/comments";

const ArticlePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const currentArticle = useSelector(loadArticleById(id));
    const articles = useSelector(getArticles());
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const currentUserId = useSelector(getCurrentUserId());
    const [likedUser, setLikedUser] = useState(false);

    useEffect(() => {
        dispatch(loadArticlesList());
    }, [id]);

    useEffect(() => {
        if (!articlesLoading && currentArticle && !data) {
            setData(JSON.parse(JSON.stringify(currentArticle)));
        }
        if (data && data.likedUsers.length > 0) {
            const expectedLikeFromUser =
                data.likedUsers.includes(currentUserId);
            if (expectedLikeFromUser) {
                setLikedUser(true);
            }
        } else {
            setLikedUser(false);
        }
    }, [currentUserId, articlesLoading, currentArticle, data, likedUser]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const toggleLikeArticle = () => {
        if (likedUser) {
            setLikedUser(false);
            const likedUsers = data.likedUsers.filter((id) => {
                return id !== currentUserId;
            });
            const updatedData = { ...data, likedUsers };
            setData((prevState) => ({
                ...prevState,
                ...updatedData
            }));
            dispatch(updateArticle({ payload: updatedData, articleId: id }));
        } else {
            setLikedUser(true);
            data.likedUsers.push(currentUserId);
            dispatch(updateArticle({ payload: data, articleId: id }));
        }
    };

    if (!isLoading) {
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
                                toggleLikeArticle={toggleLikeArticle}
                                likedUser={likedUser}
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
