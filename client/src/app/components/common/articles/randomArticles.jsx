import React, { useEffect, useState } from "react";
import API from "../../../api";
import { displayDate } from "../../../utils/displayDate";

const RandomArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        API.articles.fetchRandomArticles().then((res) => setArticles(res));
    }, []);

    return (
        <div className="container text-center mt-5">
            <div className="row">
                {articles
                    ? articles.map((a) => (
                          <div key={a._id} className="col m-2">
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
    /* <div className="position-relative">
            <div
                className="carousel slide position-absolute top-50 end-50 translate-middle-x"
                style={{
                    maxWidth: "800px",
                    minWidth: "300px",
                    left: "600px",
                    top: "20px"
                }}
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="container text-center carousel-inner">
                    {articles.length > 0
                        ? articles.map((a, idx) => (
                              <div
                                  key={a._id}
                                  className={
                                      "carousel-item " +
                                      `${idx === 0 ? "active" : ""}`
                                  }
                              >
                                  <a href="/">
                                      <img
                                          src={a.cover}
                                          className="d-block w-100 rounded-4"
                                          alt="cover"
                                      />
                                  </a>
                                  <div className="carousel-caption d-none d-md-block">
                                      <h5>{a.title}</h5>
                                      <p>{displayDate(a.created_at)}</p>
                                  </div>
                              </div>
                          ))
                        : "Loading..."}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div> */
};

export default RandomArticles;
