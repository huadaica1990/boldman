const menuTemplate = document.createElement('template');
// component-menu-bottom(renderwidth='690' renderheight='600' pointscount='3' waveamplitude='30')

menuTemplate.innerHTML = '';

class MenuBottom extends HTMLElement {
    constructor() {
        super();

        menuTemplate.innerHTML = `
            <canvas id="pageDividerCanvas" width="` + this.renderWidth + `" height="` + this.renderheight + `"></canvas>
            <style>
                #pageDividerCanvas{
                    box-sizing: border-box;
                    border-style: solid;
                    border: none;
                }
            </style>
        `;
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });

        this._shadowRoot.appendChild(menuTemplate.content.cloneNode(true));
    }
    connectedCallback(){
        const shadow = this._shadowRoot;

        window.addEventListener("scroll",slosh,0);

        var count = 0;
        var amplitude = this.waveAmplitude;

        var points = Array(this.pointsCount + 3);
        var shouldStop = false;

        var xStep = this.renderWidth/this.pointsCount;
        for(var i = 0; i < this.pointsCount + 1; i++){
            points[i] = {x:xStep * i, y:0};
        }
        points[points.length - 2] = {x:this.renderWidth, y:0};
        points[points.length - 1] = {x:0, y:0}


        var ctx;
        ctx = this._shadowRoot.getElementById('pageDividerCanvas').getContext('2d');

        var placementBorder = this.placementBorder;
        if(placementBorder == "none"){
            //
        } else if(isValidColor(placementBorder)){
            this._shadowRoot.getElementById('pageDividerCanvas').style.border = "1px solid " + placementBorder;
        } else {
            this._shadowRoot.getElementById('pageDividerCanvas').style.border = "1px solid red";
        }
        
        this._shadowRoot.getElementById('pageDividerCanvas').width = this.renderWidth;
        this._shadowRoot.getElementById('pageDividerCanvas').height = this.renderHeight;

        var renderWidth = this.renderWidth;
        var renderHeight = this.renderHeight;

        function init() {
            setTimeout(() => {
                bindEvents();
            });

            ctx.clearRect(0, -200, 2000, 400); // clear canvas

            ctx.fillStyle = 'rgba(255, 253, 247, 1)';
            ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
            ctx.save();

            for(var i = 0; i < points.length -2; i++){
                gsap.to(points[i], {duration: 0, y: renderHeight - (amplitude - (coor(amplitude)*.3)), delay:0});
            }
            slosh();
        }

        function draw() {
            if (shouldStop) {
                return;
            }

            count ++;
            ctx.clearRect(0, 0, renderWidth, renderHeight); // clear canvas
            ctx.save();
            
            ctx.beginPath();
            ctx.moveTo((points[0].x), points[0].y);

            for(var i = 0; i < points.length-1; i ++)
            {
                var x_mid = (points[i].x + points[i+1].x) / 2;
                var y_mid = (points[i].y + points[i+1].y) / 2;
                var cp_x1 = (x_mid + points[i].x) / 2;
                var cp_x2 = (x_mid + points[i+1].x) / 2;
                ctx.quadraticCurveTo(cp_x1,points[i].y ,x_mid, y_mid);
                ctx.quadraticCurveTo(cp_x2,points[i+1].y ,points[i+1].x,points[i+1].y);
            }
            ctx.closePath();
            ctx.fill();
        }
        function slosh(){
            killTweens();

            for(var i = 0; i < points.length-2; i++){
                gsap.to(points[i], {duration: 2, y:renderHeight - (amplitude - (coor(amplitude))), delay:0, ease:"sine.inOut"});
            }
            for(var k = 0; k < points.length-3; k++){
                gsap.to(points[k], {duration: 2, y:renderHeight - (amplitude - (coor(amplitude) *.2)), delay:1, ease:"sine.inOut"});
            }
            gsap.to(points[points.length-3], {duration: 2, y:renderHeight - (amplitude - (coor(amplitude) *.2)), delay:1, ease:"sine.inOut", onComplete:slosh});

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
        const bindEvents = () => {
            const $parent = this._shadowRoot.getRootNode().host.closest('.nav__panel');
            const $pauseAnimationsButtons = this._shadowRoot.getRootNode().host.closest('body').querySelectorAll('.global-pause-animations');

            if ($parent) {
                $parent.addEventListener('mouseover', () => {
                    shouldStop = true;
                });

                $parent.addEventListener('mouseout', () => {
                    const arrPaused = [];

                    for (const $pauseAnimationsButton of $pauseAnimationsButtons) {
                        const state = $pauseAnimationsButton.dataset.state;

                        if (state === 'paused') arrPaused.push(state);
                    }

                    if (!arrPaused.length) {
                        shouldStop = false;
                    }
                });
            }

            for (let $pauseAnimationsButton of $pauseAnimationsButtons) {
                $pauseAnimationsButton.addEventListener('click', function () {
                    const state = $pauseAnimationsButton.dataset.state;

                    console.log(state);

                    if (state === 'played') {
                        shouldStop = true;
                    } else {
                        shouldStop = false;
                    }

                    console.log('shouldStop => ', shouldStop);
                });
            }
        }
        init();


            

    }
    get renderWidth(){
        if(this.getAttribute('renderWidth')){
            return Number(this.getAttribute('renderWidth'));
        } else {
            return 150;
        }
    }
    get renderHeight(){
        if(this.getAttribute('renderHeight')){
            return Number(this.getAttribute('renderHeight'));
        } else {
            return 800;
        }
    }
    get pointsCount(){
        if(this.getAttribute('pointsCount')){
            return Number(this.getAttribute('pointsCount'));
        } else {
            return 3;
        }
    }
    get waveAmplitude(){
        if(this.getAttribute('waveAmplitude')){
            return Number(this.getAttribute('waveAmplitude'));
        } else {
            return 50;
        }
    }
    get placementBorder() {
        if(this.getAttribute('placement-border')){
            return this.getAttribute('placement-border');
        } else {
            return "none";
        }
    }
};
window.customElements.define('component-menu-bottom', MenuBottom);