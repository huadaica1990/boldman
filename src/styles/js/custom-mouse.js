    function lt() {
        if (t("body").hasClass("custom-cursor")) {
            const i = document.querySelector(".circle-cursor-inner")
              , n = document.querySelector(".circle-cursor-outer");
            let o, s = 0, a = !1;
            function e() {
                n.style.transition = null,
                n.style.width = null,
                n.style.height = null,
                n.style.marginLeft = null,
                n.style.marginTop = null,
                a = !1
            }
            window.onmousemove = function(e) {
                a || (n.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)"),
                i.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px)",
                o = e.clientY,
                s = e.clientX,
                t(e.target).is("iframe") ? (n.style.visibility = "hidden",
                i.style.visibility = "hidden") : (n.style.visibility = "visible",
                i.style.visibility = "visible")
            }
            ,
            t("body").on("mouseenter", "a, .cursor-as-pointer", function() {
                i.classList.add("cursor-link-hover"),
                n.classList.add("cursor-link-hover")
            }),
            t("body").on("mouseleave", "a, .cursor-as-pointer", function() {
                t(this).is("a") && t(this).closest(".cursor-as-pointer").length || (i.classList.remove("cursor-link-hover"),
                n.classList.remove("cursor-link-hover"))
            }),
            t("body").on("mouseenter", "[data-cursor-class]", function() {
                const e = t(this).attr("data-cursor-class");
                -1 != e.indexOf("dark-color") && (i.classList.add("dark-color"),
                n.classList.add("dark-color")),
                -1 != e.indexOf("cursor-link") && (i.classList.add("cursor-link"),
                n.classList.add("cursor-link"))
            }),
            t("body").on("mouseleave", "[data-cursor-class]", function() {
                const e = t(this).attr("data-cursor-class");
                -1 != e.indexOf("dark-color") && (i.classList.remove("dark-color"),
                n.classList.remove("dark-color")),
                -1 != e.indexOf("cursor-link") && (i.classList.remove("cursor-link"),
                n.classList.remove("cursor-link"))
            }),
            t("body").on("mouseenter", ".cursor-magnet, .icon-button", function() {
                const e = t(this)
                  , i = window.pageYOffset || document.documentElement.scrollTop;
                n.style.transition = "all .2s ease-out",
                n.style.transform = "translate(" + e.offset().left + "px, " + (e.offset().top - i) + "px)",
                n.style.width = e.width() + "px",
                n.style.height = e.height() + "px",
                n.style.marginLeft = 0,
                n.style.marginTop = 0,
                a = !0
            }),
            t("body").on("mouseleave", ".cursor-magnet, .icon-button", e),
            t("body").on("ohio:cursor_mouseleave", function() {
                e(),
                n.style.transform = i.style.transform,
                i.classList.remove("cursor-link-hover"),
                n.classList.remove("cursor-link-hover")
            }),
            t("body").on("mouseenter", "iframe", function() {
                n.style.visibility = "hidden",
                i.style.visibility = "hidden"
            }),
            i.style.visibility = "visible",
            n.style.visibility = "visible"
        }
    }