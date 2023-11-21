import React, { useState } from "react";
import Mainnav from '../common/Main_nav';
import MainSlider from '../common/Main_slider';
import MainMonthBook from '../common/Main_monthbook';
import MainHotTopic from '../common/Main_hot_topic';
import Header from '../common/Header';
import Footer from '../common/Footer';
import WeekPopup from '../common/WeekPopup'; // WeekPopup 컴포넌트를 불러옵니다

const MainPage = () => {
  console.log("ㅊㅊㅊ 메인화면 렌더링됨.");

  const [isPopupOpen, setIsPopupOpen] = useState(true); // 팝업의 표시 여부를 제어하는 상태 변수
  
  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div>
      <Header />
      <Mainnav />
      <MainSlider />
      <MainMonthBook />
      <MainHotTopic />
      <Footer />
      {isPopupOpen && <WeekPopup onClose={handleClosePopup} />} {/* 팝업 표시 */}
    </div>
  );
};

export default MainPage;