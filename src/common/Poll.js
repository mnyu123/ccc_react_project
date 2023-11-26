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

const Poll = ({ isModalOpen, setIsModalOpen }) => {
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
          usergenre: {
            genre1: selectedGenres[0],  // 첫 번째 장르
            genre2: selectedGenres[1],  // 두 번째 장르
            genre3: selectedGenres[2],  // 세 번째 장르
          },
        };
        const response = await axios.post('http://localhost:3000/poll', user);
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
        <h1>선호 장르 조사</h1>
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
          {errorMessage && (
            <p className="error-message">적어도 하나의 장르를 선택해 주세요.</p>
          )}
          {isSignedUp && <p>회원가입이 완료되었습니다.</p>}{" "}
          {/* 회원가입 완료 메시지 출력 */}
          <button className="signup-btn" onClick={handleSubmit}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Poll;
