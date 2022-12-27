import React from "react";
import RandomArticles from "../components/common/articles/randomArticles";
import UserCard from "../components/ui/userCard";

const Home = () => {
    return (
        <>
            <UserCard />
            <RandomArticles />
        </>
    );
};

export default Home;
