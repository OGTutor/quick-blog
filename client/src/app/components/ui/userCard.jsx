import React from "react";

const UserCard = () => {
    return (
        <div className="container-lt">
            <div className="card bg-secondary" style={{ width: 18 + "rem" }}>
                <img
                    src="/images/fff.jpeg"
                    className="card-img-top"
                    width="150"
                    height="150"
                    alt="bg"
                />
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    className="card-img rounded-circle shadow"
                    width="50"
                    height="50"
                    alt="avatar"
                />
                <div className="card-body d-flex flex-column align-items-center text-center position-relative">
                    <h5 className="card-title">Name</h5>
                    <p className="card-text font-monospace">Name of blog</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
                <div className="card-body d-flex flex-column align-items-center text-center position-relative">
                    <p className="card-text fw-light">Biography</p>
                </div>
                <div className="card-body">
                    <a href="#" className="card-link">
                        Card link
                    </a>
                    <a href="#" className="card-link">
                        Another link
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
