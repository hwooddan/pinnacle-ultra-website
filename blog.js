/* blog.js - SYNCED WITH POST SCHEMA */
const PROJECT_ID = "wpo056ht"; // <-- Put your ID here
const DATASET = "production";

// 1. We ask for 'mainImage' and 'body' to match your schema
const QUERY = encodeURIComponent(`*[_type == "post"]{
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url + "?w=800&q=75&auto=format",
  body
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const blogFeed = document.querySelector(".blog-feed");

if (blogFeed) {
    fetch(URL)
      .then((res) => res.json())
      .then(({ result }) => {
        if (result && result.length > 0) {
          
          blogFeed.innerHTML = ""; 
          result.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            
            // 2. Map 'body' and 'imageUrl' correctly
            postCard.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.title}" class="blog-img">
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.body && post.body[0] && post.body[0].children ? post.body[0].children[0].text.substring(0, 100) + "..." : ""}</p>
                    <a href="post.html?slug=${post.slug}" class="btn-accent">Read More</a>
                </div>`;
            blogFeed.appendChild(postCard);
          });
        }
      })
      .catch((err) => console.error("Blog Error:", err));
}