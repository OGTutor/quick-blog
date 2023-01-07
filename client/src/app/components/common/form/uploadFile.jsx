import React from "react";
import PropTypes from "prop-types";

const UploadFile = ({ name, onChange, error }) => {
    const handleChange = ({ target }) => {
        const cover = new FormData();
        cover.append("cover", target.files[0]);

        onChange({ name: [target.name], value: cover.get("cover") });
    };

    return (
        <>
            <input type="file" name={name} onChange={handleChange} />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

UploadFile.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

export default UploadFile;
