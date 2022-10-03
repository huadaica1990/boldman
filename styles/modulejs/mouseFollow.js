/**
 * Set ez Parallax
 * @param {String} container to hover
*/
function mouseFollowEcs(selector, speedVal = 0.1) {
    let cursor = document.querySelector('.cursor'),
        cursorH = cursor.clientHeight,
        cursorW = cursor.clientWidth,
        mouseX = 0,
        mouseY = 0,

        cursorX = 0,
        cursorY = 0,

        speed = speedVal;
    
    function animate() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;
        
        
        cursorX = cursorX + (distX * speed);
        cursorY = cursorY + (distY * speed);
        cursor.setAttribute('style', 'transform: translate3d('+(cursorX - cursorW/2)+'px,'+(cursorY - cursorH/2)+'px,0)');
        requestAnimationFrame(animate);
    };
    Ecsgroup.$(selector).each(function () {
        let container = this,
            className = this.getAttribute('data-class');
        if(container.tagName != "BODY") {
            container.addEventListener("mousemove", function(event){
                $('.cursor').addClass('active');
                if (className !== null) {
                    $('.cursor').addClass(className);
                };
                cursorH = cursor.clientHeight;
                cursorW = cursor.clientWidth;
                mouseX = event.pageX;
                mouseY = event.pageY;
                if (container.getAttribute('data-text') !== null) cursor.lastChild.innerHTML = container.getAttribute('data-text');
            });
            container.addEventListener("mouseleave", function(event){
                $('.cursor').attr('class', 'cursor');
                $('.cursor').removeClass('active');
            });
            container.addEventListener("mouseenter", function(event){
                $('.cursor').addClass('active');
            });
        }
        else  {
            container.addEventListener("mousemove", function(event){
                $('.cursor').addClass('active');
                mouseX = event.pageX;
                mouseY = event.pageY;
            });
        }
    });
    animate();
};

Ecsgroup.mouseFollow = function (selector, className, speedVal) {
    return mouseFollowEcs(selector, className, speedVal);
};