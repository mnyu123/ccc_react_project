import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../css/Mylibrary.css";
import axios from "axios";

const MyLibrary = () => {
  const userId = sessionStorage.getItem("userid");
  const [books, setBooks] = useState([]);
  // console.log("내 서재 화면 렌더링됨.");

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const containerClass = () =>
    isListView ? "concontainer container2" : "concontainer container1";
  const bookContainerClass = () =>
    isListView
      ? "book-container book-container2"
      : "book-container book-container1";

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedBooks([]);
  };

  const selectBook = (book) => {
    if (isEditMode) {
      if (selectedBooks.includes(book)) {
        setSelectedBooks(
          selectedBooks.filter((selectedBook) => selectedBook !== book)
        );
      } else {
        setSelectedBooks([...selectedBooks, book]);
      }
    } else {
      navigate(`/bookDetail/${book.isbn}`);
    }
  };

  const selectAllBooks = () => {
    setSelectedBooks(books);
  };

  const deselectAllBooks = () => {
    setSelectedBooks([]);
  };

  const deleteSelectedBooks = async () => {
    const deletePromises = selectedBooks.map((book) =>
      axios.delete(`/api/mybookshelf/${userId}/${book.isbn}`)
    );
    await Promise.all(deletePromises);
    setSelectedBooks([]);
    // 다시 서재 데이터를 fetch
    fetchMyLibrary();
  };

  const fetchMyLibrary = async () => {
    const response = await axios.get(`/api/mybookshelf/${userId}`);
    const bookIsbns = response.data.map((book) => book.mybookisbn);

    console.log("내 서재에 있는 책들의 isbn 목록 : ", bookIsbns);

    const bookDetailsPromises = bookIsbns.map((isbn) =>
      axios.get(`/api/bookDetail/${isbn}`)
    );
    console.log("bookDetailsPromises : ", bookDetailsPromises);
    const bookDetailsResponses = await Promise.all(bookDetailsPromises);
    bookDetailsResponses.forEach((response, index) => {
      console.log(`책 정보 응답 ${index}:`, response.data);
    });

    const books = bookDetailsResponses.map((response) => response.data.item[0]);
    setBooks(books);
    console.log("도서 정보 : ", books);
  };

  // 내 서재 때문에 수정한 내용(12/8)
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/login");
    }

    fetchMyLibrary();
  }, [userId]);

  return (
    <main className="mylibrary-maincontainer">
      <div className="libraryAll">
        <div className="library">
          <span id="libraryTitle">내 서재</span>
          <span id="bookCount">(총 {books.length}권)</span>
        </div>

        <div className="button-container">
          <div className="selectAllButtons">
            {isEditMode && (
              <>
                <button id="selectAllBtn" onClick={selectAllBooks}>
                  전체 선택
                </button>
                <button id="selectAllcancelBtn" onClick={deselectAllBooks}>
                  전체 선택 취소
                </button>
              </>
            )}
          </div>
          <div
            className="editButtonsAndViewButtons"
            style={{ display: "flex", flexDirection: "row", margin: 0 }}
          >
            <div className="editButtons">
              {!isEditMode && (
                <button id="editBtn" onClick={handleEditMode}>
                  편집
                </button>
              )}
              {isEditMode && (
                <>
                  <button id="deleteBtn" onClick={deleteSelectedBooks}>
                    삭제
                  </button>
                  <button id="cancelBtn" onClick={handleEditMode}>
                    취소
                  </button>
                </>
              )}
            </div>
            <div className="library-list">
              <div
                className="library-cover"
                style={{ backgroundColor: isListView ? "white" : "#6626af" }}
              >
                <button
                  className="listCoverBtn"
                  id="listCoverBtn"
                  onClick={() => {
                    if (!isEditMode) {
                      setIsListView(false);
                    }
                  }}
                  style={{ margin: 0 }}
                >
                  <img
                    src={
                      isListView
                        ? "/images/ccc_library/grid-1.png"
                        : "/images/ccc_library/grid-2.png"
                    }
                    alt="Image 1"
                    id="buttonImage1"
                  />
                </button>
              </div>
              <div
                className="library-view"
                style={{ backgroundColor: isListView ? "#6626af" : "white" }}
              >
                <button
                  className="listViewBtn"
                  id="listViewBtn"
                  onClick={() => {
                    if (!isEditMode) {
                      setIsListView(true);
                    }
                  }}
                  style={{ margin: 0 }}
                >
                  <img
                    src={
                      isListView
                        ? "/images/ccc_library/list-2.png"
                        : "/images/ccc_library/list-1.png"
                    }
                    alt="Image 2"
                    id="buttonImage2"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={containerClass()}>
          <div className={bookContainerClass()} id="bookContainer">
            {books.map((book, index) => (
              <div
                key={index}
                onClick={() => selectBook(book)}
                className={
                  isEditMode && selectedBooks.includes(book) ? "selected" : ""
                }
              >
                {!isEditMode && (
                  <div className="img-wrapper">
                    <Link to={`/bookDetail/${book.isbn}`}>
                      <img src={book.cover} alt={book.title} />
                    </Link>
                  </div>
                )}
                {isEditMode && (
                  <div className="img-wrapper">
                    <img src={book.item[0].cover} alt={book.item[0].title} />
                  </div>
                )}
                {isListView && (
                  <>
                    <div className="description">
                      <div>{book.item[0].title}</div>
                      <div>{book.item[0].author}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Header />
      <Link to="/">
        <br />
        <br />
        다시 메인으로
      </Link>
      <Footer />
    </main>
  );
};
export default MyLibrary;
