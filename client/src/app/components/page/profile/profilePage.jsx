import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getCurrentUserData,
    getIsLoggedIn,
    getUserById
} from "../../../store/users";
import config from "../../../config.json";

const ProfilePage = () => {
    const { id } = useParams();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const user = useSelector(getUserById(id));

    const navigate = useNavigate();

    const handleGoToUserArticles = () => {
        navigate(`/articles/user/${currentUser._id}`);
    };
    const handleGoToAddNewArticle = () => {
        navigate(`/add/article`);
    };
    const handleGoToSettingsProfile = () => {
        navigate(`/profile/settings/user/${currentUser._id}`);
    };

    if (currentUser && isLoggedIn && user) {
        return (
            <>
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
                <div className="position-relative ms-6">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <div
                            className="card mb-3 mt-3 bg-dark"
                            style={{ width: "70rem" }}
                        >
                            <div className="card-body">
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
                                            user.avatar.name
                                                ? user.avatar.name
                                                : `${config.pathToCover}${user.avatar.path}`
                                        }
                                        className="position-absolute top-0 start-50 translate-middle rounded-circle border border-white bg-dark"
                                        width="150"
                                        height="150"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="card-body d-flex flex-column align-items-center text-center position-relative mt-4">
                                    <h5 className="card-title text-white mt-5">
                                        {user.name}
                                    </h5>
                                    <p className="card-text font-monospace text-white-50 mt-2 mb-2">
                                        {user.typeOfBlog}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {user.instagram && (
                                        <a
                                            href={user.instagram}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                src="/images/instagram.png"
                                                className="rounded rounded-circle me-1"
                                                width="50"
                                                height="50"
                                                alt="instagram"
                                            />
                                        </a>
                                    )}
                                    {user.pinterest && (
                                        <a
                                            href={user.pinterest}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                src="/images/pinterest.png"
                                                className="rounded float rounded-circle me-1"
                                                width="50"
                                                height="50"
                                                alt="pinterest"
                                            />
                                        </a>
                                    )}
                                    {user.github && (
                                        <a
                                            href={user.github}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                src="/images/github.png"
                                                className="rounded float rounded-circle me-1"
                                                width="50"
                                                height="50"
                                                alt="github"
                                            />
                                        </a>
                                    )}
                                    {user.facebook && (
                                        <a
                                            href={user.facebook}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                src="/images/facebook.png"
                                                className="rounded float rounded-circle me-1"
                                                width="50"
                                                height="50"
                                                alt="facebook"
                                            />
                                        </a>
                                    )}
                                    {user.twitter && (
                                        <a
                                            href={user.twitter}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                src="/images/twitter.png"
                                                className="rounded float rounded-circle me-1"
                                                width="50"
                                                height="50"
                                                alt="twitter"
                                            />
                                        </a>
                                    )}
                                </div>
                                <hr className="mb-3" />
                                {user.biography ? (
                                    <div className="card-body d-flex flex-column align-items-center text-center position-relative border border-secondary border-2 rounded me-3 ms-3 mb-5 mt-5">
                                        <p className="card-text fw-light text-white">
                                            {user.biography}
                                        </p>
                                    </div>
                                ) : (
                                    <hr className="mb-6" />
                                )}
                                <hr className="mb-5" />
                                <div className="d-grid gap-2 d-md-flex justify-content-center mb-5 me-2">
                                    {currentUser._id === id && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={handleGoToUserArticles}
                                            >
                                                My articles
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={
                                                    handleGoToAddNewArticle
                                                }
                                            >
                                                Write an article
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-warning"
                                                onClick={
                                                    handleGoToSettingsProfile
                                                }
                                            >
                                                Settings
                                            </button>
                                        </>
                                    )}
                                </div>
                                <hr className="mb-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default ProfilePage;
