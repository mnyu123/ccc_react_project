require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const aladinApiService = require("../ccc_react_project/src/services/AladinApiService");
// 상대 경로를 사용하여 AladinApiService.js를 가져옵니다.

const bookDetailService = require("../ccc_react_project/src/services/BookDetailService");
// 알라딘 책 상세페이지 관련

const bestSellerService = require("../ccc_react_project/src/services/BestSellerService");
// 알라딘 베스트셀러 출력 관련

const booksearchservice = require("../ccc_react_project/src/services/BookSearchService");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/aladin", aladinApiService);
// '/api/aladin' 경로로 들어오는 요청을 AladinApiService 라우터로 처리하도록 설정합니다.

app.use("/api/bookDetail", bookDetailService);
// 알라딘 책 상세페이지 관련

app.use("/api/booksearch", booksearchservice);

app.get("/api/mybookshelf/:userId", async (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM mybookshelf WHERE UserID = ?";

  db.query(query, [userId], (error, results) => {
    if (error) {
      res.status(500).send({
        error: "서재 정보를 가져오는데 실패하였습니다. 다시 시도해주세요.",
      });
    } else {
      res.send(results);
    }
  });
});

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

// 내 서재 정보 DB 저장
app.post("/api/mybookshelf", (req, res) => {
  const { userId, bookIsbn } = req.body;
  const query = "INSERT INTO mybookshelf (UserID, mybookisbn) VALUES (?, ?)";

  db.query(query, [userId, bookIsbn], (error, results) => {
    if (error) {
      res.status(500).send({
        error: "내 서재에 추가하는데 실패하였습니다. 다시 시도해주세요.",
      });
    } else {
      res.send({ success: true, message: "내 서재에 추가되었습니다." });
    }
  });
});

// 내 서재 정보 DB에서 조회
app.get("/api/mybookshelf/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM mybookshelf WHERE UserID = ?";

  db.query(query, [userId], (error, results) => {
    if (error) {
      res.status(500).send({
        error: "서재 정보를 가져오는데 실패하였습니다. 다시 시도해주세요.",
      });
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.delete("/api/mybookshelf/:userId/:bookIsbn", (req, res) => {
  const { userId, bookIsbn } = req.params;

  const checkQuery =
    "SELECT * FROM mybookshelf WHERE UserID = ? AND mybookisbn = ?";

  db.query(checkQuery, [userId, bookIsbn], (error, results) => {
    if (error) {
      res
        .status(500)
        .send({ error: "서버 오류가 발생했습니다. 다시 시도해주세요." });
    } else if (results.length === 0) {
      res.status(404).send({ error: "해당 책이 사용자의 서재에 없습니다." });
    } else {
      const deleteQuery =
        "DELETE FROM mybookshelf WHERE UserID = ? AND mybookisbn = ?";

      db.query(deleteQuery, [userId, bookIsbn], (error, results) => {
        if (error) {
          res
            .status(500)
            .send({
              error:
                "서재에서 책을 제거하는데 실패하였습니다. 다시 시도해주세요.",
            });
        } else {
          res.send({ message: "책이 성공적으로 삭제되었습니다.", results });
        }
      });
    }
  });
});

// 마이페이지 비밀번호 업데이트
app.post("/api/changePassword", (req, res) => {
  const { userId, newPassword } = req.body;
  const query = "UPDATE user SET UserPW = ? WHERE UserID = ?";

  console.log(`비밀번호 바뀐 유저 : ${userId}`); // 추가된 로그

  db.query(query, [newPassword, userId], (error, results) => {
    if (error) {
      console.error(error); // 추가된 로그
      res
        .status(500)
        .send({ error: "비밀번호 변경에 실패했습니다. 다시 시도해주세요." });
    } else {
      console.log(results); // 추가된 로그
      res.send({
        success: true,
        message: "비밀번호가 성공적으로 변경되었습니다.",
      });
    }
  });
});

// 마이페이지 사용자 정보 조회
app.get("/api/user/:userId", (req, res) => {
  const { userId } = req.params;
  const cleanedUserId = userId.replace(/"/g, ''); // 쌍따옴표 제거
  const query = "SELECT UserName, UserGender FROM user WHERE UserID = ?";

  console.log(`정보 조회가 된 유저 :  ${userId}`); // 추가된 로그

  db.query(query, [cleanedUserId], (error, results) => {
    if (error) {
      console.error(error); // 추가된 로그
      res
        .status(500)
        .send({ error: "사용자 정보 조회에 실패했습니다. 다시 시도해주세요." });
    } else {
      if (results.length > 0) {
        console.log(`조회된 사용자 정보: `, results[0]); // 로그 출력
        res.send({ success: true, ...results[0] });
      } else {
        res.send({ success: false, message: "사용자 정보가 없습니다." });
      }
    }
  });
});
