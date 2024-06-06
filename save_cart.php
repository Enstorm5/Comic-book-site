<?php
// Connect to the MySQL database (adjust these settings as needed)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "comic";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ...
// Get form data
$customerName = $_POST['customer-name'];
$customerAddress = $_POST['customer-address'];
$customerEmail = $_POST['customer-email'];
$customerTelephone = $_POST['customer-telephone'];
$totalPrice = $_POST['total-price'];
$cartItems = json_decode($_POST['cart-items'], true); // Decode the JSON string into an array

// Insert data into the table
$sql = "INSERT INTO orders (customer_name, customer_address, customer_email, customer_telephone, total_price, cart_items)
        VALUES ('$customerName', '$customerAddress', '$customerEmail', '$customerTelephone', '$totalPrice', '$cartItems')";

if ($conn->query($sql) === TRUE) {
    echo "Order submitted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
