module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
    },
      my_target: {
        files: {
            //destination : [target]
            //min : [source code]
            'public/scripts/client.min.js': ['client/client.js'],
            'public/scripts/services/adminHomeService.min.js': ['client/services/adminHomeService.js'],
            'public/scripts/services/adminInternService.min.js': ['client/services/adminInternService.js'],
            'public/scripts/services/authFactory.min.js': ['client/services/authFactory.js'],
            'public/scripts/services/feedBackFormService.min.js': ['client/services/feedBackFormService.js'],
            'public/scripts/services/importExportService.min.js' : ['client/services/importExportService.js'],
            'public/scripts/services/updateQuestionsService.min.js': ['client/services/updateQuestionsService.js'],
            'public/scripts/controllers/adminHomeController.min.js': ['client/controllers/adminHomeController.js'],
            // 'public/scripts/controllers/adminInternController.min.js': ['client/controllers/adminInternController.js'],
            'public/scripts/controllers/authController.min.js': ['client/controllers/authController.js'],
            'public/scripts/controllers/feedBackFormController.min.js': ['client/controllers/feedBackFormController.js'],
            'public/scripts/controllers/importExportController.min.js': ['client/controllers/importExportController.js'],
            'public/scripts/controllers/navController.min.js': ['client/controllers/navController.js'],
            'public/scripts/controllers/updateQuestionsController.min.js': ['client/controllers/updateQuestionsController.js']
            //service and controller need to be separate
            }
          }
        }, //end uglify
          watch: {
            files: ['client/controllers/*.js', 'client/services/*.js', 'public/scripts/*.js', 'public/scripts/controllers/*.js', 'public/scripts/services/*.js'],
            tasks: ['uglify']
          }
        });//end watch

      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'watch']);
};
