import React, { useState } from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { NavLink } from "react-router-dom";
import { stringToArray } from "../../../utils/helpers";
import config from "../../../config.json";
import LikeButton from "../../common/likeButton";
import RandomArticles from "./randomArticles";
import Modal from "../../common/modal";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const ArticleCard = ({ article, articlesLoading, currentArticle }) => {
    const [modalActive, setModalActive] = useState(false);
    const author = useSelector(getUserById(currentArticle.userId));

    return (
        <>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <NavLink
                        to="/"
                        className="card-link text-secondary text-decoration-none"
                    >
                        come back
                    </NavLink>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setModalActive(true)}
                    >
                        <small className="p-1">Share </small>
                        <i
                            className={
                                modalActive ? "bi bi-share-fill" : "bi bi-share"
                            }
                        ></i>
                    </button>
                </div>
                <div className="d-flex">
                    <Modal
                        active={modalActive}
                        setActive={setModalActive}
                        article={article}
                    />
                </div>
                <h3 className="card-title text-white">{article.title}</h3>
                <div className="mb-2">
                    <small className="text-secondary font-monospace">
                        {`${displayDate(article.created_at)} • `}
                    </small>
                    {article.themes &&
                        stringToArray(article.themes).map((t) => (
                            <span
                                key={t}
                                className="text-muted font-monospace badge m-1 bg-info"
                            >
                                {`${t}`}
                            </span>
                        ))}
                </div>
                <p className="card-text text-white">{article.description}</p>
            </div>
            <img
                src={`${config.pathToCover}${article.cover.path}`}
                className="card-img-bottom"
                alt="cover"
            />
            <div className="card-body">
                <p className="card-text text-white">{article.content}</p>
            </div>
            <hr className="myHr" />
            <div className="card-body">
                <div className="container text-center">
                    <h4 className="text-white">Interesting to read</h4>
                    <div className="row row-cols-2">
                        <RandomArticles />
                    </div>
                </div>
            </div>
            <hr className="myHr" />
            <div className="text-white ms-3">
                <div className="bg-dark card-body mb-1 mt-1">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between">
                                {author && (
                                    <>
                                        <NavLink
                                            to={`/profile/page/user/${author._id}`}
                                        >
                                            <img
                                                src={
                                                    author.avatar.name
                                                        ? author.avatar.name
                                                        : `${config.pathToCover}${author.avatar.path}`
                                                }
                                                className="rounded-circle me-3"
                                                alt="avatar"
                                                width="100"
                                                height="100"
                                            />
                                        </NavLink>
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div className="mt-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="text-white mb-1 mt-1">
                                                        {author &&
                                                            `${author.name} `}
                                                        <p className="text-white mb-1 mt-1 font-monospace">
                                                            Posted -{" "}
                                                            {displayDate(
                                                                currentArticle.created_at
                                                            )}
                                                        </p>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="me-3 mt-4">
                                    <LikeButton
                                        articlesLoading={articlesLoading}
                                        currentArticle={currentArticle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="myHr" />
        </>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired,
    articlesLoading: PropTypes.bool,
    currentArticle: PropTypes.object
};

export default ArticleCard;
