import React, { useState } from "react";
import "../css/Book_detail.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
const defaultImage = "/images/ccc_image/bookmarks.png";
const changedImage = "/images/ccc_image/bookmarkson.png";

const BookDetail = () => {
  const [libraryIcon, setLibraryIcon] = useState(defaultImage);
  const [descriptionMore, setDescriptionMore] = useState(false);

  const handleLibraryBtnClick = () => {
    setLibraryIcon(libraryIcon === defaultImage ? changedImage : defaultImage);
  };

  const handleExpandBtnClick = () => {
    setDescriptionMore(!descriptionMore);
  };

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
            <p className="bintro">
              음악 속에서 새로운 의미를 만들어낸다는 점이 NCT의 특별함이라고
              생각해요.
            </p>
            <img
              src="/images/ccc_image/double-quotes (1).png"
              alt="Right Image"
              className="side-image"
            />
          </div>

          <div className="book_cover_wrap">
            <img
              src="/images/ccc_bookcover/아레나 옴므+(2023년 11월호).jpg"
              alt="book cover image"
              className="book_cover"
            />
          </div>
          <div className="book_info_wrap">
            <div className="book_info">
              <div className="category_wrap">
                <p className="category">
                  분야 : <span className="category_db">잡지</span>
                </p>
              </div>
              <div className="title_wrap">
                <p className="title"> 아레나 옴므+(2023년 11월호) </p>
              </div>
              <div className="info_wrap">
                <p className="author">아레나옴므 편집부 저자(글)</p>
                <p className="publisher">서울문화</p>
                <p className="date">2023년 10월 20일</p>
              </div>
            </div>
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
                <p className="description_content">
                  블랙칼라 워커를 위한 국내 최초의 남성 패션지 아레나 옴므
                  플러스.
                </p>
                <p className="summary">줄거리</p>
                <p
                  className="description_more"
                  style={{ display: descriptionMore ? "block" : "none" }}
                >
                  주요기사 : NCT 도영18p{" "}
                </p>
                <button className="expand_btn" onClick={handleExpandBtnClick}>
                  {descriptionMore ? "접기▲" : "펼치기▼"}
                </button>
              </div>
            </div>
            <div className="best_category">
              <div className="best_category_wrap">
                <h2>분야 베스트</h2>
                <ul className="best_list">
                  <li>
                    <div className="number_image_wrapper">
                      <img src="/images/ccc_image/1.png" alt="1번" />
                    </div>
                    <a href="페이지1의_링크">
                      <span className="text_wrapper">
                        보그(2023년 10월호)(E형)
                      </span>
                    </a>
                  </li>
                  <div className="dotted-line"></div>
                  <li>
                    <div className="number_image_wrapper">
                      <img src="/images/ccc_image/2.png" alt="2번" />
                    </div>
                    <a href="페이지2의_링크">
                      <span className="text_wrapper">
                        보나몽(2023년 10월호)
                      </span>
                    </a>
                  </li>
                  <div className="dotted-line"></div>
                  <li>
                    <div className="number_image_wrapper">
                      <img src="/images/ccc_image/3.png" alt="3번" />
                    </div>
                    <a href="페이지3의_링크">
                      <span className="text_wrapper">
                        아레나 옴므+(2023년 11월호)
                      </span>
                    </a>
                  </li>
                  <div className="dotted-line"></div>
                  <li>
                    <div className="number_image_wrapper">
                      <img src="/images/ccc_image/4.png" alt="4번" />
                    </div>
                    <a href="페이지4의_링크">
                      <span className="text_wrapper">
                        초등독서평설(2023년 10월호)
                      </span>
                    </a>
                  </li>
                  <div className="dotted-line"></div>
                  <li>
                    <div className="number_image_wrapper">
                      <img src="/images/ccc_image/5.png" alt="5번" />
                    </div>
                    <a href="페이지5의_링크">
                      <span className="text_wrapper">
                        게이머즈(2023년 10월 283호)
                      </span>
                    </a>
                  </li>
                  <div className="dotted-line"></div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookDetail;
