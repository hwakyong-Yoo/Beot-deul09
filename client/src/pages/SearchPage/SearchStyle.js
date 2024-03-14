import styled from "styled-components";

export const MainSearchForm = styled.form`
  border: 2px solid #b8bdb9;
  border-radius: 27px;
  display: flex;
  width: 302px;
  height: 49px;
  align-items: center;
  padding-left: 10px;

  svg {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  width: 90%;

  font-family: "Pretendard-Regular";
  font-size: 18px;
  font-weight: 600;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 19px;
`;
