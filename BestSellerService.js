// 분야 베스트(bestList) 관련 api 처리
const express = require("express");
const axios = require("axios");
const router = express.Router();

const ttbkey = "ttbwhdudwo55821335001";

router.get("/:categoryId", async (req, res) => {
  if (!req.params.categoryId) {
    return res.status(400).json({ message: "categoryId 값이 필요합니다." });
  }
  try {
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemList.aspx",
      {
        params: {
          ttbkey: ttbkey,
          QueryType: "Bestseller", // 베스트셀러 정보를 요청합니다.
          CategoryId: req.params.categoryId, // 카테고리 ID를 클라이언트에서 받아옵니다.
          MaxResults: 9, // 결과의 최대 개수를 지정합니다.
          start: 1, // 시작 위치를 지정합니다.
          output: "js", // 출력 형식을 지정합니다.
          Version: 20131101, // API 버전을 지정합니다.
        },
      }
    );

    // 원본 데이터
    const data = response.data;
    console.log(data); // 콘솔에 데이터 출력

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 내부 오류입니다." });
  }
});

module.exports = router;