import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { MainSearchForm, SearchInput, SearchWrapper } from "./SearchStyle";
import { Container } from "../../Layout";
import Header from "../../components/Header";

const Search = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    const searchTerm = searchRef.current.value;

    if (searchTerm.length < 1) {
      searchRef.current.focus();
      return;
    }
  };
  return (
    <Container>
      <Header />
      <SearchWrapper>
        <FontAwesomeIcon icon={faAngleLeft} onClick={handleBackClick} />
        <MainSearchForm onSubmit={handleSubmit}>
          <SearchInput
            placeholder="검색어 입력"
            value={searchTerm}
            ref={searchRef}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="2xl"
            style={{ color: "#85CC16" }}
          />
        </MainSearchForm>
      </SearchWrapper>
    </Container>
  );
};
export default Search;
