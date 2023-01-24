import React, { useEffect, useState } from "react";
import _ from "lodash";
import UserCard from "../components/ui/userCard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/common/pagination";
import {
    getArticles,
    getArticlesLoadingStatus,
    loadArticlesForCurrentUser,
    removeArticle
} from "../store/articles";
import { getCurrentUserId } from "../store/users";
import { stringToArray, filterArticles } from "../utils/helpers";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/common/likeButton";
import CardSkeletonUserArticles from "../components/common/cardSkeletonUserArticles";
import { paginate } from "../utils/paginate";
import SortingElements from "../components/common/articles/sortingElements";

const UserArticles = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId());
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "created_at", order: "desc" });
    const pageSize = 4;

    useEffect(() => {
        dispatch(loadArticlesForCurrentUser(userId));
    }, [userId]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        window.scrollTo(0, 0);
    };
    const handlePageChangeNextPrevious = (page, index, pageLength) => {
        if (index === "next" && page < pageLength) {
            page++;
            setCurrentPage(page);
            window.scrollTo(0, 0);
        } else if (index === "previous" && page > 1) {
            page--;
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };
    const handleRemoveArticle = (id) => {
        dispatch(removeArticle(id));
    };
    const handleEditArticle = (id) => {
        navigate(`/edit/article/${id}`);
    };

    if (!articlesLoading) {
        const filteredArticles = filterArticles(articles, searchQuery);
        const count = filteredArticles?.length;
        const sortedArticles = _.orderBy(
            filteredArticles,
            [sortBy.iter],
            [sortBy.order]
        );
        const articlesCrop = paginate(sortedArticles, currentPage, pageSize);
        return (
            <>
                <UserCard />
                {articles.length > 0 ? (
                    <>
                        <SortingElements
                            setSearchQuery={setSearchQuery}
                            setSortBy={setSortBy}
                            searchQuery={searchQuery}
                            sortBy={sortBy}
                            page="userArticles"
                            setCurrentPage={setCurrentPage}
                        />
                        <div className="position-relative ms-6 mt-user-articles">
                            <div className="position-absolute top-0 start-50 translate-middle-x">
                                <h3 className="text-white mb-5 mt-4">
                                    My Articles
                                </h3>
                                {articlesCrop.map((a) => (
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
                                                        minWidth: "350px",
                                                        minHeight: "390px"
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
                                                            {a.content.substr(
                                                                0,
                                                                500
                                                            )}
                                                            ...
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
                                                            handleEditArticle(
                                                                a._id
                                                            )
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
                                ))}
                                {count && (
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            itemsCount={count}
                                            pageSize={pageSize}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                            onPageChangeNextPrevious={
                                                handlePageChangeNextPrevious
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <CardSkeletonUserArticles />
                )}
            </>
        );
    }
};

export default UserArticles;
