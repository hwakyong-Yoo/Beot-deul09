import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import { Container } from "../../Layout";
import axios from "axios";

import {
  FindWrapper,
  TitleDiv,
  InputSignUpDiv,
  IdPwTitle,
  InputIdPw,
  ConfirmWrapper,
  ConfirmBtn,
  InputIdPwHalf,
  Calender,
  PwMatchWrapper,
} from "./FindIdPwStyle";
import { LoginBtn } from "./LoginStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const idRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const checkPwRef = useRef();
  const [birth, setBirth] = useState(new Date());
  const [age, setAge] = useState(0);

  const [user, setUser] = useState({
    id: "",
    password: "",
    checkPw: "",
    name: "",
    email: "",
  });
  const [pwMatch, setPwMatch] = useState(true);

  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id.length < 1) {
      idRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }
    if (user.name.length < 1) {
      nameRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }
    if (user.email.length < 1) {
      emailRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }
    if (user.password.length < 8) {
      pwRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }

    if (user.password !== user.checkPw) {
      checkPwRef.current.focus();
      alert("입력 정보를 확인해주세요");
      return;
    }

    // 회원가입 정보와 나이(age)를 서버에 전송
    const userData = {
      userId: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      age: age,
    };

    axios
      .post("http://localhost:80/user/create", userData)
      .then((response) => {
        console.log(response.data);
        navigate("/");
        // 서버 응답에 따른 처리
      })
      .catch((error) => {
        console.error("Error:", error);
        // 오류 처리
      });
  };

  console.log("사용자 정보:", user);
  console.log("생년월일:", age);

  return (
    <Container>
      <Header headText={"벗들공구"} />
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

          <PwMatchWrapper>
            <IdPwTitle>비밀번호</IdPwTitle>
            {user.password.length < 8 && (
              <h5>비밀번호를 8자 이상 입력해주세요.</h5>
            )}
          </PwMatchWrapper>
          <InputIdPw
            placeholder="비밀번호"
            type="text"
            name="password"
            value={user.password}
            ref={pwRef}
            onChange={handleChangeState}
          />

          <PwMatchWrapper>
            <IdPwTitle>비밀번호 확인</IdPwTitle>
            {user.password !== user.checkPw && (
              <h5>비밀번호가 일치하지 않습니다.</h5>
            )}
          </PwMatchWrapper>
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

          <IdPwTitle>생년월일</IdPwTitle>
          <Calender>
            <DatePicker
              selected={birth}
              onChange={(date) => {
                setBirth(date);
                setAge(new Date().getFullYear() - date.getFullYear());
              }}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={30}
              maxDate={new Date()}
            />
          </Calender>
        </InputSignUpDiv>
        <LoginBtn onClick={handleSubmit}>회원가입</LoginBtn>
      </FindWrapper>
    </Container>
  );
};

export default SignUp;
