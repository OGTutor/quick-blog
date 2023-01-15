import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import config from "../../../config.json";
import { stringToArray } from "../../../utils/helpers";
import LikeButton from "../likeButton";

const Article = ({ article, articlesLoading, goToArticlePage }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3 mt-3 bg-dark" style={{ width: "70rem" }}>
                <img
                    src={`${config.pathToCover}${article.cover.path}`}
                    className="card-img-top"
                    alt={article.cover.fieldname}
                />
                <div className="card-body">
                    <h5 className="card-title text-white">{article.title}</h5>
                    <p className="card-text text-white">
                        {article.description}
                    </p>
                    <div className="mb-3">
                        <LikeButton
                            articlesLoading={articlesLoading}
                            currentArticle={article}
                        />
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
                        <button
                            className="btn btn-outline-primary position-absolute bottom-0 end-0 mb-5 me-3"
                            onClick={() => goToArticlePage(article._id)}
                        >
                            Read
                        </button>
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
