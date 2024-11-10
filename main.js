
//filterMenu
function filterMenu(category) {
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


//features 
let currentIndex = 0;

function moveCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].getBoundingClientRect().width;
    
    currentIndex = (currentIndex + 1) % items.length;
    const newTransform = -currentIndex * itemWidth;
    track.style.transform = `translateX(${newTransform}px)`;
}

setInterval(moveCarousel, 5000); // Auto-scroll every 5 seconds