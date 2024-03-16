import styled from "styled-components";

export const ImgUploadWrapper = styled.div`
  display: flex;
  margin: 16px 0 0 19px;
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
  font-size: 8px;
  margin-right: 9px;

  .fa-2xl {
    font-size: 3.5em;
  }
  h4 {
    margin: 3px 0 0 0;
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
