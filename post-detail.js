/* post-details.js - UPDATED FOR INLINE IMAGES */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
    // UPDATED QUERY: Now fetches URLs for any images found inside the 'body' array
    const QUERY = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        "imageUrl": mainImage.asset->url + "?auto=format",
        body[]{
            ...,
            _type == "image" => {
                "url": asset->url
            }
        }
    }`);

    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    fetch(URL)
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) {
            const container = document.getElementById('post-content');
            
            let bodyHTML = "Content is being updated...";
            
            if (result.body && Array.isArray(result.body)) {
                // NEW LOGIC: Loop through every block in the body
                bodyHTML = result.body.map(block => {
                    
                    // 1. If it's a standard text block, wrap it in <p> tags
                    if (block._type === 'block') {
                        const text = block.children ? block.children.map(child => child.text).join('') : '';
                        return `<p>${text}</p>`;
                    }
                    
                    // 2. If it's an image block, create an <img> tag with the inline class
                    if (block._type === 'image' && block.url) {
                        return `<img src="${block.url}?w=800&auto=format" class="inline-post-img" alt="Blog Image">`;
                    }
                    
                    return '';
                }).join('');

            } else if (typeof result.body === 'string') {
                bodyHTML = `<p>${result.body}</p>`;
            }

            // INJECT CONTENT
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