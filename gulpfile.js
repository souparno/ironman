var gulp = require('gulp'),
    qunit = require('node-qunit-phantomjs');

gulp.task('test', function(done) {
    qunit('./test/index.html', {'verbose': true});
    done();
});
