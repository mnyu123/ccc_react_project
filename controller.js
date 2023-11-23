// MVC 패턴중 컨트롤러
// 사용자 요청을 받아 적절한 모델(userModel)안의 함수를 호출
// 그 결과를 뷰(View , 리액트)에 전달험
// controller.js
const express = require("express");
const userModel = require("./userModel");
const router = express.Router();

const app = express();

app.post("/register", (req, res) => {
  userModel.register(req.body.user, (error, results) => {
    if (error) {
      res
        .status(500)
        .send({ error: "회원가입에 실패하였습니다. 다시 시도해주세요." });
    } else {
      res.send({
        success: true,
        message: "회원가입이 성공적으로 완료되었습니다.",
      });
    }
  });
});

app.post("/login", (req, res) => {
  userModel.login(req.body.user, (error, results) => {
    if (error) {
      res
        .status(500)
        .send({
          error: "로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.",
        });
    } else {
      if (results.length > 0) {
        res.send({ success: true, message: "로그인 성공" });
      } else {
        res.send({ success: false, message: "로그인 실패" });
      }
    }
  });
});

module.exports = router;
