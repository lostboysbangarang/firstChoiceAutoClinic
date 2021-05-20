

// function actualAnimations(){
//     console.log("Promise");
//     Promise.resolve(cars)
//         .then(prepareAnime)
//         .then(playAnime);
    
// }
// var anime ={
//     slideR: (element, done)=>{
//         // console.log("Why wont this work");
//         // console.log(element);
//         TweenMax.set(element, {autoAlpha: 0, translateX: "100vw"});
//         // console.log(element);
//         TweenMax.to(element, parseFloat(cars.dataset.time), {delay: 3, autoAlpha: 1, translateX:"0vw", onComplete: done});
//         // lolli= new TWEEN.Tween()
//     },
//     slideL: (element, done)=>{
//         TweenMax.set(element, {autoAlpha: 0, translateX: "-100vw"});
//         // console.log(element);
//         TweenMax.to(element, parseFloat(cars.dataset.time), {delay: 3, autoAlpha: 1, translateX:"0vw", onComplete: done});
//     }
// }
// function animate(element, animation){
//     return new Promise(resolve => animation(element, resolve));
// }
// async function playAnime(element, shinobi){

//     // console.log("Play");
//     await animate(element, shinobi);
// }
// function prepareAnime(element){
//     // console.log("Prepare");
//     // console.log(element);
//     // console.log(element.style);
//     TweenMax.to(element, {clearProps: "animation"});
//     // console.log(element.style);
//     return element;
// }





// // function rAFSS(photoPaths, element, othElement, i) {
// //     // console.log("I:\t\t\t", i);
// //     // console.log("length:\t\t", photoPaths[0].length);
// //     // if(i==photoPaths[0].length){
// //     //     i=0;
// //     // }
// //     if(typeof photoPaths[0][i] !="undefined"){
// //         console.log("DOM element:\t\t", element);
// //         console.log("I:\t\t\t", i);
// //         console.log("URL:\t\t\t", photoPaths[0][i]);
// //         element.style.backgroundImage="url("+photoPaths[0][i]+")";
// //         prepareAnime(element);
// //         prepareAnime(othElement);
// //         element.style.animation=element.dataset.anime+" "+element.dataset.time+" "+element.dataset.ease+" forwards";
// //         // element.style.animation
// //         Promise.resolve(element, anime.slideR)
// //             .then(prepareAnime)
// //             .then(playAnime);
// //         // playAnime(element, anime.slideR);
// //         // playAnime(othElement, anime.slideL);
// //     }
// //     if (i<photoPaths[0].length){
// //         i=i+1;
// //         console.log("I:\t\t\t", i);
// //         // rAF(function(){
// //         //     rAFSS(photoPaths, element, othElement, i);
// //         // });
// //         setTimeout(rAFSS, 10, photoPaths, element, othElement, i)

// //     } else {
// //         i=0;
// //         // rAFSS(photoPaths, element, othElement, i);
// //     }
// // }
// function vroomvroom(photoPaths, element, othElement, i) {
//     // if(i==photoPaths[0].length){
//     //     i=0;
    // }
//     if(typeof photoPaths[0][i] != "undefined") {
//         element.style.backgroundImage="url("+photoPaths[0][i]+")";
//     }
//     if (i<photoPaths[0].length){
//         i=i+1;
//         console.log("I:\t\t\t", i);
//         setTimeout(vroomvroom, 10, photoPaths, element, othElement, i)

//     } else {
//         // i=0;
//     }
//     actualAnimations();
// }
function actualAnimations(){
    console.log("Promise");
    Promise.resolve(cars)
        .then(prepareAnime)
        .then(playAnime);
    
}

var anime ={
    slideR: (element, done)=>{
        TweenMax.set(element, {autoAlpha: 0, translateX: "-100vw"});
        TweenMax.to(element, time, {autoAlpha: 1, translateX:"0vw", onComplete: done});
        element.style.opacity=1;
    },
    slideL: (element, done)=>{
        TweenMax.set(element, {autoAlpha: 0, translateX: "-100vw"});
        TweenMax.to(element, time, {autoAlpha: 1, translateX:"0vw", onComplete: done});
    }
}
function animate(element, animation){
    return new Promise(resolve => animation(element, resolve));
}
async function playAnime(element){
    console.log("Play");
    await animate(element, anime.slideR);
}
async function playAnime2(element){
    console.log("Play");
    await animate(element, anime.slideL);
}
function prepareAnime(element){
    console.log("Prepare");
    console.log(element);
    console.log(element.style);
    TweenMax.to(element, {clearProps: "animation"});
    console.log(element.style);
    return element;
}




async function vroomvroom(urlPath, i) {
    // console.log("URL Path:");
    // console.log(urlPath);
    // console.log(urlPath[0].length);
    if (i==urlPath[0].length) {
        // console.log("URL path length:     "+urlPath);
        i=0;
    }
    if (typeof urlPath[0][i] != "undefined") {
        console.log("Help me:     ");
        console.log(cars);
        document.getElementById("slide").style.backgroundImage="url("+urlPath[0][i]+")";
        cars.style.animation="slideShow "+time*.05+"ms ease-out forwards";
    }
    if (i<urlPath[0].length) {
        i=i+1;
        setTimeout(vroomvroom, time, urlPath, i);
    } else {
        i=0;
        vroomvroom(urlPath, i);
    }
    actualAnimations();
    // actualAnimations2();
}