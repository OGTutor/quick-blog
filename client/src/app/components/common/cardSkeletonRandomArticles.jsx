import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeletonRandomArticles = () => {
    return (
        <>
            <div
                className="container text-center mt-4"
                style={{ width: "72rem" }}
            >
                <div className="row">
                    <div className="col m-1">
                        <Skeleton width={350} height={400} />
                        <div className="card-body fw-bold">
                            <Skeleton width={300} height={24} />
                            <Skeleton width={150} height={24} />
                        </div>
                    </div>
                    <div className="col m-1">
                        <Skeleton width={350} height={400} />
                        <div className="card-body fw-bold">
                            <Skeleton width={300} height={24} />
                            <Skeleton width={150} height={24} />
                        </div>
                    </div>
                    <div className="col m-1">
                        <Skeleton width={350} height={400} />
                        <div className="card-body fw-bold">
                            <Skeleton width={300} height={24} />
                            <Skeleton width={150} height={24} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardSkeletonRandomArticles;
