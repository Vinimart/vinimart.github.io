var gulp = require("gulp"),
	imagemin = require("gulp-imagemin");

gulp.task("build-img", function (done) {
	gulp.src("assets/img/**/*").pipe(imagemin()).pipe(gulp.dest("assets/img"));
	done();
});

function defaultTask(cb) {
	// place code for your default task here
	cb();
}

exports.default = defaultTask;
