import { Container } from "../../Layout";
import { useRef, useState } from "react";
import UploadHeader from "../../components/UploadHeader";
import {
  ImgUploadWrapper,
  ImgUpload,
  UploadTitleWrapper,
  TitleInput,
} from "./UploadStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  const productRef = useRef();
  const [product, setProduct] = useState("");
  const [explanation, setExplanation] = useState("");
  const [qna, setQna] = useState("");
  const [min_participants, setMin_participants] = useState(0);
  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [chatroom_link, setChatroom_link] = useState("");
  const [keywords, setKeywords] = useState([]);

  return (
    <Container>
      <UploadHeader />
      <hr />
      <ImgUploadWrapper>
        <ImgUpload>
          <FontAwesomeIcon
            icon={faCamera}
            size="2xl"
            style={{ color: "#898989" }}
          />
          <h4>0/5</h4>
        </ImgUpload>
        <ImgUpload>
          <FontAwesomeIcon
            icon={faCamera}
            size="2xl"
            style={{ color: "#898989" }}
          />
          <h4>대표 이미지</h4>
        </ImgUpload>
      </ImgUploadWrapper>

      <UploadTitleWrapper>
        <h3>제목</h3>
        <TitleInput
          placeholder="제목을 작성해주세요."
          value={product}
          ref={productRef}
          onChange={(e) => setProduct(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>키워드 선택</h3>
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>공구 설명</h3>
        <TitleInput
          placeholder="공동구매에 대한 자세한 내용을 작성해주세요."
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>오픈채팅방 링크</h3>
        <TitleInput
          placeholder="오픈채팅방 링크를 삽입해주세요."
          value={chatroom_link}
          onChange={(e) => setChatroom_link(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>자주하는 질문</h3>
        <TitleInput
          placeholder="답변예시. 0월00일에 수령할 수 있습니다."
          value={qna}
          onChange={(e) => setQna(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>마감일</h3>
        <TitleInput
          placeholder="오픈채팅방 링크를 삽입해주세요."
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>최소인원</h3>
        <TitleInput
          placeholder="0명"
          value={min_participants}
          onChange={(e) => setMin_participants(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>가격</h3>
        <TitleInput
          placeholder="1개당 가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>
    </Container>
  );
};
export default Upload;
