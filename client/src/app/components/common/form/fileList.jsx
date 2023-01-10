import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./fileList.scss";

const FileList = ({ file, removeFile }) => {
    return (
        <p className="file-list">
            {file && (
                <p className="list-item">
                    <FontAwesomeIcon icon={faFileAlt} />
                    {file.name ? (
                        <p className="info">{file.name}</p>
                    ) : (
                        <p className="info">{file.originalname}</p>
                    )}
                    <div className="actions">
                        <FontAwesomeIcon icon={faTrash} onClick={removeFile} />
                    </div>
                </p>
            )}
        </p>
    );
};

FileList.propTypes = {
    file: PropTypes.object.isRequired,
    removeFile: PropTypes.func.isRequired
};

export default FileList;
