import { Container } from "../../Layout";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import {
  FindWrapper,
  TitleDiv,
  InputPwDiv,
  IdPwTitle,
  InputIdPw,
  FindPwBtn,
  CancelBtn,
  SpanWrapper,
  FindTitle,
} from "./FindPwStyle";

const FindPw = () => {
  const navigate = useNavigate();

  const findPwNameRef = useRef();
  const [findPwName, setfindPwName] = useState("");

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
      <FindTitle>
        <span>이름과 이메일 주소를</span>
        <span>입력해주세요.</span>
      </FindTitle>
      <FindWrapper>
        <TitleDiv>비밀번호 재설정</TitleDiv>
        <InputPwDiv>
          <IdPwTitle>이메일</IdPwTitle>
          <InputIdPw
            placeholder="이메일"
            value={findPwEmail}
            ref={findPwEmailRef}
            onChange={(e) => setFindPwEmail(e.target.value)}
          />
          <IdPwTitle>이름</IdPwTitle>
          <InputIdPw
            placeholder="이름"
            value={findPwName}
            ref={findPwNameRef}
            onChange={(e) => setfindPwName(e.target.value)}
          />
        </InputPwDiv>
        <SpanWrapper>
          <span>가입하신 이메일 주소로 임시 비밀번호가 전송됩니다.</span>
          <span>로그인 후 비밀번호를 재설정해주세요.</span>
        </SpanWrapper>
        <FindPwBtn onClick={handleSubmit}>이메일 전송</FindPwBtn>
        <CancelBtn onClick={handleCancel}>취소</CancelBtn>
      </FindWrapper>
    </Container>
  );
};
export default FindPw;
