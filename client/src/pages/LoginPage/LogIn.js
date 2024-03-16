import { Container } from "../../Layout";
import { useState, useRef } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  LoginInputWrapper,
  LoginInput,
  FindIdPw,
  LoginBtn,
  GoSignup,
  LoginInputForm,
  LoginWrapper,
} from "./LoginStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  const idRef = useRef();
  const passwordRef = useRef();

  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const toggleShowPw = () => {
    setShowPw(!showPw);
  };

  const handleLogin = async () => {
    try {
      const userId = id.split("@")[0];
      const response = await axios.post("http://localhost:80/user/login", {
        userId: userId,
        password: password,
      });
      console.log(response.data);
      if (response.status === 200) {
        setLoginCheck(true);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("userId", response.data.userId);
        navigate("/");
        console.log("로그인성공:");
      } else {
        setLoginCheck(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("이메일 혹은 비밀번호가 틀렸습니다.");
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleFindIdPw = () => {
    navigate("/findpw");
  };

  return (
    <Container>
      <Header headText={"벗들공구"} goHeadTitle={"/"} />
      <hr />
      <LoginWrapper>
        <LoginInputWrapper>
          <LoginInputForm>
            <LoginInput
              placeholder="이메일을 입력하세요."
              value={id}
              ref={idRef}
              onChange={(e) => setId(e.target.value)}
              type="text"
              onKeyDown={handleEnter}
            />
          </LoginInputForm>
          <LoginInputForm>
            <LoginInput
              placeholder="비밀번호를 입력하세요."
              value={password}
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              onKeyDown={handleEnter}
            />
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{ color: "#A4A4A4" }}
              onClick={toggleShowPw}
            />
          </LoginInputForm>
          <FindIdPw onClick={handleFindIdPw}>비밀번호 재설정</FindIdPw>
          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
        </LoginInputWrapper>
        <GoSignup onClick={handleSignUp}>계정이 없으신가요? 회원가입</GoSignup>
      </LoginWrapper>
    </Container>
  );
};
export default Login;
