import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId, getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const { id } = useParams();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    const currentUserId = useSelector(getCurrentUserId());
    if (currentUserId !== id && children.type.name === "Profile") {
        return (
            <Navigate
                to={`/profile/user/${currentUserId}`}
                state={{ from: location }}
            />
        );
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
