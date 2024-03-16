import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "../../Layout";
import { useState } from "react";
import {
  MainSearchForm,
  SearchInput,
  RecommendSection,
  Title,
  RecommendItem,
  RecommendWrapper,
  RecruitBtn,
  ItemSection,
  ItemWrapper,
  ItemImg,
  ItemTitle,
  HashtagWrapper,
  Hashtag,
  DayWrapper,
  DDay,
  RemainDay,
  RecommendItemImg,
  RecommendItemTitle,
} from "./MainStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import axios from "axios";

const Main = () => {
  const userId = sessionStorage.getItem("userId");
  const [allItems, setAllItems] = useState([]);

  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate("/search");
  };
  const handleRecruitClick = () => {
    if (userId) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:80/posts");
        setAllItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header headText={"벗들공구"} goHeadTitle={"/"} />
      <hr />
      <MainSearchForm onClick={handleSearchClick}>
        <SearchInput placeholder="검색어 입력" type="text" readOnly />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "#85CC16" }}
        />
      </MainSearchForm>

      <RecommendSection>
        <Title>벗들을 위한 추천상품</Title>
        <RecommendWrapper>
          <RecommendItem>
            <RemainDay>참여마감 : 24.03.20</RemainDay>
            <RecommendItemImg>
              <img
                className="item"
                src={process.env.PUBLIC_URL + "/assets/item.png"}
                alt="Item"
              />
            </RecommendItemImg>
            <DayWrapper>
              <RecommendItemTitle>블랙 숏돕바 공구</RecommendItemTitle>
              <DDay>D-8</DDay>
            </DayWrapper>
          </RecommendItem>
          <RecommendItem></RecommendItem>
        </RecommendWrapper>
      </RecommendSection>

      <RecruitBtn onClick={handleRecruitClick}>+ 공동구매 모집하기</RecruitBtn>

      <ItemSection>
        {allItems.map((item, index) => (
          <ItemWrapper key={index}>
            <ItemImg>
              <img
                className="item"
                src={process.env.PUBLIC_URL + "/assets/item.png"}
                alt="Item"
              />
            </ItemImg>
            <ItemTitle>{item.product}</ItemTitle>
            <HashtagWrapper>
              {/* 여기에 해시태그 표시 로직 추가 */}
            </HashtagWrapper>
            <DayWrapper>
              <DDay>{/* 여기에 D-Day 설정 */}</DDay>
              <RemainDay>{item.deadline}</RemainDay>
            </DayWrapper>
          </ItemWrapper>
        ))}
      </ItemSection>
    </Container>
  );
};
export default Main;
