/* ==========================================
   PINNACLE ULTRA: HOME PAGE SCRIPT
   ========================================== */

const PROJECT_ID = "wpo056ht"; // <-- Make sure your ID is here!
const DATASET = "production";

// This query looks for your "Author" info instead of "Posts"
const QUERY = encodeURIComponent(`*[_type == "author"][0]{
  name,
  "welcomeHeadline": name + " Coaching",
  "welcomeText": bio,
  "imageUrl": image.asset->url + "?w=600&q=75&auto=format"
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// 1. Grab the elements from your HTML
const homeTitle = document.getElementById("home-title");
const homeText = document.getElementById("home-text");
const homeImage = document.getElementById("home-image");

// 2. Fetch the data
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    if (result) {
      // 3. Fill the Welcome Card with Andrea's data
      if (homeTitle) homeTitle.innerText = result.name;
      if (homeText) homeText.innerText = "Ultra Running Coach & Adventure Seekers"; // Or use result.welcomeText
      if (homeImage) homeImage.src = result.imageUrl;
    }
  })
  .catch((err) => {
    console.error("Trail blocked:", err);
    if (homeTitle) homeTitle.innerText = "Welcome to Pinnacle Ultra";
  });