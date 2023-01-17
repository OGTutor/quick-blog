import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signIn } from "../../store/users";
import { validator } from "../../utils/validator";
import UserCard from "./userCard";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" }
        },
        password: {
            isRequired: { message: "Password is required!" }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        let redirect;
        if (state === null) {
            redirect = "/";
        } else {
            redirect = state.from.pathname ? state.from.pathname : "/";
        }
        dispatch(signIn({ payload: data, navigate, redirect }));
    };

    return (
        <>
            <UserCard />
            <div className="position-relative ms-6">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <div className="ms-login mt-6" style={{ width: "60rem" }}>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-8">
                                    <h2 className="text-white">Login</h2>
                                    <div className="mt-5">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4 text-secondary">
                                                <TextField
                                                    label="Email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    error={errors.email}
                                                />
                                            </div>
                                            <div className="mb-4 text-secondary">
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={handleChange}
                                                    error={errors.password}
                                                />
                                            </div>
                                            {loginError && (
                                                <p className="text-danger">
                                                    {loginError}
                                                </p>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={!isValid}
                                                className="btn btn-primary"
                                            >
                                                Submit
                                            </button>
                                            <div className="mt-3">
                                                <NavLink
                                                    to="/register"
                                                    className="card-link text-white text-decoration-none"
                                                >
                                                    Register
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

export default LoginForm;
