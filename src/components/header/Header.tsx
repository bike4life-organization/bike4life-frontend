import React from "react";
import useUser from "../../helpers/useUser";
import Link from "@mui/material/Link";
import "../../styles/header.scss";
import Button from "@mui/material/Button";

const Header = () => {
    const {loggout} = useUser();

    return (
        <nav className="header">
            <div className="left">
                <Link underline="none" href="/home">
                    <img style={{width: '65%'}} alt="logo" src="../../assets/img/logo-bike4life.png"></img>
                </Link>
            </div>
            <div className="right">
                {window.sessionStorage.getItem("token") && (
                    <>
                        <Button variant="outlined">
                            <Link underline="none" href="/home">
                                Pricing
                            </Link>
                        </Button>
                        <Button variant="outlined">
                            <Link underline="none" href="/routes">
                                Show routes
                            </Link>
                        </Button>
                        <Button variant="outlined">
                            <Link underline="none" href="/create-route">
                                Create a route
                            </Link>
                        </Button>
                        <Button variant="outlined">
                            <Link underline="none" href="/login" onClick={loggout}>
                                Logout
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
