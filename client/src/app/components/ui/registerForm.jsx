import React from "react";
import { NavLink } from "react-router-dom";
import UserCard from "./userCard";

const RegisterForm = () => {
    return (
        <>
            <UserCard />
            <div className="position-relative ms-6">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <div className="ms-login mt-6" style={{ width: "60rem" }}>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-8">
                                    <h2 className="text-white">Register</h2>
                                    <div className="mt-5">
                                        <form>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    className="form-control bg-secondary text-white"
                                                    placeholder="Email"
                                                    value=""
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="name"
                                                    className="form-control bg-secondary text-white"
                                                    placeholder="Name"
                                                    value=""
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control bg-secondary text-white"
                                                    placeholder="Password"
                                                    value=""
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                            <div className="mt-3">
                                                <NavLink
                                                    to="/login"
                                                    className="card-link text-white text-decoration-none"
                                                >
                                                    Login
                                                </NavLink>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
