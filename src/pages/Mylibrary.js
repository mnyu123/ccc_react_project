import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../css/Mylibrary.css"; // CSS를 분리하여 import

const MyLibrary = () => {
  console.log("내 서재 화면 렌더링됨.");

  const [isListCoverClicked, setIsListCoverClicked] = useState(false);
  const [isListViewClicked, setIsListViewClicked] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const headerNormalHeight = 0; // 적절한 높이 값으로 설정해주세요

  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="libraryAll">
        <div className="library">
          <span id="libraryTitle">내 서재</span>
          <span id="bookCount"></span>
        </div>

        <div className="library-convert">
          <div className="editAll">
            <button id="selectAllBtn" style={{ display: "none" }}>
              전체 선택
            </button>
            <button id="selectAllcancelBtn" style={{ display: "none" }}>
              전체 선택 취소
            </button>
            <div className="edit">
              <button id="editBtn">편집</button>
              <button id="deleteBtn" style={{ display: "none" }}>
                삭제
              </button>
              <button id="cancelBtn" style={{ display: "none" }}>
                취소
              </button>
            </div>
          </div>

          <div className="listAll">
            <div className="library-list">
              <div className="library-cover">
                <button
                  className="listCoverBtn"
                  id="listCoverBtn"
                  onClick={() => setIsListCoverClicked(!isListCoverClicked)}
                >
                  <img
                    src={
                      isListCoverClicked
                        ? "/images/ccc_library/list-2.png"
                        : "/images/ccc_library/list-1.png"
                    }
                    alt="Image 1"
                    id="buttonImage1"
                  />
                </button>
              </div>
              <div className="library-view">
                <button
                  className="listViewBtn"
                  id="listViewBtn"
                  onClick={() => setIsListViewClicked(!isListViewClicked)}
                >
                  <img
                    src={
                      isListViewClicked
                        ? "/images/ccc_library/grid-2.png"
                        : "/images/ccc_library/grid-1.png"
                    }
                    alt="Image 2"
                    id="buttonImage2"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="concontainer">
          <div className="container1">
            <div className="book-container1" id="bookContainer">
              {/* 동적으로 생성될 책 항목 */}
            </div>
          </div>
          <div className="container2">
            <div className="book-container2" id="bookContainer2">
              {/* 동적으로 생성될 책 항목 */}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          scrollPosition > headerNormalHeight ? "header_fixed" : "header_normal"
        }
      >
        <Header />
        <Link to="/">다시 메인으로</Link>
      </div>
      <Footer />
    </main>
  );
};

export default MyLibrary;
