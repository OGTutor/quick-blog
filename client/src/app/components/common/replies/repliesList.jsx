import React from "react";
import PropTypes from "prop-types";
import Reply from "./reply";

const RepliesList = ({ replies, onRemove, repliesLoading }) => {
    if (!repliesLoading) {
        return replies.map((reply) => (
            <>
                <Reply
                    key={reply._id}
                    reply={reply}
                    onRemove={onRemove}
                    repliesLoading={repliesLoading}
                />
            </>
        ));
    }
};

RepliesList.propTypes = {
    replies: PropTypes.array,
    onRemove: PropTypes.func,
    repliesLoading: PropTypes.bool
};

export default RepliesList;
