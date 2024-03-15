import styled from "styled-components";
export const FindWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FindTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0 10px 22px;
  font-size: 23px;
  color: #3b3b3b;
`;

export const TitleDiv = styled.div`
  width: 308px;
  height: 17px;
  font-size: 15px;
  margin-top: 20px;
  background-color: #e8e8e8;
  border-radius: 15px 15px 0px 0px;
  border: 1px solid #aeaeae;
  padding: 17px 0 15px 27px;
`;

export const InputPwDiv = styled.div`
  width: 305px;
  font-size: 15px;
  border-radius: 0px 0px 15px 15px;
  border: 1px solid #aeaeae;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputSignUpDiv = styled.div`
  width: 305px;
  font-size: 15px;
  border-radius: 0px 0px 15px 15px;
  border: 1px solid #aeaeae;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PwMatchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  h5 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 10px;
    color: red;
  }
`;

export const ConfirmWrapper = styled.div`
  display: flex;
  width: 305px;
  justify-content: space-between;
  align-items: baseline;
`;

export const ConfirmBtn = styled.button`
  width: 120px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #538800;
  background-color: #ffffff;
  cursor: pointer;

  font-family: "Pretendard-Regular";
  font-size: 13px;
  color: #538800;
`;

export const FindInput = styled.input`
  width: 90%;
  border: none;

  font-family: "Pretendard-Regular";
  font-size: 14px;
  color: #a4a4a4;
`;

export const IdPwTitle = styled.div`
  font-size: 10px;
  color: #aeaeae;
  margin-bottom: 14px;
`;

export const InputIdPw = styled.input`
  border: none;
  width: 290px;
  padding-bottom: 9px;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 24px;
`;
export const InputIdPwHalf = styled.input`
  border: none;
  width: 154px;
  padding-bottom: 9px;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 24px;
`;
export const FindPwBtn = styled.button`
  width: 304px;
  height: 54px;
  background-color: #538800;
  color: #eeeeee;
  border: none;
  border-radius: 20px;
  margin-top: 40px;
  cursor: pointer;
  font-family: "Pretendard-Regular";
  font-size: 20px;
`;

export const CancelBtn = styled.button`
  width: 304px;
  height: 54px;
  background-color: #ffffff;
  color: #538800;
  border: 1px solid #538800;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 14px;
  font-family: "Pretendard-Regular";
  font-size: 20px;
`;

export const Calender = styled.label`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 0 5px 10px;
  align-items: center;

  input {
    color: grey;
    border: none;
    width: 270px;
    margin-left: 10px;
  }
`;

export const SpanWrapper = styled.div`
  width: 304px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  color: #a4a4a4;
  font-size: 12px;
`;
