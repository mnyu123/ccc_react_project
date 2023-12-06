import React, { useState, useEffect } from "react";
import Mainnav from "../common/Main_nav";
import MainSlider from "../common/Main_slider";
import MainMonthBook from "../common/Main_monthbook";
import MainHotTopic from "../common/Main_hot_topic";
import Header from "../common/Main_Header";
import Footer from "../common/Footer";
import WeekPopup from "../common/WeekPopup"; // WeekPopup 컴포넌트를 불러옵니다

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const dontShowToday = localStorage.getItem('dontShowToday');
    if (dontShowToday !== 'true') {
      setIsPopupOpen(true);
    }
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Header />
      <Mainnav />
      <MainSlider />
      <MainMonthBook />
      <MainHotTopic />
      <Footer />
      {isPopupOpen && <WeekPopup isOpen={isPopupOpen} onClose={handleClosePopup} />}
    </div>
  );
};

export default MainPage;
