import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeletonUserArticles = () => {
    return (
        <>
            <div className="position-relative ms-6 mt-5">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <h3 className="text-white mb-5">
                        You haven`t written an article yet
                    </h3>
                    <div className="row g-0" style={{ width: "70rem" }}>
                        <div className="col-md-4">
                            <Skeleton width={350} height={490} />
                        </div>
                        <div className="col-md-8 mt-1">
                            <div className="card-body">
                                <h4 className="card-title">
                                    <Skeleton width={200} height={29} />
                                </h4>
                                <p className="card-text">
                                    <Skeleton width={100} height={29} />
                                </p>
                                <div className="mb-2">
                                    <Skeleton width={650} height={200} />
                                </div>
                                <p className="card-text d-flex flex-row">
                                    <div className="pt-2 pe-2">
                                        <Skeleton width={45} height={13} />
                                    </div>
                                    <div className="p-2">
                                        <Skeleton width={45} height={13} />
                                    </div>
                                    <div className="p-2">
                                        <Skeleton width={45} height={13} />
                                    </div>
                                    <div className="p-2">
                                        <Skeleton width={45} height={13} />
                                    </div>
                                </p>
                                <div className="mb-3 d-flex justify-content-between">
                                    <Skeleton width={90} height={35} />
                                </div>
                                <div className="d-flex justify-content-start">
                                    <div className="me-3">
                                        <Skeleton width={70} height={40} />
                                    </div>
                                    <Skeleton width={70} height={40} />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardSkeletonUserArticles;
