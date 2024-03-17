import styled from "styled-components";

export const DetailWrapper = styled.div`
  margin: 0 37px;
  h5 {
    color: #787878;
    margin: 10px 0;
  }
  h3 {
    margin: 10px 0 20px 0;
  }
  h4 {
    font-size: 12px;
    color: #787878;
  }
`;

export const ImgWrapper = styled.div`
  width: 299px;
  height: 299px;
  margin: 0 auto;
  border: 1px solid #d1d1d1;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h5 {
    margin: 25px 0;
  }
`;

export const TitleBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 28px;
    margin: 0;
  }
`;

export const SellerEditBtn = styled.button`
  border: 2px solid #004916;
  border-radius: 14px;
  font-family: "Pretendard-Regular";
  color: #004916;
  background-color: transparent;
  width: 70px;
  cursor: pointer;
`;

export const CustomerList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OkBtn = styled.button`
  border-radius: 10px;
  border: none;
  background-color: #538800;
  font-family: "Pretendard-Regular";

  color: #ffffff;
  width: 75px;
  height: 25px;
`;
