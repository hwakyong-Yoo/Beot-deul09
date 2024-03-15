import { React } from "react";
import { HeaderCenter, NavLink, LogoutBtn } from "./HeaderStyle.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UploadHeader = () => {
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

  return (
    <HeaderCenter>
      <NavLink to="/" activestyle="true">
        <FontAwesomeIcon icon={faXmark} />
      </NavLink>
      <NavLink>공동구매 모집하기</NavLink>

      <LogoutBtn>임시저장</LogoutBtn>
    </HeaderCenter>
  );
};

export default UploadHeader;
