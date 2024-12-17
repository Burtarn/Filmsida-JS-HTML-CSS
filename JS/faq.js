const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

const FAQArray = [
    {
    title: 'Why is javascript cool?',
    details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
    {
        title: 'What is javscript so ez?',
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda minus consectetur quasi placeat fuga culpa tenetur fugit quae esse architecto adipisci iste dignissimos sit saepe nisi eius, rerum eos corrupti.",
    },
];

const createHTML = data => {
    return `<details> 
        <summary>${data.title}</summary>
        <p>${data.details}</p>
    </details>`
};

const containerElement = document.getElementById('faq-Container');

containerElement.innerHTML = FAQArray.map(dataItem => createHTML(dataItem)).join('');