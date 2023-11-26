import React, { useState, useEffect } from "react";
import axios from "axios";

import "../css/Main_monthbook.css";

const Main_monthbook = () => {
  const [books, setBooks] = useState([]);
  const [viewMore, setViewMore] = useState(false); // 더보기 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aladin/55889`, {
          params: {
            Query: '시/에세이', 
            QueryType: 'Title'
          },
        });
        setBooks(response.data.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <div className="monthbooks_wrap" id="monthbooks_wrap">
      <div className="month_title">이달의 책</div>
      <div className="view_more" id="view-more" onClick={handleViewMore}>
        {viewMore ? "< 더보기" : "접기 >"}
      </div>
      {viewMore ? (
        <div className="month" id="more-books">
          {" "}
          {/* 다른 책 컴포넌트들... */}{" "}
        </div>
      ) : (
        <div className="book_covers">
          {books.map((book, index) => (
            <div className="coverbook1" key={book.isbn}>
              <img src={book.cover} alt={`book${index + 1}`} />
              <div className="coverexplain">
                <div className="bookcovertitle">{book.title}</div>
                <div className="author">{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main_monthbook;