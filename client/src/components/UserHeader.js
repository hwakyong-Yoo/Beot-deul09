import { React } from "react";
import { Wrap, NavLink, NavX } from "./HeaderStyle.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserHeader = () => {
  return (
    <Wrap>
      <NavX to="/my" activestyle="true">
        <FontAwesomeIcon icon={faXmark} />
      </NavX>
      <NavLink>내 정보</NavLink>
    </Wrap>
  );
};

export default UserHeader;
