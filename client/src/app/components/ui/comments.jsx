import React, { useEffect } from "react";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const commentsLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    useEffect(() => {
        dispatch(loadCommentsList(id));
    }, [id]);

    const handleSubmit = (data) => {
        let updatedData;
        if (Array.isArray(data.content)) {
            updatedData = { ...data, content: data.content[0] };
        } else {
            updatedData = data;
        }
        dispatch(createComment({ ...updatedData, pageId: id }));
    };
    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId));
    };

    return (
        <>
            <AddCommentForm onSubmit={handleSubmit} />
            {sortedComments.length > 0 && (
                <>
                    <h2 className="text-white ms-3">Comments</h2>
                    <hr className="myHr" />
                    {!commentsLoading ? (
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    ) : (
                        "Loading..."
                    )}
                </>
            )}
        </>
    );
};

export default Comments;
