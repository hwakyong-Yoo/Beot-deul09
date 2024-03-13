import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/Main";
import SignIn from "./pages/LoginPage/SignIn";
import SignUp from "./pages/LoginPage/SignUp";
import My from "./pages/MyPage/My";
import UserInfo from "./pages/MyPage/Userinfo";
import Recommend from "./pages/RecommendPage/Recommend";
import Search from "./pages/SearchPage/Search";
import Upload from "./pages/UploadPage/Upload";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my" element={<My />} />
        <Route path="/my/userinfo" element={<UserInfo />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
