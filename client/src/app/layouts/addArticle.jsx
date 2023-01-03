import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserCard from "../components/ui/userCard";
import TextField from "../components/common/form/textField";

const AddArticle = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        content: "",
        themes: "",
        cover: "",
        userId: ""
    });
    const [errors, setErrors] = useState({});

    return (
        <>
            <UserCard />
            <div className="position-relative ms-profile mt-5">
                <div className="container text-center">
                    <div className="row">
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
                                        Publish
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddArticle;
