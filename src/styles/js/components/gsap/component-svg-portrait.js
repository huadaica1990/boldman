const svgPortraitTemplate = document.createElement('template');

// svgPortraitTemplate.innerHTML = '';

class SVGPortrait extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }
    connectedCallback(){
 
        // var paths = [path0, path1];

        var bubbleMaskPaths = [bubbleMaskPath1, bubbleMaskPath2, bubbleMaskPath3, bubbleMaskPath4];
        // console.log(path0);

        // console.log("shapeIndex getter result = " + this.getAttribute('shapeIndex'));
        var tempShapeIndex = 0;
        
        var gradAngle = this.gradientAngle;//45;//
        var gradStart = this.shapeColor;//"#ff0000";//
        var gradEnd = this.gradEndColor;//"#005500";//
        if(this.gradEndColor){
            gradEnd = this.gradEndColor;
        } else {
            gradEnd = this.fillColor;
        }

        if(Number(this.shapeIndex) > 3){
            tempShapeIndex = Math.round(randRange(0, 3));
            // console.log("out of range, so generated - " + tempShapeIndex);
        } else if(Number(this.shapeIndex) > 999999){
            tempShapeIndex = Math.round(randRange(0, 3));
            // console.log("not defined, so generated - " + tempShapeIndex);
        } else {
            // console.log("shapeIndex - defined - " + Number(this.shapeIndex));
            tempShapeIndex = Number(this.shapeIndex);
        }
        // console.log("------");

        svgPortraitTemplate.innerHTML = `
            <svg id="svgPortElement" viewBox="0 0 450 450" width="` + this.svgWidth + `" height="` + this.svgHeight + `" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="clipPathBubble">
                    <path d="`
                    // GET PATH FROM shapeIndex
                    + bubbleMaskPaths[tempShapeIndex] + `"/>`
                    
                +`  </clipPath>
                    <clipPath id="clipPathTop">
                        <rect x="0" y="0" width="` + this.renderWidth + `" height="` + this.renderHeight/2 + `" />
                    </clipPath>
                    
                    <linearGradient id="gradient" gradientTransform="rotate(` + gradAngle + `)">
                    <stop id="gradientStop1" offset="0%" stop-color="` + gradStart + `" />
                    <stop id="gradientStop2 " offset="100%" stop-color="` + gradEnd + `" />
                    </linearGradient>
                </defs>
                <path d="`
                // GET PATH FROM shapeIndex
                + bubbleMaskPaths[tempShapeIndex]
                + `" fill="url('#gradient')"/>`
                + `<image href="` + this.imageSrc + `" height="` + this.renderHeight + `" width="` + this.renderWidth + `" style="clip-path: url(#clipPathBubble);"/>
                <image href="` + this.imageSrc + `" height="` + this.renderHeight + `" width="` + this.renderWidth + `" style="clip-path: url(#clipPathTop);" />
            </svg>
            <style>
                #pageDividerCanvas{
                    box-sizing: border-box;
                    border-style: solid;
                    border: none;
                }
            </style>
        `;
        this._shadowRoot.appendChild(svgPortraitTemplate.content.cloneNode(true));
        
        var placementBorder = this.placementBorder;
        if(placementBorder == "none"){
            // 
        } else if(isValidColor(placementBorder)){
            this._shadowRoot.getElementById('svgPortElement').style.border = "1px solid " + placementBorder;
        } else {
            this._shadowRoot.getElementById('svgPortElement').style.border = "1px solid red";
        }

        var renderWidth = this.renderWidth;
        var renderHeight = this.renderHeight;


        function init() {
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
        function randRange(low, high){
            var newNumber = 75;
            newNumber = Math.random() * (high - low);
            newNumber+= low;
            return newNumber;
        }

        init();

    }
    get renderWidth(){
        if(this.getAttribute('renderWidth')){
            // console.log("received attribute for renderWidth : " + this.getAttribute('renderWidth'));
            return Number(this.getAttribute('renderWidth'));
        } else {
            // console.log("NO attribute for renderWidth RECEIVED");
            return 450;
        }
    }
    get renderHeight(){
        if(this.getAttribute('renderHeight')){
            return Number(this.getAttribute('renderHeight'));
        } else {
            return 450;
        }
    }
    
    get svgWidth(){
        if(this.getAttribute('svgWidth')){
            return Number(this.getAttribute('svgWidth'));
        } else {
            return "100%";
        }
    }
    get svgHeight(){
        if(this.getAttribute('svgHeight')){
            return Number(this.getAttribute('svgHeight'));
        } else {
            return "100%";
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
    get placementBorder() {
        if(this.getAttribute('placement-border')){
            return this.getAttribute('placement-border');
        } else {
            return "none";
        }
    }
    
    get imageSrc() {
        if(this.getAttribute('imageSrc')){
            return this.getAttribute('imageSrc');
        } else {
            return "none";
        }
    }

    get shapeIndex() {
        if(Number(this.getAttribute('shapeIndex'))){
            // if(Number(this.getAttribute('shapeIndex')) > 3){
            //     var tempShapeIndex = Math.round(randRange(0, 3));
            //     console.log(tempShapeIndex);
            //     return tempShapeIndex;
            // }
            return Number(this.getAttribute('shapeIndex'));
        }
        return 9999999;
    }
    get shapeColor() {
        if(this.getAttribute('shapeColor')){
            if(this.getAttribute('shapeColor')=="0"){
                return bgColors[0];
            } else if(this.getAttribute('shapeColor')=="1"){
                return bgColors[1];
            } else if(this.getAttribute('shapeColor')=="2"){
                return bgColors[2];
            } else {
                return this.getAttribute('shapeColor');
            }
        } else {
            return "#ffa32f";
        }
    }
    get gradientAngle(){
        if(this.getAttribute('gradientAngle')){
            return Number(this.getAttribute('gradientAngle'));
        } else {
            return 45;
        }
    }
    get gradEndColor(){
        if(this.getAttribute('gradEndColor')){
            return String(this.getAttribute('gradEndColor'));
        } else {
            return null;
        }
    }
};
window.customElements.define('component-svg-portrait', SVGPortrait);