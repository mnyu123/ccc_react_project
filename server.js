const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const aladinApiService = require("./AladinApiService");
// 상대 경로를 사용하여 AladinApiService.js를 가져옵니다.

const bookDetailService = require("./BookDetailService");
// 알라딘 책 상세페이지 관련

const bestSellerService = require("./BestSellerService");
// 알라딘 베스트셀러 출력 관련

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/aladin", aladinApiService);
// '/api/aladin' 경로로 들어오는 요청을 AladinApiService 라우터로 처리하도록 설정합니다.

app.use("/api/bookDetail", bookDetailService);
// 알라딘 책 상세페이지 관련

app.use("/api/bestList", bestSellerService);
// 알라딘 베스트셀러 출력 관련

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "bookshelf",
});

db.connect((error) => {
  if (error) {
    console.error(`MySQL 연결 실패: ${error}`);
  } else {
    console.log("MySQL에 성공적으로 연결되었습니다.");
  }
});

app.post("/register", (req, res) => {
  const user = req.body.user;
  const query =
    "INSERT INTO user (UserID, UserPW, UserName, UserGender, UserAge) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [user.UserID, user.UserPW, user.UserName, user.UserGender, user.UserAge],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "회원가입에 실패하였습니다. 다시 시도해주세요." });
      } else {
        res.send({
          success: true,
          message: "회원가입이 성공적으로 완료되었습니다.",
        });
      }
    }
  );
});

app.post("/poll", (req, res) => {
  const { userId, usergenre } = req.body;
  const query =
    "INSERT INTO usergenre (UserID, genre1, genre2, genre3) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [userId, usergenre.genre1, usergenre.genre2, usergenre.genre3],
    (error, results) => {
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
    }
  );
});

app.post("/Login", (req, res) => {
  const user = req.body.user;
  const query = "SELECT * FROM user WHERE UserID = ? AND UserPW = ?";

  db.query(query, [user.UserID, user.UserPW], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({
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

app.post("/polledit", (req, res) => {
  const userid = req.body.userid; // 요청 본문에서 사용자 아이디를 가져옴
  const usergenre = req.body.usergenre;

  const query =
    "UPDATE usergenre SET genre1 = ?, genre2 = ?, genre3 = ? WHERE UserID = ?";

  db.query(
    query,
    [usergenre.genre1, usergenre.genre2, usergenre.genre3, userid],
    (error, results) => {
      if (error) {
        res
          .status(500)
          .send({ error: "변경에 실패하였습니다. 다시 시도해주세요." });
      } else {
        res.send({ success: true, message: "변경이 완료되었습니다." });
      }
    }
  );
});

app.get("/api/usergenre/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM usergenre WHERE UserID = ?";

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({
        error: "장르 정보를 가져오는데 실패하였습니다. 다시 시도해주세요.",
      });
    } else {
      if (results.length > 0) {
        res.send({
          success: true,
          genre1: results[0].genre1,
          genre2: results[0].genre2,
          genre3: results[0].genre3,
        });
      } else {
        res.send({ success: false, message: "장르 정보가 없습니다." });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
