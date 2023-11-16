const BubbleMaskTemplate = document.createElement("template");
// component-bubble-mask(imagesrc='https://www.bostonbeer.com' renderwidth='800' renderheight='600' speed='0.001' numberofpoints='8' range='10' minradius='80' maxradius='90' anim='1' animstop='')
<component-bubble-mask ></component-bubble-mask>
class BubbleMask extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    //////  FROM GETTTERS AND SETTERS  //////
    var localWidth = this.renderWidth;
    var localHeight = this.renderHeight;
    var localImgSrc = this.imageSrc;
    var aspectRatio = localHeight / localWidth;
    // aspectRatio = 1;//////////////////////////////////
    var animON = this.anim; //true;
    var animEnd = this.animStop; //300
    var noiseStep = this.speed; //0.005;
    var noiseRange = this.range; //20;
    var pointsCount2 = this.numberOfPoints; //6;
    var lowLimit2 = this.minRadius; //50;
    var highLimit2 = this.maxRadius; //80;

    var path = null; // = this._shadowRoot.querySelector("path");

    var mahPoints;
    var tick = 0;

    var localRoot = this._shadowRoot;

    // if(!this.getAttribute('renderWidth')){
    var localWidthAdj = (highLimit2 + noiseRange) * 2;
    // }
    // if(!this.getAttribute('renderHeight')){
    var localHeightAdj = (highLimit2 + noiseRange) * 2;
    // }

    function getMeta(url, callback) {
      var img = new Image();
      img.src = url;
      img.onload = function () {
        callback(img.naturalWidth, img.naturalHeight);
      };
    }
    getMeta(this.imageSrc, updateAspectRatio);

    function updateAspectRatio(width, height) {
      aspectRatio = height / width;

      BubbleMaskTemplate.innerHTML = `
          <svg id="svgBubbleMask" viewBox="0 0 ` + 200 + ` ` + (200 * aspectRatio) + 
            // `" width="` + localWidth + `" height="` + localHeight + 
            `" 
            ` + ((window.innerWidth < 768) ? `style="height:250px;filter: drop-shadow(44px 45px 30px rgb(0 0 0 / 0.4));"` : `style="filter: drop-shadow(44px 45px 30px rgb(0 0 0 / 0.4));"`) + `
             preserveAspectRatio="none">
          <defs>
              <clipPath id="clipPathBubble">
                  <path d="" fill="#ffa32f"></path>
              </clipPath>
          </defs>`
          + `<image href="` + localImgSrc + `" width="` + 200 + `" height="` + (200 * aspectRatio) + `" style="clip-path: url(#clipPathBubble);" preserveAspectRatio="none" />
          </svg>
      `;

      // BubbleMaskTemplate.innerHTML = `
        
      
      //               <svg id="svgBubbleMask" viewBox="0 0 ` +
      //   200 +
      //   ` ` +
      //   200 * aspectRatio +
      //   `" style="filter: drop-shadow(44px 45px 30px rgb(0 0 0 / 0.4));" preserveAspectRatio="none">
                    
      //               <defs>
      //                   <clipPath id="clipPathBubble">
      //                       <path d="" fill="#ffa32f"></path>
      //                   </clipPath>
      //               </defs>` +
      //   `<image href="` +
      //   localImgSrc +
      //   `" width="` +
      //   200 +
      //   `" height="` +
      //   200 * aspectRatio +
      //   `" style="clip-path: url(#clipPathBubble);" preserveAspectRatio="none"/>
      //               </svg>
      //       `;

      localRoot.appendChild(BubbleMaskTemplate.content.cloneNode(true));
      path = localRoot.querySelector("path");

      init();
    }

    //////////////////////////////////////////////////////////////////////////

    var placementBorder = this.placementBorder;

    //////////////////////////////////////////////////////////////////////////

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

    function spline(points = [], tension = 1, close = false, cb) {
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

        const x2 = points[i + 2];
        const y2 = points[i + 3];

        const x3 = i !== last ? points[i + 4] : x2;
        const y3 = i !== last ? points[i + 5] : y2;

        const cp1x = x1 + ((x2 - x0) / 6) * tension;
        const cp1y = y1 + ((y2 - y0) / 6) * tension;

        const cp2x = x2 - ((x3 - x1) / 6) * tension;
        const cp2y = y2 - ((y3 - y1) / 6) * tension;

        path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];

        cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
      }

      return path;
    }

    function createPoints(pointsCount, lowLimit, highLimit) {
      const points = [];
      // how many points do we need
      const numPoints = pointsCount;
      // used to equally space each point around the circle
      const angleStep = (Math.PI * 2) / numPoints;
      // the radius of the circle
      var rad = 75;

      for (let i = 1; i <= numPoints; i++) {
        // x & y coordinates of the current point
        rad = randRange(lowLimit, highLimit);
        const theta = i * angleStep;

        const x = Math.round(100 + Math.cos(theta) * rad);
        const y = Math.round((100 + Math.sin(theta) * rad) * aspectRatio);

        // store the point's position
        points.push({
          x: x,
          y: y,
          // we need to keep a reference to the point's original point for when we modulate the values later
          originX: x,
          originY: y,
          // more on this in a moment!
          noiseOffsetX: Math.round(Math.random() * 1000),
          noiseOffsetY: Math.round(Math.random() * 1000),
        });
      }
      return points;
    }

    function randRange(low, high) {
      var newNumber = 75;
      newNumber = Math.random() * (high - low);
      newNumber += low;
      return newNumber;
    }
    function map(n, start1, end1, start2, end2) {
      return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }
    function isValidColor(strColor) {
      var s = new Option().style;
      s.color = strColor;

      // return 'false' if color wasn't assigned
      return s.color == strColor.toLowerCase();
    }
    function animStart() {
      animON = true;
    }
    function animStop() {
      animON = false;
    }

    function init() {
      if (placementBorder == "none") {
        //
      } else if (isValidColor(placementBorder)) {
        localRoot.getElementById("svgBubbleMask").style.border =
          "1px solid " + placementBorder;
      } else {
        localRoot.getElementById("svgBubbleMask").style.border =
          "1px solid red";
      }
      mahPoints = createPoints(pointsCount2, lowLimit2, highLimit2);
      path.setAttribute("d", spline(mahPoints, 1, true));

      animate();
    }

    function animate() {
      path.setAttribute("d", spline(mahPoints, 1, true));

      // for every point...
      for (let i = 0; i < mahPoints.length; i++) {
        const point = mahPoints[i];

        // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
        const nX = noise.simplex2(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise.simplex2(point.noiseOffsetY, point.noiseOffsetY);
        // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
        const x = map(
          nX,
          -1,
          1,
          point.originX - noiseRange,
          point.originX + noiseRange
        );
        const y = map(
          nY,
          -1,
          1,
          point.originY - noiseRange,
          point.originY + noiseRange
        );

        // update the point's current coordinates
        point.x = x;
        point.y = y;

        // progress the point's x, y values through "time"
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }

      tick++;
      // console.log("tick = " + tick);
      if (tick > animEnd) {
        animStop();
      }

      if (animON) {
        requestAnimationFrame(animate);
      }
    }

    const $mediaBlock = this._shadowRoot.getRootNode().host.closest('.media-block__media');
    const $bubble = this._shadowRoot.getRootNode().host.closest('.bubble');

    const $parent = $mediaBlock || $bubble;
    const $pauseAnimationsButtons = this._shadowRoot.getRootNode().host.closest('body').querySelectorAll('.global-pause-animations');

    if ($parent) {
      $parent.addEventListener('mouseover', () => {
        animON = false;
      });

      $parent.addEventListener('mouseout', () => {
        const arrPaused = [];

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

  get renderWidth() {
    if (this.getAttribute("renderWidth")) {
      return Number(this.getAttribute("renderWidth"));
    } else {
      return "100%"; //200;
    }
  }
  get renderHeight() {
    if (this.getAttribute("renderHeight")) {
      return Number(this.getAttribute("renderHeight"));
    } else {
      return "100%"; //200;
    }
  }
  get anim() {
    if (this.getAttribute("anim")) {
      return Number(this.getAttribute("anim"));
    } else {
      return true;
    }
  }
  get animStop() {
    if (this.getAttribute("animStop")) {
      return Number(this.getAttribute("animStop"));
    } else {
      return 18000;
    }
  }
  get speed() {
    if (this.getAttribute("speed")) {
      return Number(this.getAttribute("speed"));
    } else {
      return 0.005;
    }
  }
  /////////////////////// LOOK INTO RANGE ///////////////////////////////////
  ////// currently it skews the center up/left or down/right and touches edge
  get range() {
    if (this.getAttribute("range")) {
      return Number(this.getAttribute("range"));
    } else {
      return 20;
    }
  }
  get numberOfPoints() {
    if (this.getAttribute("numberOfPoints")) {
      return Number(this.getAttribute("numberOfPoints"));
    } else {
      return 6;
    }
  }
  get minRadius() {
    if (this.getAttribute("minRadius")) {
      return Number(this.getAttribute("minRadius"));
    } else {
      return 50;
    }
  }
  get maxRadius() {
    if (this.getAttribute("maxRadius")) {
      return Number(this.getAttribute("maxRadius"));
    } else {
      return 80;
    }
  }

  get imageSrc() {
    if (this.getAttribute("imageSrc")) {
      return this.getAttribute("imageSrc");
    } else {
      return "none";
    }
  }
  ///////////////////////////////////////////////////////
  get placementBorder() {
    if (this.getAttribute("placement-border")) {
      return this.getAttribute("placement-border");
    } else {
      return "none";
    }
  }
}
window.customElements.define("component-bubble-mask", BubbleMask);
