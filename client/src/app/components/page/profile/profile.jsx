import React from "react";
import UserCard from "../../ui/userCard";

const Profile = () => {
    return (
        <>
            <UserCard />
            <div className="position-relative ms-profile mt-6">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-8">
                            <h2 className="text-white">Profile</h2>
                            <div className="mt-5">
                                <form>
                                    <div className="mb-4">
                                        <input
                                            type="name"
                                            className="form-control bg-dark text-white"
                                            value="Name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            className="form-control bg-dark text-white"
                                            value="Email address"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="newPassword"
                                            className="form-control bg-secondary text-white"
                                            placeholder="New Password"
                                            value=""
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="confirmPassword"
                                            className="form-control bg-secondary text-white"
                                            placeholder="Confirm Password"
                                            value=""
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-4 mt-5">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle border border-white bg-dark mt-5"
                                width="150px"
                                height="150px"
                                alt="avatar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
