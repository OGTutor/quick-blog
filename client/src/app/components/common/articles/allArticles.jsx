import React, { useEffect, useState } from "react";
import _ from "lodash";
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
import CardSkeletonAllArticles from "../cardSkeletonAllArticles";
import { filterArticles } from "../../../utils/helpers";

const AllArticles = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const articles = useSelector(getArticles());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "created_at", order: "desc" });
    const pageSize = 4;

    useEffect(() => {
        dispatch(loadArticlesList());
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleGoToArticlePage = (id) => {
        navigate(`/article/${id}`);
    };

    if (articles && !articlesLoading) {
        const filteredArticles = filterArticles(articles, searchQuery);
        const count = filteredArticles.length;
        const sortedArticles = _.orderBy(
            filteredArticles,
            [sortBy.path],
            [sortBy.order]
        );
        const articlesCrop = paginate(sortedArticles, currentPage, pageSize);
        return (
            <>
                <div className="position-fixed top-0 start-0">
                    <div className="search-box-bg">
                        <div className="search-box">
                            <input
                                type="text"
                                name="searchQuery"
                                placeholder="Search..."
                                className="search-query"
                                onChange={handleSearchQuery}
                                value={searchQuery}
                            />
                            <a className="search-btn">
                                <i className="bi bi-search"></i>
                            </a>
                        </div>
                    </div>
                </div>
                {articlesCrop.map((a) => (
                    <Article
                        key={a._id}
                        article={a}
                        articlesLoading={articlesLoading}
                        goToArticlePage={handleGoToArticlePage}
                    />
                ))}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onPageChangeNextPrevious={handlePageChangeNextPrevious}
                    />
                </div>
            </>
        );
    }
    return <CardSkeletonAllArticles />;
};

export default AllArticles;
