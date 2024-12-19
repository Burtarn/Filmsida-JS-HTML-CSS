const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}


const API_KEY = '92de42f066f71b06312ccd354d1b3f3e'; 
const API_URL = 'https://api.themoviedb.org/3/search/movie';

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        searchMovies(query);
    } else {
        alert('Skriv något för att söka!');
    }
});

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
            <p>${movie.overview || 'Ingen beskrivning tillgänglig.'}</p>
            <p><strong>Releasedatum:</strong> ${movie.release_date || 'Okänt'}</p>
            </div>
        `;

        resultsContainer.appendChild(movieElement);
    });
}



// const MovieKEY = "92de42f066f71b06312ccd354d1b3f3e";
// const MovieURL = "https://api.themoviedb.org/3/movie/550?api_key=92de42f066f71b06312ccd354d1b3f3e";
// const URL = "https://www.omdbapi.com/?apikey=a88300e4&s=Batman&page=10";
// const APIKEY = "a88300e4";

// async function FetchMovieData() {
//     try {
//         let response = await fetch(MovieURL); 
//         let data = await response.json(); 
//         console.log(data);






//     } catch (error) {
//         errorHandle(response);
//     }
// }

// FetchMovieData();











// Errorhandle
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


