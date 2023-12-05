import React from "react";
import "../css/Main_Header.css";
import { Link } from "react-router-dom";
import Mypage from "../pages/Mypage";

// 이미지 경로
const logo = "/images/ccc_image/logo.png";
const search = "/images/ccc_image/search.png";
const books = "/images/ccc_image/books.png";
const user = "/images/ccc_image/user.png";
const upArrow = "/images/ccc_image/up-arrow.png";
const loginIcon = "/images/ccc_other/login.png";
const registerIcon = "/images/ccc_other/register.png";

const userid = JSON.parse(sessionStorage.getItem("userid"));


class Header extends React.Component {
    headerRef = React.createRef(); // 추가

    state = {
        search: "",
        isMypageOpen: false,
        isScrolled: false, // 추가
    };

    toggleMypage = () => {
        this.setState((prevState) => ({ isMypageOpen: !prevState.isMypageOpen }));
    };

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    };

    handleScroll = () => {
        const totalHeight = this.headerRef.current ? this.headerRef.current.offsetHeight : 0;
        if (window.pageYOffset > totalHeight) {
            this.setState({ isScrolled: true });
        } else {
            this.setState({ isScrolled: false });
        }
    }


    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        console.log("헤더 렌더링됨.");
        console.log("사용자: ", userid);
        return (
            <React.Fragment>
                {!this.state.isScrolled &&
                    <header className="header_normal" ref={this.headerRef}>
                        <div className="header_inner" id="inner1">
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
                                            onChange={this.handleChange}
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
                                    <Link to="/mylibrary">
                                        <button type="books_button" id="mybooksmove">
                                            <img src={books} alt="search_button" />
                                        </button>
                                    </Link>
                                </div>
                                <div className="mypage_icon">
                                    <button
                                        className="user_button"
                                        id="userpagemove1"
                                        onClick={this.toggleMypage}
                                    >
                                        <img src={user} alt="search_button" />
                                    </button>
                                    {/* 로그인 버튼 */}
                                    <Link to="/login">
                                        <img className="login_icon" src={loginIcon} alt="로그인" />
                                    </Link>
                                    {/* 회원가입 버튼 */}
                                    <Link to="/register">
                                        <img
                                            className="register_icon"
                                            src={registerIcon}
                                            alt="회원가입"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                }
                {this.state.isScrolled &&
                    <header className={this.state.isScrolled ? 'header_fixed' : 'header_normal'}>
                        <div className="header_inner">
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
                                            onChange={this.handleChange}
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
                                <nav className="small_nav_2">
                                    <ul>
                                        <li>
                                            <a href="#">오늘의 책</a>
                                        </li>
                                        <li>
                                            <a href="#monthbooks_wrap">이달의 책</a>
                                        </li>
                                        <li>
                                            <a href="#soaring_wrap">급상승</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="menu_wrap">
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
                                    {/* 로그인 버튼 */}
                                    <Link to="/login">
                                        <img className="login_icon" src={loginIcon} alt="로그인" />
                                    </Link>
                                    {/* 회원가입 버튼 */}
                                    <Link to="/register">
                                        <img
                                            className="register_icon"
                                            src={registerIcon}
                                            alt="회원가입"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                }
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

if (userid) {
    console.log("사용자: ", userid);
} else {
    console.log("로그인 정보가 없습니다.");
}

export default Header;
