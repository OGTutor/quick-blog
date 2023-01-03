import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData, updateUser } from "../../../store/users";
import UserCard from "../../ui/userCard";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        dispatch(updateUser({ payload: { ...data }, navigate }));
    };

    useEffect(() => {
        if (currentUser && !data) {
            setData({ ...currentUser });
        }
    }, [currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);
    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required!" },
            isEmail: { message: "Email entered incorrectly!" }
        },
        name: {
            isRequired: { message: "Name is required!" }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <UserCard />
            <div className="position-relative ms-profile mt-5">
                <div className="container text-center">
                    <div className="row">
                        {!isLoading ? (
                            <>
                                <div className="col-8">
                                    <h2 className="text-white">Profile</h2>
                                    <div className="mt-5">
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                name="name"
                                                value={data.name}
                                                onChange={handleChange}
                                                error={errors.name}
                                            />
                                            <TextField
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                error={errors.email}
                                            />
                                            <TextField
                                                label="Type of your blog"
                                                name="typeOfBlog"
                                                value={data.typeOfBlog}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label="Biography"
                                                name="biography"
                                                value={data.biography}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label="Instagram"
                                                name="instagram"
                                                value={data.instagram}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label="Pinterest"
                                                name="pinterest"
                                                value={data.pinterest}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label="GitHub"
                                                name="github"
                                                value={data.github}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="submit"
                                                disabled={!isValid}
                                                className="btn btn-primary"
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-4 mt-6">
                                    <img
                                        src={data.image}
                                        className="rounded-circle border border-white bg-dark mt-5"
                                        width="150px"
                                        height="150px"
                                        alt="avatar"
                                    />
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
        </>
    );
};

export default Profile;
