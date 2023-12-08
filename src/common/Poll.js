import React, { useState } from "react";
import "../css/Poll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const genres = [
  "소설",
  "성생활",
  "인문",
  "한국요리",
  "제과제빵",
  "인테리어",
  "공예",
  "경제경영",
  "자기계발",
  "자습서",
  "철학",
  "탈모",
  "식물도감",
  "종교학",
  "지구과학",
  "컴퓨터공학",
  "여행",
  "생명과학",
  "판타지",
  "문학잡지",
  "순정만화",
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
        // console.log(response.data);
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
      <div className="content-title">선호 장르 조사</div>
      <div className="content-explain">책 선호 장르를 선택해 주세요.</div>
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
            <span className="genre-name2">{genre}</span>
          </div>
        ))}
        <div className="positioned-container">
          <div className="button-and-error">
            <button className="signup-btn" onClick={handleSubmit}>
              회원가입
            </button>
            {errorMessage && (
              <p
                className={`error-message ${errorMessage ? "show-error" : ""}`}
              >
                적어도 하나의 장르를 선택해 주세요.
              </p>
            )}
          </div>
          {isSignedUp && <p>회원가입이 완료되었습니다.</p>}{" "}
          {/* 회원가입 완료 메시지 출력 */}
        </div>
      </div>
    </div>
  );
};

export default Poll;
