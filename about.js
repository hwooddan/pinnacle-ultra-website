const PROJECT_ID = 'wpo056ht';
const DATASET = 'production';
const QUERY = encodeURIComponent('*[_type == "author"][0]{name, bio, credentials, "imageUrl": image.asset->url}');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// Fetch author info for about page section

fetch(URL)
    .then(res => res.json())
    .then(({ result }) => {
        if (result) {
            document.getElementById('author-name').innerText = result.name;
            document.getElementById('author-bio').innerText = result.bio;
            document.getElementById('author-image').src = result.imageUrl;
                if (result.credentials) {
        const credsContainer = document.getElementById('author-credentials');
        credsContainer.innerHTML = result.credentials
            .map(cred => `<span class="credential-tag">${cred}</span>`)
            .join('');
            }
        }
    })

// Fetch race history infofor the bio section

    const RACE_QUERY = encodeURIComponent(`*[_type == "raceHistory"] | order(year desc){
    raceName, year, distance, time, position, raceUrl,
    "imageUrl": raceImage.asset->url
}`);



window.addEventListener('DOMContentLoaded', () => {
    const RACE_QUERY = encodeURIComponent(`*[_type == "raceHistory"] | order(year desc){
        raceName, year, distance, time, position, raceUrl,
        "imageUrl": raceImage.asset->url
    }`);

    const RACE_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${RACE_QUERY}`;

    fetch(RACE_URL)
      .then(res => res.json())
      .then(({ result }) => {
        console.log("Race Result:", result); // Diagnostic check
        const grid = document.getElementById('race-grid');
        if (result && result.length > 0) {
            grid.innerHTML = result.map(race => `
                <div class="race-tile">
                    <img src="${race.imageUrl || 'https://via.placeholder.com/300x150?text=Trail+Run'}" class="race-tile-img">
                    <div class="race-tile-basic">
                        <strong>${race.raceName}</strong><br>
                        <small>${race.year || ''}</small>
                    </div>
                    <div class="race-tile-details">
                        ${race.distance ? `<span>Dist: ${race.distance}</span>` : ''}
                        ${race.time ? `<span>Time: ${race.time}</span>` : ''}
                        ${race.position ? `<span>Pos: ${race.position}</span>` : ''}
                        ${race.raceUrl ? `<a href="${race.raceUrl}" target="_blank" class="race-link">Official Site</a>` : ''}
                    </div>
                </div>
            `).join('');
        }
      });
});