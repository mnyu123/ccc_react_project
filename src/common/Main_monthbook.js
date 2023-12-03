import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../css/Main_monthbook.css";

const Main_monthbook = () => {
  const [books, setBooks] = useState([]);
  const [viewMore, setViewMore] = useState(false); // 더보기 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aladin/2551`, {
          params: {
            Query: "만화",
            QueryType: "Title",
          },
        });
        console.log("이달의 책 테스트 : ",response.data.item); // 디버깅용
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
          {books.slice(0, viewMore ? 3 : books.length).map((book, index) => (
            <Link to={`/bookDetail/${book.isbn}`} key={book.isbn}>
              <div className="coverbook1">
                <img src={book.cover} alt={`book${index + 1}`} />
                <div className="coverexplain">
                  <div className="bookcovertitle">{book.title}</div>
                  <div className="author">{book.author}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main_monthbook;
