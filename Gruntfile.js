'use strict';

module.exports = function(grunt) {

	// Load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// Show elapsed time at the end
  	require('time-grunt')(grunt);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Clean dist folder
		clean: {
			files: ['dist']
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.plugin.js"],
				dest: "dist/jquery.plugin.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.plugin.js"],
			options: {
				jshintrc: ".jshintrc"
			}
			test: {
		        options: {
		          jshintrc: 'test/.jshintrc'
		        },
		    	src: ['test/**/*.js']
		    }
		},

		// Copy definitions
		copy: {
			files: {
				src: 'src/jquery-plugin.css',
				dest: 'dist/jquery-plugin.css'
			}
	    },

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.plugin.js"],
				dest: "dist/jquery.plugin.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// QUnit tests
		qunit: {
			all: {
				options: {
				 	urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
				}
			}
		},

		// Connect to QUnit server
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 9000
				}
			}
		}

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		}

	});

	grunt.registerTask("build", ["clean", "concat", "uglify", "copy"]);
	grunt.registerTask("default", ["jshint", "connect", "qunit","build"]);
	grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

};
