import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Mypage from "../pages/Mypage";
const logo = "/images/ccc_image/logo.png";
const search = "/images/ccc_image/search.png";
const books = "/images/ccc_image/books.png";
const user = "/images/ccc_image/user.png";
const upArrow = "/images/ccc_image/up-arrow.png";

class Header extends React.Component {
  // 검색창의 값과 Mypage 컴포넌트의 표시 상태를 저장하기 위한 state를 설정합니다.
  state = {
    search: "",
    isMypageOpen: false,
  };

  // 마이페이지를 열고 닫는 메서드입니다.
  toggleMypage = () => {
    this.setState((prevState) => ({ isMypageOpen: !prevState.isMypageOpen }));
  };

  // 검색창의 값이 바뀔 때마다 이 함수를 실행하여 state를 업데이트합니다.
  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    console.log("헤더 렌더링됨.");
    return (
      <React.Fragment>
        <header className="header_fixed">
          <div className="header_inner">
            <div className="logo">
              <img src={logo} alt="로고" />
            </div>
            <div className="search_wrap">
              <div className="search_box">
                <div className="search_">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="관심있는 책을 검색해보세요."
                    className="input_text"
                    value={this.state.search}
                    // state의 값을 사용합니다.
                    onChange={this.handleChange}
                    // 값이 변경될 때마다 handleChange 메서드를 호출합니다.
                    maxLength="20"
                    autoCapitalize="off"
                  />
                  <span>
                    <button type="search_button" id="searchbooks">
                      <img src={search} alt="search_button" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="menu_wrap">
              <div className="library_icon">
                {/* Link 컴포넌트를 사용해 /mylibrary 경로로 이동하게 변경했습니다. */}
                <Link to="/mylibrary">
                  <button className="library_button" id="librarypagemove">
                    <img src={books} alt="search_button" />
                  </button>
                </Link>
              </div>
              <div className="mypage_icon">
                <button
                  className="user_button"
                  id="userpagemove2"
                  onClick={this.toggleMypage}
                >
                  <img src={user} alt="search_button" />
                </button>
              </div>
            </div>
          </div>
        </header>
        <a href="#" className="top-button" onClick={this.scrollToTop}>
          <img src={upArrow} alt="Top 버튼" />
        </a>
        <Mypage isMypageOpen={this.state.isMypageOpen} onClose={this.toggleMypage} />
      </React.Fragment>
    );
  }

  // 페이지의 최상단으로 이동하는 함수입니다.
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}

export default Header;
