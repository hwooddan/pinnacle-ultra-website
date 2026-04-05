/* post-details.js - FINAL STABLE VERSION */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
    const QUERY = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        body,
        "imageUrl": mainImage.asset->url + "?auto=format"
    }`);

    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    fetch(URL)
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) {
            const container = document.getElementById('post-content');
            
            // 1. EXTRA SAFE BODY CHECK: 
            // This prevents the "not opening" issue if body is empty or structured differently
            let bodyHTML = "Content is being updated...";
            if (result.body && Array.isArray(result.body)) {
                bodyHTML = result.body
                    .map(block => block.children ? block.children.map(child => child.text).join('') : '')
                    .join('<br><br>');
            } else if (typeof result.body === 'string') {
                bodyHTML = result.body;
            }

            // 2. INJECT CONTENT
            container.innerHTML = `
    <img src="${result.imageUrl || ''}" class="full-post-img" alt="${result.title || 'Blog Post'}">
    <h1>${result.title || 'Untitled Post'}</h1>
    <div class="post-body-text">
        ${bodyHTML}
    </div>
    
    <div class="post-footer">
        <a href="blog.html" class="btn-accent btn-large">← Back to Ultra Ramblings</a>
    </div>
`;
        } else {
            document.getElementById('post-content').innerHTML = "<p>Post not found.</p>";
        }
      })
      .catch(err => {
          console.error("Post Details Error:", err);
          document.getElementById('post-content').innerHTML = "<p>Error loading post. Please try again later.</p>";
      });
}