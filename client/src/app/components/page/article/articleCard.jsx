import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { NavLink } from "react-router-dom";

const ArticleCard = ({ article, randomArticles }) => {
    return (
        <div className="card mb-3 mt-3 bg-dark" style={{ width: 70 + "rem" }}>
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
                        {displayDate(article.created_at)}
                    </small>
                    <small className="text-secondary font-monospace">
                        {` • ${article.themes}`}
                    </small>
                </div>
                <p className="card-text text-white">{article.description}</p>
            </div>
            <img src={article.cover} className="card-img-bottom" alt="cover" />
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
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired,
    randomArticles: PropTypes.array
};

export default ArticleCard;
