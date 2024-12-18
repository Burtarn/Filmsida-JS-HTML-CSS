
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

const infoURL = "http://localhost:3000/infoHomepageOne";
const infoDiv = document.getElementById('aboutUsContainer');


async function FetchInfoFirstPage() {
    try {
        let response = await fetch(infoURL);
        let data = await response.json(); 

        data.forEach(info => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('info-card');

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const title = document.createElement('h2');
        title.classList.add('info-title');

        const infoText = document.createElement('p');
        infoText.classList.add('info-text');

        const image = document.createElement('img');
        image.classList.add('info-image');



        title.innerHTML = info.title;
        infoText.innerHTML = info.details;
        image.src = info.imgURL;
        image.alt = "Bild som symobliserar film."

        
        textContainer.appendChild(title);
        textContainer.appendChild(infoText);

        newDiv.appendChild(textContainer);
        newDiv.appendChild(image);

        infoDiv.appendChild(newDiv);

            
        })


    } catch (error) {
        errorHandle(response);
    }
}






const swiper = new Swiper('.slider-wrapper', {

    loop: true,
    grabCursor: true,
    spaceBetween: 20,


    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
    },


    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});

console.log('HEJHEJ');

const container = document.querySelector('.card-list');

async function FetchMovieData() {
    try {
        let response = await fetch("http://localhost:3000/movies"); 
        let data = await response.json(); 


        container.innerHTML = "";


        data.forEach(movie => {
            const cardItem = document.createElement('div');
            cardItem.classList.add('card-item', 'swiper-slide'); 

            cardItem.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="user-image">
                <h2 class="movie-name">${movie.title}</h2>
                <p class="movie-description">${movie.description}</p>
                <p class="movie-rating">IMDB-rating: ${movie.IMDB}</p>
                <p class="movie-year">Year: ${movie.year}</p>
                <button class="message-button">Buy</button>
            `;

            container.appendChild(cardItem); 
        });
    } catch (error) {
        errorHandle(response);
    }
}

FetchMovieData();



// Errorhandle

function errorHandle(response) {
    switch (response.status) {
        case 400:
            console.log('Error 400 - Bad Request');
            break;
        case 401:
            console.log('Error 401 - Unauthorized');
            break;
        case 402:
            console.log('Error 402 - Payment Required');
            break;
        case 403:
                console.log('Error 403 - Forbidden');
                break;
        case 404:
                console.log('Error 404 - Not Found');
                break;          
        case 405:
                console.log('Error 405 - Forbidden');
                break;
        case 406:
                console.log('Error 406 -  Not Acceptable');
                break;   
        case 408:
                console.log('Error 408 - Request Timeout');
                break;                   
        default:
            console.log(`Error - Unknown Status Code: ${response.status}`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
}

function initialize() {
    FetchMovieData()
    FetchInfoFirstPage()

}

initialize()