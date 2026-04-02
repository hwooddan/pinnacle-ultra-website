/* blog.js - ONLY FOR THE BLOG PAGE */
const PROJECT_ID = "wpo056ht"; // <-- Make sure your ID is here!
const DATASET = "production";

const QUERY = encodeURIComponent(`*[_type == "post"]{
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url + "?w=800&q=75&auto=format",
  description
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
            postCard.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.title}" class="blog-img">
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <a href="post.html?slug=${post.slug}" class="btn-green">Read More</a>
                </div>`;
            blogFeed.appendChild(postCard);
          });
        }
      })
      .catch((err) => console.error("Blog Error:", err));
}