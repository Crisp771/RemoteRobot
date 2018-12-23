var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("copy-data", function () {
    return gulp.src("./src/*.json")
        .pipe(gulp.dest("dist"));
});


gulp.task('build', gulp.series('default', 'copy-data'));