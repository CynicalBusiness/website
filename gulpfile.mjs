import gulp from "gulp";
import ts from "gulp-typescript";
import eslint from "gulp-eslint-new";
import nodemon from "gulp-nodemon";

const srcDir = "src";
const srcFiles = `${srcDir}/**/*`;

const tsProject = ts.createProject("tsconfig.json");

export function transpileJS() {
    return gulp
        .src(srcFiles + ".ts")
        .pipe(tsProject())
        .pipe(gulp.dest("dist"));
}

export function lint() {
    return gulp
        .src(srcFiles + ".ts")
        .pipe(
            eslint({
                configType: "flat",
            })
        )
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

export function copy() {
    return gulp
        .src(["src/public/**/*", "src/views/**/*.pug"], {
            base: "src",
            buffer: false,
        })
        .pipe(gulp.dest("dist"));
}

export function start() {
    return nodemon({
        script: "main.js",
        watch: "dist",
        ext: "js",
        inspect: true,
        // eslint-disable-next-line no-undef -- eslint please stop being dumb
        cwd: process.cwd() + "/dist",
    });
}

export const build = gulp.series(copy, lint, transpileJS);

export function watch() {
    return gulp.watch("src/**/*", build);
}

export const serve = gulp.series(build, gulp.parallel(watch, start));
