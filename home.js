const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

const QUERY = encodeURIComponent(`*[_type == "homePage"][0]{
  welcomeTitle,
  welcomeText,
  "imageUrl": profileImage.asset->url
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

fetch(URL)
  .then(res => res.json())
  .then(({ result }) => {
    console.log("HOME DATA:", result);
    if (result) {
        document.getElementById("home-title").innerText = result.welcomeTitle || "Pinnacle Ultra Coaching";
        document.getElementById("home-text").innerText = result.welcomeText || "Trail & Ultra Coaching";
        if (result.imageUrl) document.getElementById("home-image").src = result.imageUrl + "?w=600";
    } else {
        document.getElementById("home-title").innerText = "Data Missing in Sanity";
    }
  })
  .catch(err => {
      console.error("Connection Failed:", err);
      document.getElementById("home-title").innerText = "Check CORS Settings";
  });