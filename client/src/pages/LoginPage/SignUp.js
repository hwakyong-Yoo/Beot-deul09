import { useState, useRef } from "react";
import Header from "../../components/Header";
import { Container } from "../../Layout";
import {
  FindWrapper,
  TitleDiv,
  InputSignUpDiv,
  IdPwTitle,
  InputIdPw,
  ConfirmWrapper,
  ConfirmBtn,
  InputIdPwHalf,
} from "./FindIdPwStyle";
import { LoginBtn } from "./LoginStyle";

const SignUp = () => {
  const nameRef = useRef();
  const idRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const checkPwRef = useRef();

  const [user, setUser] = useState({
    id: "",
    pw: "",
    checkPw: "",
    name: "",
    email: "",
  });

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (user.name.length < 1) {
      nameRef.current.focus();
      return;
    }

    if (user.id.length < 1) {
      idRef.current.focus();
      return;
    }

    if (user.email.length < 1) {
      emailRef.current.focus();
      return;
    }

    if (user.password.length < 1) {
      pwRef.current.focus();
      return;
    }

    if (user.checkPw.length < 1) {
      checkPwRef.current.focus();
      return;
    }
    alert("회원가입이 완료되었습니다.");
  };

  return (
    <Container>
      <Header />
      <hr />
      <FindWrapper>
        <TitleDiv>회원가입</TitleDiv>

        <InputSignUpDiv>
          <IdPwTitle>아이디</IdPwTitle>
          <ConfirmWrapper>
            <InputIdPwHalf
              placeholder="아이디"
              type="id"
              name="id"
              value={user.id}
              ref={idRef}
              onChange={handleChangeState}
            />
            <ConfirmBtn>아이디 중복 확인</ConfirmBtn>
          </ConfirmWrapper>

          <IdPwTitle>비밀번호</IdPwTitle>
          <InputIdPw
            placeholder="비밀번호"
            type="text"
            name="pw"
            value={user.pw}
            ref={pwRef}
            onChange={handleChangeState}
          />

          <IdPwTitle>비밀번호 확인</IdPwTitle>
          <InputIdPw
            placeholder="비밀번호 확인"
            type="password"
            name="checkPw"
            value={user.checkPw}
            ref={checkPwRef}
            onChange={handleChangeState}
          />

          <IdPwTitle>이름</IdPwTitle>
          <InputIdPw
            placeholder="이름"
            type="text"
            name="name"
            value={user.name}
            ref={nameRef}
            onChange={handleChangeState}
          />

          <IdPwTitle>이메일</IdPwTitle>
          <ConfirmWrapper>
            <InputIdPwHalf
              placeholder="이메일"
              type="email"
              name="email"
              value={user.email}
              ref={emailRef}
              onChange={handleChangeState}
            />
            <ConfirmBtn>이메일 인증 보내기</ConfirmBtn>
          </ConfirmWrapper>
        </InputSignUpDiv>
        <LoginBtn onClick={handleSubmit}>로그인</LoginBtn>
      </FindWrapper>
    </Container>
  );
};

export default SignUp;
