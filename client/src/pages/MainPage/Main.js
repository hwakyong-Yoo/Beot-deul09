import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../Layout";
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

const Main = () => {
  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate();
  const handleSearchClick = () => {
    if (userId) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  };
  const handleRecruitClick = () => {
    if (userId) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

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
        <ItemWrapper>
          <ItemImg>
            <img
              className="item"
              src={process.env.PUBLIC_URL + "/assets/item.png"}
              alt="Item"
            />
          </ItemImg>
          <ItemTitle>이화 배꽃 학잠</ItemTitle>
          <HashtagWrapper>
            <Hashtag>초록색</Hashtag>
            <Hashtag>2온스</Hashtag>
            <Hashtag>금박로고</Hashtag>
          </HashtagWrapper>

          <DayWrapper>
            <DDay>D-8</DDay>
            <RemainDay>참여마감 : 24.03.20</RemainDay>
          </DayWrapper>
        </ItemWrapper>
        <ItemWrapper></ItemWrapper>
      </ItemSection>
    </Container>
  );
};
export default Main;
