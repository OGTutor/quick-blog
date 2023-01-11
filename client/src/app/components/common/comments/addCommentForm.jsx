import React, { useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
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
        console.log("data", data);
        onSubmit(data);
        clearForm();
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
            <div className="ms-3 me-3 mt-1">
                <h2 className="text-white">Add comment</h2>
                <form onSubmit={handleSubmit}>
                    <TextAreaField
                        label="Message"
                        name="content"
                        value={data.content || ""}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <div className="d-flex justify-content-start">
                        <button className="btn btn-outline-primary mb-3">
                            Publish
                        </button>
                    </div>
                </form>
            </div>
            <hr className="myHr" />
        </>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
