import { React, useState } from "react";
import { HeaderWrapper, LogoWrapper, NavLink, NavBtn } from "./HeaderStyle.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/my");
    } else {
      navigate("/login");
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
        <NavLink to="/" activestyle="true">
          벗들공구
        </NavLink>
      </LogoWrapper>

      <NavBtn onClick={handleUserClick}>
        <FontAwesomeIcon
          icon={faCircleUser}
          size="xl"
          style={{ color: "#B8BDB9" }}
        />
      </NavBtn>
    </HeaderWrapper>
  );
};

export default Header;
