import React, { useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faPinterest
} from "@fortawesome/free-brands-svg-icons";
import config from "../../config.json";
import TextField from "./form/textField";

const Modal = ({ active, setActive, article }) => {
    const postUri = encodeURI(document.location.href);
    const inputEl = useRef(null);

    const handleCopyValue = () => {
        inputEl.current.select();
        navigator.clipboard.writeText(inputEl.current.value);
    };
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? "modal__content active" : "modal__content"}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="position-relative">
                    <button
                        className="btn btn-sm text-white position-absolute top-0 end-0"
                        onClick={() => setActive(false)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="d-flex justify-content-center p-5">
                    <a
                        href={`https://www.facebook.com/sharer.php?u=${postUri}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="facebook-btn"
                        />
                    </a>
                    <a
                        href={`https://twitter.com/share?url=${postUri}&text=${article.title}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon
                            icon={faTwitter}
                            className="twitter-btn"
                        />
                    </a>
                    <a
                        href={`https://pinterest.com/pin/create/bookmarklet/?media=${config.pathToCover}${article.cover.path}&url=${postUri}&description=${article.title}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon
                            icon={faPinterest}
                            className="pinterest-btn"
                        />
                    </a>
                </div>
                <div className="position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle pb-4">
                        <TextField
                            value={postUri}
                            reference={inputEl}
                            handleCopyValue={handleCopyValue}
                            name="postUri"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    article: PropTypes.object
};

export default Modal;
