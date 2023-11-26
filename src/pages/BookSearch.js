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
      55889: "시/에세이",
      656: "인문",
      33026: "가정/육아",
      103606: "요리",
      152908: "건강",
      152747: "취미/실용",
      75161: "경제",
      75160: "자기계발",
      97530: "정치/사회",
      90847: "역사/문화",
      105397: "종교",
      97608: "예술",
      97761: "사회과학",
      90855: "자연과학",
      8467: "공학",
      51377: "여행",
      164349: "컴퓨터과학",
      56385: "참고서",
      39045: "잡지",
      177: "취업/수험서",
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
        <option value="55889">시/에세이</option>
        <option value="656">인문</option>
        <option value="33026">가정/육아</option>
        <option value="103606">요리</option>
        <option value="152908">건강</option>
        <option value="152747">취미/실용</option>
        <option value="75161">경제</option>
        <option value="75160">자기계발</option>
        <option value="97530">정치/사회</option>
        <option value="90847">역사/문화</option>
        <option value="105397">종교</option>
        <option value="97608">예술</option>
        <option value="97761">사회과학</option>
        <option value="90855">자연과학</option>
        <option value="8467">공학</option>
        <option value="51377">여행</option>
        <option value="164349">컴퓨터과학</option>
        <option value="56385">참고서</option>
        <option value="39045">잡지</option>
        <option value="177">취업/수험서</option>
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
