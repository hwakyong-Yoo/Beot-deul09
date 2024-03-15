import { React } from "react";
import {
  HeaderWrapper,
  LogoWrapper,
  NavLink,
  UserBtn,
  LogoutWrapper,
  LogoutBtn,
  UserIconNav,
} from "./HeaderStyle.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ headText, goHeadTitle }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const name = sessionStorage.getItem("name");

  const handleUserClick = () => {
    if (userId) {
      navigate("/my");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = async () => {
    try {
      await axios.get("http://localhost:80/user/logout");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("name");
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <NavLink to="/" activestyle="true">
          <img
            className="logo"
            src={process.env.PUBLIC_URL + "/assets/logo.png"}
            alt="Logo"
          />
        </NavLink>
        <NavLink to={goHeadTitle} activestyle="true">
          {headText}
        </NavLink>
      </LogoWrapper>

      {userId ? (
        <LogoutWrapper>
          <LogoutBtn onClick={handleLogoutClick}>로그아웃</LogoutBtn>
          <UserBtn onClick={handleUserClick}>{name}님</UserBtn>
        </LogoutWrapper>
      ) : (
        <UserIconNav>
          <FontAwesomeIcon
            icon={faCircleUser}
            size="xl"
            style={{ color: "#B8BDB9" }}
            onClick={handleUserClick}
          />
        </UserIconNav>
      )}
    </HeaderWrapper>
  );
};

export default Header;
