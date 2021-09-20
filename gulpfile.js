const { src, dest, series, parallel, watch } = require('gulp')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const del = require('del')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const browserSync = require('browser-sync').create()
const webpackStream = require('webpack-stream')
const svgmin = require('gulp-svgmin')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const fs = require('fs')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const objectFitImages = require('postcss-object-fit-images')
const inlineSVG = require('postcss-inline-svg')
const postcssEasingGradients = require('postcss-easing-gradients')
const atImport = require('postcss-import')

const config = {
  dir: {
    src: 'src/',
    build: 'build/',
    blocks: 'src/blocks/',
    addStyleBefore: [
      '../../node_modules/modularscale-sass/stylesheets/_modularscale.scss',
      '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css',
      'src/scss/fonts.scss',
      'src/scss/variables.scss',
      'src/scss/mixins/media.scss',
      'src/scss/global.scss'
    ],
  }
};



function clean() {
  return del(`${config.dir.build}**/*`)
}
exports.clean = clean;



function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectories('pug');
  let pugMixins = [];
  allBlocksWithPugFiles.forEach(function(blockName) {
    pugMixins += `include ${config.dir.blocks.replace(config.dir.src,'../')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync(`${config.dir.src}pug/mixins.pug`, pugMixins);
  cb();
}
exports.writePugMixinsFile = writePugMixinsFile;



function compilePug() {
  return src(`${config.dir.src}pages/**/*.pug`)
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest(config.dir.build))
}
exports.compilePug = compilePug;



let scssImportsList = [];
function writeSassImportsFile(cb) {
  const newScssImportsList = [];
  config.dir.addStyleBefore.forEach(function(src) {
    newScssImportsList.push(src);
  });
  let allBlocksWithScssFiles = getDirectories('scss');
  allBlocksWithScssFiles.forEach(function(blockWithScssFile){
    let url = `${config.dir.blocks}${blockWithScssFile}/${blockWithScssFile}.scss`;
    newScssImportsList.push(url);
  });
  let diff = getArraysDiff(newScssImportsList, scssImportsList);
  if (diff.length) {
    let styleImports = [];
    newScssImportsList.forEach(function(src) {
      styleImports += `@import '${src}';\n`;
    });
    fs.writeFileSync(`${config.dir.src}scss/style.scss`, styleImports);
    scssImportsList = newScssImportsList;
  }
  cb();
}
exports.writeSassImportsFile = writeSassImportsFile;



function compileSass() {
  return src(`${config.dir.src}scss/style.scss`, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        grid: 'autoplace'
      }),
      mqpacker({
        sort: true
      }),
      atImport(),
      inlineSVG(),
      postcssEasingGradients(),
      objectFitImages()
    ]))
    .pipe(csso({ restructure: false }))
    .pipe(dest(`${config.dir.build}css`, { sourcemaps: '.' }))
    .pipe(browserSync.stream())
}
exports.compileSass = compileSass;



function buildJs() {
  return src(`${config.dir.src}js/script.js`)
    .pipe(webpackStream({
      mode: 'production',
      output: { filename: '[name].js' },
      module: {
        rules: [{
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      },
    }))
    .pipe(dest(`${config.dir.build}js`))
}
exports.buildJs = buildJs;



function generateSvgSprite(cb) {
  let spriteSvgPath = `${config.dir.blocks}sprite-svg/svg/`;
  if (fileExist(spriteSvgPath)) {
    return src(spriteSvgPath + '*.svg')
      .pipe(svgmin(function () {
        return { plugins: [{ cleanupIDs: { minify: true } }] }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite.svg'))
      .pipe(dest(`${config.dir.blocks}sprite-svg/img/`))
  }
  else {
    cb()
  }
}
exports.generateSvgSprite = generateSvgSprite;



function copyingImages() {
  return src(`${config.dir.src}img/**/*.{jpg,jpeg,png,gif,svg,webp}`)
    .pipe(dest(`${config.dir.build}img`))
}
exports.copyingImages = copyingImages;



function copyingFonts() {
  return src(`${config.dir.src}fonts/*`)
    .pipe(dest(`${config.dir.build}fonts`))
}
exports.copyingFonts = copyingFonts;



function reload(done) {
  browserSync.reload()
  done()
}



function serve() {
  browserSync.init({
    server: 'build',
    open: false,
    notify: false,
  })

  watch([`${config.dir.src}pages/**/*.pug`, `${config.dir.src}blocks/**/*.pug`, `${config.dir.src}pug/layout.pug`], {events: ['change']}, series(
    compilePug,
    reload
  ));

  watch(`${config.dir.blocks}**/*.pug`, {events: ['add']}, series(
    writePugMixinsFile,
    compilePug,
    reload
  ));

  watch([`${config.dir.src}scss/*.scss`, `${config.dir.src}**/*.scss`], {events: ['change']}, series(
    compileSass,
    reload
  ));

  watch(`${config.dir.blocks}**/*.scss`, {events: ['add']}, series(
    writeSassImportsFile,
    compileSass,
    reload
  ));

  watch(`${config.dir.src}js/**.js`, {events: ['all']}, series(
    buildJs,
    reload
  ));

  watch([`${config.dir.blocks}sprite-svg/svg/*.svg`], {events: ['all']}, series(
    generateSvgSprite,
    copyingImages,
    reload,
  ));

  watch(`${config.dir.src}img/**/*.{jpg,jpeg,png,gif,svg,webp}`, {events: ['all']}, series(
    copyingImages,
    reload
  ));

  watch(`${config.dir.src}fonts/*`, {events: ['all']}, series(
    copyingFonts,
    reload
  ));
}



exports.default = series(
  parallel(clean, writePugMixinsFile),
  parallel(compilePug, writeSassImportsFile, generateSvgSprite, copyingImages, copyingFonts),
  parallel(compileSass, buildJs),
  serve
)



function fileExist(filepath){
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
}

function getDirectories(ext) {
  let source = config.dir.blocks;
  let res = fs.readdirSync(source)
    .filter(item => fs.lstatSync(source + item).isDirectory())
    .filter(item => fileExist(source + item + '/' + item + '.' + ext));
  return res;
}

function getArraysDiff(a1, a2) {
  return a1.filter(i=>!a2.includes(i)).concat(a2.filter(i=>!a1.includes(i)))
}