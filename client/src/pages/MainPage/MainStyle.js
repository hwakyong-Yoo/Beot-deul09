import styled from "styled-components";

export const MainSearchForm = styled.form`
  border: 2px solid #b8bdb9;
  border-radius: 27px;
  display: flex;
  width: 310px;
  height: 49px;
  align-items: center;
  margin: 0 auto;
  padding-left: 20px;
  cursor: pointer;

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
`;

export const RecommendSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
  height: 156px;
  background-color: #004916;
  border-radius: 17px;
  margin: 18px auto;
`;

export const Title = styled.div`
  color: #ffffff;
  font-size: 15px;
  margin: 13px 0 13px 13px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const RecommendItem = styled.div`
  width: 150px;
  height: 103px;
  background-color: #ffffff;
  border-radius: 11px;
`;

export const RecruitBtn = styled.button`
  background-color: #b2f100;
  border-radius: 16px;
  border: none;
  padding: 5px 19px;
  margin-left: 22px;
  cursor: pointer;

  font-family: "Pretendard-Regular";
  font-size: 13px;
  font-weight: 600;
`;
