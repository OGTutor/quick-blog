import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return (
            "bg-secondary text-dark form-control" + (error ? " is-invalid" : "")
        );
    };

    return (
        <div className="mb-4">
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    placeholder={label}
                    maxLength={name === "content" ? "1000" : "200"}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
