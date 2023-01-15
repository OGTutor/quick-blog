import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { NavLink } from "react-router-dom";
import { stringToArray } from "../../../utils/helpers";
import config from "../../../config.json";

const ArticleCard = ({
    article,
    randomArticles,
    toggleLikeArticle,
    likedUser
}) => {
    return (
        <>
            <div className="card-body">
                <div className="mb-2">
                    <NavLink
                        to="/"
                        className="card-link text-secondary text-decoration-none"
                    >
                        come back
                    </NavLink>
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
                        {randomArticles
                            ? randomArticles.map((a) => (
                                  <div key={a._id} className="col text-white">
                                      <a
                                          href={`/article/${a._id}`}
                                          className="text-warning text-decoration-none"
                                      >
                                          {a.title}
                                      </a>
                                      <p>
                                          <small className="text-secondary font-monospace">
                                              {displayDate(a.created_at)}
                                          </small>
                                      </p>
                                  </div>
                              ))
                            : ""}
                    </div>
                </div>
            </div>
            <hr className="myHr" />
            <div className="text-white ms-3">
                <button
                    className="btn btn-outline-danger"
                    onClick={toggleLikeArticle}
                >
                    <i className={`bi bi-heart${likedUser ? "-fill" : ""}`}>
                        {` → ${article.likedUsers.length}`}
                    </i>
                </button>
            </div>
            <hr className="myHr" />
        </>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired,
    randomArticles: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    toggleLikeArticle: PropTypes.func.isRequired,
    likedUser: PropTypes.bool.isRequired
};

export default ArticleCard;
