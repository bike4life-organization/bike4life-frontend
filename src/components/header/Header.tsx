import Link from "@mui/material/Link";
import "../../styles/header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="left">
        <a href="/">
          <img alt="logo" src="../../assets/img/logo-bike4life.png" />
        </a>
        <Link underline="none" href="/routes">
          Find a route!
        </Link>
        <Link underline="none" href="/create-route">
          Create a route!
        </Link>
      </div>
      <div className="right">
        <Link underline="none" href="/sign-up">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Header;
