import { Container } from "../../Layout";
import UserHeader from "../../components/UserHeader";
import { InfoWrapper, EditWrapper, EditBtn, BtnWrapper } from "./UserInfoStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const navigate = useNavigate();
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

  const handleDeleteClick = async () => {
    try {
      await axios.delete("http://localhost:80/user/delete", {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      });
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("name");
      navigate("/");
    } catch (error) {
      console.error("Delete failed: ", error);
    }
  };

  return (
    <Container>
      <UserHeader />
      <hr />

      <InfoWrapper>
        <h3>{sessionStorage.getItem("name")}</h3>
        <h5>{sessionStorage.getItem("userId")}</h5>
      </InfoWrapper>

      <EditWrapper>
        <BtnWrapper onClick={() => navigate("/changepw")}>
          <EditBtn>비밀번호 재설정</EditBtn>
          <FontAwesomeIcon icon={faAngleRight} />
        </BtnWrapper>
        <hr />
        <BtnWrapper onClick={handleLogoutClick}>
          <EditBtn>로그아웃</EditBtn>
          <FontAwesomeIcon icon={faAngleRight} />
        </BtnWrapper>
        <hr />
        <BtnWrapper onClick={handleDeleteClick}>
          <EditBtn>회원탈퇴</EditBtn>
          <FontAwesomeIcon icon={faAngleRight} />
        </BtnWrapper>
      </EditWrapper>
    </Container>
  );
};
export default UserInfo;
