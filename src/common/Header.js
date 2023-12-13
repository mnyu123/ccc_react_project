import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import { Link } from "react-router-dom";
import Mypage from "../pages/Mypage";
const logo = "/images/ccc_image/logo.png";
const search = "/images/ccc_image/search.png";
const books = "/images/ccc_image/books.png";
const user = "/images/ccc_image/user.png";
const upArrow = "/images/ccc_image/up-arrow.png";

const userid = JSON.parse(sessionStorage.getItem("userid"));

class Header extends React.Component {
  // 검색창의 값과 Mypage 컴포넌트의 표시 상태를 저장하기 위한 state를 설정합니다.
  state = {
    search: "",
    isMypageOpen: false,
  };

  // 마이페이지를 열고 닫는 메서드입니다.
  toggleMypage = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("로그인이 필요합니다.");
    } else {
      this.setState((prevState) => ({
        isMypageOpen: !prevState.isMypageOpen,
      }));
    }
  };

  // 검색창의 값이 바뀔 때마다 이 함수를 실행하여 state를 업데이트합니다.
  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    // console.log("헤더 렌더링됨.");
    return (
      <React.Fragment>
        <header className="header_fixed2">
          <div className="header_inner2">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="로고" />
              </Link>
            </div>
            <div className="search_wrap">
              <div className="search_box">
                <div className="search_">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="관심있는 책을 검색해보세요."
                    className="input_text_mh"
                    value={this.state.search}
                    // state의 값을 사용합니다.
                    onChange={this.handleChange}
                    // 값이 변경될 때마다 handleChange 메서드를 호출합니다.
                    maxLength="20"
                    autoCapitalize="off"
                  />
                  <span>
                  <Link to={`/search?query=${this.state.search}`}>
                        <button type="search_button" id="searchbooks">
                          <img src={search} alt="search_button" />
                        </button>
                      </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="menu_wrap">
              <div>
                <Link to="/register">
                  <button className="register_">회원가입</button>
                </Link>
                <span>|</span>
                <Link to="/login">
                  <button className="login_">로그인</button>
                </Link>
              </div>
              <div className="library_icon">
                <Link to="/mylibrary">
                  <button type="books_button" id="mybooksmove">
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
        <Mypage
          isMypageOpen={this.state.isMypageOpen}
          onClose={this.toggleMypage}
        />
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
