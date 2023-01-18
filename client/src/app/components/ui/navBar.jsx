import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn } from "../../store/users";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());

    return (
        <>
            <nav className="navbar navbar-dark bg-black shadow">
                <div className="container-fluid justify-content-center">
                    <a className="navbar-brand ms-6" href="/">
                        Quick Blog
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        tabIndex="-1"
                        id="offcanvasDarkNavbar"
                        aria-labelledby="offcanvasDarkNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5
                                className="offcanvas-title"
                                id="offcanvasDarkNavbarLabel"
                            >
                                Quick Blog
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                </li>
                                {isLoggedIn && currentUser ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to={`/articles/user/${currentUser._id}`}
                                            >
                                                My articles
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to={`/add/article`}
                                            >
                                                Write an article
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link"
                                                to={`/profile/user/${currentUser._id}`}
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link text-danger"
                                                to="/logout"
                                            >
                                                Log out
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
