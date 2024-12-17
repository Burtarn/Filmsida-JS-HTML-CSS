const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}



const CityArray = [
    {
    city: 'Umeå',
    adress: ["Nygatan 1B", "90335", "Umeå"],
    phoneNumber: "0321215150",
    email: "umea@godiskungen.se",
    isOpen: true,
    openHours: "10:00 - 22:00"

    },
    {
        city: 'Skellefteå',
        adress: ["Storgatan 15b", "90465", "Skellefteå"],
        phoneNumber: "0321215151",
        email: "Skellefteå@godiskungen.se",
        isOpen: true,
        openHours: "10:00 - 22:00"

    },
    {
        city: 'Luleå',
        adress: ["Norrskensgatan", "97231", "Luleå"],
        phoneNumber: "0321215152",
        email: "Luleå@godiskungen.se",
        isOpen: true,
        openHours: "10:00 - 22:00"
    
        },
        {
            city: 'Gävle',
            adress: ["Gävlegatan 1", "97231", "Gävle"],
            phoneNumber: "0321215153",
            email: "Gävle@godiskungen.se",
            isOpen: true,
            openHours: "10:00 - 22:00"
    
        },
        {
            city: 'Uppsala',
            adress: ["Uppsalagatan 25", "741 76", "Uppsala"],
            phoneNumber: "0321215154",
            email: "Uppsala@godiskungen.se",
            isOpen: true,
            openHours: "10:00 - 22:00"
        
            },
            {
                city: 'Sundsvall',
                adress: ["Strandgatan 25", "852 29", "Sundsvall"],
                phoneNumber: "0321215155",
                email: "Sundsvall@godiskungen.se",
                isOpen: true,
                openHours: "10:00 - 22:00"
        
            },
            {
                city: 'Stockholm syd',
                adress: ["Strandgatan 75", "104 65", "Stockholm"],
                phoneNumber: "0321215156",
                email: "StockholmSyd@godiskungen.se",
                isOpen: true,
                openHours: "10:00 - 22:00"
            
                },
                {
                    city: 'Stockholm Nord',
                    adress: ["Kista Galleria", "63 62", "Kista"],
                    phoneNumber: "0321215157",
                    email: "stockholmNord@godiskungen.se",
                    isOpen: true,
                    openHours: "10:00 - 22:00"
            
                },
                {
                    city: 'Göteborg',
                    adress: ["Göteborg Hamngata 2", "411 01", "Göteborg"],
                    phoneNumber: '0321215158',
                    email: "göteborg@godiskungen.se",
                    isOpen: true,
                    openHours: "10:00 - 22:00"
                
                    },
                    {
                        city: 'Malmö',
                        adress: ["Möllevångstorget", "211 13", "Malmö"],
                        phoneNumber: "0321215159",
                        email: "Malmö@godiskungen.se",
                        isOpen: true,
                        openHours: "10:00 - 22:00",
                        
                
                    },
];

const createHTML = data => {
    return `
        <div class="city-card">
            <h1>${data.city}</h1>
            <p><strong>Adress:</strong> ${Array.isArray(data.adress) ? data.adress.join(", ") : data.adress}</p>
            <p><strong>Telefon:</strong> ${data.phoneNumber}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Öppet nu:</strong> ${data.isOpen ? "Ja" : "Nej"}</p>
            <p><strong>Öppettider:</strong> ${data.openHours}</p>
        </div>`;
};


const renderCities = cities => {
    const containerElement = document.getElementById('cityContainer');
    containerElement.innerHTML = cities.map(city => createHTML(city)).join('');
};

renderCities(CityArray);


const searchInput = document.getElementById('searchBar');
const enterBtn = document.getElementById('searchBtn');

enterBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const filteredCities = CityArray.filter(cityData => 
        cityData.city.toLowerCase().includes(searchQuery)
    );

    if (filteredCities.length > 0) {
        renderCities(filteredCities);
    } else {
        document.getElementById('cityContainer').innerHTML = `<p>Ingen stad hittades med namnet "${searchInput.value}".</p>`;
    }
});



