// RISE UP CONTROLLER
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => { 
var animationElements = document.querySelectorAll(".rise-element");

function inViewport(){
    var windowHeight = window.innerHeight;
    var windowTop = window.scrollY;
    var windowBottom = windowTop + windowHeight;

    animationElements.forEach(eachEl);

    function eachEl(risingEl, index){
    var elHeight = risingEl.offsetHeight;
    var elTop = risingEl.getBoundingClientRect().top;
    var elBottom = elTop + elHeight;

    console.log("elHeight = " + elHeight);

    console.log(elBottom, windowTop, elTop, windowBottom);
        
    if ((elBottom >= 0) && (elTop <= windowHeight)) {
        // risingEl.addClass('in-view');
        // console.log("in view");
        risingEl.setAttribute("style", "opacity: 0");
        // risingEl.setAttribute("style", "animation-delay: " + (2 * index) + "s");
        risingEl.classList.remove('out-of-view');
        risingEl.classList.add('in-view'); 
        risingEl.classList.remove('rise-element-prep'); 
        risingEl.setAttribute("style", "opacity: 1");
    } else {
        // console.log("NOT in view");
        risingEl.classList.remove('in-view');
        risingEl.classList.add('out-of-view');
        risingEl.setAttribute("style", "opacity: 0");
    }
    }

};
inViewport();
window.addEventListener("scroll", inViewport);
window.addEventListener("resize", inViewport);
})