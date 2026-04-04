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
    console.log("HOME DATA:", result);
    if (result) {
        document.getElementById("home-title").innerText = result.welcomeTitle || "Pinnacle Ultra Coaching";
        document.getElementById("home-text").innerText = result.welcomeText || "Trail & Ultra Coaching";
        if (result.imageUrl) document.getElementById("home-image").src = result.imageUrl + "?w=600";
    } else {
        document.getElementById("home-title").innerText = "Data Missing in Sanity";
    }
  })
  .catch(err => {
      console.error("Connection Failed:", err);
      document.getElementById("home-title").innerText = "Check CORS Settings";
  });

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
    if (result && result.length > 0) {
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

  <script>
    var form = document.getElementById("pinnacle-contact-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      console.log("Form submission started..."); // Debug: Check if button works

      var statusSuccess = document.getElementById("form-success");
      var statusError = document.getElementById("form-error");
      var data = new FormData(event.target);
      
      fetch(event.target.action, {
        method: 'POST', // Hard-coded POST for safety
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        console.log("Response received:", response.status); // Debug: Check server reply
        
        if (response.ok) {
          statusSuccess.style.display = "block";
          form.style.display = "none";
          form.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              statusError.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              statusError.innerHTML = "Oops! There was a problem submitting your form";
            }
            statusError.style.display = "block";
          })
        }
      }).catch(error => {
        console.error("Fetch error:", error); // Debug: Check for network issues
        statusError.innerHTML = "Oops! There was a problem submitting your form";
        statusError.style.display = "block";
      });
    }
    
    if (form) {
        form.addEventListener("submit", handleSubmit);
    } else {
        console.error("Form not found! Check your ID.");
    }
</script>