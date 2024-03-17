import { Container } from "../../Layout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import {
  DetailWrapper,
  ImgWrapper,
  NameWrapper,
  TitleBtnWrapper,
  SellerEditBtn,
} from "./DetailStyle";

import {
  KeywordWrapper,
  Keywords,
  CategoryWrapper,
} from "../UploadPage/UploadStyle";

const DetailCustomer = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`http://localhost/posts/${postId}`);
      setPostDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const name = postDetail.account_holder;
  const middleIndex = Math.floor(name.length / 2);
  const maskedName =
    name.substring(0, middleIndex) + "*" + name.substring(middleIndex + 1);

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <DetailWrapper>
        <ImgWrapper></ImgWrapper>
        <NameWrapper>
          <h5>{maskedName}</h5>
        </NameWrapper>
        <TitleBtnWrapper>
          <h1>{postDetail.product}</h1>
          <SellerEditBtn onClick={() => navigate("/participate")}>
            참여
          </SellerEditBtn>
        </TitleBtnWrapper>
        <h5>{postDetail.deadline}까지 모집중</h5>
        <CategoryWrapper>
          <KeywordWrapper>
            {postDetail.keywords.map((keyword, index) => (
              <Keywords key={index}>{keyword}</Keywords>
            ))}
          </KeywordWrapper>
        </CategoryWrapper>

        <hr />
        <h5>가격</h5>
        <h3>{postDetail.price}원</h3>

        <hr />
        <h5>모집 종료까지 남은 시간</h5>
        <h3>2일 8시간 51분 57초</h3>

        <hr />
        <h4>{postDetail.explanation}</h4>

        <hr />
        <h5>참여완료 후 오픈채팅방에 꼭 입장해주세요!</h5>
        <h4>{postDetail.chatroom_link}</h4>

        <hr />
        <Keywords>문의하기</Keywords>
        <h5>질문이 있을 경우 아래 오픈채팅방에 입장해 질문해주세요!</h5>
        <h4>{postDetail.chatroom_link}</h4>

        <hr />
        <Keywords>Q. 수령은 언제 가능한가요?</Keywords>
        <h4>{postDetail.answer1}</h4>

        <hr />
        <Keywords>Q. 이름에 특수 기호 적을 수 있나요?</Keywords>
        <h4>{postDetail.answer2}</h4>

        <hr />
        <Keywords>Q. 모집 인원이 총 몇 명인가요?</Keywords>
        <h4>{postDetail.answer3}</h4>
      </DetailWrapper>
    </Container>
  );
};

export default DetailCustomer;
