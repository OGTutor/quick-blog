import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";

const Article = ({
    id,
    title,
    description,
    themes,
    cover,
    createdAt,
    goToArticlePage
}) => {
    return (
        <div key={id} className="d-flex justify-content-center">
            <div className="card mb-3 mt-3 bg-dark" style={{ width: "70rem" }}>
                <img src={cover} className="card-img-top" alt="cover" />
                <div className="card-body">
                    <h5 className="card-title text-white">{title}</h5>
                    <p className="card-text text-white">{description}</p>
                    <p className="card-text">
                        <small className="text-secondary font-monospace">
                            {`${displayDate(createdAt)} • `}
                        </small>
                        {themes &&
                            themes.map((t) => (
                                <span
                                    key={t}
                                    className="text-muted font-monospace badge m-1 bg-info"
                                >
                                    {`${t}`}
                                </span>
                            ))}
                        <button
                            className="btn btn-outline-primary position-absolute bottom-0 end-0 mb-5 me-3"
                            onClick={() => goToArticlePage(id)}
                        >
                            Read
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

Article.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    themes: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    goToArticlePage: PropTypes.func.isRequired
};

export default Article;
