const BASE_URL = "https://api.hnpwa.com/v0";
let loading = false;
let currentPage = 0;
let rows_per_page = 30;

// To avoid too many if-else using object point reff
const URL_END_POINT = {
  null: "news",
  news: "news",
  newest: "newest",
  ask: "ask",
  show: "show",
  jobs: "jobs",
};

// fetch api

const getCurrentURL = () => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const product = urlParams.get("search");
    const val = returnURLVAL(product);
    currentPage += 1;

    fetchAPI(val, currentPage);
  } catch (error) {
    console.log(error);
  }
};

// To avoid too many if-else
const returnURLVAL = (product) => {
  return URL_END_POINT[product];
};

const fetchAPI = async (URL, PAGE) => {
  loading = true;
  let newsData = [];
  try {
    const response = await axios.get(`${BASE_URL}/${URL}/${PAGE}.json`);
    loading = false;

    if (!response.data) {
      loading = false;
      let section = document.createElement("section");

      let p = document.createElement("p");
      p.innerText = "End Page";

      section.appendChild(p);
      document.querySelector(".content-news").appendChild(section);
    }

    newsData.push(response.data);

    const displayAllNews = (newsData) => {
      newsData.forEach((news) => {
        if (loading) {
          let section = document.createElement("section");

          let p = document.createElement("p");
          p.innerText = "Loading...";

          section.appendChild(p);
          document.querySelector(".content-news").appendChild(section);
        } else {
          let section = document.createElement("section");
          let h1 = document.createElement("h1");
          h1.innerText = news.title;

          let span = document.createElement("span");
          let userSpan = document.createElement("span");
          userSpan.setAttribute("class", "user");
          let dateSpan = document.createElement("span");

          let p = document.createElement("p");
          if (news.points || news.user) {
            p.innerText = `${news.points} by `;
            userSpan.innerText = `${news.user} `;
            dateSpan.innerText = `| ${news.time_ago}`;

            p.appendChild(userSpan);
            p.appendChild(dateSpan);
          } else {
            p.innerText = ` ${news.time_ago}`;
          }
          h1.appendChild(span);

          let anchor = document.createElement("a");
          anchor.setAttribute("href", news.url);
          anchor.setAttribute("target", "__blank");
          anchor.innerText = news.domain;

          span.append(anchor);

          section.appendChild(h1);
          section.appendChild(p);

          document.querySelector(".content-news").appendChild(section);
        }
      });
    };

    return displayAllNews(newsData[0]);
  } catch (error) {
    console.log(error);
    loading = false;
    newsData = [];
  }
};

getCurrentURL();
