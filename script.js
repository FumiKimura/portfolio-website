const carousel = document.querySelector('.carousel');
const faces = carousel.querySelectorAll('.carousel__face');
let selectedIndex = 0;
let carouselNum = 5;
let eachCarouselAngle = 360 / carouselNum;
let radius = Math.round((210 / 2) / Math.tan(Math.PI / carouselNum));

function calculateWidth(){
    // return appropriate width
}

function rotateCarousel(){
    let angle = eachCarouselAngle * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + radius + 'px) ' 
    + 'rotateY' + '(' + angle + 'deg)';
}

function initialSetup(){
    for (let i = 0; i < faces.length; i++) {
        let face = faces[i];
        if (i < carouselNum) {
          let faceAngle = eachCarouselAngle * i;
          face.style.transform = 'rotateY' + '(' + faceAngle 
          + 'deg) translateZ(' + radius + 'px)';
        }
    }
    rotateCarousel();
}
  
const rightBtn = document.querySelector('.right-btn');
rightBtn.addEventListener('click', function() {
    selectedIndex++;
    rotateCarousel();
});
  
const leftBtn = document.querySelector('.left-btn');
leftBtn.addEventListener('click', function() {
    selectedIndex--;
    rotateCarousel();
});

window.addEventListener('load', (event) => {
    initialSetup();
});