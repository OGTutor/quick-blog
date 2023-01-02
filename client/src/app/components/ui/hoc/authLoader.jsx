import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../../store/users";

const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersLoading = useSelector(getUsersLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    if (usersLoading) return "Loading...";

    return children;
};

AuthLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthLoader;
