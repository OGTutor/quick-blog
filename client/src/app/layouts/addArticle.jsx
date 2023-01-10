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
            }
        },
        content: {
            isRequired: { message: "Content cannot be empty" },
            min: {
                message: "Content must contain at least 50 characters!",
                value: 50
            }
        },
        cover: {
            isRequired: { message: "Content cannot be empty" }
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
                                    <TextField
                                        label="Title of article"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        error={errors.title}
                                    />
                                    <TextField
                                        label="Description of article (Optional)"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                    />
                                    <TextAreaField
                                        label="Content of article"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />
                                    <TextField
                                        label="Themes of article (Specify with a comma)"
                                        name="themes"
                                        value={data.themes}
                                        onChange={handleChange}
                                    />
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
