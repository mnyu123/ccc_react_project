import React, { useState } from "react";
import "../css/Poll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Poll = ({ isModalOpen, setIsModalOpen, userId }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const navigate = useNavigate();

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
          userId,
          usergenre: {
            genre1: selectedGenres[0], // 첫 번째 장르
            genre2: selectedGenres[1], // 두 번째 장르
            genre3: selectedGenres[2], // 세 번째 장르
          },
        };
        const response = await axios.post("http://localhost:3000/poll", user);
        console.log(response.data);
        setErrorMessage(false);
        setIsSignedUp(true);
        setIsModalOpen(false);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div id="popup" className={`popup ${isModalOpen ? "show-popup" : ""}`}>
      <div className="overlay"></div>
      <div className="content-title">
        선호 장르 조사
      </div>
      <div className="content-explain">
        책 선호 장르를 선택해 주세요.
      </div>
      <div className="content">
        {genres.map((genre, index) => (
          <div key={index} className="genre-item">
            <input
              type="checkbox"
              name="genre"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleCheck(genre)}
            />{" "}
            <span className="genre-name2">
              {genre}
            </span>
          </div>
        ))}
        <div className="positioned-container">
          <div className="button-and-error">
            <button className="signup-btn" onClick={handleSubmit}>
              회원가입
            </button>
            {errorMessage && <p className={`error-message ${errorMessage ? "show-error" : ""}`}>
              적어도 하나의 장르를 선택해 주세요.</p>}
          </div>
          {isSignedUp && <p>회원가입이 완료되었습니다.</p>}{" "}
          {/* 회원가입 완료 메시지 출력 */}
        </div>
      </div>
    </div>
  );
};

export default Poll;
