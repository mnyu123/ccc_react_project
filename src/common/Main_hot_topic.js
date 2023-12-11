import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Main_hot_topic.css";
import genreToCategoryId from "../common/genreToCategoryId"; // genreToCategoryId를 import

const MainHotTopic = () => {
  // api 데이터
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("userid"));
        let genre3;

        if (userId) {
          const response = await axios.get(`/api/usergenre/${userId}`);
          genre3 = response.data.genre3;
        } else {
          // 사용자가 로그인하지 않은 경우 기본값 설정
          genre3 = "만화"; // 예시 기본값
        }

        // genreToCategoryId에서 해당 장르에 맞는 categoryId를 찾습니다.
        const foundCategory = genreToCategoryId.find(
          (item) => item.genre === genre3
        );
        if (foundCategory) {
          const categoryId = foundCategory.categoryId;
          // 해당 categoryId를 이용하여 API 요청을 보냅니다.
          const response = await axios.get(`/api/aladin/${categoryId}`, {
            params: {
              Query: genre3,
              QueryType: "Title",
            },
          });

          console.log("급상승 로그인 한 유저 : ", userId); // 디버깅용
        console.log("급상승 로그인 한 유저의 장르3번 : ", genre3); // 디버깅용
        console.log("급상승 책 테스트 : ", response.data.item); // 디버깅용
          setBooks(response.data.item);
        } else {
          console.log("해당하는 카테고리 ID를 찾을 수 없습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="soaring_wrap" id="soaring_wrap">
      <h2>급상승</h2>
      <div className="slide">
        <div className="soaring1">
          {books.map((book, index) => (
            <Link to={`/bookDetail/${book.isbn}`} key={book.isbn}>
              <div className="item">
                <img src={book.cover} alt={book.title} />
                <span className="number">{index + 1}</span>
                <p className="description">{book.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHotTopic;
