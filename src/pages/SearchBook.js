// SearchBook.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import "../css/SearchBook.css";

const SearchBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    // URL에서 검색어 가져오기
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    setSearchQuery(query);

    // 검색 결과를 서버에서 가져오는 함수
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/aladin/booksearch`, {
          params: {
            Query: query,
          },
        });
        setSearchResults(response.data.item);
      } catch (error) {
        console.error("서버 요청 오류:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, []);

  return (
    <div >
      <Header />
      <div className="result_wrap">
      <strong> '{searchQuery}' 검색 결과 </strong> <span>(총 {searchResults.length}개)</span>

      <ul>
        {searchResults.map((result) => (
          <li key={result.itemId}>
            <Link to={`/bookdetail/${result.isbn}`} style={{ textDecoration: 'none' }}>
              <div>
                <h4>{result.title}</h4>
                <img src={result.cover} alt={result.title} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default SearchBook;
