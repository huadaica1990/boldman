module.exports = grunt => {
    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            maincss: 'styles',
            mainjs: 'styles',
            modules: 'node_modules',
            plugin: 'styles/plugins',
            css: 'styles/pages/css',
            js: 'styles/pages/scripts',
            dest: 'release',
            html: 'templates',
        },
        pug: {
            release: {
                options: {
                    data: {
                        debug: false,
                        pretty: true
                    }
                },
                files: {
                    'ajax/login.html': ['<%= dirs.html %>/ajax/login.pug'],
                    'documentation.html': ['<%= dirs.html %>/documentation.pug'],
                    'example.html': ['<%= dirs.html %>/example.pug'],
                    '404.html': ['<%= dirs.html %>/404.pug'],
                    'comingsoon.html': ['<%= dirs.html %>/comingsoon.pug'],
                    'static.html': ['<%= dirs.html %>/static.pug'],
                    'contact.html': ['<%= dirs.html %>/contact.pug'],

                    'index.html': ['<%= dirs.html %>/menu.pug'],
                    'home.html': ['<%= dirs.html %>/home.pug'],
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: false,
                    lineNumbers: true,
                    update: true,
                },
                files: {
                    '<%= dirs.dest %>/document.css': '<%= dirs.maincss %>/document.scss',
                    '<%= dirs.dest %>/styleckeditor.css': '<%= dirs.css %>/styleckeditor.scss',
                    '<%= dirs.dest %>/safari.css': '<%= dirs.maincss %>/safari.scss',
                    '<%= dirs.dest %>/layout-style.css': '<%= dirs.maincss %>/layout-style.scss',
                    '<%= dirs.dest %>/error-page.css': '<%= dirs.css %>/error-page.scss',
                    '<%= dirs.dest %>/comingsoon-page.css': '<%= dirs.css %>/comingsoon-page.scss',
                    '<%= dirs.dest %>/static-page.css': '<%= dirs.css %>/static-page.scss',

                    '<%= dirs.dest %>/index-page.css': '<%= dirs.css %>/index-page.scss',
                }
            }
        },
        uglify: {
            options: {
              beautify: false
            },
            my_target: {
                files: {
                    // '<%= dirs.dest %>/updateFile.js': [
                    //     '<%= dirs.mainjs %>/modulejs/updateFile.js'
                    // ],
                    // Core
                    '<%= dirs.dest %>/core.min.js': [
                        '<%= dirs.mainjs %>/core.js',
                        '<%= dirs.mainjs %>/modulejs/setTab.js',
                        '<%= dirs.mainjs %>/modulejs/initDropdownAction.js',
                        '<%= dirs.mainjs %>/modulejs/initScrollTopButton.js',
                        '<%= dirs.mainjs %>/modulejs/stickyContent.js',
                        '<%= dirs.mainjs %>/modulejs/scrollDirection.js',
                        // '<%= dirs.mainjs %>/modulejs/marquee.js',
                        '<%= dirs.mainjs %>/modulejs/typeWriter.js',
                        '<%= dirs.mainjs %>/modulejs/initFloatingParallax.js',
                        '<%= dirs.mainjs %>/modulejs/isotopes.js',
                        '<%= dirs.mainjs %>/modulejs/initNavFilter.js',
                        '<%= dirs.mainjs %>/modulejs/ratingTooltip.js',
                        '<%= dirs.mainjs %>/modulejs/cutomizeSelect.js',
                        '<%= dirs.mainjs %>/modulejs/setProgressBar.js',
                        '<%= dirs.mainjs %>/modulejs/accordion.js',
                        '<%= dirs.mainjs %>/modulejs/countDown.js',
                        '<%= dirs.mainjs %>/modulejs/stickySidebar.js',
                        '<%= dirs.mainjs %>/modulejs/zoomImage.js',
                        '<%= dirs.mainjs %>/modulejs/fancyBox.js',
                        '<%= dirs.mainjs %>/modulejs/popup.js',
                        '<%= dirs.mainjs %>/modulejs/initPopup.js',
                        '<%= dirs.mainjs %>/modulejs/countTo.js',
                        '<%= dirs.mainjs %>/modulejs/togglerMake.js',
                        '<%= dirs.mainjs %>/modulejs/miniPopup.js',
                        '<%= dirs.mainjs %>/modulejs/scrollTo.js',
                        // '<%= dirs.mainjs %>/modulejs/pageScrollToId.js',
                        '<%= dirs.mainjs %>/modulejs/preSearch.js',
                        '<%= dirs.mainjs %>/modulejs/readMore.js',
                        '<%= dirs.mainjs %>/modulejs/tableOfContent.js',
                        '<%= dirs.mainjs %>/modulejs/menu.js',
                        '<%= dirs.mainjs %>/modulejs/slider.js',
                        '<%= dirs.mainjs %>/modulejs/sideBar.js',
                        '<%= dirs.mainjs %>/modulejs/shop.js',
                        '<%= dirs.mainjs %>/modulejs/quantityInput.js',
                        '<%= dirs.mainjs %>/modulejs/initSelectMenu.js',
                        '<%= dirs.mainjs %>/modulejs/initCheckBoxMenu.js',
                        '<%= dirs.mainjs %>/modulejs/wishlistAction.js',
                        '<%= dirs.mainjs %>/modulejs/productSingle.js',
                        '<%= dirs.mainjs %>/modulejs/productSinglePage.js',
                        '<%= dirs.mainjs %>/modulejs/uploadFile.js',
                        '<%= dirs.mainjs %>/modulejs/initScrollLoad.js',
                        '<%= dirs.mainjs %>/modulejs/fakeLoadMore.js'
                    ],
                    // Default all page
                    '<%= dirs.dest %>/default.min.js': [
                        '<%= dirs.plugin %>/jquery-validation/jquery.validate.min.js',
                        '<%= dirs.plugin %>/fancybox/fancybox.min.js',
                        '<%= dirs.plugin %>/swiper/swiper.min.js',
                    ],
                    '<%= dirs.dest %>/layout-script.min.js': [
                        '<%= dirs.mainjs %>/layout-script.js',
                    ],
                    // Documentation
                    '<%= dirs.dest %>/document.min.js': [
                        '<%= dirs.dest %>/core.min.js',
                        '<%= dirs.mainjs %>/document.js',
                    ],
                    // Coming soon
                    '<%= dirs.dest %>/comingsoon-page.min.js': [
                        '<%= dirs.plugin %>/jquery.plugin.min.js',
                        '<%= dirs.plugin %>/kbw-countdown/jquery.countdown.min.js',
                        '<%= dirs.dest %>/core.min.js',
                        '<%= dirs.js %>/comingsoon-page.js',
                    ],
                    // Error
                    '<%= dirs.dest %>/error-page.min.js': [
                        '<%= dirs.dest %>/core.min.js',
                        '<%= dirs.js %>/error-page.js',
                    ],
                    // Login
                    '<%= dirs.dest %>/login-page.min.js': [
                        '<%= dirs.js %>/login-page.js',
                    ],
                    // Static page
                    '<%= dirs.dest %>/static-page.min.js': [
                        '<%= dirs.dest %>/core.min.js',
                        '<%= dirs.js %>/static-page.js',
                    ]

                    // Index
                    '<%= dirs.dest %>/index-page.min.js': [
                        '<%= dirs.dest %>/core.min.js',
                        '<%= dirs.js %>/index-page.js',
                    ]
                }
            },
            // my_advanced_target: {
            //     options: {
            //         beautify: false
            //     },
            //     files: [{
            //         expand: true,
            //         cwd: 'styles/modulejs',
            //         src: ['*.js'],
            //         dest: '<%= dirs.dest %>/',
            //         ext: '.min.js'
            //     }]
            // }
        },
        cssmin: {
            options: {
                specialComments: 0
            },
            my_target: {
                files: [{
                    // '<%= dirs.dest %>/fancybox.min.css': [
                    //     '<%= dirs.plugin %>/fancybox/fancybox.css',
                    // ],
                    'icons/customize.min.css': [
                        'icons/customize.css',
                    ],
                    // Main
                    '<%= dirs.dest %>/main.min.css': [
                        '<%= dirs.plugin %>/animate/animate.min.css',
                        '<%= dirs.dest %>/layout-style.css',
                    ],
                    // Default all page
                    '<%= dirs.dest %>/default.min.css': [
                        '<%= dirs.plugin %>/fancybox/fancybox.min.css',
                        '<%= dirs.plugin %>/swiper/swiper.min.css',
                    ],
                    // Documentation
                    '<%= dirs.dest %>/document.min.css': [
                        '<%= dirs.dest %>/document.css',
                    ],
                    // Ckeditor
                    '<%= dirs.dest %>/styleckeditor.min.css': [
                        '<%= dirs.dest %>/main.min.css',
                        '<%= dirs.dest %>/styleckeditor.css',
                    ],
                    // Coming soon
                    '<%= dirs.dest %>/comingsoon-page.min.css': [
                        '<%= dirs.dest %>/comingsoon-page.css',
                    ],
                    // Error
                    '<%= dirs.dest %>/error-page.min.css': [
                        '<%= dirs.dest %>/error-page.css',
                    ],
                    // Static
                    '<%= dirs.dest %>/static-page.min.css': [
                        '<%= dirs.dest %>/static-page.css',
                    ],

                    // Index
                    '<%= dirs.dest %>/index-page.min.css': [
                        '<%= dirs.dest %>/index-page.css',
                    ]
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            pug: {
                files: ['<%= dirs.html %>/*.pug', '<%= dirs.html %>/components/*.pug', '<%= dirs.html %>/variables/*.pug', '<%= dirs.html %>/elements/*.pug', '<%= dirs.html %>/elements/*/*.pug', '<%= dirs.html %>/ajax/*.pug'],
                tasks: ['pug']
            },
            sass: {
                files: ['<%= dirs.css %>/*.scss', '<%= dirs.maincss %>/*.scss', 'styles/components/*.scss', 'styles/config/*.scss', 'styles/elements/*.scss', 'styles/base/*.scss', 'styles/base/footer/*.scss', 'styles/base/header/*.scss'],
                tasks: ['sass']
            },
            cssmin: {
                files: ['icons/*.css','<%= dirs.css %>/*.scss', '<%= dirs.maincss %>/*.scss', 'styles/components/*.scss', 'styles/config/*.scss', 'styles/elements/*.scss', 'styles/base/*.scss', 'styles/base/footer/*.scss', 'styles/base/header/*.scss'],
                tasks: ['cssmin']
            },
            uglify: {
                files: ['<%= dirs.js %>/*.js', '<%= dirs.mainjs %>/*.js','styles/modulejs/*.js'],
                tasks: ['uglify']
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= dirs.dest %>/*.css',
                        '*.html',
                        '<%= dirs.dest %>/*.js',
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                },
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['browserSync', 'watch']);
};