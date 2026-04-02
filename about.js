const PROJECT_ID = 'wpo056ht';
const DATASET = 'production';
const QUERY = encodeURIComponent('*[_type == "author"][0]{name, bio, "imageUrl": image.asset->url}');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

fetch(URL)
    .then(res => res.json())
    .then(({ result }) => {
        if (result) {
            document.getElementById('author-name').innerText = result.name;
            document.getElementById('author-bio').innerText = result.bio;
            document.getElementById('author-image').src = result.imageUrl;
        }
    });