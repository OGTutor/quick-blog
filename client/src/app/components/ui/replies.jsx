import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    createReply,
    getReplyById,
    getRepliesLoadingStatus,
    loadRepliesList,
    removeReply
} from "../../store/replies";
import RepliesList from "../common/replies/repliesList";
import AddReplyForm from "../common/replies/addReplyForm";

const Replies = ({ commentId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showRepliesList, setShowRepliesList] = useState(false);
    const repliesLoading = useSelector(getRepliesLoadingStatus());
    const replies = useSelector(getReplyById(commentId));
    const sortedReplies = orderBy(replies, ["created_at"], ["desc"]);

    useEffect(() => {
        dispatch(loadRepliesList(id));
    }, [id]);

    const handleSubmit = (data) => {
        let updatedData;
        if (Array.isArray(data.content)) {
            updatedData = {
                ...data,
                content: data.content[0],
                likes: 0,
                pageId: id
            };
        } else {
            updatedData = { ...data, likes: 0, pageId: id };
        }
        dispatch(createReply({ ...updatedData, commentId }));
    };
    const handleRemoveReply = (replyId) => {
        dispatch(removeReply(replyId));
    };
    const handleShowReplyForm = () => {
        setShowReplyForm(true);
    };
    const handleShowRepliesList = () => {
        setShowRepliesList((prevState) => !prevState);
    };

    return (
        <>
            <div className="d-flex justify-content-start ms-reply mb-3">
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleShowReplyForm}
                >
                    Reply
                </button>
            </div>
            {showReplyForm && (
                <AddReplyForm
                    onSubmit={handleSubmit}
                    hideForm={setShowReplyForm}
                />
            )}
            {sortedReplies.length > 0 && (
                <>
                    <div className="d-flex justify-content-start ms-reply mb-3">
                        <button
                            className="btn btn-outline-info btn-sm"
                            onClick={handleShowRepliesList}
                        >
                            <i
                                className={`bi bi-caret-${
                                    showRepliesList ? "up" : "down"
                                }-fill`}
                            >
                                {sortedReplies.length}
                            </i>
                        </button>
                    </div>
                    {showRepliesList ? (
                        <>
                            <RepliesList
                                replies={sortedReplies}
                                onRemove={handleRemoveReply}
                                repliesLoading={repliesLoading}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </>
            )}
        </>
    );
};

Replies.propTypes = {
    commentId: PropTypes.string
};

export default Replies;
