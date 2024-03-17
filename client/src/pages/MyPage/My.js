import { Container } from "../../Layout";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  UserInfoWrapper,
  UserInformation,
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
  const [purchaseData, setPurchaseData] = useState([]);
  const [sellData, setSellData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/products/seller",
          {
            headers: {
              userId: sessionStorage.getItem("userId"),
            },
          }
        );
        setSellData(response.data);
        console.log("내가 공구한: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:80/products/buyer", {
          headers: {
            userId: sessionStorage.getItem("userId"),
          },
        });
        setPurchaseData(response.data);
        console.log("내가 참여한: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePurchaseStateClick = (postId) => {
    navigate(`/detailcustomer/${postId}`);
  };

  const handleNextBtn = () => {
    navigate("/userinfo");
  };
  const inProgress = true; //데이터 가져올거(예시)
  return (
    <Container>
      <Header headText={"마이페이지"} goHeadTitle={"/my"} />
      <hr />
      <UserInfoWrapper>
        <UserInformation>
          <h3>{sessionStorage.getItem("name")}님, 안녕하세요!</h3>
          <h5>{sessionStorage.getItem("userId")}</h5>
        </UserInformation>
        <NextBtn onClick={handleNextBtn}>
          <FontAwesomeIcon icon={faAngleRight} />
        </NextBtn>
      </UserInfoWrapper>

      <PurchaseListWrapper>
        <PurchaseType>내가 공구한</PurchaseType>
        <PurchaseList>
          {sellData.map((sell, index) => (
            <PurchaseState
              key={index}
              onClick={() => handlePurchaseStateClick(sell.postId)}
            >
              <State inProgress={sell.inProgress}>
                {sell.inProgress ? "진행 중" : "진행 완료"}
              </State>
              <h3>{sell.product}</h3>
              <h4>{sell.price}원</h4>
              <h5>{sell.min_participants}명</h5>
            </PurchaseState>
          ))}
        </PurchaseList>
      </PurchaseListWrapper>

      <PurchaseListWrapper>
        <PurchaseType>내가 참여한</PurchaseType>
        <PurchaseList>
          {purchaseData.map((purchase, index) => (
            <PurchaseState
              key={index}
              onClick={() => handlePurchaseStateClick(purchase.postId)}
            >
              <State inProgress={purchase.inProgress}>{purchase.status}</State>
              <h5>{purchase.product_option}</h5>
              <h3>{purchase.size}</h3>

              <h5>{purchase.amount}개</h5>
            </PurchaseState>
          ))}
        </PurchaseList>
      </PurchaseListWrapper>
    </Container>
  );
};
export default My;
