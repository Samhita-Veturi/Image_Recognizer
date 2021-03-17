Webcam.set({
width: 400,
height: 300,
image_format: 'png',
png_quality: 200
});
camera = document.getElementById("camera");
Webcam.attach( '#camera' );
function Take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='Img_C' src='"+data_uri+"'>";
    });
}
console.log("ml5 version: ", ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5YdEyL9wd/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
    Speak_Now();
}
function Speak_Now(){
    synth = window.speechSynthesis;
    SpeakData = "Model Loaded!";
    utterThis = new SpeechSynthesisUtterance(SpeakData);
    synth.speak(utterThis);
}
function Identify(){
    img = document.getElementById("Img_C");
    classifier.classify(img, gotResult);
}
function gotResult(error, resuLt){
    if(error){
        console.error(error);
    }
    else{
        console.log(resuLt);
        document.getElementById("Obj_Div").innerHTML = resuLt[0].label;
        document.getElementById("Accuracy_Div").innerHTML = resuLt[0].confidence.toFixed(3);
    }
}