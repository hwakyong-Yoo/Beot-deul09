import styled from "styled-components";

export const Container = styled.div`
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 600;
    font-style: normal;
  }

  font-family: "Pretendard-Regular";
  width: 375px;
  height: 812px;
  margin: auto;
  border: 1px solid black;

  hr {
    width: 100%;
    margin-bottom: 10px;
    border: #e7e7e7 1px solid;
  }
`;
