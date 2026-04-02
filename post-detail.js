/* post-details.js - SYNCED WITH POST SCHEMA */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

// 1. Get the slug from the URL (e.g., post.html?slug=my-run)
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
    // 2. We ask Sanity for the post that matches this slug
    const QUERY = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        body,
        "imageUrl": mainImage.asset->url + "?w=1200&q=85&auto=format"
    }`);

    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    fetch(URL)
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) {
            const container = document.getElementById('post-content');
            
            // Map the body text safely
            const bodyText = result.body && result.body[0] && result.body[0].children 
                             ? result.body[0].children[0].text 
                             : "Content coming soon...";

            // Inject content AND the "Back to Blog" button at the bottom
            container.innerHTML = `
                <img src="${result.imageUrl}" class="full-post-img" alt="${result.title}">
                <h1>${result.title}</h1>
                <div class="post-body-text">
                    ${bodyText}
                </div>
                
                <div class="post-footer">
                    <a href="blog.html" class="btn-green btn-large">← Back to Ultra Ramblings</a>
                </div>
            `;
        }
      })
      .catch(err => console.error("Post Details Error:", err));