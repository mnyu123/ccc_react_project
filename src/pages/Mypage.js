import React, { Component } from "react";
import "../css/Mypage.css"; // Mypage.css를 불러옵니다.

class Mypage extends Component {
  render() {
    return (
      <div className={`modal ${this.props.isMypageOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>마이페이지</h2>
          <p>비밀번호 재확인</p>
          <p>보안을 위해 비밀번호를 다시 입력해주세요.</p>
          <div className="myname">
            <span>
              <img src="/images/ccc_image/ghost.png" alt="profile" />
            </span>
            <span className="username_wrap">
              <input
                type="text"
                value="사용자"
                className="username"
                id="username"
                readOnly
              />
            </span>
            <span>님,</span>
          </div>
          <input type="password" placeholder="비밀번호" />
          <button>확인</button>
          <button>로그아웃</button>
          <button onClick={this.props.onClose}>닫기</button>
        </div>
      </div>
    );
  }
}

export default Mypage;
