import React, { useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddReplyForm = ({ onSubmit, hideForm }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: [target.value]
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        onSubmit(data);
        clearForm();
        hideForm(false);
    };

    const validatorConfig = {
        content: {
            isRequired: { message: "Message cannot be empty" }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData({});
        setErrors({});
    };

    return (
        <>
            <div className="ms-reply me-reply mt-1">
                <h5 className="text-white">Add reply</h5>
                <form onSubmit={handleSubmit}>
                    <TextAreaField
                        label="Message"
                        name="content"
                        value={data.content || ""}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-primary mb-3">
                            Publish
                        </button>
                        <button
                            className="btn btn-outline-danger mb-3 ms-2"
                            onClick={() => hideForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

AddReplyForm.propTypes = {
    onSubmit: PropTypes.func,
    hideForm: PropTypes.func
};

export default AddReplyForm;
