import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 336px;
  margin: 24px auto 13px;
`;

export const LogoWrapper = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  display: flex;
  justify-content: space-between;

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
  }

  font-family: "GmarketSansMedium";
  font-size: 24px;
  color: black;

  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;

  img {
    height: 27px;
    height: 27px;
    margin-right: 6px;
  }
`;

export const HButton = styled.button`
  height: 40px;
  border-radius: 4px;
  background-color: white;
  border: #e9e9e9 1px solid;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: "Pretendard-Regular";
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2c;
  padding: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #9a9a9a;
  }
`;

export const LogoutWrapper = styled.div`
  display: flex;
`;

export const LogoutBtn = styled.button`
  background-color: #ffffff;
  border: none;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  color: #707070;
  cursor: pointer;
`;

export const UserBtn = styled.button`
  background-color: #ffffff;
  border: none;
  font-family: "Pretendard-Regular";
  font-size: 11px;
  color: #707070;
  text-decoration: underline solid #707070;
  cursor: pointer;
`;

export const UserIconNav = styled.nav`
  cursor: pointer;
`;
