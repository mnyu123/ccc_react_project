import React, { useState, useEffect } from "react";
import "../css/Main_hot_topic.css";

import axios from "axios";

const MainHotTopic = () => {
  // api 데이터
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aladin/656`, {
          params: {
            Query: "인문",
            QueryType: "Title",
          },
        });
        setBooks(response.data.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="soaring_wrap" id="soaring_wrap">
      <h2>급상승</h2>
      <div className="slide">
        <div className="soaring1">
          {books.map((book, index) => (
            <div key={book.isbn} className="item">
              <img src={book.cover} alt={book.title} />
              <span className="number">{index + 1}</span>
              <p className="description">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHotTopic;
