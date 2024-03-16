import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/Main";
import Login from "./pages/LoginPage/LogIn";
import SignUp from "./pages/LoginPage/SignUp";
import My from "./pages/MyPage/My";
import UserInfo from "./pages/MyPage/Userinfo";
import Recommend from "./pages/RecommendPage/Recommend";
import Search from "./pages/SearchPage/Search";
import Upload from "./pages/UploadPage/Upload";
import FindPw from "./pages/LoginPage/FindPw";
import ChangePw from "./pages/LoginPage/ChangePw";
import DetailCustomer from "./pages/DetailPage/DetailCustomer";
import DetailSeller from "./pages/DetailPage/DetailSeller";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/my" element={<My />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/changepw" element={<ChangePw />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/detailcustomer/:postId" element={<DetailCustomer />} />
        <Route path="/detailseller/:postId" element={<DetailSeller />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
