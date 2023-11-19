import React from 'react';
import Mainnav from '../common/Main_nav';
import MainSlider from '../common/Main_slider';
import MainMonthBook from '../common/Main_monthbook';
import MainHotTopic from '../common/Main_hot_topic';
import Header from '../common/Header';
import Footer from '../common/Footer';

const MainPage = () => {
  console.log("ㅊㅊㅊ 메인화면 렌더링됨.");
  return (
    <div>
      <Header />
      <Mainnav />
      <MainSlider />
      <MainMonthBook />
      <MainHotTopic />
      <Footer />
    </div>
  );
};

export default MainPage;