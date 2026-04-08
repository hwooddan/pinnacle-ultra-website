/* blog.js - FULLY INTEGRATED WITH GUEST AUTHOR POPUPS */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

// 1. Updated QUERY: Reaches into the 'author' reference to get 'blogAuthor' data
const QUERY = encodeURIComponent(`*[_type == "post"]{
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url + "?w=800&q=75&auto=format",
  body,
  "author": author-> { 
    name,
    "imageUrl": image.asset->url,
    bio,
    instagram,
    website
  }
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
            
            // 2. Author Fallback Logic
            const authorPhoto = post.author?.imageUrl || './images/default-avatar.png';
            const authorName = post.author?.name || 'Guest Author';
            const authorBio = post.author?.bio || "Guest contributor at Pinnacle Ultra.";
            const andreaLink = authorName.toLowerCase().includes("andrea") 
    ? ` <a href="about.html" class="bio-more-link" onclick="event.stopPropagation()">Meet Andrea →</a>` 
    : "";

            // 3. The HTML: Now includes the 'onclick' trigger and the hidden Bio Popup
            postCard.innerHTML = `
                <div class="author-badge" onclick="toggleBio(event, this)">
                    <img src="${authorPhoto}" alt="${authorName}" title="Click to see bio">
                    
                    <div class="author-bio-popup">
                        <h4>${authorName}</h4>
                        <p>${authorBio}${andreaLink}</p>
                        <div class="bio-links">
                            ${post.author?.instagram ? `<a href="${post.author.instagram}" target="_blank" onclick="event.stopPropagation()"><i class="fab fa-instagram"></i></a>` : ''}
                            ${post.author?.website ? `<a href="${post.author.website}" target="_blank" onclick="event.stopPropagation()"><i class="fas fa-globe"></i></a>` : ''}
                        </div>
                    </div>
                </div>

                <img src="${post.imageUrl}" alt="${post.title}" class="blog-img">
                
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.body && post.body[0] && post.body[0].children 
                        ? post.body[0].children[0].text.substring(0, 100) + "..." 
                        : "Click below to read the full story."}</p>
                    <a href="post.html?slug=${post.slug}" class="btn-accent">Read More</a>
                </div>`;
            blogFeed.appendChild(postCard);
          });
        }
      })
      .catch((err) => console.error("Blog Error:", err));
}

/**
 * TOGGLE BIO FUNCTION
 * Handles the opening/closing of the guest author popup
 */
function toggleBio(event, element) {
    // 1. Prevents the browser from following the blog link or refreshing
    event.preventDefault(); 
    event.stopPropagation(); 
    
    console.log("Author badge clicked!");

    // 2. Close any other open bios first so they don't overlap
    document.querySelectorAll('.author-badge').forEach(b => {
        if (b !== element) b.classList.remove('active');
    });

    // 3. Toggle the 'active' class on the clicked badge
    element.classList.toggle('active');
}

// Close the bio if the user clicks anywhere else on the empty page
document.addEventListener('click', () => {
    document.querySelectorAll('.author-badge').forEach(b => b.classList.remove('active'));
});