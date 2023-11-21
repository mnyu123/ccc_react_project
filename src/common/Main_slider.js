import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../css/custom.css";

const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="smain_container">
      <h2>오늘의 책</h2>
      <div className="main_wrap">
        <Slider {...settings} className="main">
        <div className="item1 custom-class">
            <div className="slide-content">
              <img
                className="img1"
                src="/images/ccc_bookcover/도쿄 에일리언즈 7.jpg"
                alt="책 표지"
              />
              <div className="book-info">
                <p className="book-title">[분야]도쿄 에일리언즈</p>
                <p className="book-author">저자 이름</p>
                <p className="book-description">
                  <img src="/images/ccc_image/dialogue.png" alt="말풍선" />
                  <span className="bookinfo">책 소개...</span>
                </p>
              </div>
            </div>
          </div>
          {/* 위와 같은 형식의 아이템을 추가하실 수 있습니다. */}
        </Slider>
      </div>
      <div className="arrowSlider">
        <div className="prev" id="aro1_prev">
          {"<"}
        </div>
        <Slider {...navSettings} className="main-nav">
          <div className="item2">
            <img
              src="/images/ccc_bookcover/도쿄 에일리언즈 7.jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/황제의 외동딸(만화) 1.jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/하루만 네가 되고 싶어.jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img src="/images/ccc_bookcover/주술회전.jpg" alt="책 표지" />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/오투 중등 과학 3-2(2023).jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/역대급 영지 설계사 1.jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/역대급 영지 설계사 1.jpg"
              alt="책 표지"
            />
          </div>
          <div className="item2">
            <img src="/images/ccc_bookcover/명탐정코난.jpg" alt="책 표지" />
          </div>
          <div className="item2">
            <img
              src="/images/ccc_bookcover/쎈 중등 수학 2-2(2023).jpg"
              alt="책 표지"
            />
          </div>
        </Slider>
        <div className="next" id="aro1_next">
          {">"}
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
