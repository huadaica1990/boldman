/**
 * Detect Scroll Direction
 * 
 * @param {String} selector
 * @param {String} classname
 */
const scrollDirectionEcs = {
    init: function(selector, classname) {
        let startPerformanceTime = performance.now();
        this.core.start(selector, classname);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.scrollDirection = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function (selector, classname){
            let $this = Ecsgroup.$(selector),
            //set scrolling variables
            scrolling = false,
            dHeight = $(document).height(),
            wHeight = Ecsgroup.$window.height(),
            elClassHidden = classname,
            previousTop = 0,
            currentTop = 0,
            scrollDelta = 10,
            scrollOffset = 150;
            Ecsgroup.$window.on('scroll', function () {
                if (!scrolling) {
                    scrolling = true;
                    (!window.requestAnimationFrame)
                        ? setTimeout(autoHideHeader, 250)
                        : requestAnimationFrame(autoHideHeader);
                }
            });
            function autoHideHeader() {
                var currentTop = Ecsgroup.$window.scrollTop();
                checkSimpleNavigation(currentTop)
                previousTop = currentTop;
                scrolling = false;
            }
            function checkSimpleNavigation(currentTop) {
                if (previousTop - currentTop > scrollDelta || previousTop == 0) {
                    //if scrolling up...
                    $this.removeClass(elClassHidden);
                }
                else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                    //if scrolling down...
                    $this.addClass(elClassHidden);
                    if (currentTop + wHeight + 200 >= dHeight && $this.hasClass(elClassHidden)) {
                        $this.removeClass(elClassHidden);
                    }
                    // else {
                    //     $this.addClass(elClassHidden);
                    // }
                }
            }
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.scrollDirection = function (selector, classname) {
    return scrollDirectionEcs.init(selector, classname);
}