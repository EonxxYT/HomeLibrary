const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("search");
const openingOverlay = document.getElementById("openingOverlay");

let movies = [];

async function loadMovies() {
  const response = await fetch("movies.json");
  const text = await response.text();
  movies = JSON.parse(text);
  renderMovies(movies);
}

function renderMovies(list) {
  movieGrid.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
      <div class="movie-body">
        <h3 class="movie-title">${movie.title}</h3>
      </div>
    `;

    card.addEventListener("click", () => openMovie(movie.link));
    movieGrid.appendChild(card);
  });
}

function openMovie(link) {
  openingOverlay.classList.add("show");

  setTimeout(() => {
    window.open(link, "_blank");
    openingOverlay.classList.remove("show");
  }, 500);
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(term)
  );

  renderMovies(filtered);
});

loadMovies().catch(() => {
  movieGrid.innerHTML = "<p>Failed to load movies.</p>";
});