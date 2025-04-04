const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const infoURL = "http://localhost:3000/infoHomepageOne";
const moviesURL = "http://localhost:3000/movies";
const infoURLTwo = "http://localhost:3000/infoHomepageTwo";

const infoDiv = document.getElementById('aboutUsContainer');
const container = document.querySelector('.card-list');
const infoDivTwo = document.getElementById('infoCont');

async function fetchAllData() {
    try {
        const [infoResponse, moviesResponse, infoTwoResponse] = await Promise.all([
            fetch(infoURL),
            fetch(moviesURL),
            fetch(infoURLTwo)
        ]);

        if (!infoResponse.ok || !moviesResponse.ok || !infoTwoResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const [infoData, moviesData, infoTwoData] = await Promise.all([
            infoResponse.json(),
            moviesResponse.json(),
            infoTwoResponse.json()
        ]);


        infoData.forEach(info => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('info-card');

            const textContainer = document.createElement('div');
            textContainer.classList.add('text-container');

            const title = document.createElement('h2');
            title.classList.add('info-title');
            title.innerHTML = info.title;

            const infoText = document.createElement('p');
            infoText.classList.add('info-text');
            infoText.innerHTML = info.details;

            const image = document.createElement('img');
            image.classList.add('info-image');
            image.src = info.imgURL;
            image.alt = "Bild som symboliserar film.";

            textContainer.appendChild(title);
            textContainer.appendChild(infoText);

            newDiv.appendChild(image);
            newDiv.appendChild(textContainer);

            infoDiv.appendChild(newDiv);
        });

        container.innerHTML = "";
        moviesData.forEach(movie => {
            const cardItem = document.createElement('div');
            cardItem.classList.add('card-item', 'swiper-slide');

            cardItem.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="user-image">
                <h2 class="movie-name">${movie.title}</h2>
                <p class="movie-description">${movie.description}</p>
                <p class="movie-rating">IMDB-rating: ${movie.IMDB}</p>
                <p class="movie-year">Year: ${movie.year}</p>
                <button class="message-button">Köp</button>
            `;

            container.appendChild(cardItem);
        });

        infoTwoData.forEach(infoz => {
            const newDivs = document.createElement('div');
            newDivs.classList.add('infoCont');

            const infoTitleTwo = document.createElement('h1');
            infoTitleTwo.classList.add('infoTitleTwo');
            infoTitleTwo.innerText = infoz.title;

            const infoTextTwo = document.createElement('p');
            infoTextTwo.classList.add('infoTextTwo');
            infoTextTwo.innerText = infoz.details;

            newDivs.appendChild(infoTitleTwo);
            newDivs.appendChild(infoTextTwo);
            infoDivTwo.appendChild(newDivs);
        });

    } catch (error) {
        console.error(error);
    }
}

fetchAllData();

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
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }
});
