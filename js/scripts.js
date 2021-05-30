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
    if (R<jsonUrls.length) {
        fetch(jsonUrls[R])
            .then(response => response.json())
            .then(data => {
                let pos=data.backgroundPos;
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
    fillJson(jsonSlide[1]);
}
function hug(you, me) {
    for (let y=0, len=you.length; y<len; y++){
        me.push(you[y]);
    }
    return me;
}






function actualAnimations(element) {
    Promise.resolve(element)
        .then(prepareAnime)
        .then(playAnime)
}
function goBoom(element) {
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
    await animate(element, anime.slideR);
}
async function playAnime2(element){
    await animate(element, anime.flippy);
}
function prepareAnime(element){
    TweenMax.to(element, {clearProps: "animation"});
    return element;
}




var jjj=undefined;
var iii=undefined;
var lngth;
async function vroomvroom(urlPath, element, i) {
    lngth=urlPath.length-1;
    if (jjj) {
        if(typeof urlPath[i] != "undefined") {
            element.style.backgroundSize=
            element.style.backgroundImage="url("+urlPath[i]+")";

        } else {
        }
        if (i<lngth) {
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
    lngth=urlPath.length-1;
    if (iii) {
        if(typeof urlPath[i] != "undefined") {
            element.style.backgroundImage="url("+urlPath[i]+")";
            fetch(jUrls[i])
            .then(response => response.json())
            .then(data => {
                element.style.backgroundPosition=data.backgroundPos;
                element.style.backgroundSize=data.backgroundSize;
            })
        }
        if (i<lngth) {
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
    window.clearTimeout(timeoutID);
    jjj=true;
    iii=false;
    var timeoutID=vroomvroom(slidePhotos[0], cars, 0);
}, opts);
observerII = new IntersectionObserver((entry) => {
    var enterSexy=entry[0].isIntersecting;
    if (entry[0].isIntersecting) {

        window.clearTimeout(timeoutID);
        jjj=false;
        iii=true;
        zoomzoom(slidePhotos[1], jsonSlide[1], guns, 0);
    }
}, optsC);
observerII.observe(secci);
observer.observe(polyShadow);