var tf=0;
var tf2=0;
var R=0;
var xhr=new XMLHttpRequest();
var xhrII=new XMLHttpRequest();
var urls= [];
var slideUrl=[];
var slidePhotos=[];
var mePlease=[];
var please=[];
var json;
var jsonUrl=[];
var scripts=[];
var jsonSlide=[];
var time=3000;
var $time=5;
var $timeFade=$time*.25;
var timer;
var j;
var pos;
var size;
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
function fillJson(jsonUrls) {
    // console.log("\t\t\tFill er up, Jim\n\n");
    // console.log(jsonUrls.length);
    // console.log(jsonUrls[R]);
    if (R<jsonUrls.length) {
        // $.getJSON(""+jsonUrls[R]+"", function(data){
        //     console.log($.getJSON(""+jsonUrls[R]+""));
        //     fillErUpJim(data, R);
        // });
        // console.log(scripts)
        // R++;
        // fillJson(jsonUrls);
        fetch(jsonUrls[R])
            .then(response => response.json())
            .then(data => {
                // console.log(data.backgroundPos)
                let pos=data.backgroundPos;
                // console.log(pos);
                let size=data.backgroundSize;
            })
            
        scripts[R]=[
            pos,
            size
        ];
        console.log("Scripts:\t\t"+scripts[R]);
        R++;
    }
    
}
function fillErUpJim(paths, r) {
    console.log("\t\t\tPaths");
    console.log(paths.backgroundSize);
    scripts[r]=[
        paths.backgroundSize,
        paths.backgroundPos
    ];
    // R++;
    // console.log(scripts[r])
    return scripts;
}



function slideShow() {
    for (i=0; i<urls.length; i++) {
        urls[i]=window.location.origin+window.location.pathname+"/resources/"+urls[i];
        for (j=0; j<1000; j++) {
            kj=j+1;
            url=""+urls[i]+""+kj+".webp";
            json=""+urls[i]+""+kj+".JSON";
            xhr.open("HEAD",url,false);
            xhr.send();
            xhrII.open("HEAD",json,false);
            xhrII.send();
            if (xhr.status !== 404 && xhrII.status !== 404){
                slideUrl[j]=url;
                jsonUrl[j]=json;

            } else if (xhrII.status === 404 && xhr.status !== 404) {
                slideUrl[j]=url;
            }else {
                j=1001;
                slidePhotos[i]=slideUrl;
                slideUrl=[];
                jsonSlide[i]=jsonUrl;
                jsonUrl=[];
                

            }
        }
    }
    // console.log("\t\t\tJSON\n"+jsonSlide.length)
    // console.log(jsonSlide[1])
    fillJson(jsonSlide[1]);
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
            element.style.backgroundSize=
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
async function zoomzoom(urlPath, jUrls, element, i) {
    // console.log("URL path");
    // console.log(urlPath)
    lngth=urlPath.length-1;
    if (iii) {
        if(typeof urlPath[i] != "undefined") {
            element.style.backgroundImage="url("+urlPath[i]+")";
            fetch(jUrls[i])
            .then(response => response.json())
            .then(data => {
                // console.log(data.backgroundPos)
                element.style.backgroundPosition=data.backgroundPos;
                // console.log(pos);
                element.style.backgroundSize=data.backgroundSize;
            })
            // console.log(urlPath[i]);
        }
        if (i<lngth) {
            // console.log("\t\t\tI:\t\t"+i);
            // console.log("URL\t\t:"+urlPath.length);
            i=i+1;
            timeoutID=setTimeout(zoomzoom, parseFloat(element.dataset.time), urlPath, jUrls, element, i);
        } else {
            i=0;
            timeoutID=setTimeout(zoomzoom, parseFloat(element.dataset.time), urlPath, jUrls, element, i);
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
    iii=false;
    // console.log(slidePhotos[0].length);
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
        zoomzoom(slidePhotos[1], jsonSlide[1], guns, 0);
    }
}, optsC);
observerII.observe(secci);
observer.observe(polyShadow);