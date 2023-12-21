const template = document.createElement('template');
// component-page-divider(renderheight='84' pointscount='8' waveplacement='bottom' waveamplitude='83')
template.innerHTML = '';

class PageDivider extends HTMLElement {
    constructor() {
        super();

        template.innerHTML = `
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

        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        const shadow = this._shadowRoot;

        window.addEventListener("scroll", slosh, 0);

        var count = 0;
        var amplitude = this.waveAmplitude;
        var pointsCount = this.pointsCount;
        var renderWidth = this.renderWidth;
        var renderHeight = this.renderHeight;
        var wavePlacement = this.wavePlacement;
        var waveColor = this.waveColor;
        var bgColor = this.bgColor;
        var placementBorder = this.placementBorder;
        var localRoot = this._shadowRoot;
        var shouldStop = false;

        var points = Array(pointsCount + 3);

        var xStep = renderWidth/pointsCount;
        for(var i = 0; i < pointsCount + 1; i++){
            points[i] = {x:xStep * i, y:0};
        }
        if(wavePlacement == "top"){
            points[points.length - 2] = {x:renderWidth, y:0}
            points[points.length - 1] = {x:0, y:0}
        } else {
            points[points.length - 2] = {x:renderWidth, y:renderHeight}
            points[points.length - 1] = {x:0, y:renderHeight}
        }


        var ctx;
        ctx = this._shadowRoot.getElementById('pageDividerCanvas').getContext('2d');

        if(placementBorder == "none"){
            // 
        } else if(isValidColor(placementBorder)){
            this._shadowRoot.getElementById('pageDividerCanvas').style.border = "1px solid " + placementBorder;
        } else {
            this._shadowRoot.getElementById('pageDividerCanvas').style.border = "1px solid red";
        }
        
        this._shadowRoot.getElementById('pageDividerCanvas').width = renderWidth;
        this._shadowRoot.getElementById('pageDividerCanvas').height = renderHeight;


        window.addEventListener("resize", updateForResize);

        function updateForResize(){
            count = 0;

            renderWidth = window.innerWidth;

            points = Array(pointsCount + 3);
            xStep = renderWidth/pointsCount;
            for(var i = 0; i < pointsCount + 1; i++){
                points[i] = {x:xStep * i, y:0};
            }
            if(wavePlacement == "top"){
                points[points.length - 2] = {x:renderWidth, y:0}
                points[points.length - 1] = {x:0, y:0}
            } else {
                points[points.length - 2] = {x:renderWidth, y:renderHeight}
                points[points.length - 1] = {x:0, y:renderHeight}
            }


            
            // localRoot.innerHTML = `
            //     <canvas id="pageDividerCanvas" width="` + renderWidth + `" height="` + renderHeight + `"></canvas>
            //     <style>
            //         #pageDividerCanvas{
            //             box-sizing: border-box;
            //             border-style: solid;
            //             border: none;
            //         }
            //     </style>
            // `;
            ctx = localRoot.getElementById('pageDividerCanvas').getContext('2d');
        
            localRoot.getElementById('pageDividerCanvas').width = renderWidth;
            localRoot.getElementById('pageDividerCanvas').height = renderHeight;

            init();
        }

        function init() {
            setTimeout(() => {
                bindEvents();
            });

            ctx.clearRect(0, -200, renderWidth+200, renderHeight); // clear canvas

            ctx.fillStyle = waveColor;//'rgba(255, 255, 255, 1)';
            ctx.save();

            if(wavePlacement == "top"){
                for(var i = 0; i < points.length -2; i++){
                    gsap.to(points[i], {duration: 0, y: amplitude - (coor(amplitude)*.3), delay:0});
                }
            } else {
                for(var i = 0; i < points.length -2; i++){
                    gsap.to(points[i], {duration: 0, y: renderHeight - (amplitude - (coor(amplitude)*.3)), delay:0});
                }
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

            if(bgColor){
                ctx.fillStyle = bgColor;

                ctx.beginPath();
                ctx.rect(0, 0, renderWidth, renderHeight);
                ctx.fill();

                ctx.fillStyle = waveColor;
            } else {
                //console.log("no bgColor" = " + bgColor");
            }
            
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

            if(wavePlacement == "top"){
                for(var i = 0; i < points.length-2; i++){
                    gsap.to(points[i], {duration: 1, y:amplitude - (coor(amplitude)), delay:0});
                }
                for(var k = 0; k < points.length-3; k++){
                    gsap.to(points[k], {duration: 2, y:amplitude - (coor(amplitude) *.2), delay:1, ease:"sine.inOut"});
                }
                gsap.to(points[points.length-3], {duration: 2, y:amplitude - (coor(amplitude) *.2), delay:1, ease:"sine.inOut", onComplete:killTweens});
            } else {
                for(var i = 0; i < points.length-2; i++){
                    gsap.to(points[i], {duration: 1, y:renderHeight - (amplitude - (coor(amplitude))), delay:0});
                }
                for(var k = 0; k < points.length-3; k++){
                    gsap.to(points[k], {duration: 2, y:renderHeight - (amplitude - (coor(amplitude) *.2)), delay:1, ease:"sine.inOut"});
                }
                gsap.to(points[points.length-3], {duration: 2, y:renderHeight - (amplitude - (coor(amplitude) *.2)), delay:1, ease:"sine.inOut", onComplete:killTweens});
            }

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
            const $wave = this._shadowRoot.getRootNode().host.closest('.wave--divider');
            const $pauseAnimationsButtons = this._shadowRoot.getRootNode().host.closest('body').querySelectorAll('.global-pause-animations');
    
            if ($wave) {
                $wave.addEventListener('mouseover', () => {
                    shouldStop = true;
                });
    
                $wave.addEventListener('mouseout', () => {
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
    
            for (const $pauseAnimationsButton of $pauseAnimationsButtons) {
                $pauseAnimationsButton.addEventListener('click', () => {
                    const state = $pauseAnimationsButton.dataset.state;
    
                    if (state === 'played') {
                        shouldStop = true;
                    } else {
                        shouldStop = false;
                    }
                });
            }
        }

        init();
    }



    get renderWidth(){
        if(this.getAttribute('renderWidth')){
            return Number(this.getAttribute('renderWidth'));
        } else {
            return window.innerWidth;//2000;
        }
    }
    get renderHeight(){
        if(this.getAttribute('renderHeight')){
            return Number(this.getAttribute('renderHeight'));
        } else {
            return 200;
        }
    }
    get pointsCount(){
        if(this.getAttribute('pointsCount')){
            return Number(this.getAttribute('pointsCount'));
        } else {
            return 8;
        }
    }
    get wavePlacement(){
        if(this.getAttribute('wavePlacement')){
            return this.getAttribute('wavePlacement');
        }
    }
    get waveAmplitude(){
        if(this.getAttribute('waveAmplitude')){
            return Number(this.getAttribute('waveAmplitude'));
        } else {
            return 80;
        }
    }
    get waveColor(){
        if(this.getAttribute('waveColor')){
            return String(this.getAttribute('waveColor'));
        } else {
            return "#FFFDF7";
        }
    }
    get bgColor(){
        if(this.getAttribute('bgColor')){
            return String(this.getAttribute('bgColor'));
        } else {
            return null;
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
window.customElements.define('component-page-divider', PageDivider);