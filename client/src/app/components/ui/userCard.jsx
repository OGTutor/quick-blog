import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import config from "../../config.json";

const UserCard = () => {
    const currentUser = useSelector(getCurrentUserData());
    const navigate = useNavigate();

    const handleGoToUserArticles = () => {
        navigate(`/articles/user/${currentUser._id}`);
    };
    const handleGoToAddNewArticle = () => {
        navigate(`/add/article`);
    };

    if (currentUser) {
        return (
            <div
                className="user-card position-fixed top-0 start-0"
                style={{ height: 100 + "%", width: 22 + "rem" }}
            >
                <div
                    className="container-lt text-center"
                    style={{ height: 100 + "%", width: 22 + "rem" }}
                >
                    <div
                        className="card bg-secondary bg-dark"
                        style={{ height: 100 + "%", width: 22 + "rem" }}
                    >
                        <img
                            src="/images/fff.jpeg"
                            className="card-img-top"
                            style={{
                                width: "150",
                                height: "150"
                            }}
                            alt="bg"
                        />
                        <div className="position-relative">
                            <img
                                src={
                                    currentUser.avatar.name
                                        ? currentUser.avatar.name
                                        : `${config.pathToCover}${currentUser.avatar.path}`
                                }
                                className="position-absolute top-0 start-50 translate-middle rounded-circle border border-white bg-dark"
                                width="75"
                                height="75"
                                alt="avatar"
                            />
                        </div>
                        <div className="card-body d-flex flex-column align-items-center text-center position-relative">
                            <h5 className="card-title text-white mt-5">
                                {currentUser.name}
                            </h5>
                            <p className="card-text font-monospace text-white-50 mt-2">
                                {currentUser.typeOfBlog}
                            </p>
                        </div>
                        <div className="position mb-2 translate-middle-y">
                            {currentUser.instagram && (
                                <a href={currentUser.instagram}>
                                    <img
                                        src="/images/instagram.png"
                                        className="rounded rounded-circle me-1"
                                        width="30"
                                        height="30"
                                        alt="instagram"
                                    />
                                </a>
                            )}
                            {currentUser.pinterest && (
                                <a href={currentUser.pinterest}>
                                    <img
                                        src="/images/pinterest.png"
                                        className="rounded float rounded-circle me-1"
                                        width="30"
                                        height="30"
                                        alt="pinterest"
                                    />
                                </a>
                            )}
                            {currentUser.github && (
                                <a href={currentUser.github}>
                                    <img
                                        src="/images/github.png"
                                        className="rounded float rounded-circle me-1"
                                        width="30"
                                        height="30"
                                        alt="github"
                                    />
                                </a>
                            )}
                        </div>
                        <hr className="mb-3" />
                        {currentUser.biography ? (
                            <div className="card-body d-flex flex-column align-items-center text-center position-relative border border-secondary border-2 rounded me-3 ms-3 mb-5">
                                <p className="card-text fw-light text-white">
                                    {currentUser.biography}
                                </p>
                            </div>
                        ) : (
                            <hr className="mb-6" />
                        )}
                        <hr className="mb-5" />
                        <div className="d-grid gap-2 d-md-flex justify-content-center mb-5 me-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleGoToUserArticles}
                            >
                                My articles
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleGoToAddNewArticle}
                            >
                                Write an article
                            </button>
                        </div>
                        <hr className="mb-5" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div
            className="user-card position-fixed top-0 start-0"
            style={{ height: 100 + "%", width: 22 + "rem" }}
        >
            <div
                className="container-lt text-center"
                style={{ height: 100 + "%", width: 22 + "rem" }}
            >
                <div
                    className="card bg-secondary bg-dark"
                    style={{ height: 100 + "%", width: 22 + "rem" }}
                ></div>
            </div>
        </div>
    );
};

export default UserCard;
