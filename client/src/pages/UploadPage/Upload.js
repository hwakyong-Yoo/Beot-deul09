import { Container } from "../../Layout";
import { useRef, useState } from "react";
import UploadHeader from "../../components/UploadHeader";
import {
  ImgUploadWrapper,
  ImgUpload,
  UploadTitleWrapper,
  TitleInput,
  ImgList,
  ListWrapper,
  RemoveBtn,
  ImgBtnWrapper,
} from "./UploadStyle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  const productRef = useRef();
  const [product, setProduct] = useState("");
  const [explanation, setExplanation] = useState("");
  const [qna, setQna] = useState("");
  const [min_participants, setMin_participants] = useState();
  const [price, setPrice] = useState();
  const [deadline, setDeadline] = useState("");
  const [chatroom_link, setChatroom_link] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [images, setImages] = useState([]);

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (images.length >= 5) {
      alert("이미지는 최대 5개까지만 업로드할 수 있습니다.");
      return;
    }

    reader.onloadend = () => {
      setImages((prevImages) => [...prevImages, reader.result]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(images);
  };
  return (
    <Container>
      <UploadHeader />
      <hr />
      <ImgUploadWrapper>
        <ListWrapper>
          <ImgUpload>
            <label htmlFor="image-upload">
              <FontAwesomeIcon
                icon={faCamera}
                size="2xl"
                style={{ color: "#898989", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {images.length} / 5
          </ImgUpload>
        </ListWrapper>

        <ListWrapper>
          {images.map((image, index) => (
            <ImgList key={index}>
              <ImgBtnWrapper>
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  style={{ maxWidth: "100%" }}
                />
                <RemoveBtn onClick={() => handleRemoveImage(index)}>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    style={{ color: "#898989", cursor: "pointer" }}
                  />
                </RemoveBtn>
              </ImgBtnWrapper>
            </ImgList>
          ))}
        </ListWrapper>
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
