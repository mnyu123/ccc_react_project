const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  const usergenre = req.body.usergenre;
  const query =
    "INSERT INTO usergenre (genre1, genre2, genre3) VALUES (?, ?, ?)";

  db.query(
    query,
    [usergenre.genre1, usergenre.genre2, usergenre.genre3],
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
