import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Book_detail.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import BestList from "../common/BestList"; // BestList 컴포넌트를 임포트합니다.
const defaultImage = "/images/ccc_image/bookmarks.png";
const changedImage = "/images/ccc_image/bookmarkson.png";

const BookDetail = () => {
  const { bookIsbn } = useParams();
  const [bookDetail, setBookDetail] = useState(null);
  const [bestList, setBestList] = useState([]);
  const [libraryIcon, setLibraryIcon] = useState(defaultImage);
  const [descriptionMore, setDescriptionMore] = useState(false);

  // 로그인한 사용자의 아이디를 가져옵니다.
  const userId = sessionStorage.getItem("userid");

  // 내 서재 담기 버튼 클릭 이벤트 핸들러
  const handleLibraryBtnClick = async () => {
    if (libraryIcon === defaultImage) {
      setLibraryIcon(changedImage);
      // 서버에 POST 요청을 보냅니다.
      await axios.post("/api/mybookshelf", { userId, bookIsbn });
    } else {
      setLibraryIcon(defaultImage);
      let favorites = JSON.parse(localStorage.getItem(userId)) || [];
      favorites = favorites.filter((book) => book.isbn !== bookDetail.isbn);
      localStorage.setItem(userId, JSON.stringify(favorites));
      localStorage.setItem(`${bookDetail.isbn}-icon`, defaultImage); // 아이콘 상태 저장
    }
  };

  // 이미 즐겨찾기에 추가된 책인지 확인합니다.
  const favorites = JSON.parse(localStorage.getItem(userId)) || [];

  const handleExpandBtnClick = () => {
    setDescriptionMore(!descriptionMore);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 항상 페이지 최상단으로 focus
    const fetchBookDetail = async () => {
      try {
        // API를 호출합니다.
        const response = await axios.get(`/api/bookDetail/${bookIsbn}`);
        // console.log("API 응답 결과 테스트용:", response); // API 응답 출력
        // 상태를 업데이트합니다.
        setBookDetail(response.data.item[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBookDetail();
    // 이미 즐겨찾기에 추가된 책인지 확인합니다.
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some((book) => book.isbn === bookIsbn)) {
      setLibraryIcon(changedImage);
    }

    const iconState = localStorage.getItem(`${bookIsbn}-icon`);
    if (iconState) {
      setLibraryIcon(iconState);
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
          <div className="book_cover_wrap">
            {bookDetail && (
              <img
                src={bookDetail.cover}
                alt={bookDetail.title}
                className="book_cover"
              />
            )}
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
                  <p className="title">
                    {bookDetail.title.replace("알라딘 상품정보 - ", "")}{" "}
                  </p>
                </div>
                <div className="info_wrap">
                  <p className="author">{bookDetail.author}</p>
                  <p className="publisher">{bookDetail.publisher}</p>
                  <p className="date">{bookDetail.pubDate}</p>
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
          {bookDetail && <BestList categoryId={bookDetail.categoryId} />}
          {/* categoryId를 prop으로 전달함 */}
          {/* BestList 컴포넌트 호출 */}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BookDetail;
