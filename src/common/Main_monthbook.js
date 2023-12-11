import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Main_monthbook.css";

const Main_monthbook = () => {
  const [books, setBooks] = useState([]);
  const [viewMore, setViewMore] = useState(false); // 더보기 상태
  const genreToCategoryId = require("../common/genreToCategoryId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("userid"));
        let genre2;

        if (userId) {
          const response = await axios.get(`/api/usergenre/${userId}`);
          genre2 = response.data.genre2;
        } else {
          // 로그인하지 않은 사용자의 경우 genreToCategoryId 배열에서 첫 번째 항목의 장르를 사용
          genre2 = genreToCategoryId[2].genre;
        }

        const categoryId = genreToCategoryId.find(
          (item) => item.genre === genre2
        ).categoryId;
        const aladinResponse = await axios.get(`/api/aladin/${categoryId}`, {
          params: {
            Query: genre2,
            QueryType: "Title",
          },
        });
        console.log("오늘의 책 로그인 한 유저 : ", userId); // 디버깅용
        console.log("오늘의 책 로그인 한 유저의 장르1번 : ", genre2); // 디버깅용
        console.log("오늘의 책 테스트 : ", aladinResponse.data.item); // 디버깅용
        setBooks(aladinResponse.data.item);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <div className="monthbooks_wrap" id="monthbooks_wrap">
      <div className="month_title">이달의 책</div>
      <div className="view_more" id="view-more" onClick={handleViewMore}>
        {viewMore ? "< 접기" : "더보기 >"}
      </div>
      <div className="book_covers_m">
        {viewMore
          ? (
            <div className="month" id="more-books">
              {Array.from({ length: 3 }, (_, i) => i * 3).map((start) => (
                <div className={`month-line${start / 3 + 1}`}>
                  {books.slice(start, start + 3).map((book, index) => (
                    <div className={`book${index + 1}`}>
                      <Link to={`/bookDetail/${book.isbn}`} key={book.isbn}>
                        <div className="month-book">
                          <div className="bookcover_m">
                            <img src={book.cover} alt={`book${index + start + 1}`} />
                          </div>
                          <div className={`bookback${((index + start) % 9) + 1}`}></div>  
                        </div>
                        <div className="coverexplain_m">
                          <div className="bookcovertitle">{book.title}</div>
                          <div className="author">{book.author}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
          : books.slice(0, 5).map((book, index) => (
            <Link to={`/bookDetail/${book.isbn}`} key={book.isbn}>
              <div className="coverbook1">
                <img src={book.cover} alt={`book${index + 1}`} />
                <div className="coverexplain_m">
                  <div className="bookcovertitle">{book.title}</div>
                  <div className="author">{book.author}</div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Main_monthbook;
