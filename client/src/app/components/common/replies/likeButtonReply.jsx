import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { updateReply } from "../../../store/replies";

const LikeButtonReply = ({ repliesLoading, currentReply }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [likedUser, setLikedUser] = useState(false);
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        if (!repliesLoading && currentReply && !data) {
            setData(JSON.parse(JSON.stringify(currentReply)));
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
    }, [currentUserId, repliesLoading, currentReply, data, likedUser]);

    const toggleLikeReply = () => {
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
                updateReply({
                    payload: updatedData,
                    replyId: currentReply._id
                })
            );
        } else {
            setLikedUser(true);
            data.likedUsers.push(currentUserId);
            dispatch(
                updateReply({
                    payload: { ...data, likes: data.likedUsers.length },
                    replyId: currentReply._id
                })
            );
        }
    };

    if (!repliesLoading && currentReply && data) {
        return (
            <button
                className="btn btn-outline-danger"
                onClick={toggleLikeReply}
            >
                <i className={`bi bi-heart${likedUser ? "-fill" : ""}`}>
                    {` ${data.likedUsers.length}`}
                </i>
            </button>
        );
    }
};

LikeButtonReply.propTypes = {
    repliesLoading: PropTypes.bool,
    currentReply: PropTypes.object
};

export default LikeButtonReply;
