import { Container } from "../../Layout";
import Header from "../../components/Header";
import {
  DetailWrapper,
  ImgWrapper,
  NameWrapper,
  TitleBtnWrapper,
  SellerEditBtn,
  CustomerList,
  OkBtn,
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
  const [userList, setUserList] = useState(null);
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

  const fetchCustomerList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:80/transactions/${postId}`
      );
      setUserList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
    fetchCustomerList();
  }, [postId]);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  if (!postDetail.status) {
    alert("이미 마감된 공구입니다!");
    navigate("/");
    return null;
  }

  const handleOkButtonClick = async (transactionId) => {
    try {
      // POST 요청 보내기
      const response = await axios.post(
        `http://localhost:80/purchase/checked/${transactionId}`
      );
      console.log("거래 상태 업데이트 완료:", response.data);
    } catch (error) {
      console.error("거래 상태 업데이트 실패:", error);
    }
  };
  const handleCloseButtonClick = async () => {
    try {
      // POST 요청 보내서 공구 마감 처리
      const response = await axios.post(`http://localhost:80/close/${postId}`);
      console.log("공구 마감 처리 완료:", response.data);
      navigate("/");

      // 마감 처리 후 필요한 작업 수행
    } catch (error) {
      console.error("공구 마감 처리 실패:", error);
    }
  };

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <DetailWrapper>
        <ImgWrapper></ImgWrapper>
        <NameWrapper>
          <h5>
            {userList.length} / {postDetail.min_participants}명
          </h5>
        </NameWrapper>
        <TitleBtnWrapper>
          <h1>{postDetail.product}</h1>
          <SellerEditBtn>수정</SellerEditBtn>
          <SellerEditBtn onClick={handleCloseButtonClick}>
            공구마감
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
        <h4>{postDetail.explanation}</h4>

        <hr />
        <Keywords>참여자 명단</Keywords>

        {userList.map((user, index) => (
          <CustomerList key={index}>
            <h5>{user.name}</h5>
            <h5>{user.product_option}</h5>
            <h5>{user.size}</h5>
            <h5>{user.amount}개</h5>
            <OkBtn onClick={() => handleOkButtonClick(user.transaction_id)}>
              {user.status}
            </OkBtn>
          </CustomerList>
        ))}

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
