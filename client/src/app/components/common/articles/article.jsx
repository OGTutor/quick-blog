import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import config from "../../../config.json";
import { stringToArray } from "../../../utils/helpers";
import LikeButton from "../likeButton";

const Article = ({ article, articlesLoading, goToArticlePage }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3 mt-3 bg-dark container-article">
                <img
                    src={`${config.pathToCover}${article.cover.path}`}
                    className="card-img-top"
                    alt={article.cover.fieldname}
                    style={{ maxWidth: "1200px", maxHeight: "700px" }}
                />
                <div className="card-body">
                    <h5 className="card-title text-white">{article.title}</h5>
                    <p className="card-text text-white">
                        {article.description}
                    </p>
                    <div className="d-flex justify-content-between mb-3">
                        <LikeButton
                            articlesLoading={articlesLoading}
                            currentArticle={article}
                        />
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => goToArticlePage(article._id)}
                        >
                            Read
                        </button>
                    </div>
                    <p className="card-text">
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
                    </p>
                </div>
            </div>
        </div>
    );
};

Article.propTypes = {
    article: PropTypes.object,
    articlesLoading: PropTypes.bool,
    goToArticlePage: PropTypes.func
};

export default Article;
