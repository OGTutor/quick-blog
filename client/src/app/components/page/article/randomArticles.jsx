import React, { useEffect, useState } from "react";
import { displayDate } from "../../../utils/displayDate";
import { getRandomArticles } from "../../../utils/helpers";
import { useSelector } from "react-redux";
import { getArticlesLoadingStatus, getArticles } from "../../../store/articles";
import { getCurrentUserId } from "../../../store/users";

const RandomArticles = () => {
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const currentUserId = useSelector(getCurrentUserId());
    const [randomArticles, setRandomArticles] = useState(null);

    useEffect(() => {
        if (!articlesLoading && articles) {
            setRandomArticles(getRandomArticles(articles));
        }
    }, [currentUserId]);

    if (!articlesLoading && articles) {
        return (
            <>
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
            </>
        );
    }
};

export default RandomArticles;
