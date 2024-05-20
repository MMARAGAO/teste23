import React from "react";
import TablePort from "../components/TablePort";
import ButtonTheme from "../components/ButtonTheme";
import Header from "../components/Header";



const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen w-full ">
            <Header />
            <div className="2xl:px-20">
                <TablePort />
                <ButtonTheme />
            </div>
        </div>
    );
}
export default Home;


