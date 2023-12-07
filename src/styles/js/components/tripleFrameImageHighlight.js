/**
 * Ecsgroup Triple Frame Image Highlight
 * 
 */
const tripleFrameImageEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.start(selector);
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.tripleFrameImage = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        start: function(selector) {
            var s, r, m, l, f, e = Ecsgroup.$(selector);
            e.length && (s = function (e, n, t) {
                e.css("z-index", 30),
                    n.css("z-index", 20),
                    t.css("z-index", 20)
            },
                r = function (e, n) {
                    e.find('div[class*="trigger"]').width(Math.round(n.position().left))
                },
                m = function (e, n) {
                    var t = e.find(".image-l"),
                        a = e.find(".image-r"),
                        e = e.find(".image-c"),
                        n = n.position().left + window.innerWidth / 12.5;
                    t.css({
                        visibility: "visible",
                        transform: "matrix(.68,0,0,.68,-" + n + ",0)"
                    }),
                        a.css({
                            visibility: "visible",
                            transform: "matrix(.68,0,0,.68," + n + ",0)"
                        }),
                        e.css({
                            transform: "matrix(1, 0, 0, 1, 0, 0)"
                        })
                },
                l = function (e, n, t) {
                    var a, o, d;
                    e.data("animating", !0),
                        "left" == t ? (a = e.find(".image-l"),
                            o = e.find(".image-c"),
                            (d = e.find(".image-r")).removeClass("image-r").addClass("image-l"),
                            o.removeClass("image-c").addClass("image-r"),
                            a.removeClass("image-l").addClass("image-c")) : (a = e.find(".image-r"),
                                o = e.find(".image-c"),
                                (d = e.find(".image-l")).removeClass("image-l").addClass("image-r"),
                                o.removeClass("image-c").addClass("image-l"),
                                a.removeClass("image-r").addClass("image-c")),
                        d.css({
                            "z-index": 15,
                            transition: "transform .5s, transform-origin .5s"
                        }),
                        o.css({
                            "z-index": 25,
                            transition: "transform 1s cubic-bezier(0.19, 1, 0.22, 1) .2s"
                        }),
                        a.css({
                            "z-index": 20,
                            transition: "transform .75s cubic-bezier(0.86, 0, 0.07, 1) .5s"
                        }),
                        e.find("a").css("pointer-events", "none"),
                        setTimeout(function () {
                            e.find("a").css("pointer-events", "auto"),
                                s(a, d, o)
                        }, 500),
                        a.one(Ecsgroup.transitionEnd, function () {
                            e.data("animating", !1),
                                clearInterval(e.data("autoplay")),
                                e.data("autoplay", setInterval(function () {
                                    f(e, n)
                                }, 3e3))
                        })
                },
                f = function (e, n, t) {
                    var a, o = !1;
                    if (void 0 !== t)
                        switch (t.target.className) {
                            case "image-left-trigger":
                                a = "left";
                                break;
                            case "image-right-trigger":
                                a = "right";
                                break;
                            case "image-link":
                                e.data("animating", !(o = !0)),
                                    clearInterval(e.data("autoplay"))
                        }
                    else
                        a = "right";
                    o || (l(e, n, a),
                        m(e, n))
                },
                e.each(function () {
                    var e, n, t = $(this),
                        a = t.find(".image-inner"), o =
                            t.find(".centered-image-holder"),
                        d = t.find(".left-image-holder"),
                        i = t.find(".right-image-holder");
                    t.data("animating", !1).data("autoplay", !1),
                        e = d,
                        n = i,
                        o.addClass("image-c"),
                        e.addClass("image-l"),
                        n.addClass("image-r"),
                        s(o, d, i),
                        r(t, a),
                        m(t, a),
                        t.data("autoplay", setInterval(function () {
                            f(t, a)
                        }, 3e3))
                    t.on("click", function (e) {
                        t.data("animating") || (clearInterval(t.data("autoplay")),
                            f(t, a, e))
                    }),
                        t.parent().hasClass("triple-with-nav") && (d = t.parent().find(".triple-left"),
                            i = t.parent().find(".triple-right"),
                            d.on("click", function () {
                                t.data("animating") || (l(t, a, "left"),
                                    m(t, a))
                            }),
                            i.on("click", function () {
                                t.data("animating") || (l(t, a, "right"),
                                    m(t, a))
                            })),
                        $(window).on("resize", function () {
                            m(t, a),
                                r(t, a),
                                a.find(">div").css("transition", "none")
                        })
            }))
        },
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.tripleFrameImage = function (selector) {
    return tripleFrameImageEcs.init(selector);
};

Ecsgroup.tripleFrameImage = function (selector) {
};

/*HTML
.main-slider-body
    .triple-frame-image-highlight
        .image-inner
            .image-holder.centered-image-holder
                .image-frame
                    a.image-link
                        img.centered-image(src='https://foton.qodeinteractive.com/wp-content/uploads/2018/07/home-7-img-5.jpg')
            .image-holder.left-image-holder
                .image-frame
                    a.image-link
                        img.left-image(src='https://foton.qodeinteractive.com/wp-content/uploads/2018/06/saas-slajder-2.jpg')
            .image-holder.right-image-holder
                .image-frame
                    a.image-link
                        img.right-centered-image(src='https://foton.qodeinteractive.com/wp-content/uploads/2018/06/saas-slajder-3.jpg')
        .image-left-trigger
        .image-right-trigger
CSS
.triple-frame-image-highlight {
    max-width: 100%;
    position: relative;
    .image-inner {
        max-width: 70%;
        margin: 0 auto;
        position: relative;
        display: inline-block;
    }
    .image-holder {
        display: inline-block;
        transition: transform .4s cubic-bezier(.86,0,.07,1);
        box-shadow: 0 10px 30px 0 rgba(137,173,255,.45);
        border-radius: .5rem;
        overflow: hidden;
    }
    .centered-image-holder {
      position: relative;
      z-index: 10;
      transform: scale(.7);
    }
    .left-image-holder, 
    .right-image-holder {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        visibility: hidden;
        transition: transform 1s cubic-bezier(.19,1,.22,1) .2s,transform-origin 1s cubic-bezier(.19,1,.22,1) .2s,visibility 0s .2s;
    }
}
*/