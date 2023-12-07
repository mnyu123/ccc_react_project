import React, { useEffect, useState } from "react";
import axios from "axios";

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const handleSelectChange = (e) => {
    e.persist();
    setCategoryId(e.target.value);
  };

  const handleSearch = () => {
    if (!categoryId) return;

    const categoryNames = {
      1: "소설",
      53512: "성생활",
      656: "인문",
      53490: "한국요리",
      53481: "제과제빵",
      90456: "인테리어",
      53532: "공예",
      170: "경제경영",
      48840: "자기계발",
      77389: "자습서",
      8516: "철학",
      53551: "탈모",
      51279: "식물도감",
      17436: "종교학",
      8369: "지구과학",
      8467: "컴퓨터공학",
      51377: "여행",
      54889: "생명과학",
      4132: "판타지",
      50951: "문학잡지",
      3741: "순정만화",
      3560: "청소년",
      2551: "만화",
    };

    const query = categoryNames[categoryId]; // 카테고리 id에 해당하는 검색어를 가져옵니다.

    setLoading(true);
    console.log("카테고리 검색 전 확인:", categoryId); // 콘솔에 데이터 출력

    axios
      .get(`/api/aladin/${categoryId}`, {
        params: {
          Query: query, // 검색어를 파라미터로 추가합니다.
          QueryType: "Title", // 검색어 종류를 'Title'로 설정합니다.
        },
      })

      .then((response) => {
        console.log("API 뜨는지", response.data); // 콘솔에 데이터 출력
        setBooks(response.data.item);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (!books) {
    return null;
  }

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">-- 장르를 선택하세요 --</option>
        <option value="1">소설</option>
        <option value="53512">성생활</option>
        <option value="656">인문</option>
        <option value="53490">한국요리</option>
        <option value="53481">제과제빵</option>
        <option value="90456">인테리어</option>
        <option value="53532">공예</option>
        <option value="170">경제경영</option>
        <option value="48840">자기계발</option>
        <option value="77389">자습서</option>
        <option value="8516">철학</option>
        <option value="53551">탈모</option>
        <option value="51279">식물도감</option>
        <option value="17436">종교학</option>
        <option value="8369">지구과학</option>
        <option value="8467">컴퓨터공학</option>
        <option value="51377">여행</option>
        <option value="54889">생명과학</option>
        <option value="4132">판타지</option>
        <option value="50951">문학잡지</option>
        <option value="3741">순정만화</option>
        <option value="3560">청소년</option>
        <option value="2551">만화</option>
      </select>
      <button onClick={handleSearch}>검색</button>
      {books &&
        books.map((book) => (
          <div key={book.isbn}>
            <h2>{book.title}</h2>
            <img src={book.cover} alt={book.title} />
          </div>
        ))}
    </div>
  );
}

export default BookSearch;
