import { Container } from "../../Layout";
import Header from "../../components/Header";
import { RecommendWrapper } from "./RecommendStyle";
import {
  KeywordWrapper,
  Category,
  Keywords,
  CategoryWrapper,
  KeyWrapper,
} from "../UploadPage/UploadStyle";
import { LoginBtn } from "../LoginPage/LoginStyle";
import { useState } from "react";

import keywordList from "../UploadPage/keywordList";

const Recommend = () => {
  const [keywords, setKeywords] = useState([]);

  const handleKeywordClick = (keyword) => {
    if (keywords.includes(keyword)) {
      setKeywords((prevKeywords) =>
        prevKeywords.filter((kw) => kw !== keyword)
      );
    } else {
      setKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  };

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <RecommendWrapper>
        <h1>어떤 물품에</h1>
        <h1>관심 있으신가요?</h1>
        <h5>알맞은 추천 상품을 보여드립니다.</h5>

        <CategoryWrapper>
          {keywordList.map((category, index) => (
            <KeyWrapper key={index}>
              <Category>{Object.keys(category)[0]}</Category>
              <KeywordWrapper>
                {Object.values(category)[0].map((keyword, keyIndex) => (
                  <Keywords
                    key={keyIndex}
                    onClick={() => handleKeywordClick(keyword)}
                    selected={keywords.includes(keyword)}
                  >
                    {keyword}
                  </Keywords>
                ))}
              </KeywordWrapper>
            </KeyWrapper>
          ))}
        </CategoryWrapper>
        <LoginBtn>완료</LoginBtn>
      </RecommendWrapper>
    </Container>
  );
};
export default Recommend;
