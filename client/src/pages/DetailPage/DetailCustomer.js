import { Container } from "../../Layout";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailCustomer = () => {
  const [postDetail, setPostDetail] = useState(null);
  const [maskedName, setMaskedName] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`http://localhost/posts/${postId}`);
      setPostDetail(response.data);
      console.log(response.data);
      const name = response.data.account_holder;
      const middleIndex = Math.floor(name.length / 2);
      setMaskedName(
        name.substring(0, middleIndex) +
          "*".repeat(name.length % 2) +
          name.substring(middleIndex + 1)
      );
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  const handleParticipateGo = () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/participate/${postId}`);
    }
  };

  if (!postDetail.status) {
    alert("이미 마감된 공구입니다!");
    navigate("/");
    return null;
  }

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
          <SellerEditBtn onClick={handleParticipateGo}>참여</SellerEditBtn>
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
