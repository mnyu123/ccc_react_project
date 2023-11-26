import React, { useState } from "react";
import "../css/Mypage.css"; // Mypage.css를 불러옵니다.
import Polledit from "../common/Polledit"; // 수정된 부분

const Mypage = ({ isMypageOpen, onClose }) => {
  const [isPolleditOpen, setIsPolleditOpen] = useState(false);

  const openPolledit = () => {
    setIsPolleditOpen(true);
  };

  const closePolledit = () => {
    setIsPolleditOpen(false);
  };
  return (
    <div className={`modal ${isMypageOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>마이페이지</h2>
        <p>비밀번호 재확인</p>
        <p>보안을 위해 비밀번호를 다시 입력해주세요.</p>
        <div className="myname">
          <span>
            <img src="/images/ccc_image/ghost.png" alt="profile" />
          </span>
          <span className="username_wrap">
            <input
              type="text"
              value="사용자"
              className="username"
              id="username"
              readOnly
            />
          </span>
          <span>님,</span>
        </div>
        <input type="password" placeholder="비밀번호" />
        <button>확인</button>
        <button>로그아웃</button>
        <button onClick={openPolledit}>장르 재선택</button>
        <button onClick={onClose}>닫기</button>
        {isPolleditOpen && <Polledit onClose={closePolledit} />}
      </div>
    </div>
  );
};

export default Mypage;
