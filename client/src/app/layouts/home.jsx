import React from "react";
import UserCard from "../components/ui/userCard";
import RandomArticles from "../components/common/articles/randomArticles";
import AllArticles from "../components/common/articles/allArticles";

const Home = () => {
    return (
        <>
            <UserCard />
            <div className="position-relative ms-6">
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <RandomArticles />
                    <AllArticles />
                </div>
            </div>
        </>
    );
};

export default Home;
