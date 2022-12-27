import React, { useEffect, useState } from "react";
import API from "../../../api";
import _ from "lodash";
import { displayDate } from "../../../utils/displayDate";
import { paginate } from "../../../utils/paginate";
import Pagination from "../pagination";

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        API.articles.fetchAll().then((res) => setArticles(res));
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handlePageChangeNextPrevious = (page, index, pageLength) => {
        if (index === "next" && page < pageLength) {
            page++;
            setCurrentPage(page);
        } else if (index === "previous" && page > 1) {
            page--;
            setCurrentPage(page);
        }
    };

    const countOfArticles = articles.length;

    // const articlesCrop = paginate(currentPage, pageSize);

    return (
        <>
            {articles
                ? articles.map((a) => (
                      <div
                          key={a._id}
                          className="d-flex justify-content-center"
                      >
                          <div
                              className="card mb-3 mt-5 bg-dark"
                              style={{ width: "80rem" }}
                          >
                              <img
                                  src={a.cover}
                                  className="card-img-top"
                                  alt="cover"
                              />
                              <div className="card-body">
                                  <h5 className="card-title text-white">
                                      {a.title}
                                  </h5>
                                  <p className="card-text text-white">
                                      {a.description}
                                  </p>
                                  <p className="card-text">
                                      <small className="text-secondary font-monospace">
                                          {displayDate(a.created_at)}
                                      </small>
                                      <small className="text-secondary font-monospace">
                                          {` • ${a.themes}`}
                                      </small>
                                      <button className="btn btn-outline-primary position-absolute bottom-0 end-0 mb-5 me-3">
                                          Read
                                      </button>
                                  </p>
                              </div>
                          </div>
                      </div>
                  ))
                : "Loading..."}
            <div className="d-flex justify-content-center">
                <Pagination
                    itemsCount={countOfArticles}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onPageChangeNextPrevious={handlePageChangeNextPrevious}
                />
            </div>
        </>
    );
};

export default AllArticles;
