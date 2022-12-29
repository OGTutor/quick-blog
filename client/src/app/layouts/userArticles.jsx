import React, { useEffect, useState } from "react";
import UserCard from "../components/ui/userCard";

import API from "../api";

const UserArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        API.articles.fetchAll().then((res) => setArticles(res));
    }, []);

    return (
        <>
            <UserCard />
            <div className="position-relative ms-6 mt-5">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <h3 className="text-white mb-5">My Articles</h3>
                    {articles
                        ? articles.map((a) => (
                              <div
                                  key={a._id}
                                  className="card mb-3 bg-dark"
                                  style={{ width: "70rem" }}
                              >
                                  <div className="row g-0">
                                      <div className="col-md-4">
                                          <img
                                              src={a.cover}
                                              className="img-fluid rounded-start"
                                              alt="cover"
                                              style={{
                                                  width: "350px",
                                                  height: "350px"
                                              }}
                                          />
                                      </div>
                                      <div className="col-md-8">
                                          <div className="card-body">
                                              <h4 className="card-title text-white mb-4">
                                                  {a.title}
                                              </h4>
                                              <p className="card-text text-white">
                                                  {a.description}
                                              </p>
                                              <div className="card-body d-flex flex-column align-items-center text-center position-relative border border-secondary border-2 rounded mb-3">
                                                  <p className="card-text text-white">
                                                      {a.content}
                                                  </p>
                                              </div>
                                              <p className="card-text">
                                                  {a.themes
                                                      ? a.themes.map((t) => (
                                                            <span
                                                                key={t}
                                                                className="text-muted font-monospace badge m-1 bg-info"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))
                                                      : ""}
                                              </p>
                                              <button
                                                  type="button"
                                                  className="btn btn-outline-warning me-2"
                                              >
                                                  Edit
                                              </button>
                                              <button
                                                  type="button"
                                                  className="btn btn-outline-danger"
                                              >
                                                  Delete
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
            </div>
        </>
    );
};

export default UserArticles;
