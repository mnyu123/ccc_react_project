// MVC 패턴중 Model 부분
// 데이터베이스와 통신하는 코드 , CURD작업을 하는 공간
// 쉽게 말해 여기서 DB 쿼리문 작성하면됨.
// userModel.js
const db = require("./db"); // 데이터베이스 연결 설정 파일

exports.register = (user, callback) => {
  const query =
    "INSERT INTO user (UserID, UserPW, UserName, UserGender, UserAge) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [user.UserID, user.UserPW, user.UserName, user.UserGender, user.UserAge],
    callback
  );
};

exports.login = (user, callback) => {
  const query = "SELECT * FROM user WHERE UserID = ? AND UserPW = ?";
  db.query(query, [user.UserID, user.UserPW], callback);
};
