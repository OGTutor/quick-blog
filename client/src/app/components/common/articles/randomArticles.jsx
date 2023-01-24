import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { displayDate } from "../../../utils/displayDate";
import { getArticles, getArticlesLoadingStatus } from "../../../store/articles";
import { getRandomArticles } from "../../../utils/helpers";
import config from "../../../config.json";
import CardSkeletonRandomArticles from "../cardSkeletonRandomArticles";

const RandomArticles = () => {
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const randomArticles = getRandomArticles(articles);

    if (!articlesLoading && articles?.length > 0) {
        return (
            <div className="container text-center mt-home container-random-article">
                <div className="row">
                    {randomArticles.map((a) => (
                        <div key={a._id} className="col m-1 random-article">
                            <div className="card bg-dark">
                                <NavLink to={`/article/${a._id}`}>
                                    <img
                                        src={`${config.pathToCover}${a.cover.path}`}
                                        className="card-img-top random-article-img"
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
    return <CardSkeletonRandomArticles />;
};

export default RandomArticles;
