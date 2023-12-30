const apiKey = "1bfdbff05c2698dc917dd28c08d41096";
const apiUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "http://image.tmdb.org/t/p/w500/";

function getUpcomingMovies() {
    axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => {
            const movies = response.data.results;
            displayMovies(movies, "Upcoming Movies");
        })
        .catch(error => {
            console.error("Error fetching upcoming movies:", error);
        });
}

function searchMovies() {
    const movieTitle = document.getElementById("searchInput").value;

    if (movieTitle) {
        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${movieTitle}`)
            .then(response => {
                const movies = response.data.results;
                displayMovies(movies, `Search Results for "${movieTitle}"`);
            })
            .catch(error => {
                console.error("Error searching for movies:", error);
            });
    }
}

function displayMovies(movies, heading) {
    const movieListContainer = document.getElementById("movieList");
    movieListContainer.innerHTML = `<h2>${heading}</h2>`;

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
        movieCard.addEventListener("click", () => showMovieDetails(movie.id));
        movieListContainer.appendChild(movieCard);
    });
}

function showMovieDetails(movieId) {
    window.location.href = `detail.html?id=${movieId}`;
}

getUpcomingMovies();
