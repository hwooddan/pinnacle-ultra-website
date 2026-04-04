/* ==========================================
   1. SANITY: HOME DATA FETCH
   ========================================== */
const PROJECT_ID = "wpo056ht"; 
const DATASET = "production";

const QUERY = encodeURIComponent(`*[_type == "homePage"][0]{
  welcomeTitle,
  welcomeText,
  "imageUrl": profileImage.asset->url
}`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

fetch(URL)
  .then(res => res.json())
  .then(({ result }) => {
    if (result) {
        if (document.getElementById("home-title")) document.getElementById("home-title").innerText = result.welcomeTitle || "Pinnacle Ultra Coaching";
        if (document.getElementById("home-text")) document.getElementById("home-text").innerText = result.welcomeText || "Trail & Ultra Coaching";
        if (result.imageUrl && document.getElementById("home-image")) document.getElementById("home-image").src = result.imageUrl + "?w=600";
    }
  })
  .catch(err => console.error("Home Data Failed:", err));

/* ==========================================
   2. SANITY: REVIEWS FETCH
   ========================================== */
const REVIEWS_QUERY = encodeURIComponent(`*[_type == "review"] | order(displayOrder asc){
  authorName,
  raceCompleted,
  quote,
  "imageUrl": authorImage.asset->url
}`);

const REVIEWS_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${REVIEWS_QUERY}`;

fetch(REVIEWS_URL)
  .then(res => res.json())
  .then(({ result }) => {
    const container = document.getElementById('reviews-container');
    if (container && result && result.length > 0) {
        container.innerHTML = result.map(review => `
            <div class="review-card">
                ${review.imageUrl 
                    ? `<img src="${review.imageUrl}?w=160&h=160&fit=crop" class="review-avatar" alt="${review.authorName}">` 
                    : `<div class="review-avatar" style="background: var(--brand-green-light); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user" style="color: var(--brand-green-deep)"></i></div>`
                }
                <p class="review-quote">"${review.quote}"</p>
                <h4 class="review-author">${review.authorName}</h4>
                <span class="review-race">${review.raceCompleted || 'Ultra Runner'}</span>
            </div>
        `).join('');
    }
  });

/* ==========================================
   3. FORMSPREE: AJAX SUBMISSION
   ========================================== */
// Note: We removed the <script> tags because they don't belong in a .js file!
const contactForm = document.getElementById("pinnacle-contact-form");

async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submission started...");

    const statusSuccess = document.getElementById("form-success");
    const statusError = document.getElementById("form-error");
    const data = new FormData(event.target);

    fetch(event.target.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            if (statusSuccess) statusSuccess.style.display = "block";
            contactForm.style.display = "none";
            contactForm.reset();
        } else {
            response.json().then(data => {
                if (statusError) {
                    statusError.innerHTML = data.errors ? data.errors.map(e => e.message).join(", ") : "Oops! Problem submitting.";
                    statusError.style.display = "block";
                }
            });
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        if (statusError) statusError.style.display = "block";
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
}