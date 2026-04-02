// 1. Navigation Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// 2. Global Sanity Configuration
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

// --- BLOG FEED LOGIC ---
const BLOG_QUERY = encodeURIComponent('*[_type == "post"]{title, "slug": slug.current, "imageUrl": mainImage.asset->url, body}');
const BLOG_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${BLOG_QUERY}`;

function fetchPosts() {
    const blogFeed = document.querySelector(".blog-feed");
    // Only run this if the blog-feed container actually exists on the page
    if (!blogFeed) return; 

    fetch(BLOG_URL)
        .then((res) => res.json())
        .then(({ result }) => {
            if (!result || result.length === 0) return;

            blogFeed.innerHTML = result.map(post => {
                const img = post.imageUrl || 'https://via.placeholder.com/400x300?text=Pinnacle+Ultra';
                const slug = post.slug || '#';
                const bodyPreview = typeof post.body === 'string' ? post.body.substring(0, 100) + '...' : 'New expert waffle from Andrea...';

                return `
                    <article class="post-card">
                        <img src="${img}" class="blog-img" alt="${post.title}">
                        <div class="post-content">
                            <h2>${post.title}</h2>
                            <p>${bodyPreview}</p>
                            <a href="post.html?s=${slug}" class="btn-green">Read More</a>
                        </div>
                    </article>
                `;
            }).join('');
        })
        .catch(err => console.error("Error fetching Sanity posts:", err));
}

// --- HOME PAGE LOGIC ---
const HOME_QUERY = encodeURIComponent('*[_type == "homePage"][0]{welcomeTitle, welcomeText, "imageUrl": profileImage.asset->url}');
const HOME_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${HOME_QUERY}`;

function fetchHomeContent() {
    // Only run if we are on index.html
    if (!document.getElementById('home-title')) return;

    fetch(HOME_URL)
        .then(res => res.json())
        .then(({ result }) => {
            if (result) {
                // 1. Handle the Split Title
                if (result.welcomeTitle && result.welcomeTitle.includes(' - ')) {
                    const parts = result.welcomeTitle.split(' - ');
                    document.getElementById('home-title').innerHTML = `
                        ${parts[0]} 
                        <span>${parts[1]}</span>
                    `;
                } else {
                    document.getElementById('home-title').innerText = result.welcomeTitle || '';
                }

                // 2. Handle the Welcome Text
                if(document.getElementById('home-text')) {
                    document.getElementById('home-text').innerText = result.welcomeText;
                }

                // 3. Handle the Image
                if(document.getElementById('home-image')) {
                    document.getElementById('home-image').src = result.imageUrl;
                }
            } // This closes "if (result)"
        })
        .catch(err => console.error("Error loading home content:", err));
}

// Initialize both
fetchPosts();
fetchHomeContent();