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
import config from "../config.json";
import { getCurrentUserId } from "../store/users";
import TextField from "../components/common/form/textField";
import FileUpload from "../components/common/form/fileUpload";
import FileList from "../components/common/form/fileList";
import TextAreaField from "../components/common/form/textAreaField";

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

    const handleRemoveFile = () => {
        setData((prevState) => ({
            ...prevState,
            cover: ""
        }));
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: [target.value]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append("title", data.title);
        updatedData.append("description", data.description);
        updatedData.append("content", data.content);
        updatedData.append("themes", data.themes);
        updatedData.append("cover", data.cover);
        updatedData.append("likes", data.likes);
        updatedData.append("likedUsers", data.likedUsers);
        dispatch(
            updateArticle({ payload: updatedData, articleId: id, navigate })
        );
    };

    const isValid = Object.keys(errors).length === 0;

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
                                <div className="mb-2">
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
                                    <TextField
                                        label="Title of article"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        error={errors.title}
                                    />
                                    <TextField
                                        label="Themes of article"
                                        name="themes"
                                        value={data.themes}
                                        onChange={handleChange}
                                        error={errors.themes}
                                    />
                                    <TextField
                                        label="Description of article"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        error={errors.description}
                                    />
                                    <img
                                        src={`${config.pathToCover}${currentArticle.cover.path}`}
                                        className="card-img-bottom"
                                        alt="cover"
                                    />
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
