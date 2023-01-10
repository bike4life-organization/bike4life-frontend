import React from "react";
import useUser from "../../helpers/useUser";
import Link from "@mui/material/Link";
import "../../styles/header.scss";

const Header = () => {
  const { isLoggedIn, loggin, loggout } = useUser();

  return (
    <nav className="header">
      <div className="left">
        <Link underline="none" href="/home">
          <img alt="logo" src="../../assets/img/logo-bike4life.png"></img>
        </Link>
        <Link underline="none" href="/routes">
          Find a route!
        </Link>
        <Link underline="none" href="/create-route">
          Create a route!
        </Link>
      </div>
      <div className="right">
        {isLoggedIn ? (
          <Link underline="none" href="/login" onClick={loggout}>
            Logout
          </Link>
        ) : (
          <Link underline="none" href="/login">
            Sign in
          </Link>
        )}
        <Link underline="none" href="/sign-up">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Header;
