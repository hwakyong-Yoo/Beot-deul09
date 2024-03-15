import { Container } from "../../Layout";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import {
  FindWrapper,
  TitleDiv,
  InputIdDiv,
  InputPwDiv,
  IdPwTitle,
  InputIdPw,
  FindIdBtn,
  CancelBtn,
} from "./FindIdPwStyle";

const FindIdPw = () => {
  const navigate = useNavigate();

  const findIdRef = useRef();
  const [findId, setFindId] = useState("");

  const findPwIdRef = useRef();
  const [findPwId, setFindPwId] = useState("");

  const findPwEmailRef = useRef();
  const [findPwEmail, setFindPwEmail] = useState("");

  const handleSubmit = () => {
    navigate("/");
  };
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <Container>
      <Header headText={"벗들공구"} goHeadTitle={"/"} />
      <hr />
      <FindWrapper>
        <TitleDiv>아이디 찾기</TitleDiv>
        <InputIdDiv>
          <IdPwTitle>아이디</IdPwTitle>
          <InputIdPw
            placeholder="아이디"
            value={findId}
            ref={findIdRef}
            onChange={(e) => setFindId(e.target.value)}
          />
          <FindIdBtn onClick={handleSubmit}>아이디 찾기</FindIdBtn>
          <CancelBtn onClick={handleCancel}>취소</CancelBtn>
        </InputIdDiv>
      </FindWrapper>

      <FindWrapper>
        <TitleDiv>비밀번호 재설정</TitleDiv>
        <InputPwDiv>
          <IdPwTitle>아이디</IdPwTitle>
          <InputIdPw
            placeholder="아이디"
            value={findPwId}
            ref={findPwIdRef}
            onChange={(e) => setFindPwId(e.target.value)}
          />
          <IdPwTitle>이메일</IdPwTitle>
          <InputIdPw
            placeholder="이메일"
            value={findPwEmail}
            ref={findPwEmailRef}
            onChange={(e) => setFindPwEmail(e.target.value)}
          />
          <FindIdBtn onClick={handleSubmit}>비밀번호 재설정</FindIdBtn>
          <CancelBtn onClick={handleCancel}>취소</CancelBtn>
        </InputPwDiv>
      </FindWrapper>
    </Container>
  );
};
export default FindIdPw;
