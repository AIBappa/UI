// script.js

// Initialize the map
var map = L.map('map').setView([28.6139, 77.2090], 13); // Centered on New Delhi, India

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Define sample sellers for testing
var sellers = [
    { name: "Seller 1", lat: 28.6139, lon: 77.2090, items: "Fruits", price: "100 INR", image: "assets/images/farmer1.jpg", phone: "911234567890" },
    { name: "Seller 2", lat: 28.6149, lon: 77.2100, items: "Vegetables", price: "200 INR", image: "assets/images/farmer2.jpg", phone: "911234567890" },
    { name: "Seller 3", lat: 28.6159, lon: 77.2110, items: "Fruits", price: "150 INR", image: "assets/images/farmer3.jpg", phone: "911234567890" },
    { name: "Seller 4", lat: 28.6169, lon: 77.2120, items: "Vegetables", price: "120 INR", image: "assets/images/farmer4.jpg", phone: "911234567890" },
    { name: "Seller 5", lat: 28.6179, lon: 77.2130, items: "Fruits", price: "130 INR", image: "assets/images/farmer5.jpg", phone: "911234567890" }
];

// Add markers to the map
var markers = sellers.map((seller, index) => {
    return L.marker([seller.lat, seller.lon], {icon: L.divIcon({className: 'marker-icon', html: '•'})})
        .addTo(map)
        .on('click', function() {
            currentSellerIndex = index;
            updateInfoBox(index);
        });
});
