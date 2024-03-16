import styled from "styled-components";

export const ImgUploadWrapper = styled.div`
  display: flex;
  margin: 16px 0 0 19px;
`;

export const ImgUpload = styled.div`
  display: flex;
  background-color: #ffffff;
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

export const ImageUl = styled.ul`
  overflow-x: scroll;
  display: flex;
  padding: 0;
`;

export const ImgList = styled.div`
  display: flex;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 74px;
  border: 1px solid #a4a4a4;
  border-radius: 9px;
  margin-right: 9px;

  img {
    width: 90%;
    height: 90%;
  }
`;

export const UploadTitleWrapper = styled.div`
  margin: 20px 0 0 19px;
  h3 {
    font-size: 15px;
    color: #004916;
  }
`;

export const TitleInput = styled.input`
  width: 320px;
  height: 45px;
  border-radius: 9px;
  border: 1px solid #a4a4a4;
  padding-left: 13px;
`;
