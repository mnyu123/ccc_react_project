// SearchBook.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);

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
    <div>
      <h1>검색 결과</h1>
      <h2>검색어: {searchQuery}</h2>
      <ul>
        {searchResults.map((result) => (
          <li key={result.itemId}>
            <div>
              <h2>{result.title}</h2>
              <img src={result.cover} alt={result.title} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBook;
