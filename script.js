/* ==========================================
   PINNACLE ULTRA: MAIN BLOG FEED SCRIPT
   ========================================== */

// 1. YOUR SANITY CONFIGURATION
// Replace "your_project_id" with your actual Sanity ID from your dashboard
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

// 2. THE OPTIMIZED QUERY
// We add "?w=800&q=75&auto=format" to shrink images and save your Vercel bandwidth!
const QUERY = encodeURIComponent(`*[_type == "post"]{
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url + "?w=800&q=75&auto=format",
  description
}`);

// 3. CONSTRUCT THE FULL API URL
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// 4. FETCH DATA FROM SANITY
fetch(URL)
  .then((response) => {
    // Check if the trail is open (API is responding)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(({ result }) => {
    // Find the spot on the page where the blog cards will live
    const blogFeed = document.querySelector(".blog-feed");

    // Only proceed if we actually found some posts
    if (result && result.length > 0) {
      // Clear any "Loading..." text or old content
      blogFeed.innerHTML = "";

      // Loop through each post and build the card
      result.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        // Building the HTML structure for the card
        postCard.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}" class="blog-img" loading="lazy">
            <div class="post-content">
                <h2>${post.title}</h2>
                <p>${post.description}</p>
                <a href="post.html?slug=${post.slug}" class="btn-green">Read More</a>
            </div>
        `;

        // Add the finished card to the feed
        blogFeed.appendChild(postCard);
      });
    } else {
      blogFeed.innerHTML = "<p>No trail stories found yet. Check back soon!</p>";
    }
  })
  .catch((err) => {
    console.error("Trail blocked by error:", err);
    const blogFeed = document.querySelector(".blog-feed");
    if (blogFeed) {
      blogFeed.innerHTML = "<p>Sorry, we couldn't load the blog posts right now.</p>";
    }
  });