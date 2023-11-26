import React, { useState } from "react";
import "../css/Polledit.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const genres = [
  "소설",
  "시/에세이",
  "인문",
  "가정/육아",
  "요리",
  "건강",
  "취미/실용",
  "경제",
  "자기계발",
  "정치/사회",
  "역사/문화",
  "종교",
  "예술",
  "사회과학",
  "자연과학",
  "공학",
  "여행",
  "컴퓨터과학",
  "참고서",
  "잡지",
  "취업/수험서",
  "청소년",
  "만화",
];

const Polledit = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const userid = JSON.parse(sessionStorage.getItem('userid'));

  const handleCheck = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      setErrorMessage(true);
    } else {
      try {
        const user = {
          userid, // 사용자 아이디를 요청 본문에 추가
          usergenre: {
            genre1: selectedGenres[0],
            genre2: selectedGenres[1],
            genre3: selectedGenres[2],
          },
        };
        const response = await axios.post("http://localhost:3000/polledit", user);
        console.log(response.data);
        setErrorMessage(false);
        setShowPopup(false);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div id="popup" className={`popup ${showPopup ? "show-popup" : ""}`}>
      <div className="overlay"></div>
      <div className="content-title">
        <div className="title-container">
          <h1>선호 장르 조사</h1>
          <button className="close-btn" onClick={props.onClose}>
            <img src="images/ccc_library/close.png" alt="close" />
          </button>
        </div>
      </div>
      <div className="content-explain">
        <h2>책 선호 장르를 선택해 주세요.</h2>
      </div>
      <div className="content">
        {genres.map((genre, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="genre"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleCheck(genre)}
            />{" "}
            {genre}
          </div>
        ))}
        <div className="positioned-container">
          {errorMessage && <p className="error-message">적어도 하나의 장르를 선택해 주세요.</p>}
          <button className="signup-btn" onClick={handleSubmit}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Polledit;
