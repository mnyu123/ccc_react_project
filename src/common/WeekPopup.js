import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 모달이 마운트되면 스크롤을 막습니다.
    return () => {
      document.body.style.overflow = 'unset'; // 모달이 언마운트되면 스크롤을 허용합니다.
    };
  }, []);

  const handleCheckboxChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  return (
    <Modal
        isOpen={true}
        onRequestClose={onClose} //모달이 닫힘(화면 외부를 클릭하거나 esc키 감지)
        style={customStyles}
        contentLabel="modal"
      >
        <button onClick={onClose}>닫기</button>
      </Modal>
  );
};

export default WeekPopup;