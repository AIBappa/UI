// box-layout.js

var currentSellerIndex = 0;

function updateInfoBox(index) {
    var seller = sellers[index];
    var infoBox = document.getElementById('info-box');

    if (!infoBox) {
        console.error('Info box element not found.');
        return;
    }

    // Update the info-box content dynamically
    infoBox.innerHTML = `
        <div class="arrow left-arrow" id="prev">&lt;</div>
        <div class="info-content">
            <img id="farmer-image" src="${seller.image}" alt="Farmer Image">
            <div id="farmer-info">
                <h3 id="farmer-name">${seller.name}</h3>
                <p id="farmer-items">Items: ${seller.items}</p>
                <p id="farmer-price">Price: ${seller.price}</p>
            </div>
        </div>
        <div class="arrow right-arrow" id="next">&gt;</div>
    `;

    // Update marker icons
    markers.forEach((marker, i) => {
        marker.getElement().classList.toggle('selected', i === index);
    });

    infoBox.classList.remove('hidden');
    addArrowEventListeners();
}

function addArrowEventListeners() {
    var prevArrow = document.getElementById('prev');
    var nextArrow = document.getElementById('next');

    if (!prevArrow || !nextArrow) {
        console.error('Arrow elements not found.');
        return;
    }

    prevArrow.addEventListener('click', function() {
        if (currentSellerIndex > 0) {
            currentSellerIndex--;
            updateInfoBox(currentSellerIndex);
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentSellerIndex < sellers.length - 1) {
            currentSellerIndex++;
            updateInfoBox(currentSellerIndex);
        }
    });
}

// box-layout.js

function updateInfoBox(index) {
    const seller = sellers[index];
    
    // Update the image, name, items, and price
    document.getElementById('farmer-image').src = seller.image;
    document.getElementById('farmer-name').textContent = seller.name;
    document.getElementById('farmer-items').textContent = `Items: ${seller.items}`;
    document.getElementById('farmer-price').textContent = `Price: ${seller.price}`;
    
    // Update WhatsApp link
    const whatsappLink = document.getElementById('whatsapp-link');
    whatsappLink.href = `https://wa.me/${seller.phone}?text=I'm%20interested%20in%20your%20products.`;
    whatsappLink.classList.remove('hidden');
    
    // Show the info box if it was hidden
    document.getElementById('info-box').classList.remove('hidden');
    
    // Highlight selected marker and update map view
    markers.forEach((marker, idx) => {
        if (idx === index) {
            marker.getElement().style.color = 'orange';
        } else {
            marker.getElement().style.color = 'blue';
        }
    });
}

