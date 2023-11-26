const express = require("express");
const axios = require("axios");
const qs = require('qs');
const router = express.Router();

const ttbkey = "ttbwhdudwo55821335001";

router.get("/:query", async (req, res) => {
  if (!req.params.query) {
    return res.status(400).json({ message: "query 값이 필요합니다." });
  }
  try {
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      {
        params: {
          ttbkey: ttbkey,
          Query: req.params.query,
          QueryType: "Title",
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
