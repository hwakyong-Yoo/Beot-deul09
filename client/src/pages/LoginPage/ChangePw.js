import { Container } from "../../Layout";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header";
import {
  FindWrapper,
  TitleDiv,
  InputPwDiv,
  IdPwTitle,
  InputIdPw,
  FindPwBtn,
  CancelBtn,
  FindTitle,
  PwMatchWrapper,
} from "./FindPwStyle";

const ChangePw = () => {
  const navigate = useNavigate();

  const changePwRef = useRef();
  const [changePw, setChangePw] = useState("");

  const checkChangePwRef = useRef();
  const [checkChangePw, setCheckChangePw] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();

    if (changePw.length < 8) {
      alert("비밀번호를 다시 확인해주세요");
      changePwRef.current.focus();
      return;
    }

    try {
      const response = await axios.put("http://localhost:80/user/edit", {
        password: changePw,
      });

      if (response.status === 200) {
        alert("비밀번호가 변경되었습니다.");
        navigate("/userinfo");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
      } else {
        alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  console.log(sessionStorage);

  return (
    <Container>
      <Header headText={"벗들공구"} goHeadTitle={"/"} />
      <hr />
      <FindTitle>
        <span>새로운 비밀번호를</span>
        <span>설정해주세요.</span>
      </FindTitle>

      <FindWrapper>
        <TitleDiv>비밀번호 재설정</TitleDiv>

        <InputPwDiv>
          <PwMatchWrapper>
            <IdPwTitle>비밀번호</IdPwTitle>
            {changePw.length < 8 && <h5>비밀번호를 8자 이상 입력해주세요.</h5>}
          </PwMatchWrapper>
          <InputIdPw
            placeholder="비밀번호"
            type="text"
            value={changePw}
            ref={changePwRef}
            onChange={(e) => setChangePw(e.target.value)}
          />
          <PwMatchWrapper>
            <IdPwTitle>비밀번호 확인</IdPwTitle>
            {changePw !== checkChangePw && (
              <h5>비밀번호가 일치하지 않습니다.</h5>
            )}
          </PwMatchWrapper>
          <InputIdPw
            placeholder="비밀번호 확인"
            type="password"
            value={checkChangePw}
            ref={checkChangePwRef}
            onChange={(e) => setCheckChangePw(e.target.value)}
          />
        </InputPwDiv>
        <FindPwBtn onClick={handleChange}>비밀번호 재설정</FindPwBtn>
        <CancelBtn onClick={handleCancel}>취소</CancelBtn>
      </FindWrapper>
    </Container>
  );
};
export default ChangePw;
