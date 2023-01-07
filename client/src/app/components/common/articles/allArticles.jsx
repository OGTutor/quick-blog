import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../../utils/paginate";
import Pagination from "../pagination";
import Article from "./article";
import {
    getArticles,
    loadArticlesList,
    getArticlesLoadingStatus
} from "../../../store/articles";

const AllArticles = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const sortedArticles = orderBy(articles, ["created_at"], ["desc"]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        dispatch(loadArticlesList());
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

    const handleGoToArticlePage = (id) => {
        navigate(`/article/${id}`);
    };

    if (sortedArticles.length > 0 && !articlesLoading) {
        const countOfArticles = articles.length;
        const articlesCrop = paginate(sortedArticles, currentPage, pageSize);
        return (
            <>
                {articlesCrop.map((a) => (
                    <Article
                        key={a._id}
                        id={a._id}
                        title={a.title}
                        description={a.description}
                        themes={a.themes}
                        cover={a.cover}
                        createdAt={a.created_at}
                        goToArticlePage={handleGoToArticlePage}
                    />
                ))}
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
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    );
};

export default AllArticles;
