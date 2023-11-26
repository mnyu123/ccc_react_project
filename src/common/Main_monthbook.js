import React, { useState, useEffect } from "react";
import "../css/Main_monthbook.css";

const Main_monthbook = () => {
  const [books, setBooks] = useState([
    { title: "돈의 심리학", author: "Author1" },
    { title: "빠르게 실패하기", author: "Author2" },
    { title: "세탁 살림 백과", author: "Author3" },
    { title: "적당히 살기", author: "Author4" },
    { title: "돈의 역사", author: "Author5" },
    // 여기에 메인에 보일 책을 더 추가
  ]);
  const [viewMore, setViewMore] = useState(false); // 더보기 상태

  // 책 표지 이미지를 무작위로 섞는 함수
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    const bookImages = [
      "/images/ccc_other/돈의 심리학.webp",
      "/images/ccc_other/빠르게 실패하기.webp",
      "/images/ccc_other/세탁 살림 백과.webp",
      "/images/ccc_other/돈의 심리학.webp",
      "/images/ccc_other/빠르게 실패하기.webp",
      "/images/ccc_other/세탁 살림 백과.webp",
      "/images/ccc_other/돈의 심리학.webp",
      "/images/ccc_other/빠르게 실패하기.webp",
      "/images/ccc_other/세탁 살림 백과.webp",
    ];

    setBooks(
      books.map((book, index) => ({ ...book, src: shuffle(bookImages)[index] }))
    );
  }, []);

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <div className="monthbooks_wrap" id="monthbooks_wrap">
      <div className="month_title">이달의 책</div>
      <div className="view_more" id="view-more" onClick={handleViewMore}>
        {viewMore ? "< 더보기" : "접기 >"}
      </div>
      {viewMore ? (
        <div className="month" id="more-books">
          {" "}
          {/* 다른 책 컴포넌트들... */}{" "}
        </div>
      ) : (
        <div className="book_covers">
          {books.map((book, index) => (
            <div className="coverbook1" key={index}>
              <img src={book.src} alt={`book${index + 1}`} />
              <div className="coverexplain">
                <div className="bookcovertitle">{book.title}</div>
                <div className="author">{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main_monthbook;
