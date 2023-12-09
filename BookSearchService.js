const express = require("express");
const axios = require("axios");
const router = express.Router();

const ttbkey = "ttbwhdudwo55821335001";

router.get("/booksearch", async (req, res) => {
    const Query = req.query.Query;
  
    if (!Query) {
      return res.status(400).json({ message: "검색어가 필요합니다." });
    }
  
    try {
      const response = await axios.get(
        "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
        {
          params: {
            ttbkey: ttbkey,
            Query: query,
            QueryType: "Title",
            MaxResults: 9,
            start: 1,
            SearchTarget: "Book",
            output: "js",
            Version: 20131101,
          },
        }
      );
  
      const data = response.data;
      console.log("Aladin API 응답:", data); // 콘솔에 데이터 출력
  
      res.json(data);
    } catch (error) {
      console.error("Aladin API 요청 오류:", error);
      res.status(500).json({ message: "서버 내부 오류입니다." });
    }
  });

  
module.exports = router;