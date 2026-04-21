/* blog.js - FULLY INTEGRATED WITH PORTABLE TEXT BIOS */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

// 1. HELPER FUNCTION: Converts Sanity Bio (Array) to HTML String
function renderBio(blocks) {
  if (!blocks || !Array.isArray(blocks)) return blocks || "Guest contributor at Pinnacle Ultra.";
  
  return blocks.map(block => {
    if (block._type !== 'block' || !block.children) return '';

    return block.children.map(child => {
      let text = child.text;

      // Handle Bold/Italic and Links
      if (child.marks && child.marks.length > 0) {
        child.marks.forEach(mark => {
          // Check if it's a link
          const link = block.markDefs?.find(def => def._key === mark);
          if (link && link._type === 'link') {
            text = `<a href="${link.href}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${text}</a>`;
          }
          if (mark === 'strong') text = `<strong>${text}</strong>`;
          if (mark === 'em') text = `<em>${text}</em>`;
        });
      }
      return text;
    }).join('');
  }).join('<br>');
}

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
            
           const hasPhoto = !!post.author?.imageUrl; // true if photo exists, false if not
           const authorPhoto = hasPhoto ? post.author.imageUrl : './images/logo-white-border (1).png';
           const placeholderClass = hasPhoto ? "" : "is-placeholder";

           const authorName = post.author?.name || 'Guest Author'; 
           const authorBio = renderBio(post.author?.bio);
            
            
            const andreaLink = authorName.toLowerCase().includes("andrea") 
    ? ` <a href="about.html" class="bio-more-link" onclick="event.stopPropagation()">Meet Andrea →</a>` 
    : "";

            postCard.innerHTML = `
                <div class="author-badge" onclick="toggleBio(event, this)">
                    <img src="${authorPhoto}" class="${placeholderClass}" alt="${authorName}" title="Click to see bio">
                    
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

function toggleBio(event, element) {
    event.preventDefault(); 
    event.stopPropagation(); 
    
    document.querySelectorAll('.author-badge').forEach(b => {
        if (b !== element) b.classList.remove('active');
    });

    element.classList.toggle('active');
}

document.addEventListener('click', () => {
    document.querySelectorAll('.author-badge').forEach(b => b.classList.remove('active'));
});