import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ccc_Register.css";

const CccRegister = () => {
  const logo = "/images/ccc_image/logo.png";
  console.log("회원가입 페이지 렌더링 됨.");

  const [color, setColor] = useState("#929294");
  const [fontWeight, setFontWeight] = useState("normal");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSelectChange = (e) => {
    if (e.target.value !== "") {
      setColor("#692ead");
      setFontWeight("700");
    } else {
      setColor("#929294");
      setFontWeight("normal");
    }
  };

  const handleButtonClick = () => {
    window.location.href = "ccc_poll.html";
  };

  return (
    <div className="register-container">
      <div className="inner">
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
        <div className="content">
          <form
            id="join_form"
            method="post"
            action="register_system.php"
            className="form"
          >
            <div className="form_content">
              <div className="form_section">
                <div className="form_list">
                  <div className="form_item user" id="divId">
                    <input
                      type="text"
                      id="id"
                      name="userid"
                      placeholder="아이디"
                      className="input"
                      value={userId}
                      maxLength="20"
                      autoCapitalize="off"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="form_item lock password" id="divPasswd">
                    <input
                      type="password"
                      id="pswd1"
                      name="userpw"
                      placeholder="비밀번호"
                      className="input"
                      value={password}
                      maxLength="16"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form_list">
                  <div className="form_item user" id="divName">
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="이름"
                      className="input"
                      value={name}
                      maxLength="20"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form_item adult" id="divIdentityGender">
                    <span className="label">성별</span>
                    <div className="radio_group">
                      <label className="radio_label">
                        <input
                          type="radio"
                          id="identityGender1"
                          name="identityGender"
                          value="M"
                        />
                        남자
                      </label>
                      <label className="radio_label">
                        <input
                          type="radio"
                          id="identityGender2"
                          name="identityGender"
                          value="F"
                        />
                        여자
                      </label>
                    </div>
                  </div>
                  <div className="form_item adult" id="divAgeRange">
                    <span className="label">연령대</span>
                    <select
                      id="ageRange"
                      name="ageRange"
                      className="custom-select"
                      onChange={handleSelectChange}
                      style={{ color: color, fontWeight: fontWeight }}
                    >
                      <option value="">선택하세요▽</option>
                      <option value="10">10대</option>
                      <option value="20">20대</option>
                      <option value="30">30대</option>
                      <option value="40">40대</option>
                      <option value="50">50대</option>
                      <option value="60">60대</option>
                      <option value="70">70대</option>
                      <option value="80">80대</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_submit_wrap" id="divBtnAuth">
              <button
                type="button"
                className="btn_submit"
                id="btnSend"
                onClick={handleButtonClick}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CccRegister;
