import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../common/Header";

function BookSearch({ query }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/aladin/${query}`);
        console.log("API 뜨는지",response.data); // 콘솔에 데이터 출력
        setBooks(response.data.item);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [query]);

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (!books) {
    return null;
  }

  return (
    <div>
      <Header />
      {books.map((book) => (
        <div key={book.isbn}>
          <h2>{book.title}</h2>
          <img src={book.cover} alt={book.title} />
        </div>
      ))}
    </div>
  );
}

export default BookSearch;
