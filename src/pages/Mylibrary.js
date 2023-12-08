import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../css/Mylibrary.css";

const MyLibrary = () => {
  const userId = sessionStorage.getItem("userid");
  const [books, setBooks] = useState([]);
  console.log("내 서재 화면 렌더링됨.");

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const containerClass = () =>
    isListView ? "concontainer container2" : "concontainer container1";
  const bookContainerClass = () =>
    isListView
      ? "book-container book-container2"
      : "book-container book-container1";

  const navigate = useNavigate();

  // useEffect(() => {
  //   const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  //   if (isLoggedIn !== "true") {
  //     navigate("/login");
  //   }

  //   const userId = sessionStorage.getItem("userid");
  //   const savedFavorites = JSON.parse(localStorage.getItem(userId));
  //   if (savedFavorites) {
  //     setFavorites(savedFavorites);
  //   }
  // }, []);

  // 내 서재 때문에 수정한 내용(12/8)
  useEffect(() => {
    const fetchMyLibrary = async () => {
      const response = await axios.get(`/api/mybookshelf/${userId}`);
      setBooks(response.data);
    };
    fetchMyLibrary();
  }, [userId]);


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
    setSelectedBooks(favorites);
  };

  const deselectAllBooks = () => {
    setSelectedBooks([]);
  };

  const deleteSelectedBooks = () => {
    setFavorites(favorites.filter((book) => !selectedBooks.includes(book)));
    setSelectedBooks([]);
  };

  return (
    <main className="mylibrary-maincontainer">
      <div className="libraryAll">
        <div className="library">
          <span id="libraryTitle">내 서재</span>
          <span id="bookCount">(총 {favorites.length}권)</span>
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
              <div className="library-cover">
                <button
                  className="listCoverBtn"
                  id="listCoverBtn"
                  onClick={() => setIsListView(false)}
                  style={{ margin: 0 }}
                >
                  <img
                    src="/images/ccc_library/grid-2.png"
                    alt="Image 1"
                    id="buttonImage1"
                  />
                </button>
              </div>
              <div className="library-view">
                <button
                  className="listViewBtn"
                  id="listViewBtn"
                  onClick={() => setIsListView(true)}
                  style={{ margin: 0 }}
                >
                  <img
                    src="/images/ccc_library/list-1.png"
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
            {favorites.map((book, index) => (
              <div
                key={index}
                onClick={() => selectBook(book)}
                className={
                  isEditMode && selectedBooks.includes(book) ? "selected" : ""
                }
              >
                <img src={book.cover} alt={book.title} />
                {isListView && (
                  <>
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Header />
      <Link to="/">다시 메인으로</Link>
      <Footer />
    </main>
  );
};

export default MyLibrary;
