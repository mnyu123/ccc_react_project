import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/custom.css";

const MainSlider = () => {
  const [books, setBooks] = useState([]);
  const slider1 = useRef();
  const slider2 = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const genreToCategoryId = require("../common/genreToCategoryId");

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black", right: "-50px" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "green",
          position: "absolute", // 위치를 절대값으로 지정
          left: "-550px", // 왼쪽으로부터 -50px 위치에 버튼을 둠
        }}
        onClick={onClick}
      />
    );
  };


  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    initialSlide: 4,
    asNavFor: slider2.current,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlideIndex(next),
  };

  const settings2 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: slider1.current,
    arrows: true,
    centerMode: false,
    initialSlide: 0,
    centerPadding: "0px",
    focusOnSelect: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    draggable: false,
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("userid"));
        let genre1;

        if (userId) {
          const response = await axios.get(`/api/usergenre/${userId}`);
          genre1 = response.data.genre1;
        } else {
          // 로그인하지 않은 사용자의 경우 genreToCategoryId 배열에서 첫 번째 항목의 장르를 사용
          genre1 = genreToCategoryId[0].genre;
        }

        const categoryId = genreToCategoryId.find(
          (item) => item.genre === genre1
        ).categoryId;
        const aladinResponse = await axios.get(`/api/aladin/${categoryId}`, {
          params: {
            Query: genre1,
            QueryType: "Title",
          },
        });
        console.log("오늘의 책 로그인 한 유저 : ", userId); // 디버깅용
        console.log("오늘의 책 로그인 한 유저의 장르1번 : ", genre1); // 디버깅용
        // console.log("오늘의 책 테스트 : ", aladinResponse.data.item); // 디버깅용
        setBooks(aladinResponse.data.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="smain_wrap">
    <h2 className="sh2">오늘의 책</h2>
    <div className="smain_container">
      
      <div className="main-slider main-slider1">
        <Slider {...settings1} ref={slider1} className="main">
          {books.map((book, index) => (
            <div key={book.isbn}>
              <div className="slide-content">
                <div className="slide1_img">
                  <Link to={`/bookDetail/${book.isbn}`}>
                    <img className="img1" src={book.cover} alt={book.title} />
                  </Link>
                </div>
                <div className="book-info">
                  <p className="book-title_s">{book.title}</p>
                  <p className="book-author_s">{book.author}</p>
                  <p className="book-description">
                    <img src="/images/ccc_image/dialogue.png" alt="말풍선" className="bicon" />
                    <span className="bookinfo">{book.description}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="main-slider main-slider2">
        <Slider {...settings2} ref={slider2}>
          {books.map((book, index) => {
            return (
              <div key={book.isbn}>
                <img className="img2" src={books[index].cover} alt={books[index].title} />
              </div>
            );
          })}
        </Slider>

      </div>

    </div>
    </div>
  );


};

export default MainSlider;
