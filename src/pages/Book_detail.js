import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Book_detail.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
const defaultImage = "/images/ccc_image/bookmarks.png";
const changedImage = "/images/ccc_image/bookmarkson.png";

const BookDetail = () => {
  const { bookIsbn } = useParams();
  const [bookDetail, setBookDetail] = useState(null);
  const [bestList, setBestList] = useState([]);
  const [libraryIcon, setLibraryIcon] = useState(defaultImage);
  const [descriptionMore, setDescriptionMore] = useState(false);

 // 내 서재 담기 버튼 클릭 이벤트 핸들러
 const handleLibraryBtnClick = () => {
  if (libraryIcon === defaultImage) {
    setLibraryIcon(changedImage);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(bookDetail);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    setLibraryIcon(defaultImage);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(book => book.isbn !== bookDetail.isbn);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

  const handleExpandBtnClick = () => {
    setDescriptionMore(!descriptionMore);
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        // API를 호출합니다.
        const response = await axios.get(`/api/bookDetail/${bookIsbn}`);
        // 상태를 업데이트합니다.
        setBookDetail(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBookDetail();
    // 이미 즐겨찾기에 추가된 책인지 확인합니다.
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.some(book => book.isbn === bookIsbn)) {
      setLibraryIcon(changedImage);
    }
  }, [bookIsbn]);

  return (
    <>
      <Header />
      <main>
        <div className="todaybooks_wrap">
          <div className="book_intro">
            <img
              src="/images/ccc_image/left.png"
              alt="Left Image"
              className="side-image"
            />
            {/* 책 설명 부분 왼쪽에 크게 */}
            {bookDetail && <p className="bintro">{bookDetail.description}</p>}
            <img
              src="/images/ccc_image/right.png"
              alt="Right Image"
              className="side-image"
            />
          </div>

          <div className="book_info_wrap">
            {bookDetail && (
              <div className="book_info">
                <div className="category_wrap">
                  <p className="category">
                    분야 :{" "}
                    <span className="category_db">
                      {bookDetail.categoryName}
                    </span>
                  </p>
                </div>
                <div className="title_wrap">
                <p className="title">{bookDetail.title.replace("알라딘 상품정보 - ", "")} </p>
                </div>
                <div className="info_wrap">
                  <p className="author">{bookDetail.author}</p>
                  <p className="publisher">{bookDetail.publisher}</p>
                  <p className="date">{bookDetail.pubDate}</p>
                </div>
                <div className="book_cover_wrap">
                  <img
                    src={bookDetail.cover}
                    alt={bookDetail.title}
                    className="book_cover"
                  />
                </div>
              </div>
            )}
            <div className="libraryBtn_wrap">
              <button className="libraryBtn" onClick={handleLibraryBtnClick}>
                <div className="button_content">
                  <img
                    src={process.env.PUBLIC_URL + libraryIcon}
                    alt="내서재 담기 아이콘"
                  />
                  <span className="button_text">내 서재 담기</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="monthbooks_wrap">
          <div className="bcontent_wrap">
            <div className="book_description">
              <h2>작품 소개</h2>
              <div className="description_box">
                {bookDetail && (
                  <p className="description_content">
                    {bookDetail.description}
                  </p>
                )}
                <p className="summary">줄거리</p>
                {bookDetail && (
                  <p
                    className="description_more"
                    style={{ display: descriptionMore ? "block" : "none" }}
                  >
                    {bookDetail.description}
                  </p>
                )}
                <button className="expand_btn" onClick={handleExpandBtnClick}>
                  {descriptionMore ? "접기▲" : "펼치기▼"}
                </button>
              </div>
            </div>
          </div>
          {bestList && (
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
                      <a href={book.link}>
                        <span className="text_wrapper">{book.title}</span>
                      </a>
                      <div className="dotted-line"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BookDetail;
