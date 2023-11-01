const ready = (fn) => {

  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run the method
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return fn();
  }

  // Otherwise, wait until the document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);
};

export default ready;