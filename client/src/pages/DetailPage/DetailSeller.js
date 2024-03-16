import { Container } from "../../Layout";
import Header from "../../components/Header";
import {
  DetailWrapper,
  ImgWrapper,
  NameWrapper,
  TitleBtnWrapper,
  SellerEditBtn,
  OkBtn,
  CustomerList,
} from "./DetailStyle";

import {
  KeywordWrapper,
  Keywords,
  CategoryWrapper,
} from "../UploadPage/UploadStyle";

const DetailSeller = () => {
  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <DetailWrapper>
        <ImgWrapper></ImgWrapper>
        <NameWrapper>
          <h5>김*희</h5>
          <h5>8/20명</h5>
        </NameWrapper>
        <TitleBtnWrapper>
          <h1>이화 교포 후리스</h1>
          <SellerEditBtn>수정</SellerEditBtn>
        </TitleBtnWrapper>
        <h5>2024. 03. 21일까지 모집중</h5>
        <CategoryWrapper>
          <KeywordWrapper>
            <Keywords>화이트</Keywords>
            <Keywords>초록색</Keywords>
            <Keywords>자수로고</Keywords>
          </KeywordWrapper>
        </CategoryWrapper>

        <hr />
        <h5>가격</h5>
        <h3>45000원</h3>

        <hr />
        <h5>모집 종료까지 남은 시간</h5>
        <h3>2일 8시간 51분 57초</h3>

        <hr />
        <h4>
          휘뚜루 마뚜루 입고 다니기 최고인 기본 후리스입니다. 20명 기준
          4.5정도입니다. 인원이 더 모이면 가격은 더 내려갈 거 같습니다
        </h4>

        <hr />
        <Keywords>참여자 명단</Keywords>
        <CustomerList>
          <h5>김*희</h5>
          <h5>화이트</h5>
          <h5>M</h5>
          <h5>1개</h5>
          <OkBtn>입금완료</OkBtn>
        </CustomerList>

        <hr />
        <h5>참여완료 후 오픈채팅방에 꼭 입장해주세요!</h5>
        <h4>https://open.kakao.com/o/g3ptIAdg</h4>

        <hr />
        <Keywords>문의하기</Keywords>
        <h5>질문이 있을 경우 아래 오픈채팅방에 입장해 질문해주세요!</h5>
        <h4>https://open.kakao.com/o/g3ptIAdg</h4>

        <hr />
        <Keywords>Q. 수령은 언제 가능한가요?</Keywords>
        <h4>
          상품 수령은 상품 주문 후 7일~14일 후 가능합니다. 자세한 수령일자는
          오픈 카톡방에서 알려드리겠습니다!
        </h4>
      </DetailWrapper>
    </Container>
  );
};

export default DetailSeller;
