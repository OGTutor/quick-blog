import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeletonAllArticles = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="mb-3 mt-3" style={{ width: "70rem" }}>
                    <Skeleton width={1118} height={1118} />
                    <div className="card-body">
                        <Skeleton width={180} height={24} />
                        <Skeleton width={70} height={24} />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <Skeleton width={90} height={35} />
                        <Skeleton width={70} height={40} />
                    </div>
                    <p className="card-text d-flex flex-row">
                        <div className="pt-2 pe-2">
                            <Skeleton width={60} height={15} />
                        </div>
                        <div className="p-1">
                            <Skeleton circle width={5} height={5} />
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
                        <div className="p-2">
                            <Skeleton width={45} height={13} />
                        </div>
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 mt-3" style={{ width: "70rem" }}>
                    <Skeleton width={1118} height={1118} />
                    <div className="card-body">
                        <Skeleton width={180} height={24} />
                        <Skeleton width={70} height={24} />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <Skeleton width={90} height={35} />
                        <Skeleton width={70} height={40} />
                    </div>
                    <p className="card-text d-flex flex-row">
                        <div className="pt-2 pe-2">
                            <Skeleton width={60} height={15} />
                        </div>
                        <div className="p-1">
                            <Skeleton circle width={5} height={5} />
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
                        <div className="p-2">
                            <Skeleton width={45} height={13} />
                        </div>
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 mt-3" style={{ width: "70rem" }}>
                    <Skeleton width={1118} height={1118} />
                    <div className="card-body">
                        <Skeleton width={180} height={24} />
                        <Skeleton width={70} height={24} />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <Skeleton width={90} height={35} />
                        <Skeleton width={70} height={40} />
                    </div>
                    <p className="card-text d-flex flex-row">
                        <div className="pt-2 pe-2">
                            <Skeleton width={60} height={15} />
                        </div>
                        <div className="p-1">
                            <Skeleton circle width={5} height={5} />
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
                        <div className="p-2">
                            <Skeleton width={45} height={13} />
                        </div>
                    </p>
                </div>
            </div>
        </>
    );
};

export default CardSkeletonAllArticles;
