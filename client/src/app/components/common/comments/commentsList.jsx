import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import Replies from "../../ui/replies";

const CommentsList = ({ comments, onRemove, commentsLoading }) => {
    if (comments) {
        return comments.map((comment) => (
            <>
                <Comment
                    key={comment._id}
                    comment={comment}
                    onRemove={onRemove}
                    commentsLoading={commentsLoading}
                />
                <Replies commentId={comment._id} />
            </>
        ));
    }
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func,
    commentsLoading: PropTypes.bool
};

export default CommentsList;
