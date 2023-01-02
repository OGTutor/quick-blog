import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validator } from "../../utils/validator";
import { signUp } from "../../store/users";
import UserCard from "./userCard";
import TextField from "../common/form/textField";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        typeOfBlog: "",
        biography: "",
        instagram: "",
        pinterest: "",
        github: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" },
            isEmail: { message: "Email entered incorrectly!" }
        },
        name: {
            isRequired: { message: "Name is required!" },
            min: {
                message: "Name must contain at least 3 characters!",
                value: 3
            }
        },
        password: {
            isRequired: { message: "Password is required!" },
            isCapitalSymbol: {
                message:
                    "The password must contain at least one capital letter!"
            },
            isContainDigit: {
                message: "The password must contain at least one number!"
            },
            min: {
                message: "The password must contain at least 8 characters!",
                value: 8
            }
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
        dispatch(signUp({ payload: data, navigate }));
    };

    return (
        <>
            <UserCard />
            <div className="position-relative ms-6">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <div
                        className="ms-login mt-register"
                        style={{ width: "60rem" }}
                    >
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-8">
                                    {!isLoading ? (
                                        <>
                                            <h2 className="text-white">
                                                Register
                                            </h2>
                                            <div className="mt-5">
                                                <form onSubmit={handleSubmit}>
                                                    <TextField
                                                        label="Name"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={handleChange}
                                                        error={errors.name}
                                                    />
                                                    <TextField
                                                        label="Email"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={handleChange}
                                                        error={errors.email}
                                                    />
                                                    <TextField
                                                        label="Password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        onChange={handleChange}
                                                        error={errors.password}
                                                    />
                                                    <TextField
                                                        label="Type of your blog (Optional)"
                                                        name="typeOfBlog"
                                                        value={data.typeOfBlog}
                                                        onChange={handleChange}
                                                    />
                                                    <TextField
                                                        label="Instagram (Optional)"
                                                        name="instagram"
                                                        value={data.instagram}
                                                        onChange={handleChange}
                                                    />
                                                    <TextField
                                                        label="Pinterest (Optional)"
                                                        name="pinterest"
                                                        value={data.pinterest}
                                                        onChange={handleChange}
                                                    />
                                                    <TextField
                                                        label="Github (Optional)"
                                                        name="github"
                                                        value={data.github}
                                                        onChange={handleChange}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={!isValid}
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
                                        </>
                                    ) : (
                                        <div className="container mt-5">
                                            <div className="row">
                                                <div className="col-md-6 offset-md-3 shadow p-4">
                                                    <h1>Loading...</h1>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
