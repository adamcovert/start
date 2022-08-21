// import $ from 'jquery'
// import ready from './utils/documentReady';
import LocomotiveScroll from 'locomotive-scroll';
import preloadImages from './utils/preloadImages.js';


// $(document).ready(() => {

//   console.log(`document ready`)
// });



// Preload images
preloadImages().then(() => {

  // Initialize the Locomotive scroll
  const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true
  });
});



// ready(() => {

//   console.log(`document ready`)

//   // Initialize the Locomotive scroll
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true
//   });
// });