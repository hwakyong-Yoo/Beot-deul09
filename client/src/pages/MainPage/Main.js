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
  ItemLink,
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

  const handleItemClick = (itemUserId, postId) => {
    if (userId === itemUserId) {
      navigate(`/detailseller/${postId}`);
    } else {
      navigate(`/detailcustomer/${postId}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:80/posts");
        setAllItems(response.data);
        console.log(allItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date();

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
        {allItems.map((item, index) => {
          // deadline을 Date 객체로 변환
          const deadlineDate = new Date(item.deadline);

          // D-Day 계산
          const timeDiff = deadlineDate.getTime() - today.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 밀리초를 일로 변환 후 올림 처리

          return (
            <ItemWrapper
              key={index}
              onClick={() => handleItemClick(item.userId, item.postId)}
            >
              <ItemImg>
                <img
                  className="item"
                  src={process.env.PUBLIC_URL + "/assets/item.png"}
                  alt="Item"
                />
              </ItemImg>
              <ItemTitle>{item.product}</ItemTitle>
              <HashtagWrapper>
                {item.keywords.map((keyword, keywordIndex) => (
                  <Hashtag key={keywordIndex}>{keyword}</Hashtag>
                ))}
              </HashtagWrapper>
              <DayWrapper>
                <DDay>{daysDiff > 0 ? `D-${daysDiff}` : "마감"}</DDay>
                <RemainDay>참여마감 : {item.deadline}</RemainDay>
              </DayWrapper>
            </ItemWrapper>
          );
        })}
      </ItemSection>
    </Container>
  );
};
export default Main;
