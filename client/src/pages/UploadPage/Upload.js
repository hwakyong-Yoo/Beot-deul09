import { Container } from "../../Layout";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faTimesCircle,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
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
  KeywordWrapper,
  Category,
  Keywords,
  CategoryWrapper,
  KeyWrapper,
  QuestionWrapper,
} from "./UploadStyle";
import { Calender } from "../LoginPage/FindPwStyle";
import { LoginBtn } from "../LoginPage/LoginStyle";
import axios from "axios";
import keywordList from "./keywordList";

const Upload = () => {
  const [product, setProduct] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [min_participants, setMin_participants] = useState();
  const [price, setPrice] = useState();
  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
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

  const handleKeywordClick = (keyword) => {
    if (keywords.includes(keyword)) {
      setKeywords((prevKeywords) =>
        prevKeywords.filter((kw) => kw !== keyword)
      );
    } else {
      setKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      product.length < 1 ||
      explanation.length < 1 ||
      answer1.length < 1 ||
      answer2.length < 1 ||
      answer3.length < 1 ||
      min_participants.length < 1 ||
      price.length < 4 ||
      chatroom_link.length < 1
    ) {
      alert("입력 정보를 확인해주세요");
      return;
    }

    // 회원가입 정보와 나이(age)를 서버에 전송
    const uploadData = {
      product: product,
      explanation: explanation,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      min_participants: min_participants,
      price: price,
      chatroom_link: chatroom_link,
      deadline: deadline,
      keywords: keywords,
    };

    axios
      .post("http://localhost:80/posts", uploadData)
      .then((response) => {
        console.log(uploadData);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(uploadData);
      });
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
          onChange={(e) => setProduct(e.target.value)}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>키워드 선택</h3>
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
        <QuestionWrapper>
          <span>Q. 수령은 언제 가능한가요?</span>
          <TitleInput
            placeholder="답변예시. 0월00일에 수령할 수 있습니다."
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            type="text"
          />
          <span>Q. 이름에 특수 기호를 적을 수 있나요?</span>
          <TitleInput
            placeholder="답변예시. 0월00일에 수령할 수 있습니다."
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            type="text"
          />
          <span>Q. 모집인원이 총 몇명인가요?</span>
          <TitleInput
            placeholder="답변예시. 0월00일에 수령할 수 있습니다."
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
            type="text"
          />
        </QuestionWrapper>
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>마감일</h3>
        <Calender>
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#A4A4A4" }} />
          <DatePicker
            selected={deadline}
            onChange={(date) => {
              const formattedDate = date.toISOString().split("T")[0];
              setDeadline(formattedDate);
              console.log(formattedDate);
            }}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={30}
            minDate={new Date()}
          />
        </Calender>
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>최소인원</h3>
        <TitleInput
          placeholder="0명"
          value={min_participants}
          onChange={(e) => setMin_participants(parseInt(e.target.value))}
          type="text"
        />
      </UploadTitleWrapper>

      <UploadTitleWrapper>
        <h3>가격</h3>
        <TitleInput
          placeholder="1개당 가격"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          type="text"
        />
      </UploadTitleWrapper>

      <LoginBtn onClick={handleSubmit}>작성 완료</LoginBtn>
    </Container>
  );
};
export default Upload;
