import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove, commentsLoading }) => {
    return comments.map((comment) => (
        <>
            <Comment
                key={comment._id}
                comment={comment}
                onRemove={onRemove}
                commentsLoading={commentsLoading}
            />
        </>
    ));
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func,
    commentsLoading: PropTypes.bool
};

export default CommentsList;
