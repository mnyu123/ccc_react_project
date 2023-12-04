import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ccc_Register.css";
import Poll from "../common/Poll"; // Poll 컴포넌트를 import
import axios from "axios";

const CccRegister = () => {
  const logo = "/images/ccc_image/logo.png";
  console.log("회원가입 페이지 렌더링 됨.");

  const [color, setColor] = useState("#929294");
  const [fontWeight, setFontWeight] = useState("normal");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창의 열림 여부를 나타내는 상태

  const handleSelectChange = (e) => {
    if (e.target.value !== "") {
      setColor("#692ead");
      setFontWeight("700");
    } else {
      setColor("#929294");
      setFontWeight("normal");
    }
  };

  // 성별 선택 핸들러
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 연령대 선택 핸들러
  const handleAgeChange = (e) => {
    setAge(e.target.value);
    if (e.target.value !== "") {
      setColor("#692ead");
      setFontWeight("700");
    } else {
      setColor("#929294");
      setFontWeight("normal");
    }
  };

  const handleButtonClick = () => {
    if (userId && password && name) {
      axios
        .post("http://localhost:3000/register", {
          user: {
            UserID: userId,
            UserPW: password,
            UserName: name,
            UserGender: gender,
            UserAge: age,
          },
        })

        .then(function (response) {
          console.log(response);
          // 성공 시 처리 로직
          setIsModalOpen(true);
          console.log("모달 생성됨.");
        })
        .catch(function (error) {
          console.log(error);
          // 실패 시 처리 로직
        });
    } else {
      alert("정보를 모두 입력해주세요.");
    }
  };

  return (
    <div className="register-container">
      <div className="inner">
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
        <div className="content_rg">
          <form
            id="join_form"
            method="post"
            action="register_system.php"
            className="form_rg"
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
                    <ul className="adult_list">
                      <li className="radio_item frist">
                        <input
                          type="radio"
                          id="identityGender1"
                          name="identityGender"
                          value="M"
                          className="blind"
                          onChange={handleGenderChange}
                        />
                        <label htmlFor="identityGender1">남자</label>
                      </li>
                      <li className="radio_item frist">
                        <input
                          type="radio"
                          id="identityGender2"
                          name="identityGender"
                          value="F"
                          className="blind"
                          onChange={handleGenderChange}
                        />
                        <label htmlFor="identityGender2">여자</label>
                      </li>
                    </ul>
                    <ul className="adult_list" id="listForeigner">
                      <li className="radio_item second">
                        <input type="radio" id="foreigner1" name="foreigner" value="K" className="blind" checked />
                        <label htmlFor="foreigner1">연령대</label>
                      </li>

                      <li className="radio_item second">
                        <select
                          id="ageRange"
                          name="ageRange"
                          className="custom-select"
                          onChange={handleAgeChange}
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
                      </li>
                    </ul>

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
              {isModalOpen && (
                <Poll
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  userId={userId}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CccRegister;
