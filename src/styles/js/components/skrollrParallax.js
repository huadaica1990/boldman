Ecsgroup.skrollrParallax = function () {
    if (Ecsgroup.isMobile) {
        return;
    }
    if (typeof skrollr == 'undefined') {
        return;
    }
    if (Ecsgroup.$('.skrollable').length) {
        skrollr.init({
            forceHeight: false
        });
    }
}