import React, { useState, useEffect } from "react";
import axios from "axios";

const BestList = ({ categoryId }) => {
  const [bestList, setBestList] = useState([]);

  useEffect(() => {
    const fetchBestList = async () => {
      try {
        // API를 호출합니다.
        const response = await axios.get(`/api/bestList/${categoryId}`);
        // console.log("API 응답 결과 테스트용:", response); // API 응답 출력
        // 상태를 업데이트합니다.
        setBestList(response.data.item.slice(0, 5));
      } catch (e) {
        console.log(e);
      }
    };
    fetchBestList();
  }, [categoryId]);

  return (
    <div className="best_category">
      <div className="best_category_wrap">
        <h2>분야 베스트</h2>
        <ul className="best_list">
          {bestList.map((book, index) => (
            <li key={index}>
              <div className="number_image_wrapper">
                <img
                  src={`/images/ccc_image/${index + 1}.png`}
                  alt={`${index + 1}번`}
                />
              </div>
              <a href={`http://localhost:3001/bookDetail/${book.isbn}`}>
                <span className="text_wrapper">{book.title}</span>
              </a>
              <div className="dotted-line"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestList;
