const TopWaveMaskTemplate = document.createElement('template');

TopWaveMaskTemplate.innerHTML = '';

class TopWaveMask extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }
    connectedCallback(){


        var localWidth = window.innerWidth;//this.renderWidth;
        var localHeight = 5000;//this.renderHeight;
        var amplitude = this.waveAmplitude;
        var localImgSrc = this.imageSrc;
        var animON = this.anim;//true;
        var animEnd = this.animStop;//300
        var noiseStep = this.speed;//0.005;
        var noiseRange = this.range;
        var spacing = this.spaceBetweenPoints;
        var pointsCount2 = Math.round(localWidth/spacing);//this.numberOfPoints;//6;
        var targ = this.targetID;
        var ishovering = false;
    
        var pathTopClip = document.getElementById("topClip" + this.pathID + "Path");
        var pathIDLocal = this.pathID;
        
        if(this.reuse){
            document.getElementById(targ).className += " clip-top-wave" + pathIDLocal;
            return;
        }

        var mahPoints;
        var tick = 0;

        var localRoot = this._shadowRoot;

        var targetSection = document.getElementById(targ) ? document.getElementById(targ) : pathTopClip.closest("section");

        targetSection.className += " clip-top-wave" + pathIDLocal;

        window.addEventListener("scroll",slosh,0);

        window.addEventListener("resize", reloadComponent);

        init();

        //////////////////////////////////////////////////////////////////////////

        function reloadComponent(){
            localWidth = window.innerWidth;//this.renderWidth;
            pointsCount2 = Math.round(localWidth/spacing);//this.numberOfPoints;//6;

            // mahPoints = [];
            tick = 0;

            init();
            slosh();
        }

        function formatPoints(points, close) {
            points = [...points];
            // so that coords can be passed as objects or arrays
            if (!Array.isArray(points[0])) {
                points = points.map(({ x, y }) => [x, y]);
            }

            if (close) {
                const lastPoint = points[points.length - 1];
                const secondToLastPoint = points[points.length - 2];

                const firstPoint = points[0];
                const secondPoint = points[1];

                points.unshift(lastPoint);
                points.unshift(secondToLastPoint);

                points.push(firstPoint);
                points.push(secondPoint);
            }

            return points.flat();
        }

        function spline(points = [], tension = 1, close = true, cb) {
            points = formatPoints(points, close);

            const size = points.length;
            const last = size - 4;

            const startPointX = close ? points[2] : points[0];
            const startPointY = close ? points[3] : points[1];

            let path = "M" + [startPointX, startPointY];

            cb && cb("MOVE", [startPointX, startPointY]);

            const startIteration = close ? 2 : 0;
            const maxIteration = close ? size - 4 : size - 2;
            const inc = 2;

            for (let i = startIteration; i < maxIteration; i += inc) {
                const x0 = i ? points[i - 2] : points[0];
                const y0 = i ? points[i - 1] : points[1];

                const x1 = points[i + 0];
                const y1 = points[i + 1];

                const x2 = Math.round(points[i + 2]);
                const y2 = Math.round(points[i + 3]);

                const x3 = i !== last ? points[i + 4] : x2;
                const y3 = i !== last ? points[i + 5] : y2;

                const cp1x = Math.round(x1 + ((x2 - x0) / 6) * tension);
                const cp1y = Math.round( y1 + ((y2 - y0) / 6) * tension);

                const cp2x = Math.round(x2 - ((x3 - x1) / 6) * tension);
                const cp2y = Math.round(y2 - ((y3 - y1) / 6) * tension);

                path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];

                cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
            }

            return path;
        }

        function createPoints(pointsCount) {
            const points = [];
            
                var y = amplitude+5;//Math.round(amplitude - coor(amplitude)*.3);
                points.push({
                    x: -4 * spacing,
                    y: y,
                    originX: -4 * spacing,
                    originY: y,
                    noiseOffsetX: 0,
                    noiseOffsetY: Math.round(Math.random() * 1000)
                });
                points.push({
                    x: -3 * spacing,
                    y: y,
                    originX: -3 * spacing,
                    originY: y,
                    noiseOffsetX: 0,
                    noiseOffsetY: Math.round(Math.random() * 1000)
                });
                points.push({
                    x: -2 * spacing,
                    y: y,
                    originX: -2 * spacing,
                    originY: y,
                    noiseOffsetX: 0,
                    noiseOffsetY: Math.round(Math.random() * 1000)
                });

                for(var i = 0; i < (pointsCount + 3); i++){
                    // gsap.to(points[i], {duration: 0, y: amplitude - (coor(amplitude)*.3), delay:0});

                    //y = Math.round(amplitude - coor(amplitude)*.3);
                    
                    points.push({
                        x: i * spacing,
                        y: y,
                        originX: i * spacing,
                        originY: y,
                        noiseOffsetX: 0,
                        noiseOffsetY: Math.round(Math.random() * 1000)
                    });
                }
                //y = Math.round(amplitude - coor(amplitude)*.3);
                points.push({
                    x: localWidth + (spacing * 4),
                    y: y,
                    originX: localWidth + spacing,
                    originY: y,
                    noiseOffsetX: 0,
                    noiseOffsetY: Math.round(Math.random() * 1000)
                });
                points.push({
                    x: localWidth + (spacing * 4),
                    y: localHeight * 1.3,
                    originX: localWidth + (spacing * 4),
                    originY: localHeight * 1.3,
                    noiseOffsetX: 0,
                    noiseOffsetY: 0
                });
                points.push({
                    x: -4 * spacing,
                    y: localHeight * 1.3,
                    originX: -4 * spacing,
                    originY: localHeight * 1.3,
                    noiseOffsetX: 0,
                    noiseOffsetY: 0
                });
            return points;
        }

        function randRange(low, high){
            var newNumber = 75;
            newNumber = Math.random() * (high - low);
            newNumber+= low;
            return newNumber;
        }
        function map(n, start1, end1, start2, end2) {
            return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
        }
        function coor(top){
            return Math.floor(Math.random() * (top + 1));
        }
        function animStop(){
            animON = false;
        }

        function init(){
            mahPoints = createPoints(pointsCount2);
            pathTopClip.setAttribute("d", spline(mahPoints, 1, true));

            // document.getElementById(targ).className += " clip-top-wave" + pathIDLocal;

            animate();
        }

        function animate(){
            var splineTemp = spline(mahPoints, 1, true);
            pathTopClip.setAttribute("d", splineTemp);

            var easeFactor = 1 - ((tick/animEnd) * 0.7);

            for (let i = 0; i < mahPoints.length; i++) {
                const point = mahPoints[i];

                // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
                const nX = noise.simplex2(point.noiseOffsetX, point.noiseOffsetX);
                const nY = noise.simplex2(point.noiseOffsetY, point.noiseOffsetY) * easeFactor;

                // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
                const x = map(nX, -1, 1, point.originX - noiseRange, point.originX + noiseRange);
                const y = map(nY, -1, 1, point.originY - noiseRange, point.originY + noiseRange);

                // update the point's current coordinates
                point.x = x;
                point.y = y;

                // progress the point's x, y values through "time"
                point.noiseOffsetX += noiseStep;
                point.noiseOffsetY += noiseStep;
            }
            tick ++;
            if(tick > animEnd){
                animStop();
            }
            if(animON){
                requestAnimationFrame(animate);
            }
        }
        function slosh(){
            const arrPaused = [];

            for (const $pauseAnimationsButton of $pauseAnimationsButtons) {
                const state = $pauseAnimationsButton.dataset.state;

                if (state === 'paused') arrPaused.push(state);
            }
            
            if(!animON && !arrPaused.length && !ishovering){
                tick = 0;
                animON = true;
                animate();
            }
        }

        const $section = this._shadowRoot.getRootNode().host.closest('section');
        const $pauseAnimationsButtons = this._shadowRoot.getRootNode().host.closest('body').querySelectorAll('.global-pause-animations');
    
        const $parent = $section;

        if ($parent) {
            $parent.addEventListener('mouseover', () => {
                animON = false;
                ishovering = true;
            });

            $parent.addEventListener('mouseout', () => {
                const arrPaused = [];
                ishovering = false;

                for (const $pauseAnimationsButton of $pauseAnimationsButtons) {
                    const state = $pauseAnimationsButton.dataset.state;

                    if (state === 'paused') arrPaused.push(state);
                }

                if (!arrPaused.length) {
                    animON = true;
                    animate();
                }

            });
        }

        for (const $pauseAnimationsButton of $pauseAnimationsButtons) {
            $pauseAnimationsButton.addEventListener('click', () => {
                const state = $pauseAnimationsButton.dataset.state;

                if (state === 'played') {
                    animON = false;
                } else {
                    animON = true;
                    animate();
                }
            });
        }
    }

    get numberOfWaveEngines(){
        if(this.getAttribute('numberOfWaveEngines')){
            return Number(this.getAttribute('numberOfWaveEngines'));
        } else {
            return 1;
        }
    }
    get anim(){
        if(this.getAttribute('anim')){
            return Number(this.getAttribute('anim'));
        } else {
            return true;
        }
    }
    get animStop(){
        if(this.getAttribute('animStop')){
            return Number(this.getAttribute('animStop'));
        } else {
            return 18000;
        }
    }
    get speed(){
        if(this.getAttribute('speed')){
            return Number(this.getAttribute('speed'));
        } else {
            return 0.005;
        }
    }
    // get numberOfPoints(){
    //     if(this.getAttribute('numberOfPoints')){
    //         return Number(this.getAttribute('numberOfPoints'));
    //     } else {
    //         return 6;
    //     }
    // }
    get spaceBetweenPoints(){
        if(this.getAttribute('spaceBetweenPoints')){
            return Number(this.getAttribute('spaceBetweenPoints'));
        } else {
            return 200;
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
            return 50;
        }
    }
    get imageSrc() {
        if(this.getAttribute('imageSrc')){
            return this.getAttribute('imageSrc');
        } else {
            return "none";
        }
    }
    get range(){
        if(this.getAttribute('range')){
            return Number(this.getAttribute('range'));
        } else {
            return 50;
        }
    }
    get pathID(){
        if(this.getAttribute('pathID')){
            return this.getAttribute('pathID');
        } else {
            return 1;
        }
    }
    get targetID(){
        if(this.getAttribute('targetID')){
            return this.getAttribute('targetID');
        }
    }
    get reuse(){
        if(this.getAttribute('reuse')){
            return Boolean(this.getAttribute('reuse'));
        } else {
            return false;
        }
    }
};
window.customElements.define('component-topwave-mask', TopWaveMask);