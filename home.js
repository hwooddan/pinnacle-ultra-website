/* ==========================================
   4. THE "PING-PONG" KILLER (Runs immediately)
   ========================================== */
(function() {
    if (window.location.hash === "#pinnacle-contact-form") {
        const noHashURL = window.location.href.replace(/#.*$/, '');
        window.history.replaceState('', document.title, noHashURL);
        window.scrollTo(0, 0);

        window.addEventListener('load', () => {
            setTimeout(() => {
                const contactSection = document.getElementById("pinnacle-contact-form");
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                        window.history.replaceState('', document.title, window.location.href + '#pinnacle-contact-form');
                    }, 1000);
                }
            }, 300); 
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log("Pinnacle Home Script Loaded & Ready");

    const PROJECT_ID = "wpo056ht"; 
    const DATASET = "production";

    /* ==========================================
       1. SANITY: HOME DATA FETCH
       ========================================== */
    const HOME_QUERY = encodeURIComponent(`*[_type == "homePage"][0]{
      welcomeTitle,
      welcomeText,
      "imageUrl": profileImage.asset->url
    }`);

    const HOME_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${HOME_QUERY}`;

    fetch(HOME_URL)
      .then(res => res.json())
      .then(({ result }) => {
        if (result) {
            const title = document.getElementById("home-title");
            const text = document.getElementById("home-text");
            const img = document.getElementById("home-image");

            if (title) title.innerText = result.welcomeTitle || "Pinnacle Ultra Coaching";

            if (text && result.welcomeText) {
                let rawText = result.welcomeText;

                // 1. Inject Links
                rawText = rawText.replace(
                    "Instagram", 
                    `<a href="https://instagram.com/andrea._.harwood" target="_blank" class="text-link">Pinnacle Ultra Instagram</a>`
                );
                rawText = rawText.replace(
                    "contact form", 
                    `<a href="#pinnacle-contact-form" class="text-link">contact form</a>`
                );

                // 2. De-Lumper (Paragraphs)
                const paragraphs = rawText.split(/\n\n+/); 
                text.innerHTML = paragraphs
                    .map(p => `<p class="welcome-p">${p.trim()}</p>`)
                    .join('');
                
                // THE OVERWRITE LINE WAS REMOVED FROM HERE
            }

            if (img && result.imageUrl) img.src = result.imageUrl + "?w=600";
        }
      })
      .catch(err => console.error("Sanity Home Error:", err));

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
        if (container && result) {
            container.innerHTML = result.map(review => `
                <div class="review-card">
                    ${review.imageUrl 
                        ? `<img src="${review.imageUrl}?w=160&h=160&fit=crop" class="review-avatar" alt="${review.authorName}">` 
                        : `<div class="review-avatar" style="background: var(--p-green-accent); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user" style="color: var(--p-green-main)"></i></div>`
                    }
                    <p class="review-quote">"${review.quote}"</p>
                    <h4 class="review-author">${review.authorName}</h4>
                    <span class="review-race">${review.raceCompleted || 'Ultra Runner'}</span>
                </div>
            `).join('');
        }
      })
      .catch(err => console.error("Sanity Reviews Error:", err));

    /* ==========================================
       3. FORMSPREE: AJAX SUBMISSION
       ========================================== */
    const contactForm = document.getElementById("pinnacle-contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const statusSuccess = document.getElementById("form-success");
            const statusError = document.getElementById("form-error");
            const data = new FormData(event.target);
            const runnerName = data.get('name') || 'New Runner';
            data.set('_subject', `New Inquiry from ${runnerName}`); 
            data.set('Submitted At', new Date().toLocaleString());

            const btn = event.target.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;

            fetch("https://formspree.io/f/xjgppbaa", {  
                method: "POST", 
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                btn.innerText = originalBtnText;
                btn.disabled = false;
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
                btn.innerText = originalBtnText;
                btn.disabled = false;
                if (statusError) statusError.style.display = "block";
            });
        });
    }
});
