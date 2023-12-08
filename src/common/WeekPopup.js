import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; //모달을 위해 react modal 컴포넌트를 사용했습니다.
import "../css/WeekPopup.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    zIndex: "1000",
  },
};

Modal.setAppElement("#root");

const WeekPopup = ({ onClose }) => {
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 로그인 상태를 확인
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    // 로그인 상태가 true가 아닐 경우 로그인 페이지로 이동
    if (isLoggedIn !== "true") {
      navigate("/");
    }
    // 사용자가 '오늘 다시 보지 않음'을 선택했는지 확인
    const dontShowToday = localStorage.getItem("dontShowToday");
    if (dontShowToday === "true") {
      onClose();
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  const handleDontShowToday = () => {
    localStorage.setItem("dontShowToday", "true"); // 오늘 다시 보지 않음을 저장
    onClose();
  };

  return (
    <Modal
      isOpen={sessionStorage.getItem("isLoggedIn") === "true"}
      onRequestClose={onClose} //모달이 닫힘(화면 외부를 클릭하거나 esc키 감지)
      style={customStyles}
      contentLabel="modal"
    >

      <div className="week">
        <div className="week-book"><h4>이번주의 책</h4></div>
        <span className="close" onClick={onClose}>&times;</span>
      </div>
      <hr />
      <div className="book">
        <div className="book-cover_w">책 표지</div>
        <div className="book-explain">
          <div className="book-title_w">제목의 길이가 제일 긴거는 얼마나 길까 진짜 길겠지</div>
          <div className="book-author_w">저자</div>
          <div className="book-review_w">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</div>
        </div>
      </div>
      <hr />
      <div className="check-close">
        <input
          type="checkbox"
          id="remember"
          checked={isRemembered}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="remember">오늘 하루 열지 않음</label>
      </div>
    </Modal>
  );
};

export default WeekPopup;
