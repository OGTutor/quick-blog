import React from "react";

const UserCard = () => {
    return (
        <div className="position-absolute top-0 start-0">
            <div className="container-lt text-center">
                <div
                    className="card bg-secondary bg-dark"
                    style={{ width: 18 + "rem" }}
                >
                    <img
                        src="/images/fff.jpeg"
                        className="card-img-top"
                        width="150"
                        height="150"
                        alt="bg"
                    />
                    <div className="position-relative">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="position-absolute top-0 start-50 translate-middle rounded-circle border border-white bg-dark"
                            width="75"
                            height="75"
                            alt="avatar"
                        />
                    </div>
                    <div className="card-body d-flex flex-column align-items-center text-center position-relative">
                        <h5 className="card-title text-white mt-4">Name</h5>
                        <p className="card-text font-monospace text-white-50">
                            Name of blog
                        </p>
                    </div>
                    <div className="position-relative">
                        <a href="https://www.instagram.com/">
                            <img
                                src="/images/instagram.png"
                                className="rounded rounded-circle me-1"
                                width="30"
                                height="30"
                                alt="social"
                            />
                        </a>
                        <a href="https://www.pinterest.com/">
                            <img
                                src="/images/pinterest.png"
                                className="rounded float rounded-circle me-1"
                                width="30"
                                height="30"
                                alt="social"
                            />
                        </a>
                        <a href="https://github.com/">
                            <img
                                src="/images/github.png"
                                className="rounded float rounded-circle me-1"
                                width="30"
                                height="30"
                                alt="social"
                            />
                        </a>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center text-center position-relative mt-3 border border-secondary border-2 rounded m-3">
                        <p className="card-text fw-light text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nemo, accusamus ipsa! Facilis tempora
                            asperiores nobis inventore voluptatibus ipsa veniam
                            magnam impedit veritatis nulla, sit quis labore
                            reiciendis, ea quia officiis?
                        </p>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                        <button
                            type="button"
                            className="btn btn-danger me-md-1"
                        >
                            My articles
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary me-md-3"
                        >
                            Write an article
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
