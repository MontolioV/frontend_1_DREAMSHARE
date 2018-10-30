module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['prod'],
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/*'], dest: 'prod', filter: 'isFile'},
                ],
                options: {
                    process: function (content, srcpath) {
                        return content.replace('<link rel="stylesheet" href="css/main.css">\n' +
                            '    <link rel="stylesheet" href="css/flex.css">',
                            '<link rel="stylesheet" href="css/full.min.css">');
                    },
                },
            },
            img: {
                files: [
                    {expand: true, flatten: true, src: ['src/img/*'], dest: 'prod/img'},
                ],
            },
        },
        cssmin: {
            css: {
                src: 'src/css/*.css',
                dest: 'prod/css/full.min.css'
            }
        },
        uglify: {
            build: {
                src: 'src/js/*.js',
                dest: 'prod/js/full.min.js'
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['clean','copy','cssmin','uglify']);
};