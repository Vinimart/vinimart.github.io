var gulp = require("gulp"),
	imagemin = require("gulp-imagemin"),
	concat = require("gulp-concat"),
	babel = require("gulp-babel"),
	webpack = require("webpack-stream"),
	autoprefixer = require("gulp-autoprefixer"),
	cleanCSS = require("gulp-clean-css");

// Assets
gulp.task("build-img", function (done) {
	gulp.src("assets/img/**/*").pipe(imagemin()).pipe(gulp.dest("assets/img"));
	done();
});

// Javascript
gulp.task("build-js", () =>
	gulp
		.src("js/*.js")
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
				plugins: ["@babel/transform-runtime"],
			})
		)
		.pipe(
			webpack({
				output: {
					filename: "bundle.js",
				},
			})
		)
		.pipe(concat("all.min.js"))
		.pipe(gulp.dest("dist/scripts"))
);

// CSS
gulp.task("build-css", () =>
	gulp
		.src("css/*.css")
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(
			cleanCSS({
				compatibility: "ie8",
			})
		)
		.pipe(concat("all.min.css"))
		.pipe(gulp.dest("dist/styles"))
);

// Monitor
function defaultTask(cb) {
	gulp.watch("js/*.js", gulp.series("build-js"));
	gulp.watch("css/*.css", gulp.series("build-css"));
	cb();
}

exports.default = defaultTask;
