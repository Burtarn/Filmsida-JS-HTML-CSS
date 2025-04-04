const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/search/movie`;

async function loadData() {
    try {
        const [trendingResponse, genresResponse] = await Promise.all([
            fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=sv-SE`)
        ]);

        if (!trendingResponse.ok || !genresResponse.ok) {
            errorHandle({ status: trendingResponse.status || genresResponse.status });
            return;
        }

        const [trendingData, genresData] = await Promise.all([
            trendingResponse.json(),
            genresResponse.json()
        ]);

        displayTrendingMovies(trendingData.results.slice(0, 14));
        populateGenresDropdown(genresData.genres);
    } catch (error) {
        errorHandle(error);
    }
}

function displayTrendingMovies(movies) {
    const trendingContainer = document.getElementById('trendingMovies');
    trendingContainer.innerHTML = '';

    if (movies.length === 0) {
        trendingContainer.innerHTML = '<p>Inga trendiga filmer hittades.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movieTrend';

        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/100x150?text=Ingen+Bild';

        movieDiv.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Releasedatum:</strong> ${movie.release_date}</p>
            <p>Betyg: ${movie.vote_average}</p>
            <button class="movie-info-btn" onclick='showModal(${JSON.stringify(movie)})'>Mer info</button>
        `;
        trendingContainer.appendChild(movieDiv);
    });
}

function populateGenresDropdown(genres) {
    const genreSelect = document.getElementById('genreSelect');
    genreSelect.innerHTML = '<option value="">Välj en genre</option>';

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

async function searchMovies(query) {
    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            errorHandle({ status: response.status });
            return;
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        errorHandle(error);
    }
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById('movieResults');
    resultsContainer.innerHTML = '';

    if (movies.length === 0) {
        resultsContainer.innerHTML = '<p>Inga filmer hittades.</p>';
        return;
    }

    const limitedMovies = movies.slice(0, 4);

    limitedMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/100x150?text=Ingen+Bild';

        movieElement.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" />
            <div class="movie-details">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <p><strong>Releasedatum:</strong> ${movie.release_date}</p>
                <button class="favorite-button" data-movie='${JSON.stringify(movie)}'>Lägg till Favoriter</button>
            </div>
        `;

        resultsContainer.appendChild(movieElement);
    });

    addFavoriteListeners();
}

function addFavoriteListeners() {
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', event => {
            const movie = JSON.parse(event.target.dataset.movie);
            saveToFavorites(movie);
        });
    });
}

function saveToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.some(fav => fav.id === movie.id)) {
        alert('Filmen är redan i favoriter!');
        return;
    }

    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`"${movie.title}" har lagts till i dina favoriter!`);

    displayFavorites();
}

function displayFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Du har inga favoriter än.</p>';
        return;
    }

    favorites.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movieFavorite';

        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/100x150?text=Ingen+Bild';

        movieDiv.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <button class="remove-favorite-btn" onclick='removeFromFavorites(${JSON.stringify(movie)})'>Ta bort från favoriter</button>
        `;
        favoritesContainer.appendChild(movieDiv);
    });
}

function removeFromFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    displayFavorites();
}

async function fetchMoviesByGenre(genreId) {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=sv-SE&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
}

function renderMovies(movies) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    const limitedMovies = movies.slice(0, 5);

    limitedMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';
        movieDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Handling:</strong> ${movie.overview}</p>
            <p>Utgivningsår: ${movie.release_date ? movie.release_date.split('-')[0] : 'Okänt'}</p>
        `;
        container.appendChild(movieDiv);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    const errorMessageSearch = document.getElementById('errorMessageSearch');

    if (query) {
        errorMessageSearch.style.display = 'none';
        searchMovies(query);
    } else {
        errorMessageSearch.style.display = 'block';
        setTimeout(() => {
            errorMessageSearch.style.display = 'none';
        }, 3000);
    }
});

document.getElementById('fetchMoviesBtn').addEventListener('click', async () => {
    const genreId = document.getElementById('genreSelect').value;
    const errorMessage = document.getElementById('errorMessage');

    if (genreId) {
        const movies = await fetchMoviesByGenre(genreId);
        renderMovies(movies);
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});

function errorHandle(errorOrResponse) {
    if (errorOrResponse.status) {
        switch (errorOrResponse.status) {
            case 400:
                console.log('Error 400 - Bad Request');
                break;
            case 401:
                console.log('Error 401 - Unauthorized');
                break;
            case 404:
                console.log('Error 404 - Not Found');
                break;
            case 500:
                console.log('Error 500 - Internal Server Error');
                break;
            default:
                console.log(`Error - Status Code: ${errorOrResponse.status}`);
        }
    } else {
        console.log(`Error - ${errorOrResponse.message}`);
    }
    alert('Ett fel uppstod. Försök igen senare.');
}


document.addEventListener('DOMContentLoaded', () => {
    loadData();
    displayFavorites();
});
