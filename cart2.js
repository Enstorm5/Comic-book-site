document.addEventListener("DOMContentLoaded", function () {
    function populateCart() {
        const cartList = document.getElementById('cart-list');
        const totalPriceElement = document.getElementById('total-price');
        const totalPriceInput = document.getElementById('total-price-input');
        // Inside your populateCart function
        


        // Get the cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsInput = document.getElementById('cart-items-input');
        cartItemsInput.value = JSON.stringify(cartItems);

        let total = 0;

        // Clear existing cart items
        cartList.innerHTML = '';

        cartItems.forEach((comicTitle) => {
            // Generate a random price between 15 and 20 (whole number)
            const randomPrice = Math.floor(Math.random() * 6) + 15;

            // Create a list item for each cart item
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item'); // Add a class for styling
            cartItem.innerHTML = `
                <span class="comic-title">${comicTitle}</span>
                <span class="price">$${randomPrice}.00</span>
            `;

            // Append the item to the cart list
            cartList.appendChild(cartItem);

            // Update the total price
            total += randomPrice;
        });

        // Update the hidden input field with the total price
        totalPriceInput.value = `$${total}.00`;

        // Display the total price
        totalPriceElement.textContent = `$${total}.00`;
    }

    // ...
});
