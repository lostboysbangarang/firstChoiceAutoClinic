var tf=0;
var tf2=0;
var xhr=new XMLHttpRequest();
var urls= [];
var slideUrl=[];
var slidePhotos=[];
var mePlease=[];
var please=[];
var time=3000;
var $time=5;
var $timeFade=$time*.25;
var timer;
var j;
const cars=document.getElementById("slide");
const poly=document.getElementById("polyShadow")
// var rAF=    window.requestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             window.webkitRequestAnimationFrame ||
//             window.msRequestAnimationFrame;
// var TWEEN = require(["node_modules/@tweenjs/tween.js"]);
// var lolli;
// var pos={x: "100vw", y="0vw"};



urls[0]="slideshow/";




if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", afterLoaded);
} else {
    afterLoaded();
}
function afterLoaded() {
    slideShow();
}




function slideShow() {
    for (i=0; i<urls.length; i++) {
        urls[i]=window.location.origin+window.location.pathname+"/resources/"+urls[i];
        for (j=0; j<1000; j++) {
            kj=j+1;
            url=""+urls[i]+""+kj+".webp";
            xhr.open("HEAD",url,false);
            xhr.send();
            if (xhr.status !== 404){
                slideUrl[j]=url;
            } else {
                j=1001;
                slidePhotos[i]=slideUrl;
                slideUrl=[];
            }
        }
    }
    // // for (i=0; i<urls.length; i++) {
    // //     mePlease=slidePhotos[i];
    // //     hug(mePlease, please);
    // // }
    // console.log(slidePhotos);
    // timer=setInterval(slideRight(slidePhotos, 0), time);
    vroomvroom(slidePhotos, cars, 0);
}
function hug(you, me) {
    for (let y=0, len=you.length; y<len; y++){
        me.push(you[y]);
    }
    // // console.log("Me:     "+me);
    return me;
}






function actualAnimations(element) {
    // console.log("Try");
    // console.log(element);
    Promise.resolve(element)
        .then(prepareAnime)
        .then(playAnime)
}
var anime ={
    slideR: (element, done)=>{
        TweenMax.set(element, {autoAlpha: 0, translateX: "100vw"})
        TweenMax.to(element, 1, {autoAlpha: 1, translateX: "0vw"})
    }
}
function animate(element, animation) {
    return new Promise(resolve => animation(element, resolve));
}
async function playAnime(element){
    // console.log("Play");
    await animate(element, anime.slideR);
}
function prepareAnime(element){
    // console.log("Prepare");
    // console.log(element);
    // console.log(element.style);
    TweenMax.to(element, {clearProps: "animation"});
    // console.log(element.style);
    return element;
}





async function vroomvroom(urlPath, element, i) {
    if(typeof urlPath[0][i] != "undefined") {
        
        element.style.backgroundImage="url("+urlPath[0][i]+")";
        // element.style.animation="slideShow"+" "+element.dataset.time+" "+element.dataset.ease+" "+element.dataset.direction;
    }
    if (i<urlPath[0].length) {
        i=i+1;
        setTimeout(vroomvroom, parseFloat(element.dataset.time), urlPath, element, i);
    } else {
        i=0;
        vroomvroom(urlPath, element, i);
    }
    actualAnimations(element);
    
}