const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird,score, slingshot;
var bird_fly,pig_snort,bird_select
var gameState = "onSling";
var spacebarcount
var lives=3,fired
function preload() {
    backgroundImg = loadImage("sprites/bg.png");
getbackgroundimage()
bird_fly=loadSound("Sounds-main/bird_flying.mp3")
bird_select=loadSound("Sounds-main/bird_select.mp3")
pig_snort=loadSound("Sounds-main/pig_snort.mp3")


}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
fired=false
score=0
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    bird1=new Bird(50,250)
    bird2=new Bird(80,250)
    bird3=new Bird(130,250)
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
    textSize(35)
    fill("yellow")
text("Score "+score,width-300,50)
 text("livesleft:"+lives,width/2,50)
if(gameState==="over"){
    text("gameover",width/2,100)
    text("nomorelivesleft",width/2,150)
}
 box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
pig1.score();
pig3.score();
    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    if(lives==3){
        bird1.display();
        bird2.display();
    }
    if(spacebarcount==1 &&lives==2){
        bird2.display();
    }
else if(lives==2){
    bird2.display();
    bird3.display();
}
if(spacebarcount==2 &&lives==1){
   // bird3.display();
    
}
else if(lives==1){
    bird3.display();
}
if((mouseIsPressed)&&(lives!==0)){
    if(mouseX>=0&&mouseX<200&&gameState!=="launched"){
        Matter.Body.setPosition(bird.body,{
            x:mouseX,y:mouseY
        })
    }
}
}



/* mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}*/


function mouseReleased(){
if((gameState==="onSling")&&(lives!==0)){
    slingshot.fly();
   bird_fly.play();
    gameState = "launched";
fired=true
lives=lives-1
if(lives==0){
gameState="over"
}
}
}

function keyPressed(){
    if(keyCode === 32&&bird.body.speed<1&&lives!==0){
      bird.tracjectory=[]
      Matter.Body.setPosition(bird.body,{x:200,y:50})
        slingshot.attach(bird.body);
        gameState="onSling"
    }
}
async function getbackgroundimage(){
    var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata")
    var responsejson=await response.json()
    //console.log(responsejson)

    var dateTime=responsejson.datetime
    console.log(dateTime)

    var hour=dateTime.slice(11,13)
console.log(hour)
if(hour>=06 &&hour<=18){bg="sprites/bg.png"
}
else{bg="sprites/bg2.jpg"

}
backgroundImg=loadImage(bg)
}
