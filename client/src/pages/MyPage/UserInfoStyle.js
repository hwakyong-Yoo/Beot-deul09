import styled from "styled-components";

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 336px;
  height: 115px;
  background-color: #004916;
  margin: 28px auto;
  border-radius: 12px;

  h3 {
    margin: 0;
    color: #ffffff;
    font-size: 17px;
    margin-bottom: 7px;
  }
  h5 {
    margin: 0;
    color: #b4b4b4;
    font-size: 12px;
  }
`;

export const EditWrapper = styled.div`
  width: 336px;
  height: 160px;
  display: flex;
  flex-direction: column;
  margin: 28px auto;
  justify-content: center;
  border: 1px solid #c9c9c9;
  background-color: #f3f3f3;
  cursor: pointer;
  border-radius: 15px;

  hr {
    width: 300px;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 6px 0;
`;
export const EditBtn = styled.div``;
