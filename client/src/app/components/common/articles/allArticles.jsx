import React, { useEffect, useState } from "react";
import API from "../../../api";
import { paginate } from "../../../utils/paginate";
import Pagination from "../pagination";
import Article from "./article";

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        API.articles.fetchAll().then((res) => setArticles(res));
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        window.scrollTo(0, 0);
    };
    const handlePageChangeNextPrevious = (page, index, pageLength) => {
        if (index === "next" && page < pageLength) {
            page++;
            setCurrentPage(page);
            window.scrollTo(0, 0);
        } else if (index === "previous" && page > 1) {
            page--;
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    const countOfArticles = articles.length;

    const articlesCrop = paginate(articles, currentPage, pageSize);

    return (
        <>
            {articlesCrop
                ? articlesCrop.map((a) => (
                      <Article
                          key={a._id}
                          id={a._id}
                          title={a.title}
                          description={a.description}
                          themes={a.themes}
                          cover={a.cover}
                          createdAt={a.created_at}
                      />
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
