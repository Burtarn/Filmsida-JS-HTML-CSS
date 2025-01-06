const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

const FAQArray = [
    {
    title: 'Vilka är Fredagsmys inc?',
    details: "Vi är ett familjeägt företag som älskar film. Vi erbjuder de senaste filmerna och de grymmaste klassikerna",
    },
    {
        title: 'Vilka betalningsalternativ finns?',
        details: "Vi tar swish, kort och klarna.",
    },
    {
        title: 'Finns ni som fysisk butik?',
        details: "Ja, vi finns över hela Sverige. Under kontakt-fliken kan du maila oss och se vart vi finns. Välkommen in!",
    },
    {
        title: 'Får ni in filmerna direkt de släpps?',
        details: "Ja, vi har samarbete med alla de stora filmbolagen vilket ger oss förtur när det kommer till nysläpp.",
    },
    {
        title: 'Vilka filmer har ni?',
        details: "Under film-fliken hittar ni alla filmer vi erbjuder och som finns tillänliga.",
    },
    {
        title: 'Har ni samarbete med SF?',
        details: "Vi får in premiärsläpp tidigare via SF",
    },
    {
        title: 'Jag har frågor gällande betalning?',
        details: "Skicka gärna iväg ett mail till vår trevliga kundservice för mer hjälp med dina frågor.",
    },
    {
        title: 'Min betalning går inte igenom?',
        details: "Prova gärna ett annat betalningalternativ eller kontakta oss via mail eller telefon.",
    },
    {
        title: 'Varför har ni så bra hemsida?',
        details: "Dedikterat arbete.",
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