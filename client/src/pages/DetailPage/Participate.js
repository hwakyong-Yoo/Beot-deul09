import { Container } from "../../Layout";
import Header from "../../components/Header";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Participate = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(1);
  const [height, setHeight] = useState(1);
  const [weight, setWeight] = useState(1);
  const [recommendSize, setRecommendSize] = useState("");

  const [product_option, setProduction_Option] = useState("");
  const [response, setResponse] = useState([]);
  const { postId } = useParams();

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`http://localhost/posts/${postId}`);
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleOptionChange = (e) => {
    setProduction_Option(e.target.value);
  };

  const handleSizeCheckClick = () => {
    // 사용자의 height와 weight 데이터를 서버로 전송
    const data = {
      height: height,
      weight: weight,
    };

    axios
      .post("http://localhost:80/send-data", data)
      .then((response) => {
        console.log("데이터 전송 완료:", response.data);
        setRecommendSize(response.data);

        // 필요한 경우 추가적인 작업 수행
      })
      .catch((error) => {
        console.error("데이터 전송 실패:", error);
      });
  };

  const handleParticipateClick = () => {
    const postData = {
      amount: amount,
      size: size,
      product_option: product_option,
    };
    axios
      .post(`http://localhost:80/purchase/${postId}`, postData, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        console.log("참여가 완료되었습니다:", response.data);
        alert("참여가 완료되었습니다!");

        navigate("/");
      })
      .catch((error) => {
        console.error("참여에 실패했습니다:", error);
      });
  };

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <AccountInfo>
        <h2>맞춤 사이즈를 추천해드려요!</h2>
        <FormItem>
          <h4>키</h4>
          <input
            type="number"
            id="quantity"
            value={height}
            onChange={handleHeightChange}
          />
        </FormItem>

        <hr />
        <FormItem>
          <h4>몸무게</h4>
          <input
            type="number"
            id="quantity"
            value={weight}
            onChange={handleWeightChange}
          />
        </FormItem>

        <button onClick={handleSizeCheckClick}>사이즈 확인하기</button>
        {recommendSize && <h3>추천 사이즈: {recommendSize}</h3>}
      </AccountInfo>

      <AccountInfo>
        <FormItem>
          <h4>사이즈</h4>
          <select id="size" value={size} onChange={handleSizeChange}>
            <option value="">사이즈 선택</option>
            <option value="S">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="L">XL</option>
          </select>
        </FormItem>
        <hr />
        <FormItem>
          <h4>수량</h4>
          <input
            type="number"
            id="quantity"
            min="1"
            value={amount}
            onChange={handleAmountChange}
          />
        </FormItem>
        <hr />
        <FormItem>
          <h4>옵션</h4>
          <input
            type="text"
            id="option"
            value={product_option}
            onChange={handleOptionChange}
          />
        </FormItem>
      </AccountInfo>
      <hr />
      <AccountInfo>
        <h4>입금계좌 </h4>
        <hr />
        <Account>
          <p>{response.account_num}</p>
          <h4>예금주 : {response.account_holder}</h4>
        </Account>
      </AccountInfo>

      <ParticipateButton onClick={handleParticipateClick}>
        참여하기
      </ParticipateButton>
    </Container>
  );
};

const FormItem = styled.div`
  display: flex;
  align-items: center;
  select,
  input {
    height: 30px;
    border: none;
  }
`;

const AccountInfo = styled.div`
  width: 336px;
  border-radius: 13px;
  border: 1px solid #aeaeae;
  margin: 5px auto;
  h4 {
    margin: 16px 21px;
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ParticipateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #004916;
  width: 335px;
  height: 52px;
  margin: 10px 18px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Participate;
