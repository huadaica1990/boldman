/**
 * allowCopy
 *
 * Register events for allow copy
 * 
 */
const allowCopyEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start();
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.allowCopy = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function() {
            document.addEventListener('copy', event => {
                let value = window.getSelection().toString();
                if(value.length > 255) {
                    value = value.substring(0, 255) + ' ...';
                }
                event.clipboardData.setData('text/plain', value + '\n\n' + copyRight);
            })
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.allowCopy = function () {
    return allowCopyEcs.init();
};