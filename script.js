const accesskey = "xx7o29nzLEjm-0hFAjKmO33Pbe7MCEO8WL4Z088uB-0";

const formEL = document.querySelector("form");
const inputEL = document.getElementById("Search-input"); // Fixed the case of "Search-input"
const searchResults = document.querySelector(".search-results"); // Fixed the class name to match your HTML
const showMore = document.querySelector("#show-more-button"); // Added '#' to match the ID

let InputData = "";
let page = 1;

async function searchImages() {
    InputData = inputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${InputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => { // Changed from map to forEach
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small; // Changed from results.url.small
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});