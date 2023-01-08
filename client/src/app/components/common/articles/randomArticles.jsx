import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { displayDate } from "../../../utils/displayDate";
import { getArticles, getArticlesLoadingStatus } from "../../../store/articles";
import { getRandomArticles } from "../../../utils/helpers";
import config from "../../../config.json";

const RandomArticles = () => {
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());

    if (!articlesLoading && articles) {
        const randomArticles = getRandomArticles(articles);
        return (
            <div
                className="container text-center mt-4"
                style={{ width: "72rem" }}
            >
                <div className="row">
                    {randomArticles.map((a) => (
                        <div key={a._id} className="col m-1">
                            <div className="card bg-dark">
                                <NavLink to={`/article/${a._id}`}>
                                    <img
                                        src={`${config.pathToCover}${a.cover.path}`}
                                        className="card-img-top"
                                        alt="cover"
                                    />
                                </NavLink>
                                <div className="card-body fw-bold">
                                    <h5 className="text-white">{a.title}</h5>
                                    <p className="text-secondary font-monospace">
                                        {displayDate(a.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default RandomArticles;
