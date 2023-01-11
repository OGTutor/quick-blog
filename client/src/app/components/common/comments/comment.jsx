import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";
import config from "../../../config.json";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(userId));

    return (
        <div className="bg-dark card-body mb-1 mt-1">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={
                                user.avatar.name
                                    ? user.avatar.name
                                    : `${config.pathToCover}${user.avatar.path}`
                            }
                            className="rounded-circle me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="text-white mb-1 mt-1">
                                        {user && `${user.name} `}
                                        <span className="small">
                                            - {displayDate(created)}
                                        </span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0 text-white">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
