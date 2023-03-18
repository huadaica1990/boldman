module.exports = grunt => {
    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            js: 'src/styles/js/pages',
            basejs: 'src/styles/js',
            css: 'src/styles/css/pages',
            plugin: 'src/styles/plugins',
            html: 'src/templates',
            dist: 'dist/wwwroot/templates',
        },
        clean: ['dist'],
        pug: {
            release: {
                options: {
                    data: {
                        debug: false,
                        pretty: true
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.html %>/',
                        src: '*.pug',
                        ext: '.html',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.html %>/ajax/',
                        src: '*.pug',
                        ext: '.html',
                        dest: 'dist/ajax/',
                    }
                ]
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
                files: [
                    {
                        flatten: true,
                        expand: true,
                        cwd: 'src/styles/css/',
                        src: ['*.scss', 'pages/*.scss'],
                        ext: '.css',
                        dest: '<%= dirs.dist %>/release/'
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                // We need to `freeze` browsers versions for testing purposes.
                browsers: ['last 5 versions', 'opera 12', 'ff 15', 'chrome 25', 'iOS 13.2', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: false,
                flatten: false,
                src: '<%= dirs.dist %>/release/*.css',
            },
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    '<%= dirs.dist %>/release/core.js': '<%= dirs.basejs %>/core.js',
                    '<%= dirs.dist %>/release/layout.js': '<%= dirs.basejs %>/layout.js',
                    '<%= dirs.dist %>/release/document.js': '<%= dirs.basejs %>/document.js',

                    '<%= dirs.dist %>/release/comingsoon.js': '<%= dirs.js %>/comingsoon.js',
                    '<%= dirs.dist %>/release/error.js': '<%= dirs.js %>/error.js',
                    '<%= dirs.dist %>/release/login.js': '<%= dirs.js %>/login.js',
                    '<%= dirs.dist %>/release/static.js': '<%= dirs.js %>/static.js',
                    '<%= dirs.dist %>/release/index.js': '<%= dirs.js %>/index.js',
                }
            }
        },
        uglify: {
            options: {
                beautify: false
            },
            my_target: {
                files: {
                    // '<%= dirs.dist %>/updateFile.js': [
                    //     '<%= dirs.basejs %>/components/updateFile.js'
                    // ],
                    // Ext
                    '<%= dirs.dist %>/release/lang.min.js': [
                        '<%= dirs.plugin %>/multi-language/multi-language.js',
                        '<%= dirs.plugin %>/lang.js'
                    ],
                    '<%= dirs.dist %>/release/webfontloader.min.js': [
                        'node_modules/webfontloader/webfontloader.js',
                    ],
                    '<%= dirs.dist %>/release/jquery.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                    ],
                    '<%= dirs.dist %>/release/instantpage.min.js': [
                        '<%= dirs.plugin %>/instantpage/instantpage.js',
                    ],
                    // Core
                    '<%= dirs.dist %>/release/core.min.js': [
                        // core
                        '<%= dirs.dist %>/release/core.js',
                        '<%= dirs.basejs %>/components/setTab.js',
                        '<%= dirs.basejs %>/components/initDropdownAction.js',
                        '<%= dirs.basejs %>/components/initScrollTopButton.js',
                        '<%= dirs.basejs %>/components/stickyContent.js',
                        '<%= dirs.basejs %>/components/scrollDirection.js',
                        '<%= dirs.basejs %>/components/cutomizeSelect.js',
                        '<%= dirs.basejs %>/components/accordion.js',
                        '<%= dirs.basejs %>/components/stickySidebar.js',
                        '<%= dirs.basejs %>/components/zoomImage.js',
                        '<%= dirs.basejs %>/components/fancyBox.js',
                        '<%= dirs.basejs %>/components/popup.js',
                        '<%= dirs.basejs %>/components/initPopup.js',
                        '<%= dirs.basejs %>/components/miniPopup.js',
                        '<%= dirs.basejs %>/components/togglerMake.js',
                        '<%= dirs.basejs %>/components/scrollTo.js',
                        '<%= dirs.basejs %>/components/menu.js',
                        '<%= dirs.basejs %>/components/slider.js',
                        '<%= dirs.basejs %>/components/sideBar.js',
                        '<%= dirs.basejs %>/components/draggAble.js',
                        // Acc
                        '<%= dirs.basejs %>/components/initScrollLoad.js',
                        // Content
                        '<%= dirs.basejs %>/components/readMore.js',
                        '<%= dirs.basejs %>/components/tableOfContent.js',
                        '<%= dirs.basejs %>/components/uploadFile.js',
                        // Product
                        '<%= dirs.basejs %>/components/shop.js',
                        '<%= dirs.basejs %>/components/quantityInput.js',
                        '<%= dirs.basejs %>/components/initSelectMenu.js',
                        '<%= dirs.basejs %>/components/initCheckBoxMenu.js',
                        '<%= dirs.basejs %>/components/initSelectSideBar.js',
                        '<%= dirs.basejs %>/components/wishlistAction.js',
                        '<%= dirs.basejs %>/components/productSingle.js',
                        '<%= dirs.basejs %>/components/productSinglePage.js',
                        // '<%= dirs.basejs %>/components/ratingTooltip.js',
                        // Plugin
                        // '<%= dirs.basejs %>/components/marquee.js',
                        // '<%= dirs.basejs %>/components/pageScrollToId.js',
                        '<%= dirs.basejs %>/components/preSearch.js',
                        '<%= dirs.basejs %>/components/typeWriter.js',

                        '<%= dirs.basejs %>/components/initFloatingParallax.js',
                        '<%= dirs.basejs %>/components/isotopes.js',
                        '<%= dirs.basejs %>/components/initNavFilter.js',

                        '<%= dirs.basejs %>/components/setProgressBar.js',
                        '<%= dirs.basejs %>/components/countDown.js',
                        '<%= dirs.basejs %>/components/countTo.js',
                        '<%= dirs.basejs %>/components/fakeLoadMore.js',
                        '<%= dirs.basejs %>/components/notiCustomer.js',
                        '<%= dirs.basejs %>/components/ezParallax.js',
                        '<%= dirs.basejs %>/components/mouseFollow.js'
                    ],
                    // Default all page
                    '<%= dirs.dist %>/release/default.min.js': [
                        'node_modules/draggabilly/dist/draggabilly.pkgd.min.js',
                        'node_modules/jquery-validation/dist/jquery.validate.min.js',
                        '<%= dirs.plugin %>/fancybox/fancybox.min.js',
                        'node_modules/swiper/swiper-bundle.js',
                    ],
                    '<%= dirs.dist %>/release/layout.min.js': [
                        '<%= dirs.dist %>/release/layout.js',
                    ],
                    // Documentation
                    '<%= dirs.dist %>/release/document.min.js': [
                        '<%= dirs.dist %>/release/core.min.js',
                        '<%= dirs.dist %>/release/document.js',
                    ],
                    // Coming soon
                    '<%= dirs.dist %>/release/comingsoon.min.js': [
                        'node_modules/kbw-countdown/dist/js/jquery.plugin.min.js',
                        'node_modules/kbw-countdown/dist/js/jquery.countdown.min.js',
                        '<%= dirs.dist %>/release/core.min.js',
                        '<%= dirs.dist %>/release/comingsoon.js',
                    ],
                    // Error
                    '<%= dirs.dist %>/release/error.min.js': [
                        '<%= dirs.dist %>/release/core.min.js',
                        '<%= dirs.dist %>/release/error.js',
                    ],
                    // Login
                    '<%= dirs.dist %>/release/login.min.js': [
                        '<%= dirs.dist %>/release/login.js',
                    ],
                    // Static page
                    '<%= dirs.dist %>/release/static.min.js': [
                        '<%= dirs.dist %>/release/core.min.js',
                        '<%= dirs.dist %>/release/static.js',
                    ],

                    // Index
                    '<%= dirs.dist %>/release/index.min.js': [
                        '<%= dirs.dist %>/release/core.min.js',
                        '<%= dirs.dist %>/release/index.js',
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
            //         dest: '<%= dirs.dist %>/',
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
                    '<%= dirs.dist %>/icons/customize.min.css': [
                        'src/icons/customize.css',
                    ],
                    // Main
                    '<%= dirs.dist %>/release/main.min.css': [
                        '<%= dirs.plugin %>/animate/animate.min.css',
                        '<%= dirs.dist %>/release/layout.css',
                    ],
                    // Default all page
                    '<%= dirs.dist %>/release/default.min.css': [
                        '<%= dirs.plugin %>/fancybox/fancybox.min.css',
                        'node_modules/swiper/swiper-bundle.min.css',
                    ],
                    // Documentation
                    '<%= dirs.dist %>/release/document.min.css': [
                        '<%= dirs.dist %>/release/document.css',
                    ],
                    // Ckeditor
                    '<%= dirs.dist %>/release/ckeditor.min.css': [
                        '<%= dirs.dist %>/release/main.min.css',
                        '<%= dirs.dist %>/release/ckeditor.css',
                    ],
                    // Coming soon
                    '<%= dirs.dist %>/release/comingsoon.min.css': [
                        '<%= dirs.dist %>/release/comingsoon.css',
                    ],
                    // Error
                    '<%= dirs.dist %>/release/error.min.css': [
                        '<%= dirs.dist %>/release/error.css',
                    ],
                    // Static
                    '<%= dirs.dist %>/release/static.min.css': [
                        '<%= dirs.dist %>/release/static.css',
                    ],

                    // Index
                    '<%= dirs.dist %>/release/index.min.css': [
                        '<%= dirs.dist %>/release/index.css',
                    ]
                }]
            }
        },
        sprite: {
            all: {
                src: 'src/sprite/*.png',
                dest: '<%= dirs.dist %>/images/sprite/sprite.png',
                destCss: '<%= dirs.dist %>/release/sprites.min.css'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: [
                            '*.{jpg,png,svg}',
                            '**'
                        ],
                        dest: '<%= dirs.dist %>/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/icons/',
                        src: ['**'],
                        dest: '<%= dirs.dist %>/icons/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/fonts/',
                        src: ['**'],
                        dest: '<%= dirs.dist %>/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/plugins/fontawesome-free/',
                        src: ['**'],
                        dest: '<%= dirs.dist %>/plugins/fontawesome-free/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/styles/js/data/',
                        src: ['**'],
                        dest: '<%= dirs.dist %>/release/',
                        filter: 'isFile'
                    },
                ],
            },
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
                files: ['<%= dirs.css %>/*.scss', 'src/styles/css/*.scss', 'src/styles/css/components/*.scss', 'src/styles/css/config/*.scss', 'src/styles/css/elements/*.scss', 'src/styles/css/base/*.scss', 'src/styles/css/base/footer/*.scss', 'src/styles/css/base/header/*.scss'],
                tasks: ['sass']
            },
            cssmin: {
                files: ['src/styles/css/icons/*.css', '<%= dirs.css %>/*.scss', 'src/styles/css/*.scss', 'src/styles/css/components/*.scss', 'src/styles/css/config/*.scss', 'src/styles/css/elements/*.scss', 'src/styles/css/base/*.scss', 'src/styles/css/base/footer/*.scss', 'src/styles/css/base/header/*.scss'],
                tasks: ['cssmin']
            },
            babel: {
                files: ['<%= dirs.js %>/*.js', '<%= dirs.basejs %>/*.js', 'src/styles/js/components/*.js'],
                tasks: ['babel']
            },
            uglify: {
                files: ['<%= dirs.js %>/*.js', '<%= dirs.basejs %>/*.js', 'src/styles/js/components/*.js'],
                tasks: ['uglify']
            },
            clean: ['<%= dirs.dist %>/images/', '<%= dirs.dist %>/icons/', '<%= dirs.dist %>/fonts/'],
            copy: {
                files: ['src/img/*', 'src/img/*/*.*', 'src/icons/*.*', 'src/fonts/*.*'],
                tasks: ['copy']
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= dirs.dist %>/release/*.css',
                        'dist/*.html',
                        '<%= dirs.dist %>/release/*.js',
                    ]
                },
                options: {
                    watchTask: true,
                    baseDir: './dist',
                    server: './dist'
                },
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('release', ['clean', 'pug', 'sass', 'autoprefixer', 'babel', 'uglify', 'cssmin', 'sprite', 'copy']);
    grunt.registerTask('build', ['clean', 'pug', 'sass', 'autoprefixer', 'babel', 'uglify', 'cssmin']);
    grunt.registerTask('sprite ', ['sprite']);
    grunt.registerTask('copy ', ['copy']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};