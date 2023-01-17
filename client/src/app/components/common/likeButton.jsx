import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../../store/articles";
import { getCurrentUserId, getIsLoggedIn } from "../../store/users";

const LikeButton = ({ articlesLoading, currentArticle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [likedUser, setLikedUser] = useState(false);
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        if (!articlesLoading && currentArticle && !data) {
            setData(JSON.parse(JSON.stringify(currentArticle)));
        }
        if (data && data.likedUsers.length > 0) {
            const expectedLikeFromUser =
                data.likedUsers.includes(currentUserId);
            if (expectedLikeFromUser) {
                setLikedUser(true);
            }
        } else {
            setLikedUser(false);
        }
    }, [currentUserId, articlesLoading, currentArticle, data, likedUser]);

    const toggleLikeArticle = () => {
        if (likedUser) {
            setLikedUser(false);
            const likedUsers = data.likedUsers.filter((id) => {
                return id !== currentUserId;
            });
            const updatedData = { ...data, likedUsers };
            setData((prevState) => ({
                ...prevState,
                ...updatedData
            }));
            dispatch(
                updateArticle({
                    payload: updatedData,
                    articleId: currentArticle._id
                })
            );
        } else {
            setLikedUser(true);
            data.likedUsers.push(currentUserId);
            dispatch(
                updateArticle({ payload: data, articleId: currentArticle._id })
            );
        }
    };

    if (!isLoggedIn) {
        return (
            <button
                className="btn btn-outline-danger"
                onClick={() => navigate("/login")}
            >
                <i className={"bi bi-heart-fill"}>
                    {` → ${data?.likedUsers.length}`}
                </i>
            </button>
        );
    }
    if (!articlesLoading && currentArticle && data) {
        return (
            <button
                className="btn btn-outline-danger"
                onClick={toggleLikeArticle}
            >
                <i className={`bi bi-heart${likedUser ? "-fill" : ""}`}>
                    {` → ${data.likedUsers.length}`}
                </i>
            </button>
        );
    }
};

LikeButton.propTypes = {
    articlesLoading: PropTypes.bool,
    currentArticle: PropTypes.object
};

export default LikeButton;
