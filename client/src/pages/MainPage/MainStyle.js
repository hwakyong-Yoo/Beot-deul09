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

export const RecommendWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const RecommendItem = styled.div`
  width: 150px;
  height: 103px;
  background-color: #ffffff;
  border-radius: 11px;
`;

export const RecommendItemImg = styled.div`
  display: flex;
  border-bottom: 0.5px solid #aeaeae;
  width: 140px;
  height: 66px;
  margin: 4px auto 0;
`;

export const RecommendItemTitle = styled.div`
  font-size: 10px;
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

export const ItemSection = styled.div`
  display: flex;
  justify-content: space-around;

  width: 336px;
  margin: 18px auto;
`;

export const ItemWrapper = styled.div`
  width: 162px;
  height: 162px;
  border: 1px solid #d9d9d9;
  border-radius: 11px;
`;

export const ItemImg = styled.div`
  display: flex;
  border-bottom: 1px solid #aeaeae;
  width: 162px;
  height: 84px;
  margin: 10px auto;
`;

export const ItemTitle = styled.div`
  font-size: 14px;
  margin-left: 10px;
`;

export const HashtagWrapper = styled.div`
  display: flex;
  margin: 4px 0 4px 10px;
`;

export const Hashtag = styled.div`
  width: 31px;
  height: 9px;
  display: flex;
  justify-content: center;
  margin-right: 4px;
  background-color: #85cc1680;
  border-radius: 8px;
  font-size: 7px;
  color: #424242;
`;

export const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 4px 10px 0 10px;
`;

export const DDay = styled.div`
  width: 29px;
  height: 13px;
  border-radius: 20px;
  background-color: #004916;
  color: #ffbbc7;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RemainDay = styled.div`
  font-size: 4px;
  margin: 5px 0 0 9px;
`;
