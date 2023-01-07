import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/ui/userCard";
import TextField from "../components/common/form/textField";
import { createArticle } from "../store/articles";
import { validator } from "../utils/validator";
import { getCurrentUserId } from "../store/users";
import UploadFile from "../components/common/form/uploadFile";

const AddArticle = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId());
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        content: "",
        themes: "",
        cover: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: { message: "Message cannot be empty" }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;

        const updatedData = new FormData();
        updatedData.append("title", data.title);
        updatedData.append("description", data.description);
        updatedData.append("content", data.content);
        updatedData.append("themes", data.themes);
        updatedData.append("cover", data.cover);

        dispatch(
            createArticle({
                payload: updatedData,
                navigate,
                redirect: userId
            })
        );
    };

    return (
        <>
            <UserCard />
            <div className="position-relative ms-profile mt-5">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-8">
                            <h2 className="text-white">Write a new article</h2>
                            <div className="mt-5">
                                <form
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                    action=""
                                    method="post"
                                >
                                    <TextField
                                        label="Title of article"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        error={errors.title}
                                    />
                                    <TextField
                                        label="Description of article"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        error={errors.description}
                                    />
                                    <TextField
                                        label="Content of article"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />
                                    <TextField
                                        label="Themes of article"
                                        name="themes"
                                        value={data.themes}
                                        onChange={handleChange}
                                        error={errors.themes}
                                    />
                                    <UploadFile
                                        name="cover"
                                        onChange={handleChange}
                                        error={errors.cover}
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
