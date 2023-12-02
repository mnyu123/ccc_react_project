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
    <div id="popup2" className={`popup2 ${showPopup ? "show-popup2" : ""}`}>
      <div className="overlay2"></div>
      <div className="content-title2">
        <div className="title-container2">
          선호 장르 조사
          <button className="close-btn2" onClick={props.onClose}>
            <img src="images/ccc_library/close.png" alt="close" />
          </button>
        </div>
      </div>
      <div className="content-explain2">
        책 선호 장르를 선택해 주세요.
      </div>
      <div className="content2">
        {genres.map((genre, index) => (
          <div key={index} className="genre-item2">
            <input
              type="checkbox"
              name="genre"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleCheck(genre)}
            />
            <span className="genre-name2">{genre}</span>
          </div>
        ))}
        <div className="positioned-container2">
          {errorMessage && <p className={`error-message2 ${errorMessage ? "show-error2" : ""}`}>적어도 하나의 장르를 선택해 주세요.</p>}
          <button className="signup-btn2" onClick={handleSubmit}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Polledit;
