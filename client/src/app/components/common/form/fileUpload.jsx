import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./fileUpload.scss";

const FileUpload = ({ name, onChange, error }) => {
    const [drag, setDrag] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name, value: target.files[0] });
    };

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    };
    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    };
    const onDropHandler = (e) => {
        e.preventDefault();
        onChange({ name, value: e.dataTransfer.files[0] });
        setDrag(false);
    };

    return (
        <>
            <div
                className="drop-area"
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
            >
                <div className="file-card">
                    <div className="file-inputs">
                        <input
                            type="file"
                            name={name}
                            onChange={handleChange}
                        />
                        <button>
                            <i>
                                <FontAwesomeIcon icon={faPlus} />
                            </i>
                            Upload
                        </button>
                    </div>
                    {drag ? (
                        <p className="main">Drop image to upload</p>
                    ) : (
                        <p className="main">Drag and drop image to upload</p>
                    )}

                    <p className="main">Support files</p>
                    <p className="info">PNG, JPEG, JPG</p>
                </div>
            </div>

            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

FileUpload.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

export default FileUpload;
