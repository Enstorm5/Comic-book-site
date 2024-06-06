// search.js

const publicKey = '921b7bd5cc447b7c1afd5948b2ddedab';
const privateKey = '38edf8f12481fe6b68193462848a40fac84471b3';
const apiUrl = 'https://gateway.marvel.com/v1/public/comics';
const ts = 1;
const hash = 'ae7cc04b72f12dc607f1e02867b7c6a2';

document.addEventListener("DOMContentLoaded", function () {
    const publicKey = '921b7bd5cc447b7c1afd5948b2ddedab';
    const privateKey = '38edf8f12481fe6b68193462848a40fac84471b3';
    const apiUrl = 'https://gateway.marvel.com/v1/public/comics';
    const ts = 1;
    const hash = 'ae7cc04b72f12dc607f1e02867b7c6a2';

    function fetchComicData(titleStartsWith, limit) {
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
        const comicsList = document.querySelector('.comics-list');
        comicsList.innerHTML = ''; // Clear existing comics

        comics.forEach((comic) => {
            const comicCard = document.createElement('div');
            comicCard.classList.add('comic-card');

            const comicImage = document.createElement('img');
            comicImage.src = comic.thumbnail.path + '.' + comic.thumbnail.extension;
            comicImage.alt = comic.title;

            const comicTitle = document.createElement('h4');
            comicTitle.textContent = comic.title;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart-button');
            
            // Add an event listener to the "Add to Cart" button
            addToCartButton.addEventListener('click', function () {
                const selectedComicTitle = comic.title;
                // Call your function to add this comic to the cart
                addToCart(selectedComicTitle);
            });

            comicCard.appendChild(comicImage);
            comicCard.appendChild(comicTitle);
            comicCard.appendChild(addToCartButton);

            comicsList.appendChild(comicCard);
        });
    }

        function addToCart(comicTitle) {
        // Get the existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the comic title is already in the cart to avoid duplicates
        if (!cartItems.includes(comicTitle)) {
            // Add the comic title to the cart
            cartItems.push(comicTitle);

            // Save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // You can optionally show a confirmation message to the user
            alert(`"${comicTitle}" has been added to your cart.`);
        } else {
            // If the comic is already in the cart, you can show a message or take another action
            alert(`"${comicTitle}" is already in your cart.`);
        }
    }

    // Trigger fetchComicData when the search button is clicked
    document.getElementById('search-button').addEventListener('click', function () {
        const searchQuery = document.getElementById('search').value;
        const limit = 21; // Change the limit to display 10 results
        fetchComicData(searchQuery, limit);
    });
});