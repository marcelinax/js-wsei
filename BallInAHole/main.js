class Canvas{
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }
}
class Ball{
    constructor(positionX, positionY, diameter){
        this.positionX = positionX;
        this.positionY = positionY;
        this.diameter = diameter;
        this.canvas = new Canvas();
    }
    createBall(){
        this.canvas.context.beginPath();
        this.canvas.context.arc(
            this.positionX,
            this.positionY,
            this.diameter,
            0,
            2 * Math.PI
        );
        this.canvas.context.fillStyle = '#03071e'
        this.canvas.context.fill()
    }
    setCoordinates(x,y){
        this.positionX = x;
        this.positionY = y;
    }
    getCoordinates(){
        return {
            x: this.positionX,
            y: this.positionY,
        };
    }
}
class Hole{
    constructor(positionX, positionY, diameter, holeId, color){
        this.positionX = positionX;
        this.positionY = positionY;
        this.diameter = diameter;
        this.holeId = holeId,
        this.color = color,
        this.canvas = new Canvas();
    }
    createHole(){
        this.canvas.context.beginPath();
        this.canvas.context.arc(
            this.positionX,
            this.positionY,
            this.diameter,
            0,
            2 * Math.PI,
        );
        // this.canvas.context.fillStyle = '#E85D04'
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fill()
    }
    getCoordinates(){
        return {
            x: this.positionX,
            y: this.positionY,
        };
    }
}
class DeviceOrientation{
    constructor(alpha, beta){
        this.alpha = alpha;
        this.beta = beta;
    }
    setOrientation(a,b){
        this.alpha =  a;
        this.beta = b;   
    }
    getOrientation(){
        return {
            a: this.alpha,
            b: this.beta,
        };
    }
}

const _canvas = new Canvas();
const deviceOrientation = new DeviceOrientation(0,0);
window.addEventListener('deviceorientation', (ev)=> {
    deviceOrientation.setOrientation(ev.alpha, ev.beta);
})
const ball = new Ball(187.5,750,20);
const hole = new Hole(110,604,42,0, '#E85D04')
const hole2 = new Hole(236,448,36,1,'#E85D04')
const hole3= new Hole(95,199,30,2, '#E85D04')
const hole4= new Hole(280,60,25,3,'#D00000')
let startTime = Date.now();


function updateBallPosition(){
    
    _canvas.context.clearRect(0,0, _canvas.canvas.width, _canvas.canvas.height);
    let ballCoordinates = ball.getCoordinates();
    const mobileOrientation = deviceOrientation.getOrientation();
    if((ballCoordinates.x + mobileOrientation.a) < _canvas.canvas.width && (ballCoordinates.x + mobileOrientation.a)> 0){
        ballCoordinates.x += mobileOrientation.a/10;
    }
    if((ballCoordinates.y + mobileOrientation.b) < _canvas.canvas.height && (ballCoordinates.y + mobileOrientation.b) > 0){
        ballCoordinates.y += mobileOrientation.b/20;
    }
    ball.setCoordinates(ballCoordinates.x, ballCoordinates.y);
    ball.createBall();
    hole.createHole();
    hole2.createHole();
    hole3.createHole();
    hole4.createHole();
    
    detectCollisions(hole); 
    detectCollisions(hole2);
    detectCollisions(hole3);
    detectCollisions(hole4);
}

function detectCollisions(hole){ 
   
    const distanceX = hole.getCoordinates().x - ball.getCoordinates().x;
    const distanceY = hole.getCoordinates().y - ball.getCoordinates().y;
    const radiusSum = Math.sqrt(Math.pow(ball.diameter/2 + hole.diameter/2,2));
    const distance = Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2))
   
    if(distance < radiusSum && hole.holeId == 3){
    console.log('Udało się!')
    let timeEnd = Date.now();
    let time = (timeEnd - startTime)/1000;
    alert(`Ukończyłeś grę w ciągu: ${time} s.`)
    }
    else if(distance < radiusSum )
    console.log('Trafiłeś do złej dziury!');
}

document.addEventListener("DOMContentLoaded", ()=>{
   setInterval(updateBallPosition, 10);
})

