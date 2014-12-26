module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      htmlrefs: {
        portfolio: {
          src: 'index.html',
          dest: 'dist/index.html',
        },
        resume: {
          src: 'resume.html',
          dest: 'dist/resume/index.html',
        }
      },
      less: {
        prod: {
          files: {
            'dist/styles/resume.css':
              [ 'less/resume/*.less' ],
            'dist/styles/portfolio.css':
              [ 'less/portfolio/*.less' ]
          }
        },
        options: {
          compress: true
        }
      },
      uglify: {
        dist: {
          files: {
            'dist/scripts/resume.min.js': ['scripts/resume.js']
          }
        }
      },
      bowercopy: {
        options: {
        },
        js: {
            options: {
              destPrefix: 'dist/scripts'
            },
            files: {
              'jquery.min.js':          'jquery/dist/jquery.min.js',
              'highcharts.js':          'highcharts-release/highcharts.js',
              'bootstrap.min.js':       'bootstrap/dist/js/bootstrap.min.js',
              'angular.min.js':         'angular/angular.min.js',
              'angular-animate.min.js': 'angular-animate/angular-animate.min.js',
              'tweenmax.min.js':        'gsap/src/minified/TweenMax.min.js',
              'ng-fx.min.js':           'ng-Fx/dist/ng-Fx.min.js'
            }
        },
        css: {
            options: {
              destPrefix: 'dist/styles'
            },
            files: {
              'bootstrap.min.css':  'bootstrap/dist/css/bootstrap.min.css',
              'font-awesome.min.css':  'fontawesome/css/font-awesome.min.css',
            }
        },
        fonts: {
          options: {
            destPrefix: 'dist/fonts'
          },
          files: {
            'FontAwesome.otf'         : 'fontawesome/fonts/FontAwesome.otf',
            'fontawesome-webfont.eot' : 'fontawesome/fonts/fontawesome-webfont.eot',
            'fontawesome-webfont.svg' : 'fontawesome/fonts/fontawesome-webfont.svg',
            'fontawesome-webfont.ttf' : 'fontawesome/fonts/fontawesome-webfont.ttf',
            'fontawesome-webfont.woff': 'fontawesome/fonts/fontawesome-webfont.woff',
          }
        },
      },
      shell: {
        webserver: {
          command: 'static ./dist/',
          options: {
            async: true
          }
        },
        pdf: {
          command: 'phantomjs ./libs/rasterize.js http://localhost:8080/resume/ ./dist/resume/resume.pdf A4',
        },
        options: {
            stdout: true,
            stderr: true,
            failOnError: true
        }
      },
      open : {
        dev : {
          path: 'http://localhost:8080/'
        }
      },
      watch: {
        options: {
          livereload: true,
          cwd: "./"
        },
        css: {
          files: 'less/**/*.less',
          tasks: ['less']
        },
        html: {
          files: '*.html',
          tasks: ['htmlrefs']
        },
        js: {
          files: 'scripts/*.js',
          tasks: ['uglify']
        }
      },
      copy: {
        ico: {
          files: [
            // makes all src relative to cwd
            {expand: true, cwd: 'images/', src: ['favicon.ico'], dest: 'dist/'},
          ],
        },
      },
  });

 grunt.registerTask('build', [
  'less',
  'copy:ico',
  'bowercopy',
  'htmlrefs']);

 grunt.registerTask('dev', [
  'build',
  'shell:webserver',
  /*'open',*/
  'watch']);

 grunt.registerTask('default', ['build']);

};
