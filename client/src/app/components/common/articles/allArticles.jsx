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
import SortingElements from "./sortingElements";

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

    const handleGoToArticlePage = (id) => {
        navigate(`/article/${id}`);
    };

    if (articles?.length > 0 && !articlesLoading) {
        const filteredArticles = filterArticles(articles, searchQuery);
        const count = filteredArticles?.length;
        const sortedArticles = _.orderBy(
            filteredArticles,
            [sortBy.iter],
            [sortBy.order]
        );
        const articlesCrop = paginate(sortedArticles, currentPage, pageSize);
        return (
            <>
                {articles.length > 0 && (
                    <SortingElements
                        setSearchQuery={setSearchQuery}
                        setSortBy={setSortBy}
                        searchQuery={searchQuery}
                        sortBy={sortBy}
                        page="home"
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {articlesCrop.map((a) => (
                    <Article
                        key={a._id}
                        article={a}
                        articlesLoading={articlesLoading}
                        goToArticlePage={handleGoToArticlePage}
                    />
                ))}
                {count && (
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            onPageChangeNextPrevious={
                                handlePageChangeNextPrevious
                            }
                        />
                    </div>
                )}
            </>
        );
    }
    return <CardSkeletonAllArticles />;
};

export default AllArticles;
