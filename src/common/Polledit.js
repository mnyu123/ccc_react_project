import React, { useState } from "react";
import "../css/Polledit.css";

const Polledit = (props) => {
  const [showPopup, setShowPopup] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const genres = [
    [
      "소설",
      "시/에세이",
      "인문",
      "가정/육아",
      "요리",
      "건강",
      "취미/실용",
      "경제",
      "자기계발",
    ],
    [
      "정치/사회",
      "역사/문화",
      "종교",
      "예술",
      "사회과학",
      "자연과학",
      "공학",
      "여행",
      "컴퓨터과학",
    ],
    ["참고서", "잡지", "취업/수험서", "청소년", "만화"],
  ];

  const submitForm = (e) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    if (checkboxes.length === 0) {
      setErrorMessage("적어도 하나의 장르를 선택해 주세요.");
    } else {
      setErrorMessage("");
      setShowPopup(false);
    }
  };

  return (
    <div id="popup" className={`popup ${showPopup ? "show-popup" : ""}`}>
      <div className="overlay"></div>
      <div className="content-title">
        <div className="title-container">
          <h1>선호 장르 조사</h1>
          <button className="close-btn" onClick={props.onClose}>
            <img src="close.png" alt="close" />
          </button>
        </div>
      </div>
      <div className="content-explain">
        <h2>책 선호 장르를 선택해 주세요.</h2>
      </div>
      <div className="content">
        {genres.map((genreGroup, index) => (
          <form id={`genre-form${index + 1}`}>
            {genreGroup.map((genre) => (
              <>
                <input type="checkbox" name="genre" value={genre} /> {genre}
                <br />
              </>
            ))}
          </form>
        ))}
        <div className="positioned-container">
          <p
            className="error-message"
            style={{ display: errorMessage ? "block" : "none" }}
          >
            {errorMessage}
          </p>
          <button className="signup-btn" onClick={submitForm}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Polledit;
