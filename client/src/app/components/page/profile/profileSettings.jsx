import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData, updateUser } from "../../../store/users";
import UserCard from "../../ui/userCard";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import config from "../../../config.json";
import FileUpload from "../../common/form/fileUpload";
import FileList from "../../common/form/fileList";
import TextAreaField from "../../common/form/textAreaField";
import { updateDataUser } from "../../../utils/helpers";

const ProfileSettings = () => {
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
        const updatedUser = updateDataUser(data);
        dispatch(updateUser({ payload: updatedUser, navigate }));
    };

    const handleRemoveFile = () => {
        setData((prevState) => ({
            ...prevState,
            avatar: ""
        }));
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
            isRequired: { message: "Name is required!" },
            min: {
                message: "Name must contain at least 3 characters!",
                value: 3
            },
            max: {
                message: "Name can contain a maximum of 15 characters!",
                value: 15
            }
        },
        typeOfBlog: {
            max: {
                message: "Type of blog can contain a maximum of 10 characters!",
                value: 10
            }
        },
        biography: {
            max: {
                message: "Biography can contain a maximum of 200 characters!",
                value: 200
            }
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
                                            <div className="mb-4">
                                                <TextField
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    error={errors.name}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    name="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    error={errors.email}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="Type of your blog"
                                                    name="typeOfBlog"
                                                    value={data.typeOfBlog}
                                                    onChange={handleChange}
                                                    error={errors.typeOfBlog}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextAreaField
                                                    label="Biography"
                                                    name="biography"
                                                    value={data.biography}
                                                    onChange={handleChange}
                                                    error={errors.biography}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="Instagram"
                                                    name="instagram"
                                                    value={data.instagram}
                                                    onChange={handleChange}
                                                    error={errors.instagram}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="Pinterest"
                                                    name="pinterest"
                                                    value={data.pinterest}
                                                    onChange={handleChange}
                                                    error={errors.pinterest}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="GitHub"
                                                    name="github"
                                                    value={data.github}
                                                    onChange={handleChange}
                                                    error={errors.github}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="Facebook"
                                                    name="facebook"
                                                    value={data.facebook}
                                                    onChange={handleChange}
                                                    error={errors.facebook}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextField
                                                    label="Twitter"
                                                    name="twitter"
                                                    value={data.twitter}
                                                    onChange={handleChange}
                                                    error={errors.twitter}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <FileUpload
                                                    name="avatar"
                                                    onChange={handleChange}
                                                    error={errors.avatar}
                                                />
                                                <FileList
                                                    file={data.avatar}
                                                    removeFile={
                                                        handleRemoveFile
                                                    }
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={!isValid}
                                                className="btn btn-primary mb-3"
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-4 mt-6">
                                    <img
                                        src={
                                            currentUser.avatar.name
                                                ? currentUser.avatar.name
                                                : `${config.pathToCover}${currentUser.avatar.path}`
                                        }
                                        className="rounded-circle border border-white bg-dark mt-5"
                                        width="250px"
                                        height="250px"
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

export default ProfileSettings;
