const path = {
  src: {
    root: 'src',
    pug: 'src/pages/**/*.pug',
    styles: 'src',
    js: 'src/js/*.js',
    fonts: 'src/fonts',
    img: 'src/img/**/*.+(jpg|jpeg|png|gif|svg|webp)',
    svgSprite: 'src/blocks/sprite-svg/svg/*.+(svg)'
  },
  build: {
    pug: 'build',
    styles: 'build/css',
    js: 'build/js',
    fonts: 'build/fonts',
    img: 'build/img',
    svgSprite: 'src/blocks/sprite-svg/img'
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