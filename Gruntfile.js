module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['prod'],
        copy: {
            filtered: {
                files: [
                    {expand: true, flatten: true, src: ['src/*'], dest: 'prod', filter: 'isFile'},
                ],
                options: {
                    process: function (content, srcpath) {
                        return content.replace('<link rel="stylesheet" href="css/main.css">\n' +
                            '    <link rel="stylesheet" href="css/flex.css">\n' +
                            '    <link rel="stylesheet" href="css/fonts.css">',
                            '<link rel="stylesheet" href="css/full.min.css">');
                    },
                },
            },
            not_filtered: {
                files: [
                    {expand: true, cwd: 'src', src: ['img/**', 'fonts/**'], dest: 'prod'},
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
    grunt.registerTask('default', [
        'clean',
        'copy',
        'cssmin',
        'uglify'
    ]);
};