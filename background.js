const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

let mousePos = {
    x: null,
    y: null,
    //radius of mouse used for collision
    radius: (canvas.height/90) * (canvas.width/90)
}

window.addEventListener("mousemove", (event) => {
    mousePos.x = event.x;
    mousePos.y = event.y;
})

class Particles {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#05386B";
        ctx.fill();
    }

    update(){
        //revserse particle movement for x-coord
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        
        //reverse particle movement for y-coord
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connectParticles();
}

function connectParticles(){
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = 0; b < particlesArray.length; b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = (dx * dx + dy * dy) * 2;

            if(distance < (canvas.width/7) * (canvas.height/7)){
                ctx.strokeStyle = "#05386B";
                ctx.lineWidth = 0.1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();

                //draws line from points to the mouse position
                if(mousePos.x !== null && mousePos.y !== null){
                    ctx.lineTo(mousePos.x, mousePos.y);
                }
                ctx.stroke();
            }
        }
        
    }
}

function init(){
    particlesArray = [];
    let particlesNum = (canvas.height * canvas.width) / 10000;

    for(let i = 0; i < particlesNum; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 10) - 5;
        let directionY = (Math.random() * 10) - 5;
        let color = "#05386B";

        particlesArray.push(new Particles(x, y, directionX, directionY, size, color));
    }
}

//Event Listner for window resize
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mousePos.radius = ((canvas.width/50) * (canvas.height/50));
    init();
});

//when mouse moves out from window set mouse poisition to undefined
window.addEventListener("mouseout", () => {
    mousePos.x = undefined;
    mousePos.y = undefined;
})

init();
animate();