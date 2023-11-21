import React, { useState, useEffect } from "react";
import "../css/WeekPopup.css";

const WeekPopup = ({ onClose }) => {
  console.log("이번주 책 팝업 렌더링 됨.");

  const [isRemembered, setIsRemembered] = useState(false);

  const handleClose = () => {
    onClose(); // 부모 컴포넌트에서 전달된 onClose 함수 호출
    if (isRemembered) {
      // 쿠키에 저장하는 로직이 들어가야 함
    }
  };

  const handleCheckboxChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div className="week">
          <div className="week-book">
            <h4>금주의 책</h4>
          </div>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className="book">
          <div className="book-cover">책 표지</div>
          <div className="book-explain">
            <div className="book-title">
              <h1>책 제목</h1>
            </div>
            <div className="book-author">
              <h5>저자</h5>
            </div>
            <div className="book-review">
              <h4>
                동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              </h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="check-close">
          <input
            type="checkbox"
            id="remember"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="remember">오늘 하루 열지 않음</label>
        </div>
      </div>
    </div>
  );
};

export default WeekPopup;
