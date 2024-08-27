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
