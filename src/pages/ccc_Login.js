import React from "react";
import { Link } from "react-router-dom";
import "../css/ccc_Login.css";
const logo = "/images/ccc_image/logo.png";
const appleLogo = "/images/ccc_image/apple.png";
const googleLogo = "/images/ccc_image/google.png";

class Ccc_Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // 여기다 로그인 관련 로직을 추가하면 된다.
  };

  render() {
    return (
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
        <div className="login_wrap">
          <form onSubmit={this.handleSubmit}>
            <ul className="panel_wrap">
              <li className="panel_item" style={{ display: "block" }}>
                <div
                  className="panel_inner"
                  role="tabpanel"
                  aria-controls="loinid"
                >
                  <div className="id_pw_wrap">
                    <div className="input_row" id="id_line">
                      <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="아이디"
                        title="아이디"
                        className="input_text required-input"
                        maxLength="20"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="input_row" id="pw_line">
                      <input
                        type="password"
                        id="pw"
                        name="pw"
                        placeholder="비밀번호"
                        title="비밀번호"
                        className="input_text required-input"
                        maxLength="16"
                        value={this.state.pw}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="btn_login_wrap">
                    <button type="submit" className="btn_login" id="log.login">
                      <span className="btn_text">로그인</span>
                    </button>
                  </div>
                  <div className="dotted-line">
                    <span>또는</span>
                  </div>
                  <div className="btn_with_wrap">
                    <button type="submit" className="btn_with" id="Apple">
                      <img
                        src={appleLogo}
                        alt="Apple 로고"
                        className="button-icon"
                      />
                      <span className="sign-in-with">Sign in with Apple</span>
                    </button>
                    <button type="button" className="btn_with" id="Google">
                      <img
                        src={googleLogo}
                        alt="Google 로고"
                        className="button-icon"
                      />
                      <span className="sign-in-with">Sign in with Google</span>
                    </button>
                  </div>

                  <div className="dotted-line2">
                    <p>
                      계정이 없으신가요?{" "}
                      <Link to="/register">
                        <button type="button" id="registerButton">
                          회원가입
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Ccc_Login;