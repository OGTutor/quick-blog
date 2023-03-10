import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/ui/userCard";
import TextField from "../components/common/form/textField";
import { createArticle } from "../store/articles";
import { validator } from "../utils/validator";
import { getCurrentUserId } from "../store/users";
import FileUpload from "../components/common/form/fileUpload";
import FileList from "../components/common/form/fileList";
import TextAreaField from "../components/common/form/textAreaField";
import { updateDataArticle } from "../utils/helpers";

const AddArticle = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getCurrentUserId());
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
    const handleRemoveFile = () => {
        setData((prevState) => ({ ...prevState, cover: "" }));
    };

    const validatorConfig = {
        title: {
            isRequired: { message: "Title is required!" },
            min: {
                message: "Title must contain at least 3 characters!",
                value: 3
            },
            max: {
                message: "The title can contain a maximum of 15 characters!",
                value: 15
            }
        },
        content: {
            isRequired: { message: "Content cannot be empty!" },
            min: {
                message: "Content must contain at least 50 characters!",
                value: 50
            },
            max: {
                message: "Content can contain a maximum of 1000 characters!",
                value: 1000
            }
        },
        cover: {
            isRequired: { message: "Cover is required!" }
        },
        description: {
            max: {
                message: "Description can contain a maximum of 40 characters!",
                value: 40
            }
        },
        themes: {
            isRequired: { message: "Themes is required!" },
            min: {
                message: "Themes must contain at least 3 characters!",
                value: 3
            },
            max: {
                message: "Themes can contain a maximum of 20 characters!",
                value: 40
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        const updatedData = updateDataArticle(data);
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
            <div className="position-relative ms-adding-article mt-5">
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
                                    <div className="mb-3">
                                        <TextField
                                            label="Title of article"
                                            name="title"
                                            value={data.title}
                                            onChange={handleChange}
                                            error={errors.title}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            label="Description of article (Optional)"
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            error={errors.description}
                                        />
                                    </div>
                                    <TextAreaField
                                        label="Content of article"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />
                                    <div className="mb-3">
                                        <TextField
                                            label="Themes of article (Specify with a comma)"
                                            name="themes"
                                            value={data.themes}
                                            onChange={handleChange}
                                            error={errors.themes}
                                        />
                                    </div>
                                    <p className="title text-white">
                                        Upload cover for your article
                                    </p>
                                    <FileUpload
                                        name="cover"
                                        onChange={handleChange}
                                        error={errors.cover}
                                    />
                                    <FileList
                                        file={data.cover}
                                        removeFile={handleRemoveFile}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!isValid}
                                        className="btn btn-primary mb-3"
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
