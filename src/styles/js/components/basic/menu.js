/**
 * Ecsgroup Menu Plugins
 */
const menuEcs = {
    init: function() {
        let startPerformanceTime = performance.now();
        this.core.collapsibleWidget();
        this.core.menu();
        this.core.mobileMenu();
        if (document.getElementById("#nav-mobile-search") != null) this.core.mobileSearch();
        this.core.categoryMenu();
        this.core.filterMenu();
        this.core.showChat();
        let endPerformanceTime = performance.now();
        Ecsgroup.performance.menu = endPerformanceTime - startPerformanceTime + 'ms';
    },
    core: {
        collapsibleWidget: function() {
            $('.collapsible .toggle-btn').on('click', function (e) {
                let $this = $(this).parent(),
                    $body = $this.siblings('.collapsible-body');
                $this.hasClass('collapsed') || $body.css('display', 'block');
                if (Ecsgroup.isMobile) $body.stop().toggle();
                else $body.stop().slideToggle(100);
                $this.toggleClass('collapsed');
                setTimeout(function () {
                    $('.sticky-sidebar').trigger('recalc.pin');
                }, 300);
            });
        },
        menu: function() {
            function calcWidth() {
                $('#nav-pc .megamenu').each(function () {
                    let $this = $(this),
                        navSidebar = $('#nav-sidebar').outerWidth(),
                        containerPage = $this.closest('.nav-wrapper').width() - 30,
                        widthMegamenu = containerPage - navSidebar;
                    $this.css('width', widthMegamenu + 'px');
                });
            };
            function calcPos() {
                $('#nav-pc .submenu').each(function () {
                    let $this = $(this),
                        targetMain = $this.closest('.level1'),
                        left = $this.offset().left + 30,
                        outerWidth = $this.outerWidth(),
                        offset = (left + outerWidth) - window.innerWidth;
                    if (offset > 0) targetMain.addClass('right');
                    else targetMain.removeClass('right');
                });
            };

            $('#nav-pc .menu li').each(function () {
                if (this.lastElementChild && (
                    this.lastElementChild.tagName === 'UL' ||
                    this.lastElementChild.classList.contains('megamenu')) &&
                    !$(this).parent().hasClass('megamenu')
                ) {
                    this.classList.add('has-submenu');
                    !this.lastElementChild.classList.contains('megamenu') && this.lastElementChild.classList.add('submenu');
                }
            });
            calcPos();
            calcWidth();
            Ecsgroup.$window.on('resize', function () {
                calcPos();
                calcWidth();
            });
        },
        mobileMenu: function() {
            $('#nav-mobile-content .submenu-btn').on('click', menuEcs.methods.showMobileSubMenu);
            $('#nav-mobile-content .submenu-btn-close').on('click', menuEcs.methods.hideMobileSubMenu);
            $('#nav-mobile-content .toggle-btn').on('click', function (e) {
                $(this).toggleClass('show');
                $(this).parent().next().slideToggle(300).parent().addClass('.show');
                e.preventDefault();
            });
            $('.mobile-menu-toggle').on('click', menuEcs.methods.toggleMobileMenu);
            $('.mobile-menu-overlay').on('click', menuEcs.methods.hideMobileMenu);
            $('.mobile-menu-close').on('click', menuEcs.methods.hideMobileMenu);
            $('.mobile-menu-open').on('click', menuEcs.methods.showMobileMenu);
            Ecsgroup.$window.on('resize', menuEcs.methods.hideMobileMenu);
        },
        mobileSearch: function() {
            $('.mobile-search-btn-toggle').on('click', menuEcs.methods.showMobileSearch);
            $('.mobile-search-btn-close').on('click', menuEcs.methods.hideMobileSearch);
        },
        categoryMenu: function() {
            function calcPos() {
                $('#nav-sidebar .submenu').each(function () {
                    let $this = $(this),
                        targetParent = $this.closest('.level0'),
                        targetMain = $this.closest('.level1'),
                        top = $this.offset().top,
                        outerHeight = $this.outerHeight(),
                        offset = (top + outerHeight) - window.innerHeight;
                    if (offset > 0) $this.addClass('right');
                    else $this.removeClass('right');
                });
            };
            calcPos();
            let $menu = $('#nav-sidebar');
            if ($menu.length) {
                let $box = $menu.find('.dropdown-box');
                if ($box.length) {
                    let top = $('.main').offset().top + $box[0].offsetHeight;
                    if (window.pageYOffset <= top || window.innerWidth < 992) {
                        $menu.removeClass('show');
                    }
                    window.addEventListener('scroll', function () {
                        if (window.pageYOffset <= top && window.innerWidth >= 992) {
                            $menu.removeClass('show');
                        }
                    }, { passive: true });
                    $('.category-toggle').on("click", function (e) {
                        e.preventDefault();
                    });
                    $menu.on("mouseover", function (e) {
                        if ($menu.hasClass('menu-fixed') && window.pageYOffset > top && window.innerWidth >= 992) {
                            $menu.addClass('show');
                        } else if (!$menu.hasClass('menu-fixed') && window.innerWidth >= 992) {
                            $menu.addClass('show');
                        }
                    })
                    $menu.on("mouseleave", function (e) {
                        if ($menu.hasClass('menu-fixed') && window.pageYOffset > top && window.innerWidth >= 992) {
                            $menu.removeClass('show');
                        } else if (!$menu.hasClass('menu-fixed') && window.innerWidth >= 992) {
                            $menu.removeClass('show');
                        }
                    })
                }
                // if ($menu.hasClass('with-sidebar')) {
                //     let sidebar = Ecsgroup.byClass('sidebar');
                //     if (sidebar.length) {
                //         $menu.find('.dropdown-box').css('width', sidebar[0].offsetWidth - 20);

                //         // set category menu's width same as sidebar.
                //         Ecsgroup.$window.on('resize', function () {
                //             $menu.find('.dropdown-box').css('width', (sidebar[0].offsetWidth - 20));
                //         });
                //     }
                // }
            };
            Ecsgroup.$window.on('resize', function () {
                calcPos();
            });
        },
        filterMenu: function() {
            $('.search-ul li').each(function () {
                if (this.lastElementChild && this.lastElementChild.tagName === 'UL') {
                    let i = document.createElement('i');
                    i.className = "la la-angle-down";
                    this.classList.add('with-ul');
                    this.firstElementChild.appendChild(i);
                }
            });
            $('.with-ul > a i').on('click', function (e) {
                $(this).parent().next().slideToggle(300).parent().toggleClass("show");
                e.preventDefault();
            });
        },
        showChat: function() {
            $('.btn-show-chat').on('click', menuEcs.methods.showChat);
            Ecsgroup.$body.on('click', '.chat-scroll-close', function (e) {
                $('#chat-scroll-block').removeClass('show');
                $(this).remove();
            });
        },
    },
    methods: {
        toggleMobileMenu: function(e) {
            $(this).toggleClass('show');
            menuEcs.methods.hideMobileAllSubMenu();
            menuEcs.methods.hideMobileSearch();
            Ecsgroup.$body.toggleClass('mmenu-active');
            $("#fb-root").hide();
            e.preventDefault();
        },
        showMobileMenu: function() {
            menuEcs.methods.hideMobileAllSubMenu();
            menuEcs.methods.hideMobileSearch();
            Ecsgroup.$body.addClass('mmenu-active');
            $("#fb-root").hide();
            e.preventDefault();
        },
        hideMobileMenu: function(e) {
            $('.mobile-menu-btn').removeClass('show');
            $('#nav-mobile-content .show').removeClass('show');
            $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300');
            $("#fb-root").show();
            setTimeout(function () {
                Ecsgroup.$body.removeClass('mmenu-active');
            }, 150);
            e.preventDefault();
        },

        showMobileSubMenu: function(e) {
            $(this).closest('.submenu').addClass('scrollnotable');
            $(this).closest('.has-submenu').addClass('show');
            e.preventDefault();
        },
        hideMobileSubMenu: function() {
            $(this).closest('.has-submenu').removeClass('show');
            $(this).closest('.scrollnotable').removeClass('scrollnotable');
        },
        hideMobileAllSubMenu: function() {
            $('#nav-mobile-content .show').removeClass('show');
            $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300').parent().removeClass('.show');
            $('#nav-mobile-content .scrollnotable').removeClass('scrollnotable');
        },

        showMobileSearch: function(e) {
            Ecsgroup.lazyLoad('#nav-mobile-search', true);
            $(this).addClass('show');
            $('.mobile-menu-btn').removeClass('show');
            Ecsgroup.$body.addClass('msearch-active');
            $("#fb-root").hide();
            e.preventDefault();
        },
        hideMobileSearch: function() {
            $(this).removeClass('show');
            $("#fb-root").show();
            $('.search-overwrap').removeClass('show');
            Ecsgroup.$body.removeClass('msearch-active');
        },
        
        showChat: function() {
            $('#chat-scroll-block').addClass('show');
            $('body').append('<div class="chat-scroll-backdrop chat-scroll-close show"></div>')
        },
        hideChat: function() {
            $("#chat-scroll-block").removeClass('show');
        }
    },
    plugins: {},
    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
};
Ecsgroup.menu = menuEcs.init();
