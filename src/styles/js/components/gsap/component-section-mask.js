const sectionTemplate = document.createElement('template');

class SectionMask extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }
    connectedCallback(){
        const offset = 25;

        const shadow = this._shadowRoot;
        const renderWidth = this.renderWidth;
        const renderheight = this.renderheight;
        var placementBorder = this.placementBorder;
        const src = this.src;
        const img = new Image();
        img.src = src;
        var localRoot = this._shadowRoot;

        var count = 0;
        var amplitude = 80;

        var points = [{x:0,y:0},{x:200,y:-70},{x:400,y:80},{x:600,y:-20},{x:800,y:70},{x:1000,y:-40},{x:1200,y:70},{x:1400,y:-80},{x:1600,y:30},{x:1800,y:50},{x:2000,y:-90},{x:2200,y:-300},{x:-200,y:-300}];

        var ctx;

        var windowWidth = window.innerWidth;
        var canvasWidth = windowWidth;
        var canvasHeight = 1000;
        var aspectRatio = 1;
        var imageWidth = 2000;
        var imageHeight = 1000;
        var imageScale = 1;
        var imgWidth;
        var imgHeight;

        window.addEventListener("resize", reloadComponent);
        getMeta(this.src, updateAspectRatio);

        function reloadComponent(){
            windowWidth = window.innerWidth;
            canvasWidth = windowWidth;
            //getMeta(this.src, updateAspectRatio);
            updateAspectRatio(imgWidth, imgHeight);
        }

        function getMeta(url, callback) {
            var img = new Image();
            img.src = url;
            // console.log("getMeta -- ", img.naturalWidth, img.naturalHeight)
            imgWidth = img.naturalWidth;
            imgHeight = img.naturalHeight;
            img.onload = function() { callback(img.naturalWidth, img.naturalHeight); }
        }

        function updateAspectRatio(width, height){
            aspectRatio = height/width;
            canvasHeight = canvasWidth * aspectRatio;
            imageWidth = width;
            imageHeight = height;
            
            localRoot.innerHTML = `
                <canvas id="sectionCanvas" width="` + canvasWidth + `" height="` + canvasHeight + `"></canvas>
                <style>
                    #sectionCanvas{
                        box-sizing: border-box;
                        border-style: solid;
                        border: none;
                    }
                </style>
            `;

            imageScale = Math.max(canvasWidth / width, canvasHeight / height);
            if(imageHeight * imageScale < 1200){
                imageHeight = 1200;
                var conversionRatio = imageHeight / height;
                imageWidth = width * conversionRatio;
                imageScale = 1;
            }
            
            localRoot.appendChild(sectionTemplate.content.cloneNode(true));

            init();
        }

        function updateXs(){
            var stepSize = (windowWidth / (points.length - 3));
            
            for(var i = 0; i < points.length -2; i++){
                points[i].x = i * stepSize;
            }
            points[points.length -2].x = points[points.length -3].x;
        }

        function init() {
            updateXs();

            ctx = localRoot.getElementById('sectionCanvas').getContext('2d');
            if(placementBorder == "none"){
                localRoot.getElementById('sectionCanvas').style.border = "none";
            } else if(isValidColor(placementBorder)){
                localRoot.getElementById('sectionCanvas').style.border = "1px solid " + placementBorder;
            } else {
                localRoot.getElementById('sectionCanvas').style.border = "1px solid red";
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas

            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
            ctx.save();
            for(var i = 0; i < points.length -2; i++){
                gsap.to(points[i], {duration: 0, y: amplitude - (coor(amplitude)*.3), delay:0});
            }

            window.addEventListener("scroll",slosh,0);
            slosh();
        }

        function draw() {
            count ++;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas
            ctx.save();
            
            ctx.beginPath();
            ctx.moveTo((points[0].x), points[0].y+offset);

            for(var i = 0; i < points.length-1; i ++)
            {
                var x_mid = (points[i].x + points[i+1].x) / 2;
                var y_mid = (points[i].y + points[i+1].y) / 2;
                var cp_x1 = (x_mid + points[i].x) / 2;
                var cp_x2 = (x_mid + points[i+1].x) / 2;
                ctx.quadraticCurveTo(cp_x1, points[i].y+offset, x_mid, y_mid+offset);
                ctx.quadraticCurveTo(cp_x2, points[i+1].y+offset, points[i+1].x, points[i+1].y+offset);
            }
            ctx.closePath();
            ctx.fill();
            applyImage();
        }
        function applyImage(){
            ctx.globalCompositeOperation = 'source-out';
            
            // console.log(imageWidth, imageHeight, imageScale, imageWidth * imageScale, imageHeight * imageScale, canvasWidth, canvasHeight);
            ctx.drawImage(img, 0, 0, imageWidth * imageScale, imageHeight * imageScale);
            // ctx.drawImage(img, 0, 0, 1500, 1000);
        }
        function slosh(){
            killTweens();

            for(var i = 0; i < points.length-2; i++){
                gsap.to(points[i], {duration: 1, y:amplitude - (coor(amplitude)), delay:0});
            }

            for(var k = 0; k < points.length-3; k++){
                gsap.to(points[k], {duration: 2, y:amplitude - (coor(amplitude) *.2), delay:1, ease:"sine.inOut"});
            }
            gsap.to(points[points.length-3], {duration: 2, y:amplitude - (coor(amplitude) *.2), delay:1, ease:"sine.inOut", onComplete:killTweens});

            gsap.ticker.add(draw);
        }
        function killTweens(){
            for(var i = 0; i < points.length; i++){
                gsap.killTweensOf(points[i]);
            }

            gsap.ticker.remove(draw);
            count = 0;
        }
        function coor(top){
            return Math.floor(Math.random() * (top + 1));
        }
        function isValidColor(strColor) {
            var s = new Option().style;
            s.color = strColor;

            // return 'false' if color wasn't assigned
            return s.color == strColor.toLowerCase();
        }
    }
    get src(){
        return this.getAttribute('src');
    }
    get renderWidth(){
        return this.getAttribute('renderWidth');
    }
    get renderheight(){
        return this.getAttribute('renderheight');
    }
    get placementBorder() {
        if(this.getAttribute('placement-border')){
            return this.getAttribute('placement-border');
        } else {
            return "none";
        }
    }
};
window.customElements.define('component-section-mask', SectionMask);