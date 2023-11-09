var scrollElement = document.querySelector('.page'),
  viewH = document.documentElement.clientHeight;

function lazyload() {
  var nodes = document.querySelectorAll('img[data-src]');
  Array.prototype.forEach.call(nodes, function (item, index) {
    var rect;
    if (item.dataset.src === '') return;
    rect = item.getBoundingClientRect();
    if (rect.bottom >= 0 && rect.top < viewH) {
      (function (item) {
        var img = new Image();
        img.onload = function () {
          item.src = img.src;
        }
        img.src = item.dataset.src
        item.dataset.src = ''
      })(item)
    }
  })
}

lazyload();

scrollElement.addEventListener('scroll', throttle(lazyload, 500, 1000));

function throttle(fun, delay, time) {
  var timeout, startTime = new Date();
  return function () {
    var context = this, args = arguments, curTime = new Date();
    clearTimeout(timeout);
    if (curTime - startTime >= time) {
      fun.apply(context, args);
      startTime = curTime;
    } else {
      timeout = setTimeout(fun, delay)
    }
  }
}