const apiKey = "1bfdbff05c2698dc917dd28c08d41096";
const apiUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "http://image.tmdb.org/t/p/w500/";

// Extract movieId from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

function getMovieDetails() {
    axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(response => {
            const movieDetails = response.data;
            displayMovieDetails(movieDetails);
            getSimilarMovies(movieId);
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}

function displayMovieDetails(movieDetails) {
    const movieDetailsContainer = document.getElementById("movieDetails");
    movieDetailsContainer.innerHTML = `
        <h2>${movieDetails.title}</h2>
        <img src="${imageBaseUrl}${movieDetails.poster_path}" alt="${movieDetails.title}">
        <p>${movieDetails.overview}</p>
        <p>Release Date: ${movieDetails.release_date}</p>
        <p>Rating: ${movieDetails.vote_average}</p>
        <p>Runtime: ${movieDetails.runtime} minutes</p>
    `;
}

function getSimilarMovies(movieId) {
    axios.get(`${apiUrl}/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => {
            const similarMovies = response.data.results;
            displaySimilarMovies(similarMovies);
        })
        .catch(error => {
            console.error("Error fetching similar movies:", error);
        });
}

function displaySimilarMovies(similarMovies) {
    const similarMoviesContainer = document.createElement("div");
    similarMoviesContainer.innerHTML = "<h3>Similar Movies</h3>";

    similarMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
        movieCard.addEventListener("click", () => showMovieDetails(movie.id));
        similarMoviesContainer.appendChild(movieCard);
    });

    document.getElementById("movieDetails").appendChild(similarMoviesContainer);
}

getMovieDetails();
