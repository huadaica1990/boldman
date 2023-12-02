/**
 * countDown
 *
 * 
 * @param {String} selector 
 */
const countDownEcs = {
    init: function(selector) {
        if ($.fn.countdown) {
            let startPerformanceTime = performance.now();
            this.core.start(selector);
            let endPerformanceTime = performance.now();
            Ecsgroup.performance.countDown = endPerformanceTime - startPerformanceTime + 'ms';
        }
    },
    core: {
        start: function(selector) {
            Ecsgroup.$(selector).each(function () {
                let label = [],
                    compactLabel = [];
                (!$(this).data('labels-short')) ? label = [] : $(this).data('labels-short').split(", ").forEach(element => label.push(element));
                (!$(this).data('compact-labels')) ? compactLabel = [] : $(this).data('compact-labels').split("|").forEach(element => compactLabel.push(element));
                let $this = $(this),
                    untilDate = $this.data('until'),
                    compact = $this.data('compact'),
                    dateFormat = (!$this.data('format')) ? 'DHMS' : $this.data('format'),
                    newcompactLabel = (!$this.data('compact-labels')) ?
                        [' y', ' m', ' w', ' days, '] :
                        compactLabel,
                    newLabels = (!$this.data('labels-short')) ?
                        ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'] :
                        label;
                let newDate;
                // Split and created again for ie and edge
                if (!$this.data('relative')) {
                    let untilDateArr = untilDate.split(", "), // data-until 2019, 10, 8 - yy,mm,dd
                        newDate = new Date(untilDateArr[0], untilDateArr[1] - 1, untilDateArr[2]);
                } else {
                    newDate = untilDate;
                }
                $this.countdown({
                    until: newDate,
                    expiryText: ' ',
                    format: dateFormat,
                    padZeroes: true,
                    compact: compact,
                    compactLabels: newcompactLabel,
                    timeSeparator: ' : ',
                    labels: newLabels,
                });
            });
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.countDown = function (selector) {
    return c.init(selector);
};
