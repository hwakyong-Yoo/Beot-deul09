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
          <LogoutBtn onClick={handleUserClick}>로그인</LogoutBtn>
        </UserIconNav>
      )}
    </HeaderWrapper>
  );
};

export default Header;
