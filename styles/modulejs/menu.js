/**
 * Ecsgroup Menu Plugins
 */

// Private members
var hideMobileAllSubMenu = function (e) {
    $('#nav-mobile-content .show').removeClass('show');
    $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300').parent().removeClass('.show');
    $('#nav-mobile-content .scrollnotable').removeClass('scrollnotable');
};
var hideMobileSubMenu = function (e) {
    $(this).closest('.has-submenu').removeClass('show');
    $(this).closest('.scrollnotable').removeClass('scrollnotable');
};
var hideMobileSearch = function (e) {
    $(this).removeClass('show');
    $("#fb-root").show();
    $('.search-overwrap').removeClass('show');
    Ecsgroup.$body.removeClass('msearch-active');
};
var hideChat = function (e) {
    $("#chat-scroll-block").removeClass('show');
};
var showMobileMenu = function (e) {
    //$(this).addClass('show');
    hideMobileAllSubMenu();
    hideMobileSearch();
    Ecsgroup.$body.addClass('mmenu-active');
    $("#fb-root").hide();
    e.preventDefault();
};
var toggleMobileMenu = function (e) {
    $(this).toggleClass('show');
    hideMobileAllSubMenu();
    hideMobileSearch();
    Ecsgroup.$body.toggleClass('mmenu-active');
    $("#fb-root").hide();
    e.preventDefault();
};
var hideMobileMenu = function (e) {
    //$(this).removeClass('show');
    $('.mobile-menu-btn').removeClass('show');
    $('#nav-mobile-content .show').removeClass('show');
    $('#nav-mobile-content .collapse-menu > .submenu').slideUp('300');
    $("#fb-root").show();
    setTimeout(function () {
        Ecsgroup.$body.removeClass('mmenu-active');
    }, 150);
    e.preventDefault();
};
var showMobileSubMenu = function (e) {
    $(this).closest('.submenu').addClass('scrollnotable');
    $(this).closest('.has-submenu').addClass('show');
    e.preventDefault();
};
var showMobileSearch = function (e) {
    Ecsgroup.lazyLoad('#nav-mobile-search', true);
    $(this).addClass('show');
    $('.mobile-menu-btn').removeClass('show');
    Ecsgroup.$body.addClass('msearch-active');
    $("#fb-root").hide();
    e.preventDefault();
    // setTimeout(function(){
    //     $('#nav-mobile-search input[type="search"]').focus();
    //  }, 300);
};
var showChat = function (e) {
    $('#chat-scroll-block').addClass('show');
    $('body').append('<div class="chat-scroll-backdrop chat-scroll-close show"></div>')
};

/**
 * Init Menu
 */
var Menu = {
    init: function () {
        this.initMenu();
        this.initCategoryMenu();
        this.initMobileMenu();
        this.initMobileSearch();
        this.initFilterMenu();
        this.initCollapsibleWidget();
        this.initShowChat();
    },
    initMenu: function () {
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
                if (offset > 0) {
                    targetMain.addClass('right');
                }
                else {
                    targetMain.removeClass('right');
                }
            });
        };
        // setup menu
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
        // calc megamenu position
        Ecsgroup.$window.on('resize', function () {
            calcPos();
            calcWidth();
            // $('#nav-pc .megamenu').each(function () {
            //     var $this = $(this),
            //         left = $this.offset().left,
            //         outerWidth = $this.outerWidth(),
            //         offset = (left + outerWidth) - (window.innerWidth - 20),
            //         containerPage = $('.container').width();
            //     if (offset > 0 && left > 20) {
            //         $this.css('margin-left', -offset);
            //     }
            // });
        });
    },
    initCategoryMenu: function () {
        function calcPos() {
            $('#nav-sidebar .submenu').each(function () {
                let $this = $(this),
                    targetParent = $this.closest('.level0'),
                    targetMain = $this.closest('.level1'),
                    top = $this.offset().top,
                    outerHeight = $this.outerHeight(),
                    offset = (top + outerHeight) - window.innerHeight;
                if (offset > 0) {
                    targetParent.addClass('top');
                    targetMain.addClass('top');
                }
                else {
                    targetParent.removeClass('top');
                    targetMain.addClass('top');
                }
            });
        };
        calcPos();
        // category dropdown menu
        var $menu = $('#nav-sidebar');
        if ($menu.length) {
            var $box = $menu.find('.dropdown-box');

            if ($box.length) {
                var top = $('.main').offset().top + $box[0].offsetHeight;

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
            //     var sidebar = Ecsgroup.byClass('sidebar');
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
    initMobileMenu: function () {
        $('#nav-mobile-content .mobile-menu .submenu-btn').on('click', showMobileSubMenu);
        $('#nav-mobile-content .mobile-menu .submenu-btn-close').on('click', hideMobileSubMenu);
        $('#nav-mobile-content .mobile-menu .toggle-btn').on('click', function (e) {
            $(this).toggleClass('show');
            $(this).parent().next().slideToggle(300).parent().addClass('.show');
            e.preventDefault();
        });
        $('.mobile-menu-toggle').on('click', toggleMobileMenu);
        $('.mobile-menu-overlay').on('click', hideMobileMenu);
        $('.mobile-menu-close').on('click', hideMobileMenu);
        $('.mobile-menu-open').on('click', showMobileMenu);
        Ecsgroup.$window.on('resize', hideMobileMenu);
    },
    initMobileSearch: function () {
        $('.mobile-search-toggle').on('click', showMobileSearch);
        $('.mobile-search-toggle-close').on('click', hideMobileSearch);
    },
    initFilterMenu: function () {
        $('.search-ul li').each(function () {
            if (this.lastElementChild && this.lastElementChild.tagName === 'UL') {
                var i = document.createElement('i');
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
    initCollapsibleWidget: function () {
        // Add toggle span
        // $('.collapsible .collapsible-title').each(function () {
        //     var span = document.createElement('span');
        //     span.className = 'toggle-btn';
        //     this.appendChild(span);
        // });

        // Slide Toggle
        $('.collapsible .toggle-btn').on('click', function (e) {
            var $this = $(this).parent(),
                $body = $this.siblings('.collapsible-body');

            $this.hasClass('collapsed') || $body.css('display', 'block');

            if (Ecsgroup.isMobile) $body.stop().toggle();
            else $body.stop().slideToggle(100);
            $this.toggleClass('collapsed');
            // if collapsible widget exists in sticky sidebar
            setTimeout(function () {
                $('.sticky-sidebar').trigger('recalc.pin');
            }, 300);
        });
    },
    initShowChat: function () {
        $('.btn-show-chat').on('click', showChat);
        
        Ecsgroup.$body.on('click', '.chat-scroll-close', function (e) {
            $('#chat-scroll-block').removeClass('show');
            $(this).remove();
        });
        
        // Ecsgroup.$body.on('click', function (e) {
        //     if (!$(e.target).is('.ishow')) {
        //         $("#chat-scroll-block").removeClass('show');
        //     }
        // })
    }
}
Ecsgroup.menu = Menu;