// MVC 패턴에 맞게 코드르 분리함
// 여기는 controller쪽이랑 비슷하다고 보면됨
// 여기 역할 : Express 앱 설정 , 라우팅 설정 , DB연결 설정
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controller");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userController); // '/user' 경로로 들어오는 요청을 userController에게 위임합니다.

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
