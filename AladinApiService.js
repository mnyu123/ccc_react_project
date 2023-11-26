const express = require("express");
const axios = require("axios");
const qs = require('qs');
const router = express.Router();

const ttbkey = "ttbwhdudwo55821335001";

router.get("/:categoryId", async (req, res) => {
  if (!req.params.categoryId) {
    return res.status(400).json({ message: "categoryId 값이 필요합니다." });
  }
  try {
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      {
        params: {
          ttbkey: ttbkey,
          CategoryId: req.params.categoryId,
          Query: req.query.Query, // 클라이언트에서 보낸 검색어를 사용합니다.
          QueryType: req.query.QueryType, // 클라이언트에서 보낸 검색어 종류를 사용합니다.
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "js",
          Version: 20131101,
        },
      }
    );

    const data = response.data;
    console.log(data); // 콘솔에 데이터 출력

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 내부 오류입니다." });
  }
});

module.exports = router;
