import React, { useEffect, useState } from "react";
import API from "../../../api";
import { displayDate } from "../../../utils/displayDate";

const RandomArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        API.articles.fetchRandomArticles().then((res) => setArticles(res));
    }, []);

    return (
        <div
            className="container text-center mt-4"
            style={{ width: 72 + "rem" }}
        >
            <div className="row">
                {articles
                    ? articles.map((a) => (
                          <div key={a._id} className="col m-1">
                              <div className="card bg-dark">
                                  <a href="/">
                                      <img
                                          src={a.cover}
                                          className="card-img-top"
                                          alt="cover"
                                      />
                                  </a>
                                  <div className="card-body fw-bold">
                                      <h5 className="text-white">{a.title}</h5>
                                      <p className="text-secondary font-monospace">
                                          {displayDate(a.created_at)}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))
                    : "Loading..."}
            </div>
        </div>
    );
};

export default RandomArticles;
