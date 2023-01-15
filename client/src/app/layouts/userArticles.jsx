import React, { useEffect } from "react";
import { orderBy } from "lodash";
import UserCard from "../components/ui/userCard";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticles,
    getArticlesLoadingStatus,
    loadArticlesForCurrentUser,
    removeArticle
} from "../store/articles";
import { getCurrentUserId } from "../store/users";
import { stringToArray } from "../utils/helpers";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/common/likeButton";

const UserArticles = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId());
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const sortedArticles = orderBy(articles, ["created_at"], ["desc"]);

    useEffect(() => {
        dispatch(loadArticlesForCurrentUser(userId));
    }, [userId]);

    const handleRemoveArticle = (id) => {
        dispatch(removeArticle(id));
    };
    const handleEditArticle = (id) => {
        navigate(`/edit/article/${id}`);
    };

    return (
        <>
            <UserCard />
            {sortedArticles.length > 0 && (
                <div className="position-relative ms-6 mt-5">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <h3 className="text-white mb-5">My Articles</h3>
                        {!articlesLoading ? (
                            sortedArticles.map((a) => (
                                <div
                                    key={a._id}
                                    className="card mb-3 bg-dark"
                                    style={{ width: "70rem" }}
                                >
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={`${config.pathToCover}${a.cover.path}`}
                                                className="img-fluid rounded-start"
                                                alt={a.cover.fieldname}
                                                style={{
                                                    width: "350px",
                                                    height: "350px"
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h4 className="card-title text-white mb-4">
                                                    {a.title}
                                                </h4>
                                                <p className="card-text text-white">
                                                    {a.description}
                                                </p>
                                                <div className="card-body align-items-center text-center position-relative border border-secondary border-2 rounded mb-3">
                                                    <p className="card-text text-white">
                                                        {a.content}
                                                    </p>
                                                </div>
                                                <p className="card-text">
                                                    {a.themes
                                                        ? stringToArray(
                                                              a.themes
                                                          ).map((t) => (
                                                              <span
                                                                  key={t}
                                                                  className="text-muted font-monospace badge me-2 mb-1 bg-info"
                                                              >
                                                                  {t}
                                                              </span>
                                                          ))
                                                        : ""}
                                                </p>
                                                <div className="mb-3">
                                                    <LikeButton
                                                        currentArticle={a}
                                                        articlesLoading={
                                                            articlesLoading
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-warning me-2"
                                                    onClick={() =>
                                                        handleEditArticle(a._id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleRemoveArticle(
                                                            a._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3 shadow p-4">
                                        <h1>Loading...</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserArticles;
