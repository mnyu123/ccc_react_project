import React, { useState, useEffect } from "react";
import "../css/Mypage.css"; // Mypage.css를 불러옵니다.
import Polledit from "../common/Polledit"; // 수정된 부분
import { useNavigate } from "react-router-dom";

const Mypage = ({ isMypageOpen, onClose }) => {
  const [isPolleditOpen, setIsPolleditOpen] = useState(false);
  const [userid, setUserid] = useState(null); // userid를 상태로 관리
  const navigate = useNavigate();
  const userpw = JSON.parse(sessionStorage.getItem("userpw"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usergenre, setGenre] = useState("");

  const handleChangePassword = () => {
    // 비밀번호 변경 로직 구현
  };


  useEffect(() => {
    const storedUserid = sessionStorage.getItem("userid");
    if (storedUserid) {
      setUserid(JSON.parse(storedUserid));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("userpw");
    sessionStorage.setItem("isLoggedIn", "false");
    setUserid(null); // 로그아웃하면 userid를 null로 설정
    navigate("/");
  };

  const openPolledit = () => {
    setIsPolleditOpen(true);
  };

  const closePolledit = () => {
    setIsPolleditOpen(false);
  };

  // 비밀번호 확인 함수
  const handlePasswordCheck = () => {
    if (currentPassword === userpw) {
      console.log("비밀번호가 일치합니다.");
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className={`modal ${isMypageOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>마이페이지</h2>
        <div className="user_id">
          <span>
            <img src="/images/ccc_image/ghost.png" alt="profile" />
          </span>
          <span className="userid_wrap"> {userid}</span><span>님,</span>
        </div>
        <div className="dotted-line"></div>
        <div className="name_fwrap">
        이름 <input type="text" id="name" readOnly /> 성별 <input type="text" id="gender" value={usergenre} readOnly />
        </div>
        <div className="dotted-line"></div>
        
        <div className="newpassword_wrap">
        비밀번호 변경
          <div className="input_row mg" id="pw_line">
            <input type="password" id="currentPasswordInput" placeholder="현재 비밀번호" title="비밀번호"
              className="input_text required-input" maxLength="16" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="input_row mg" id="pw_line">
            <input type="password" id="newpasswordInput" placeholder="새 비밀번호" title="비밀번호"
              className="input_text required-input" maxLength="16" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="input_row mg" id="pw_line">
            <input type="password" id="newpasswordcheck" placeholder="새 비밀번호 확인" title="비밀번호"
              className="input_text required-input" maxLength="16" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn_login" id="changePassword" onClick={handlePasswordCheck}><span className="btn_text">변경</span></button>
        </div>
        <div className="dotted-line"></div>
        <div className="fq_wrap">
          선호장르 <input type="text" id="genre" value={usergenre} onChange={(e) => setGenre(e.target.value)} /> <button onClick={openPolledit}>장르 재선택</button>
        </div>
        <div className="dotted-line"></div>
        <button onClick={handleLogout}>로그아웃</button>

        <button onClick={onClose}>닫기</button>
        {isPolleditOpen && <Polledit onClose={closePolledit} />}
      </div>
    </div>
  );
};

export default Mypage;
