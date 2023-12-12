// 책 상세 페이지를 받아오게 서버에서 처리
const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.REACT_APP_API_KEY;

const ttbkey = API_KEY;

router.get("/:bookIsbn", async (req, res) => {
  if (!req.params.bookIsbn) {
    return res.status(400).json({ message: "bookIsbn 값이 필요합니다." });
  }
  try {
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx",
      {
        params: {
          ttbkey: ttbkey,
          itemIdType: "ISBN",
          ItemId: req.params.bookIsbn,
          output: "js",
          Version: 20131101,
        },
      }
    );

    const data = response.data;
    // console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 내부 오류입니다." });
  }
});

module.exports = router;
