import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 326px;
  margin: 90px auto 14px;
`;

export const LoginInputForm = styled.form`
  display: flex;
  align-items: center;
  width: 300px;
  height: 64px;
  border: 2px solid #b2f100;
  border-radius: 20px;

  margin-top: 27px;
  padding-left: 24px;

  svg {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
`;

export const LoginInput = styled.input`
  width: 90%;
  border: none;

  font-family: "Pretendard-Regular";
  font-size: 16px;
`;

export const FindIdPw = styled.button`
  width: 102px;
  font-family: "Pretendard-Regular";
  font-size: 10px;
  color: #aeaeae;
  border: none;
  background-color: #ffffff;
  margin-top: 14px;
  cursor: pointer;
`;

export const LoginBtn = styled.button`
  width: 330px;
  height: 64px;
  margin-top: 50px;
  background-color: #538800;
  border-radius: 20px;
  border: none;
  font-family: "Pretendard-Regular";
  color: #ffffff;
  font-size: 23px;
  cursor: pointer;
`;

export const GoSignup = styled.button`
  width: 190px;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  color: #787878;
  border: none;
  background-color: #ffffff;
  margin-top: 14px;
  cursor: pointer;
`;
