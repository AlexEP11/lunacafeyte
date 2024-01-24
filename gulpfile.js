const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer  = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");


// Imagenes
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

// JavaScript
const terser = require("gulp-terser-js");


function css(done) {
    src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
    done();
}


function js(done) {

    src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
    done();
}

function versionWebp(done) {
    const options = {
        quality: 50
    }
    
    src("src/img/**/*.{jpg,png}").pipe(webp(options)).pipe(dest("build/img"));
    
    done();
}

function versionAvif(done) {
    const options = {
        quality: 50
    }
    
    src("src/img/**/*.{jpg,png}").pipe(avif(options)).pipe(dest("build/img"));
    
    done();
}

function imagenes(done) {
    const options = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{jpg,png}").pipe(cache(imagemin(options))).pipe(dest("build/img"));
    done();
}

function dev(done) {
    watch("src/js/**/*.js", js);
    watch("src/scss/**/*.scss", css)
    done();
    
}



exports.css = css;
exports.js = js;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.dev = parallel(versionWebp, versionAvif, imagenes, js, dev);