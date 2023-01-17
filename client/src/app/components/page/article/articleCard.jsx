import React, { useState } from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { NavLink } from "react-router-dom";
import { stringToArray } from "../../../utils/helpers";
import config from "../../../config.json";
import LikeButton from "../../common/likeButton";
import RandomArticles from "./randomArticles";
import Modal from "../../common/modal";

const ArticleCard = ({ article, articlesLoading, currentArticle }) => {
    const [modalActive, setModalActive] = useState(false);

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
                <LikeButton
                    articlesLoading={articlesLoading}
                    currentArticle={currentArticle}
                />
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
