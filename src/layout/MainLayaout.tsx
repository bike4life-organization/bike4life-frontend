import React from "react";
import Header from "../components/header/Header";

const MainLayaout = ({children}: any) => {
    return (
        <>
            {<Header/>}
            <div>
                {children}
            </div>
        </>
    );
};

export default MainLayaout;
