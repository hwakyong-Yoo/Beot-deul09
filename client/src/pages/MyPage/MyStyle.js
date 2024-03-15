import styled from "styled-components";

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 308px;
  height: 44px;
  background-color: #004916;
  color: #ffffff;
  border-radius: 12px;
  margin: 0 auto;
  padding: 14px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h3 {
    margin: 0;
    font-size: 17px;
  }
  h5 {
    margin: 0;
    color: #b4b4b4;
    font-size: 12px;
  }
`;

export const NextBtn = styled.button`
  border: none;
  background-color: #004916;
  color: #ffffff;
  cursor: pointer;
`;

export const PurchaseListWrapper = styled.div`
  width: 336px;
  margin: 37px auto 0;
`;

export const PurchaseType = styled.div`
  margin-bottom: 12px;
`;

export const PurchaseList = styled.div`
  background-color: #e9ffaa4d;
  border-radius: 12px;
  h3,
  h4,
  h5 {
    margin: 0 3px 3px 0;
  }
`;

export const PurchaseState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 13px;
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 71px;
  height: 24px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  background-color: ${(props) => (props.inProgress ? "#FF778E" : "#004916")};
`;
export const DueDate = styled.div`
  font-size: 12px;
`;
export const PurchaseItem = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 13px;
  h5 {
    font-size: 12px;
    color: #8a8a8a;
  }
  h3 {
    font-size: 15px;
  }
  h4 {
    font-size: 13px;
  }
`;

export const ItemInfo = styled.div`
  margin-left: 13px;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
`;
