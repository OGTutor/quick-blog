import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { updateComment } from "../../../store/comments";

const LikeButtonComment = ({ commentsLoading, currentComment }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [likedUser, setLikedUser] = useState(false);
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        if (!commentsLoading && currentComment && !data) {
            setData(JSON.parse(JSON.stringify(currentComment)));
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
    }, [currentUserId, commentsLoading, currentComment, data, likedUser]);

    const toggleLikeComment = () => {
        if (likedUser) {
            setLikedUser(false);
            const likedUsers = data.likedUsers.filter((id) => {
                return id !== currentUserId;
            });
            const updatedData = {
                ...data,
                likes: likedUsers.length,
                likedUsers
            };
            setData((prevState) => ({
                ...prevState,
                ...updatedData
            }));
            dispatch(
                updateComment({
                    payload: updatedData,
                    commentId: currentComment._id
                })
            );
        } else {
            setLikedUser(true);
            data.likedUsers.push(currentUserId);
            dispatch(
                updateComment({
                    payload: { ...data, likes: data.likedUsers.length },
                    commentId: currentComment._id
                })
            );
        }
    };

    if (!commentsLoading && currentComment && data) {
        return (
            <button
                className="btn btn-outline-danger"
                onClick={toggleLikeComment}
            >
                <i className={`bi bi-heart${likedUser ? "-fill" : ""}`}>
                    {` ${data.likedUsers.length}`}
                </i>
            </button>
        );
    }
};

LikeButtonComment.propTypes = {
    commentsLoading: PropTypes.bool,
    currentComment: PropTypes.object
};

export default LikeButtonComment;
