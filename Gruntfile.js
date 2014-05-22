module.exports = function(grunt){

//init packages
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  	concat: {
	},

	/* 
	Uglify JS Options
	*/
	uglify:   { },

    /*
     * Jshint validation
     */
    jshint: {
            files: ['js/**/*.js'],
            options : {
                ignores: [ 'js/**/*.min.js', 'js/lib/**/*.js' ]
            }

    },

	/* 
	CSS Min Options, goes to a 'build' directory in project root
	*/
	cssmin: {  		
	},

	sass: {                              // Task
        prod: {
            options:
            {
                debugInfo: false,
                lineComments: false,
                lineNumbers: false
            },
	       	files: [{
			  expand: true,
			  cwd: 'css/',
			  src: ['**/*.scss'],
			  dest: 'css/',
			  ext: '.css'
			}]
        },
	    dev: {
            options:
            {
                debugInfo: true,
                lineComments: true,
                lineNumbers: true
            },
	       	files: [{
			  expand: true,
			  cwd: 'css/',
			  src: ['**/*.scss'],
			  dest: 'css/',
			  ext: '.css'
			}]
	    }
	},
	
	/* 	
	Run the default task on any update to JS or CSS
	*/
	watch: {

		i18n: {
			files: ['locales/**/*.json','tpl/**/*.html', 'config/*.js'],
	    	tasks: ['auto_labels','i18n'],
	    	options: {
	      		spawn: false,
	    	},
		},
        locales: {
			files: ['build/locales_export/*.csv'],
	    	tasks: ['import_labels','i18n'],
	    	options: {
	      		spawn: false,
	    	},
        },

		sass: {
			files: ['css/**/*.scss'],
			tasks: ['sass:dev'],
	    	options: {
				spawn: false,
	    	},
		}
	},	
	/*
	*/
	useminPrepare: {
 		html: 'html/**/*.html',
 		options: {
 			dest: 'build'
        }
	},

	copy: {
		html: {
			expand: true,
			cwd: 'html',
	    	src: '**/*',
	    	dest: 'build',
	    	flatten: false,
	    	filter: 'isFile'
	    },
        css: {
			expand: true,
			cwd: 'css',
	    	src: '**/*',
	    	dest: 'html/css',
	    	flatten: false,
	    	filter: 'isFile'
        },
        js: {
			expand: true,
			cwd: 'js',
	    	src: '**/*',
	    	dest: 'html/js',
	    	flatten: false,
	    	filter: 'isFile'
        }
	},

	usemin: {
	  	html: ['build/**/*.html'],
	  	css: ['css/*.css'],
	  	options: {
	  		dirs: ['build'],
	  		basedir: '**'
	    }
	},

	cdn: {
        options: {
            flatten: true,
        },
        europe: {
            src: ['./build/**/*.html' ],
            options: {
                cdn: 'mon_dossier/empty_project',
                link_suffix: '?$staticlink$'
            }
        },
        usa: {
            src: ['./build/**/*.html', './css/**/*.min.css' ],
            options: {
                cdn: 'http://assets.quiksilver.com/ecomm/2014/empty_project/'
            }
        }
    },

    clean: ['tmp'],
    
    coffeelint: {
		tasks: 'tasks/**/*.coffee',
		test: 'test/**/*.coffee',
		grunt: 'Gruntfile.js',
		options: {
        	max_line_length: {
				value: 120,
				level: 'error'
        	},
        	no_trailing_whitespace: {
          		level: 'error'
        	},
        	no_tabs: {
          		level: 'error'
        	},
        	indentation: {
          		value: 4,
          		level: 'error'
        	}
      	}
    },

    i18n: {
      project: {
        src: ['tpl/*.html'],
        options: {
          config: 'config/config.js',
          locales: 'locales/*',
          output: 'html',
          base: 'tpl'
        }
      }
    },
    auto_labels: {
      project: {
        src: ['tpl/*.html'],
        options: {
          config: 'config/config.js',
          locales: 'locales/*',
          output: 'html',
          base: 'tpl'
        }
      }
    },
    export_labels: {
      project: {
        options: {
          locales: 'locales/*',
          output: 'build/locales_export',
        }
      }
    },
    export_config: {
      project: {
        options: {
          config: 'config/config.js',
          output: 'build/config_export'
        }
      }
    },
    import_labels: {
      project: {
        options: {
          locales: 'locales/*',
          output: 'build/locales_export',
        }
      }
    },
    import_config: {
      project: {
        options: {
          config: 'config/config.js',
          output: 'build/config_export',
        }
      }
    },

    htmlhint: {
        build: {
            options: {
                'tag-pair': true,
                'tagname-lowercase': true,
                'attr-lowercase': true,
                'spec-char-escape': true,
                'id-unique': true
            },
            src: ['build/**/*.html']
        }
    },
    imagemin: {
        dynamic: {
            files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpeg,gif}'],   // Actual patterns to match
                    dest: 'build/img'                  // Destination path prefix
            }]
        }
    }
    
});


//load tasks
//grunt.loadTasks('tasks');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-usemin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-htmlhint');

grunt.loadNpmTasks('qs_cdn');
grunt.loadNpmTasks('qs_i18n');
grunt.loadNpmTasks('qs_auto_labels');
grunt.loadNpmTasks('qs_export_labels');
grunt.loadNpmTasks('qs_import_labels');

grunt.loadNpmTasks('qs_export_config');
grunt.loadNpmTasks('qs_import_config');

//grunt.loadNpmTasks('grunt-contrib-imagemin');

grunt.registerTask('default', [ 'uglify', 'cssmin']);

/* 
main build task
	- prepares filds
	- compresses javascript to build/js directory
	- compresses css to build/css directory
	- updates HTML with optimized files
*/
grunt.registerTask('build', ['useminPrepare','copy',  'concat', 'uglify', 'cssmin', 'usemin']);
grunt.registerTask('build', ['i18n', 'sass:prod', 'copy',  'cdn' ]);

grunt.registerTask('build-cdn', ['useminPrepare','copy',  'concat', 'uglify', 'cssmin', 'usemin','cdn' ]);

grunt.registerTask('build-cdn-i18n', ['jshint','sass:prod','i18n','useminPrepare', 'copy',  'concat', 'uglify', 'cssmin', 'usemin', 'cdn:europe']);

grunt.registerTask('build-usa', ['sass:prod','i18n','useminPrepare', 'copy',  'concat', 'uglify', 'cssmin', 'usemin', 'cdn:usa']);


};
