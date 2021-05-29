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
const poly=document.getElementById("polyShadow");
const guns=document.getElementById("midrif");
const secci=document.getElementById("sectI");
// cont 
// var rAF=    window.requestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             window.webkitRequestAnimationFrame ||
//             window.msRequestAnimationFrame;
// var TWEEN = require(["node_modules/@tweenjs/tween.js"]);
// var lolli;
// var pos={x: "100vw", y="0vw"};



urls[0]="slideshow/";
urls[1]="guns/"


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
    // console.log(slidePhotos);
    // console.log(slidePhotos[1]);
    // var timeoutID=vroomvroom(slidePhotos[0], cars, 0);
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
function goBoom(element) {
    // console.log("Try");
    // console.log(element);
    Promise.resolve(element)
        .then(prepareAnime)
        .then(playAnime2)
}
var anime ={
    slideR: (element, done)=>{
        TweenMax.set(element, {autoAlpha: 0, translateX: "100vw"})
        TweenMax.to(element, 1, {autoAlpha: 1, translateX: "0vw"})
    },
    flippy: (element, done)=>{
        TweenMax.set(element, {autoAlpha: 0, rotateY: "90deg"})
        TweenMax.to(element, .8, {autoAlpha: 1, rotateY: "0deg"})
    }
}
function animate(element, animation) {
    return new Promise(resolve => animation(element, resolve));
}
async function playAnime(element){
    // console.log("Play");
    await animate(element, anime.slideR);
}
async function playAnime2(element){
    // console.log("Play");
    await animate(element, anime.flippy);
}
function prepareAnime(element){
    // console.log("Prepare");
    // console.log(element);
    // console.log(element.style);
    TweenMax.to(element, {clearProps: "animation"});
    // console.log(element.style);
    return element;
}



// var alarm = {
//     this.timeoutID  =   undefined,

// }
var jjj=undefined;
var iii=undefined;
var lngth;
async function vroomvroom(urlPath, element, i) {
    // console.log("URL path");
    // console.log(urlPath)
    lngth=urlPath.length-1;
    if (jjj) {
        if(typeof urlPath[i] != "undefined") {
            element.style.backgroundImage="url("+urlPath[i]+")";
        } else {
            // console.log("cancelation in progress\t\t\tI:\t\t"+i);
        }
        if (i<lngth) {
            // console.log("\t\t\tI:\t\t"+i);
            i=i+1;
            timeoutID=setTimeout(vroomvroom, parseFloat(element.dataset.time), urlPath, element, i);
        } else  {
            i=0;
            timeoutID=setTimeout(vroomvroom, parseFloat(element.dataset.time), urlPath, element, i);
        }
        if (element === cars) {
            actualAnimations(element);
        }
        if (element === guns) {
            goBoom(element);
        }
    }
}
async function zoomzoom(urlPath, element, i) {
    // console.log("URL path");
    // console.log(urlPath)
    lngth=urlPath.length-1;
    if (iii) {
        if(typeof urlPath[i] != "undefined") {
            element.style.backgroundImage="url("+urlPath[i]+")";
            // console.log(urlPath[i]);
        }
        if (i<lngth) {
            // console.log("\t\t\tI:\t\t"+i);
            // console.log("URL\t\t:"+urlPath.length);
            i=i+1;
            timeoutID=setTimeout(zoomzoom, parseFloat(element.dataset.time), urlPath, element, i);
        } else {
            i=0;
            timeoutID=setTimeout(zoomzoom, parseFloat(element.dataset.time), urlPath, element, i);
        }
        if (element === cars) {
            actualAnimations(element);
        }
        if (element === guns) {
            goBoom(element);
        }
    }
}






const opts={
    root: null,
    threshold: .1,
    rootMargin: "0px"
}
const optsC={
    root: null,
    threshold: 0.95,
    rootMargin: "0%"
}
observer = new IntersectionObserver((entry) => {
    // console.log("Anotha one");
    window.clearTimeout(timeoutID);
    jjj=true;
    // iii=false;
    var timeoutID=vroomvroom(slidePhotos[0], cars, 0);
    
    // if (entry.intersectionRatio > 0) {
    //     console.log("annotha one");
    //     if (entry===cars) {
            
    //     }
    //     // async function bangbang(urlPath, element, i) {
    //     //     if(typeof urlPath[i] != "undefined") {
        
    //     //         element.style.backgroundImage="url("+urlPath[i]+")";
    //     //         // element.style.animation="slideShow"+" "+element.dataset.time+" "+element.dataset.ease+" "+element.dataset.direction;
    //     //     }
    //     //     if (i<urlPath[0].length) {
    //     //         i=i+1;
    //     //         setTimeout(bangbang, parseFloat(element.dataset.time), urlPath, element, i);
    //     //     } else {
    //     //         i=0;
    //     //         bangbang(urlPath, element, i);
    //     //     }
    //     //     actualAnimations(element);
            
        
    //     // }
    // }
}, opts);
observerII = new IntersectionObserver((entry) => {
    // console.log("We got er Jim");
    var enterSexy=entry[0].isIntersecting;
    // console.log("\t\t\t"+enterSexy+"");
    if (entry[0].isIntersecting) {
        // console.log("We got er Jim");
        // vroomvroom(slidePhotos[0], cars, 1000);
        window.clearTimeout(timeoutID);
        jjj=false;
        iii=true;
        zoomzoom(slidePhotos[1], guns, 0);
    }
}, optsC);
observerII.observe(secci);
observer.observe(polyShadow);