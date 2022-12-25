import React from "react";
import NavBar from "../components/ui/navBar";
import UserCard from "../components/ui/userCard";

const Home = () => {
    return (
        <>
            <div className="position-absolute top-0 start-0">
                <UserCard />;
            </div>
        </>
    );
};

export default Home;
