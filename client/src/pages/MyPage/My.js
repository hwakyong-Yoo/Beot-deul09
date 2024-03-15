import { Container } from "../../Layout";
import Header from "../../components/Header";
import {
  UserInfoWrapper,
  UserInfo,
  NextBtn,
  PurchaseListWrapper,
  PurchaseType,
  PurchaseList,
  PurchaseState,
  PurchaseItem,
  ItemInfo,
  State,
  DueDate,
  Price,
} from "./MyStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const My = () => {
  const navigate = useNavigate();
  const handleNextBtn = () => {
    navigate("/my/userinfo");
  };
  const inProgress = true; //데이터 가져올거(예시)
  return (
    <Container>
      <Header headText={"마이페이지"} />
      <hr />
      <UserInfoWrapper>
        <UserInfo>
          <h3>안수이님, 안녕하세요!</h3>
          <h5>2128014</h5>
        </UserInfo>
        <NextBtn onClick={handleNextBtn}>
          <FontAwesomeIcon icon={faAngleRight} />
        </NextBtn>
      </UserInfoWrapper>

      <PurchaseListWrapper>
        <PurchaseType>내가 공구한</PurchaseType>
        <PurchaseList>
          <PurchaseState>
            <State inProgress={inProgress}>
              {inProgress ? "진행 중" : "진행 완료"}
            </State>
            <DueDate>참여마감 : 24.03.25</DueDate>
          </PurchaseState>

          <PurchaseItem>
            <img
              className="item"
              src={process.env.PUBLIC_URL + "/assets/item.png"}
              alt="Item"
            />
            <ItemInfo>
              <h5>원더원더</h5>
              <h3>컴공과 후리스 공구</h3>
              <Price>
                <h4>50000원</h4>
                <h5>30개</h5>
              </Price>
            </ItemInfo>
          </PurchaseItem>
        </PurchaseList>
      </PurchaseListWrapper>

      <PurchaseListWrapper>
        <PurchaseType>내가 참여한</PurchaseType>
        <PurchaseList>
          <PurchaseState>
            <State inProgress={inProgress}>
              {inProgress ? "진행 중" : "진행 완료"}
            </State>
            <DueDate>참여마감 : 24.03.25</DueDate>
          </PurchaseState>

          <PurchaseItem>
            <img
              className="item"
              src={process.env.PUBLIC_URL + "/assets/item.png"}
              alt="Item"
            />
            <ItemInfo>
              <h5>원더원더</h5>
              <h3>컴공과 후리스 공구</h3>
              <Price>
                <h4>50000원</h4>
                <h5>30개</h5>
              </Price>
            </ItemInfo>
          </PurchaseItem>
        </PurchaseList>
      </PurchaseListWrapper>
    </Container>
  );
};
export default My;
