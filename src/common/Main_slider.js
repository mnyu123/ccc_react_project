import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../css/custom.css";

// api 정보 관련 가져오기
import axios from "axios";

const MainSlider = () => {
  // api 관련
  const [books, setBooks] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aladin/1`, {
          params: {
            Query: "소설",
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
    <div className="smain_container">
      <h2>오늘의 책</h2>
      <Slider {...settings} className="main">
        {books.map((book) => (
          <div className="item1 custom-class" key={book.isbn}>
            <div className="slide-content">
              <img className="img1" src={book.cover} alt={book.title} />
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <p className="book-description">
                  <img src="/images/ccc_image/dialogue.png" alt="말풍선" />
                  <span className="bookinfo">{book.description}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
