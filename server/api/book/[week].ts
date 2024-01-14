import axios from "axios";
import cheerio from "cheerio";
import iconv from "iconv-lite";

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://etnyrefdmddqiuatswhb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bnlyZWZkbWRkcWl1YXRzd2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4ODc3MDIsImV4cCI6MjAyMDQ2MzcwMn0.IwIU929Y-H6JsZdvZ2QSEsmbmBLKIND7B7_a3UpRfhs"
);

export default defineEventHandler(async (event) => {
  const week = getRouterParam(event, "week");

  // 날짜를 받아서
  const monday = getMonday(Number(week));

  // 오리콘 차트 데이터 리턴
  const data = await oricon_loop(monday);

  await saveToDatabase(data);

  return data;
});

async function saveToDatabase(
  data: {
    jp: string;
    name: string;
    sales: string;
    rank: number;
    date: string;
    booknum: number;
  }[]
) {
  try {
    const a = await supabase.from("book").insert(data);
  } catch (error) {
    console.log(error);
  }
}

// 토요일의 데이터를 yyyy-mm-dd 형식으로 반환
function getMonday(weeksAgo: number = 0) {
  const today = new Date();

  // 토요일의 날짜를 구합니다.
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7 * weeksAgo + ((1 - today.getDay() + 7) % 7)
  );

  // 월과 일이 항상 두 자리 수가 되도록 합니다.
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const date = String(monday.getDate()).padStart(2, "0");

  // yyyy-mm-dd 형식으로 반환합니다.
  return `${monday.getFullYear()}-${month}-${date}`;
}

// 루프문
async function oricon_loop(monday: string) {
  // https://www.oricon.co.jp/rank/obc/w/2023-12-11/
  // https://www.oricon.co.jp/rank/obc/w/2023-12-11/p/2/
  // https://www.oricon.co.jp/rank/obc/w/2023-12-11/p/3/

  // 위와같이 3페이지를 읽어서 데이터를 뽑아내고 싶은데,
  // fetchData 를 수정해서 3번 루프돌면서 데이터를 뽑아줘

  const base_url = `https://www.oricon.co.jp/rank/obc/w/${monday}/`;
  let allData: {
    jp: string;
    name: string;
    sales: string;
    rank: number;
    booknum: number;
  }[] = [];

  for (let i = 2; i >= 0; i--) {
    // 위 링크에서 데이터를 크롤링하여 반환
    const url = i === 0 ? base_url : `${base_url}p/${i + 1}/`;

    const data = await fetchData(url);
    allData = [...data, ...allData];
  }

  const includingDates = allData.map((item) => {
    return {
      ...item,
      date: monday,
    };
  });

  return includingDates;
}

// 크롤링
async function fetchData(url: string) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const html = iconv.decode(Buffer.from(response.data), "shift_jis");
  const $ = cheerio.load(html);
  const data: {
    jp: string;
    name: string;
    sales: string;
    rank: number;
    booknum: number;
  }[] = [];

  // class="box-rank-entry" 인 section 이 10번 반복되는데,
  // 각 section 에서
  // <h2 class="title" itemprop="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">킹덤 70</font></font></h2>
  // 위 타이틀에서는 킹덤 70 이라는 데이터를 추출하고,

  // <p class="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">하라 야스히사</font></font></p>
  // 위 이름에서는 하라 야스히사 라는 데이터를 추출하고,

  // <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">예상 매출 부수: 43,424부</font></font>
  // 위 예상 매출 부수: 43,424부 라는 데이터를 추출하고,

  // <p class="num "><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">1</font></font></p>
  // 위 순위에서는 1 이라는 데이터를 추출하여

  // 이 4가지 데이터를 배열로 만들어서 반환하면 될 것 같습니다. 10개의 section 을 반복하면서 4가지 데이터를 추출하면 될 것 같습니다.

  // 웹사이트의 구조에 따라 적절한 셀렉터를 사용하여 데이터를 추출합니다.
  // 예를 들어, 모든 h1 태그의 텍스트를 가져오려면 다음과 같이 할 수 있습니다:
  $(".box-rank-entry").each((index, element) => {
    const title = $(element).find("h2.title").text().trim();
    const name = $(element).find("p.name").text().trim();
    let sales = $(element).find("ul.list > li").eq(3).text().trim();
    const rank = Number($(element).find("p.num").text().trim());

    // jp 에 킹덤 70 이렇게 들어 있는데, 권수에 해당하는 숫자와 앞에 책이름과 분리하고 싶음
    const match = title.match(/(\D+)(\d+)/);

    sales = sales.replace(/[^0-9]/g, "");

    if (match) {
      const jp = match[1].trim(); // 책 이름
      const booknum = Number(match[2]); // 권수

      data.push({ jp, name, sales, rank, booknum });
    }
  });

  return data;
}
