import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/custom.css";

const MainSlider = () => {
  const [books, setBooks] = useState([]);
  const slider1 = useRef();
  const slider2 = useRef();

  const genreToCategoryId = require('../common/genreToCategoryId');

  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: slider2.current,
  };

  const settings2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: slider1.current,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem('userid'));
        let genre1;
  
        if (userId) {
          const response = await axios.get(`/api/usergenre/${userId}`);
          genre1 = response.data.genre1;
        } else {
          // 로그인하지 않은 사용자의 경우 genreToCategoryId 배열에서 첫 번째 항목의 장르를 사용
          genre1 = genreToCategoryId[0].genre;
        }
  
        const categoryId = genreToCategoryId.find(item => item.genre === genre1).categoryId;
        const aladinResponse = await axios.get(`/api/aladin/${categoryId}`, {
          params: {
            Query: genre1,
            QueryType: "Title",
          },
        });
        console.log("오늘의 책 로그인 한 유저 : ", userId); // 디버깅용
        console.log("오늘의 책 로그인 한 유저의 장르1번 : ", genre1); // 디버깅용
        console.log("오늘의 책 테스트 : ", aladinResponse.data.item); // 디버깅용
        setBooks(aladinResponse.data.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="smain_container">
      <h2>오늘의 책</h2>
      <div className="main-slider">
        <Slider {...settings1} ref={slider1} className="main">
          {books.map((book) => (
            <div key={book.isbn}>
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
          ))}
        </Slider>
      </div>
      <div className="main-slider">
        <Slider {...settings2} ref={slider2}>
          {books.map((book) => (
            <div key={book.isbn}>
              <img className="img1" src={book.cover} alt={book.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainSlider;
