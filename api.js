const publicKey = b';
const privateKey = '';
const apiUrl = 'https://gateway.marvel.com/v1/public/comics';
const limit = 28; 
const ts = 1;
const hash = 'ae7cc04b72f12dc607f1e02867b7c6a2';
const titleStartsWith = 'Miles '; 

function fetchComicData() {
    const url = `${apiUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&titleStartsWith=${titleStartsWith}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const comics = data.data.results;
            populateComicCards(comics);
        })
        .catch((error) => {
            console.error('Error fetching data from Marvel API:', error);
        });
}

function populateComicCards(comics) {
    const featuredSection = document.querySelector('.featured');

    comics.forEach((comic) => {
        const comicCard = document.createElement('div');
        comicCard.classList.add('comic-card');

        const comicImage = document.createElement('img');
        comicImage.src = comic.thumbnail.path + '.' + comic.thumbnail.extension;
        comicImage.alt = comic.title;

        const comicTitle = document.createElement('h4');
        comicTitle.textContent = comic.title;

        comicCard.appendChild(comicImage);
        comicCard.appendChild(comicTitle);

        featuredSection.appendChild(comicCard);
    });
}


fetchComicData();
