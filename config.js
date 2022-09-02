const path = {
  root: {
    src: 'src',
    build: 'build'
  },
  pug: {
    src: 'src/pages/**/*.pug',
    build: 'build',
    watch: [
      'src/pages/**/*.pug',
      'src/blocks/**/*.pug',
      'src/pug/**/*.pug'
    ]
  },
  styles: {
    src: 'src/scss/style.scss',
    build: 'build/css',
    watch: [
      'src/scss/**/*.scss',
      'src/blocks/**/*.scss'
    ]
  },
  js: {
    src: 'src/js/*.js',
    build: 'build/js',
    watch: 'src/js/**/*.js'
  },
  fonts: {
    src: 'src/fonts/**/*.+(woff2|woff)',
    build: 'build/fonts',
    watch: 'src/fonts/**/*.+(woff2|woff)'
  },
  img: {
    src: 'src/img/**/*.+(jpg|jpeg|png|gif|svg|webp)',
    build: 'build/img',
    watch: 'src/img/**/*.+(jpg|jpeg|png|gif|svg|webp)'
  },
  svgSprite: {
    src: 'src/blocks/sprite-svg/svg/*.svg',
    build: 'src/blocks/sprite-svg/img',
    watch: `src/blocks/sprite-svg/svg/*.svg`
  },
  clean: {
    all: 'build'
  },
  blocks: 'src/blocks/',
  stylesBefore: [
    'src/scss/fonts.scss',
    'src/scss/variables.scss',
    'src/scss/mixins/media.scss',
    'src/scss/global.scss'
  ]
};

export default path;