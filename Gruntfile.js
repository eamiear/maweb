module.exports = function (grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    //see node_modules-->load-grunt-tasks--->README.md
    //require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //compressed JavaScript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'src/scripts/**/*.js', 'test/!**/!*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true
                }
            }
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/scripts/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        //compile sass and compass
        //https://www.npmjs.com/package/grunt-contrib-compass#cssdir
        compass: {
            dist: {
                options: {
                    config: 'src/styles/config.rb',
                    //override the configuration in config.rb
                    sassDir: 'src/styles/sass',
                    cssDir: 'src/styles/css',
                    imagesDir: 'src/images',
                    javascriptsDir: 'src/scripts',
                    fontsDir: 'src/fonts'
                }
            }
        },

        postcss: {
            server: {
                options: {
                    map: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/styles/css',
                        src: '{,}*.css',
                        dest: 'src/styles/css/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/styles/css',
                        src: '{,}*.css',
                        dest: 'src/styles/css/'
                    }
                ]
            }
        },

        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dist/css',
                        ext: '.min.css'
                    }
                ]
            }
        },

        connect : {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '*',//默认就是这个值，可配置为本机某个 IP，localhost 或域名，写入IP，内网可在其他电脑打开
                livereload : 35729 //声明给 watch 监听的端口
            },
            server: {
                options: {
                    open : true, //自动打开网页 http://
                    base : [
                      '.'   //主目录( . 浏览器将打开当前项目的目录； app,则打开app目录)
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '.'
                }
            }
        },

        // Configuration to be run (and then tested)
        regarde: {
            fred: {
                files: '*.html',
                tasks: ['livereload']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist',
                        'dist/{,*/}*'
                    ]
                }]
            },
            server: 'dist'
        },

        //see node_modules-->grunt-contrib-watch--->README.md
        watch: {
            //sass实时编译
            compass : {
                files : ['src/styles/sass/{,*/}*.{scss,sass}','src/styles/sass/**/*.{scss,sass}'],
                tasks: ['compass','postcss:server']
            },
            //页面发生变化时，实时刷新
            livereload : {
                options: {
                    livereload: '<%=connect.options.livereload%>'//监听前面声明的端口  35729
                },
                files: [  //下面文件的改变就会实时刷新网页
                    '*.html',
                    'app.html',
                    'views/{,*/}*.html',
                    'src/style/css/sass/**/*.scss',
                    'src/style/css/{,}*.css',
                    'src/scripts/{,}*.js',
                    'src/scripts/**/*.js',
                    'src/images/{,}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint']);
    //grunt.loadNpmTasks('grunt-regarde');
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify'
    ]);

};
