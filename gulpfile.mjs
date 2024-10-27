import gulp from "gulp";
import ts from "gulp-typescript";
import eslint from "gulp-eslint-new";
import nodemon from "gulp-nodemon";
import gulpSass from "gulp-sass";
import _sass from "node-sass";

const sass = gulpSass(_sass);

const srcDir = "src";
const srcFiles = `${srcDir}/**/*`;

const tsProject = ts.createProject("tsconfig.json");

export function transpileJS() {
    return gulp
        .src(srcFiles + ".ts")
        .pipe(tsProject())
        .pipe(gulp.dest("dist"));
}

export function transpileCSS() {
    return gulp
        .src("src/public/styles/*.scss", { base: "src" })
        .pipe(sass())
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
        .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
}

export function copy() {
    return gulp
        .src(["src/views/**/*.pug"], {
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

export const buildAssets = copy;
export const buildJS = gulp.series(lint, transpileJS);
export const buildCSS = transpileCSS;

export const build = gulp.parallel(copy, buildJS, transpileCSS);

export const watch = gulp.parallel(
    function watchJS() {
        return gulp.watch(["src/**/*.ts"], { ignoreInitial: false }, buildJS);
    },
    function watchCSS() {
        gulp.watch(["src/**/*.scss"], { ignoreInitial: false }, buildCSS);
    },
    function watchAssets() {
        return gulp.watch(["src/views/**/*"], { ignoreInitial: false }, copy);
    }
);

export const serve = gulp.series(build, gulp.parallel(watch, start));
