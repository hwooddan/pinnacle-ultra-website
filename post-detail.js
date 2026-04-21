/* post-details.js - FULLY FORMATTED WITH LINKS & IMAGES */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
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
            let bodyHTML = "";

            if (result.body && Array.isArray(result.body)) {
                bodyHTML = result.body.map(block => {
                    
                    // 1. UPDATED TEXT BLOCK HANDLER (Handles Links, Bold, Emphasis)
                    if (block._type === 'block') {
                        const combinedText = (block.children || []).map(child => {
                            let text = child.text;

                            // If this piece of text has formatting (marks)
                            if (child.marks && child.marks.length > 0) {
                                child.marks.forEach(mark => {
                                    // Handle Links: Look for the URL in markDefs
                                    const linkDef = block.markDefs?.find(def => def._key === mark);
                                    if (linkDef && linkDef._type === 'link') {
                                        text = `<a href="${linkDef.href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
                                    }
                                    // Handle Bold
                                    if (mark === 'strong') text = `<strong>${text}</strong>`;
                                    // Handle Italic
                                    if (mark === 'em') text = `<em>${text}</em>`;
                                });
                            }
                            return text;
                        }).join('');

                        return `<p>${combinedText}</p>`;
                    }
                    
                    // 2. IMAGE BLOCK HANDLER
                    if (block._type === 'image' && block.url) {
                        return `<img src="${block.url}?w=800&auto=format" class="inline-post-img" alt="Blog Image">`;
                    }
                    
                    return '';
                }).join('');

            } else {
                bodyHTML = `<p>Content is currently unavailable.</p>`;
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
          document.getElementById('post-content').innerHTML = "<p>Error loading post.</p>";
      });
}