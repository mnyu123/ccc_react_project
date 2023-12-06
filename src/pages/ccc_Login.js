import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/ccc_Login.css";
import axios from "axios";
const logo = "/images/ccc_image/logo.png";
const appleLogo = "/images/ccc_image/apple.png";
const googleLogo = "/images/ccc_image/google.png";

const Ccc_Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") setId(value);
    else if (name === "pw") setPw(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      UserID: id,
      UserPW: pw,
    };

    axios
      .post(`http://localhost:3000/Login`, { user })
      .then((res) => {
        // console.log(res);
        console.log(user.UserID);
        if (res.data.success) {
          // 로그인 성공 시 사용자 정보를 세션 스토리지에 저장
          sessionStorage.setItem("userid", JSON.stringify(user.UserID));
          sessionStorage.setItem("userpw", JSON.stringify(user.UserPW));

          // 로그인 성공 여부를 세션 스토리지에 저장
          sessionStorage.setItem("isLoggedIn", "true");

          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.");
      });
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img src={logo} alt="로고" />
      </Link>

      <div className="login_wrap">
        <form onSubmit={handleSubmit}>
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
                      value={id}
                      onChange={handleInputChange}
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
                      value={pw}
                      onChange={handleInputChange}
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
};

export default Ccc_Login;
