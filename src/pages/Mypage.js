import React, { useState, useEffect } from "react";
import "../css/Mypage.css"; // Mypage.css를 불러옵니다.
import Polledit from "../common/Polledit"; // 수정된 부분
import { useNavigate } from 'react-router-dom';




const Mypage = ({ isMypageOpen, onClose }) => {
  const [isPolleditOpen, setIsPolleditOpen] = useState(false);
  const [userid, setUserid] = useState(null); // userid를 상태로 관리
  const [enteredPassword, setEnteredPassword] = useState(''); // 비밀번호 입력 상태
  const navigate = useNavigate();
  const userpw = JSON.parse(sessionStorage.getItem('userpw'));

  useEffect(() => {
    const storedUserid = sessionStorage.getItem('userid');
    if (storedUserid) {
      setUserid(JSON.parse(storedUserid));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('userpw');
    setUserid(null); // 로그아웃하면 userid를 null로 설정
    navigate('/');
  };

  const openPolledit = () => {
    setIsPolleditOpen(true);
  };

  const closePolledit = () => {
    setIsPolleditOpen(false);
  };

   // 비밀번호 확인 함수
   const handlePasswordCheck = () => {
    if (enteredPassword === userpw) {
      console.log('비밀번호가 일치합니다.');
    } else {
      console.log('비밀번호가 일치하지 않습니다.');
    }
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
          {/* <span className="username_wrap">
            <input
              type="text"
              value="사용자"
              className="username"
              id="username"
              readOnly
            />
          </span> */}
          <span>{userid}님,</span>
        </div>
       <input 
          type="password" 
          placeholder="비밀번호" 
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <button onClick={handlePasswordCheck}>확인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={openPolledit}>장르 재선택</button>
        <button onClick={onClose}>닫기</button>
        {isPolleditOpen && <Polledit onClose={closePolledit} />}
      </div>
    </div>
  );
};

export default Mypage;
