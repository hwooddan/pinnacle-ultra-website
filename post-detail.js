const PROJECT_ID = "wpo056ht";
const DATASET = "production";

// 1. Grab the Slug from the URL (?s=slug-name)
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('s');

if (slug) {
    const QUERY = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{title, "imageUrl": mainImage.asset->url, body}`);
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    fetch(URL)
        .then(res => res.json())
        .then(({ result }) => {
            if (result) {
                document.getElementById('post-content').innerHTML = `
                    <img src="${result.imageUrl}" class="full-post-img">
                    <h1>${result.title}</h1>
                    <div class="post-body-text">${result.body}</div>
                    
<div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px;">
    <a href="blog.html" class="btn-green">← Back to Main Blog</a>
</div>
                `;
            }
        });
}