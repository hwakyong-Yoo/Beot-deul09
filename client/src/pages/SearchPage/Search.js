import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ItemSection,
  ItemWrapper,
  ItemImg,
  ItemTitle,
  HashtagWrapper,
  Hashtag,
  DayWrapper,
  DDay,
  RemainDay,
} from "../MainPage/MainStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { MainSearchForm, SearchInput, SearchWrapper } from "./SearchStyle";
import { Container } from "../../Layout";
import Header from "../../components/Header";
import {
  UploadTitleWrapper,
  KeywordWrapper,
  Keywords,
  CategoryWrapper,
  KeyWrapper,
} from "../UploadPage/UploadStyle";
import keywordList from "../UploadPage/keywordList";
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = async (e) => {
    // handleSubmit 함수 수정
    e.preventDefault(); // 기본 이벤트 방지

    const searchTerm = searchRef.current.value;

    if (searchTerm.length < 1) {
      searchRef.current.focus();
      return;
    }

    try {
      // 검색어를 포함한 POST 요청 보내기
      const response = await axios.post("http://localhost:80/searchByKeyword", {
        keyword: searchTerm,
      });
      if (response.data.length === 0) {
        // 검색 결과가 없는 경우
        alert("검색 결과가 없습니다.");
        return;
      }
      console.log("검색 결과:", response.data);
      setSearchResult(response.data);
      // 검색 결과 처리
    } catch (error) {
      console.error("검색에 실패했습니다:", error);
    }
  };

  const userId = sessionStorage.getItem("userId");

  const handleItemClick = (itemUserId, postId) => {
    if (userId === itemUserId) {
      navigate(`/detailseller/${postId}`);
    } else {
      navigate(`/detailcustomer/${postId}`);
    }

    if (userId === null || userId === undefined) {
      navigate(`/detailcustomer/${postId}`);
    }
  };

  const today = new Date();

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <SearchWrapper>
        <FontAwesomeIcon icon={faAngleLeft} onClick={handleBackClick} />
        <MainSearchForm onSubmit={handleSubmit}>
          <SearchInput
            placeholder="검색어 입력"
            value={searchTerm}
            ref={searchRef}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="2xl"
            style={{ color: "#85CC16" }}
            onClick={handleSubmit}
          />
        </MainSearchForm>
      </SearchWrapper>

      <UploadTitleWrapper>
        <h3>추천 검색어</h3>
        <CategoryWrapper>
          {keywordList.map((category, index) => (
            <KeyWrapper key={index}>
              <KeywordWrapper>
                {Object.values(category)[0].map((keyword, keyIndex) => (
                  <Keywords key={keyIndex}>{keyword}</Keywords>
                ))}
              </KeywordWrapper>
            </KeyWrapper>
          ))}
        </CategoryWrapper>
      </UploadTitleWrapper>

      <ItemSection>
        {searchResult.map((item, index) => {
          const deadlineDate = new Date(item.deadline);

          const timeDiff = deadlineDate.getTime() - today.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

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
export default Search;
