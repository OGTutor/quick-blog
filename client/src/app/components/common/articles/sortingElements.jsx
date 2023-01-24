import React from "react";
import PropTypes from "prop-types";

const SortingElements = ({
    setSearchQuery,
    setSortBy,
    searchQuery,
    sortBy,
    page,
    setCurrentPage
}) => {
    const handleSearchQuery = ({ target }) => {
        setCurrentPage(1);
        setSearchQuery(target.value);
    };
    const handleSortByAllArticles = () => {
        setCurrentPage(1);
        setSearchQuery("");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "created_at",
            order: "desc"
        }));
    };
    const handleSortByIT = () => {
        setCurrentPage(1);
        setSearchQuery("IT");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "created_at",
            order: "desc"
        }));
    };
    const handleSortByEconomy = () => {
        setCurrentPage(1);
        setSearchQuery("Economy");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "created_at",
            order: "desc"
        }));
    };
    const handleSortByScience = () => {
        setCurrentPage(1);
        setSearchQuery("Science");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "created_at",
            order: "desc"
        }));
    };
    const handleSortByCreationDate = () => {
        setCurrentPage(1);
        setSearchQuery("");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "created_at"
        }));
    };
    const handleSortByLikes = () => {
        setCurrentPage(1);
        setSearchQuery("");
        setSortBy((prevState) => ({
            ...prevState,
            iter: "likes"
        }));
    };
    const handleSortByDescending = () => {
        setCurrentPage(1);
        setSearchQuery("");
        setSortBy((prevState) => ({
            ...prevState,
            order: "desc"
        }));
    };
    const handleSortByAscending = () => {
        setCurrentPage(1);
        setSearchQuery("");
        setSortBy((prevState) => ({
            ...prevState,
            order: "asc"
        }));
    };

    if (page === "home") {
        return (
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
                <div className="d-flex flex-row search-box-buttons">
                    <div
                        className="btn btn-outline-secondary p-2 ms-3 mt-3"
                        onClick={handleSortByAllArticles}
                    >
                        All articles
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByIT}
                    >
                        IT
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByEconomy}
                    >
                        Economy
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByScience}
                    >
                        Science
                    </div>
                    <button
                        className="btn btn-outline-secondary dropdown-toggle p-2 ms-5 mt-3"
                        data-bs-toggle="dropdown"
                    >
                        {sortBy.iter === "created_at"
                            ? "Creation date"
                            : "Likes"}
                    </button>
                    <ul className="dropdown-menu bg-secondary">
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByCreationDate}
                            >
                                Creation date
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByLikes}
                            >
                                Likes
                            </button>
                        </li>
                    </ul>
                    <button
                        className="btn btn-outline-secondary dropdown-toggle p-2 ms-2 mt-3"
                        data-bs-toggle="dropdown"
                    >
                        {sortBy.order === "desc" ? "Descending" : "Ascending"}
                    </button>
                    <ul className="dropdown-menu bg-secondary">
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByDescending}
                            >
                                Descending
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByAscending}
                            >
                                Ascending
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else if (page === "userArticles") {
        return (
            <div className="search-box-user-articles-bg">
                <div className="search-box-user-articles">
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        className="search-query-user-articles"
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    <a className="search-btn-user-articles">
                        <i className="bi bi-search"></i>
                    </a>
                </div>
                <div className="d-flex flex-row">
                    <div
                        className="btn btn-outline-secondary p-2 ms-3 mt-3"
                        onClick={handleSortByAllArticles}
                    >
                        All articles
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByIT}
                    >
                        IT
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByEconomy}
                    >
                        Economy
                    </div>
                    <div
                        className="btn btn-outline-primary p-2 ms-2 mt-3"
                        onClick={handleSortByScience}
                    >
                        Science
                    </div>
                    <button
                        className="btn btn-outline-secondary dropdown-toggle p-2 ms-5 mt-3"
                        data-bs-toggle="dropdown"
                    >
                        {sortBy.iter === "created_at"
                            ? "Creation date"
                            : "Likes"}
                    </button>
                    <ul className="dropdown-menu bg-secondary">
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByCreationDate}
                            >
                                Creation date
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByLikes}
                            >
                                Likes
                            </button>
                        </li>
                    </ul>
                    <button
                        className="btn btn-outline-secondary dropdown-toggle p-2 ms-2 mt-3"
                        data-bs-toggle="dropdown"
                    >
                        {sortBy.order === "desc" ? "Descending" : "Ascending"}
                    </button>
                    <ul className="dropdown-menu bg-secondary">
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByDescending}
                            >
                                Descending
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-outline-primary dropdown-item"
                                onClick={handleSortByAscending}
                            >
                                Ascending
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

SortingElements.propTypes = {
    setSearchQuery: PropTypes.func,
    setSortBy: PropTypes.func,
    searchQuery: PropTypes.string,
    sortBy: PropTypes.object,
    page: PropTypes.string,
    setCurrentPage: PropTypes.func
};

export default SortingElements;
