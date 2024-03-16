import { Container } from "../../Layout";
import Header from "../../components/Header";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Participate = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleParticipateClick = () => {
    alert("참여가 완료되었습니다!");
    navigate("/");
  };

  return (
    <Container>
      <Header headText={"벗들공구"} />
      <hr />
      <AccountInfo>
        <FormItem>
          <h4>사이즈</h4>
          <select id="size" value={size} onChange={handleSizeChange}>
            <option value="">사이즈 선택</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
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
      </AccountInfo>
      <hr />
      <AccountInfo>
        <h4>입금계좌 </h4>
        <hr />
        <Account>
          <p>신한 110513648751</p>
          <h4>예금주 : 김주희</h4>
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
