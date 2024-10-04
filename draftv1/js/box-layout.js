var currentSellerIndex = 0;

function updateInfoBox(index) {
    var seller = sellers[index];

    // Update the image, name, items, price, and WhatsApp link
    document.getElementById('farmer-image').src = seller.image;
    document.getElementById('farmer-name').textContent = seller.name;
    document.getElementById('farmer-items').textContent = `Items: ${seller.items}`;
    document.getElementById('farmer-price').textContent = `Price: ${seller.price}`;
    document.getElementById('whatsapp-link').href = `https://wa.me/${seller.phone}?text=I'm%20interested%20in%20your%20products.`;

    // Highlight selected marker and update map view
    markers.forEach((marker, idx) => {
        if (idx === index) {
            marker.getElement().style.color = 'orange'; // Highlight selected marker
        } else {
            marker.getElement().style.color = 'blue'; // Reset other markers
        }
    });

    // Show the info box if it was hidden
    document.getElementById('info-box').classList.remove('hidden');
}

// Add arrow event listeners once, outside the dynamic content update
function addArrowEventListeners() {
    document.getElementById('prev').addEventListener('click', function() {
        if (currentSellerIndex > 0) {
            currentSellerIndex--;
        } else {
            currentSellerIndex = sellers.length - 1; // Wrap around to the last seller
        }
        updateInfoBox(currentSellerIndex);
    });

    document.getElementById('next').addEventListener('click', function() {
        if (currentSellerIndex < sellers.length - 1) {
            currentSellerIndex++;
        } else {
            currentSellerIndex = 0; // Wrap around to the first seller
        }
        updateInfoBox(currentSellerIndex);
    });
}

// Close info box when clicking outside a seller marker
function addMapClickEvent() {
    map.on('click', function (e) {
        // Check if the click occurred on a seller marker
        var clickedOnSeller = markers.some(marker => {
            var markerLatLng = marker.getLatLng();
            return e.latlng.lat === markerLatLng.lat && e.latlng.lng === markerLatLng.lng;
        });

        // Hide info box if click was not on a seller marker
        if (!clickedOnSeller) {
            document.getElementById('info-box').classList.add('hidden');
        }
    });
}

// Call this function once to bind the event listeners
addArrowEventListeners();
addMapClickEvent();
