import React, { useEffect, useState } from "react";
import UserCard from "../components/ui/userCard";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticlesLoadingStatus,
    loadArticleById,
    loadArticlesList,
    updateArticle
} from "../store/articles";
import { validator } from "../utils/validator";
import config from "../config.json";
import { getCurrentUserId } from "../store/users";
import TextField from "../components/common/form/textField";
import FileUpload from "../components/common/form/fileUpload";
import FileList from "../components/common/form/fileList";
import TextAreaField from "../components/common/form/textAreaField";
import { updateDataArticle } from "../utils/helpers";

const EditArticle = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const articlesLoading = useSelector(getArticlesLoadingStatus());
    const currentArticle = useSelector(loadArticleById(id));
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(loadArticlesList());
    }, [id]);
    useEffect(() => {
        if (!articlesLoading && currentArticle && !data) {
            setData((prevState) => ({ ...prevState, ...currentArticle }));
        }
        if (data && Array.isArray(data.cover)) {
            setData((prevState) => ({
                ...prevState,
                cover: prevState.cover[0]
            }));
        }
    }, [articlesLoading, currentArticle, data]);
    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

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

    const handleRemoveFile = () => {
        setData((prevState) => ({
            ...prevState,
            cover: ""
        }));
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
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
            updateArticle({ payload: updatedData, articleId: id, navigate })
        );
    };

    if (!isLoading) {
        return (
            <>
                <UserCard />
                <div className="position-relative ms-6">
                    <div className="position-absolute top-0 start-50 translate-middle-x">
                        <h3 className="mb-2 mt-2 text-white">Edit Article</h3>
                        <div
                            className="card mb-3 mt-3 bg-dark"
                            style={{ width: "70rem" }}
                        >
                            <div className="card-body">
                                <div className="mb-3">
                                    <NavLink
                                        to={`/articles/user/${currentUserId}`}
                                        className="card-link text-secondary text-decoration-none"
                                    >
                                        come back
                                    </NavLink>
                                </div>
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
                                            label="Themes of article"
                                            name="themes"
                                            value={data.themes}
                                            onChange={handleChange}
                                            error={errors.themes}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            label="Description of article"
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            error={errors.description}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <img
                                            src={`${config.pathToCover}${currentArticle.cover.path}`}
                                            className="card-img-bottom"
                                            alt="cover"
                                        />
                                    </div>
                                    <FileUpload
                                        name="cover"
                                        onChange={handleChange}
                                        error={errors.cover}
                                    />
                                    <FileList
                                        file={data.cover}
                                        removeFile={handleRemoveFile}
                                    />
                                    <TextAreaField
                                        label="Content of article"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            className="btn btn-primary"
                                        >
                                            Refresh
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default EditArticle;
