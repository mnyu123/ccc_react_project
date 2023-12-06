import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; //모달을 위해 react modal 컴포넌트를 사용했습니다.
import "../css/WeekPopup.css";


// 팝업에 대한 스타일 지정(필요없으면 안써도되고 필요시 수정)
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'lightblue', // 배경 색상 지정
    padding               : '20px'   
  }
};



Modal.setAppElement('#root')



const WeekPopup = ({ onClose }) => {
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
// 페이지가 로드될 때 로그인 상태를 확인
const isLoggedIn = sessionStorage.getItem('isLoggedIn');

// 로그인 상태가 true가 아닐 경우 로그인 페이지로 이동
if (isLoggedIn !==  'true') {
  navigate('/');
}
// 사용자가 '오늘 다시 보지 않음'을 선택했는지 확인
const dontShowToday = localStorage.getItem('dontShowToday');
if (dontShowToday === 'true') {
  onClose();
}

  }, []);


  const handleCheckboxChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  const handleDontShowToday = () => {
    localStorage.setItem('dontShowToday', 'true'); // 오늘 다시 보지 않음을 저장
    onClose();
  }

  return (
    <Modal
        isOpen={sessionStorage.getItem('isLoggedIn') === 'true'}
        onRequestClose={onClose} //모달이 닫힘(화면 외부를 클릭하거나 esc키 감지)
        style={customStyles}
        contentLabel="modal"
      >

        <h1 style={{marginBottom: '20px'}}>이번주의 책</h1>
        <img src="../images/ccc_bookcover/명탐정코난.jpg" alt="명탐정 코난" width="200px" height="300px" style={{marginRight: '20px'}}/>
        <button onClick={onClose}>닫기</button>
        <button onClick={handleDontShowToday}>오늘 다시 보지 않기</button>
      </Modal>
  );
};

export default WeekPopup;