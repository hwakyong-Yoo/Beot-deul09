import styled from "styled-components";

export const ImgUploadWrapper = styled.div`
  display: flex;
  margin: 16px 19px;
  overflow-x: scroll;
`;

export const ImgUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 74px;
  border: 1px solid #a4a4a4;
  border-radius: 9px;
  color: #898989;
  font-size: 9px;
  margin-right: 9px;

  .fa-2xl {
    font-size: 3.5em;
    margin-bottom: 5px;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
`;

export const ImgList = styled.div`
  width: 74px;
  height: 74px;
  border: 1px solid #a4a4a4;
  border-radius: 9px;
  margin-right: 9px;
  img {
    width: 72px;
    height: 70px;
    border-radius: 9px;
  }
`;

export const ImgBtnWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const RemoveBtn = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  margin: 0;
  right: -11px;
  top: -2px;
`;

export const UploadTitleWrapper = styled.div`
  margin: 20px 19px;
  h3 {
    font-size: 15px;
    color: #004916;
    margin-bottom: 7px;
  }
`;

export const TitleInput = styled.input`
  width: 320px;
  height: 45px;
  border-radius: 9px;
  border: 1px solid #a4a4a4;
  padding-left: 13px;
  margin-bottom: 11px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const KeyWrapper = styled.div`
  margin-bottom: 8px;
`;

export const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const Category = styled.span`
  font-size: 12px;
  color: #538800;
`;

export const Keywords = styled.button`
  font-family: "Pretendard-Regular";
  color: #787878;
  font-size: 13px;
  border-radius: 22px;
  border: 1px solid #a4a4a4;
  background-color: transparent;
  cursor: pointer;
  margin: 0 9px 7px 0;
  padding: 5px 11px;

  ${({ selected }) =>
    selected &&
    `
      color: #ffffff;
      background-color: #85CC16;
      border: none;
    `}
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  span {
    background-color: #85cc16;
    border-radius: 14px;
    margin-bottom: 8px;
    padding: 5px 8px;
    font-size: 15px;
  }
`;
