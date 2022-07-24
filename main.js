song="";
scoreLeftwrist=0;
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);

}

function modelLoaded(){
    console.log("modelloaded")
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
            scoreLeftwrist=results[0].pose.keypoints[9].score;
            console.log("scoreLeftwrist="+scoreLeftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x
        rightwristy=results[0].pose.rightWrist.y
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);
        console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);
    }
}
    


function draw(){
    image(video,0,0,600,500);
    fill('#0000FF');
     stroke('#FF0000');
     if(scoreLeftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        InNumberleftwristy=Number(leftwristy);
        remove_decimels=floor(InNumberleftwristy);
        volume=remove_decimels/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
     }

}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}


