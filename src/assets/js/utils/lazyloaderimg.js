(function (window, document) {
  var lazyLoader = {
    lazyClass: 'lazy',
    images: null,
    processing: false,
    throttle: 200,
    buffer: 50,
    init: function () {
      lazyLoader.images = [].slice.call(document.getElementsByClassName(lazyLoader.lazyClass));
      lazyLoader.scanImages();
      document.addEventListener('scroll', lazyLoader.scanImages);
      document.addEventListener('touchmove', lazyLoader.scanImages)
    },
    destroy: function () {
      document.removeEventListener('scroll', lazyLoader.scanImages);
      document.removeEventListener('touchmove', lazyLoader.scanImages);
    },
    scanImages: function () {
      if (document.getElementsByClassName(lazyLoader.lazyClass).length === 0) {// 检查是否还有图像需要懒加载
        lazyLoader.destroy();
        return
      }
      if (lazyLoader.processing === false) {// 检查文档是否正在被检查图像
        lazyLoader.processing = true; // 设为true，以阻塞后续代码执行
        setTimeout(function () {// 将代码块的处理延迟指定时间
          for (var i in lazyLoader.images) {
            if (lazyLoader.images[i].className.indexOf(lazyLoader.lazyClass) !== -1) {
              if (lazyLoader.inViewport(lazyLoader.images[i])) { //检查图像是否在视口中
                lazyLoader.loadImage(lazyLoader.images[i]) // 将当前元素传递给loadImage方法
              }
            }
          }
          lazyLoader.processing = false
        }, lazyLoader.throttle);
      }
    },
    inViewport: function (img) {
      var top = ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight) + lazyLoader.buffer;
      return img.offsetTop <= top;
    },
    loadImage: function (img) {
      if (img.parentNode.tagName === 'PICTURE') {
        var sourceEl = img.parentNode.getElementsByTagName('source');
        for (var i = 0; i < sourceEl.length; i++) {
          var sourceSrcset = sourceEl[i].getAttribute("data-srcset");
          if (sourceSrcset !== null) {
            sourceEl[i].setAttribute("srcset", sourceSrcset);
            sourceEl[i].removeAttribute("data-srcset");
          }
        }
      }
      var imgSrc = img.getAttribute("data-src"), imgSrcset = img.getAttribute("data-srcset");
      if (imgSrc !== null) {
        img.setAttribute('src', imgSrc);
        img.removeAttribute('data-src');
      }
      if (imgSrcset !== null) {
        img.setAttribute('srcset', imgSrcset);
        img.removeAttribute('data-srcset')
      }
      lazyLoader.removeClass(img, lazyLoader.lazyClass);
    },
    removeClass: function (img, className) {
      var classArr = img.className.split(" ");
      for (var i = 0; i < classArr.length; i++) {
        if (classArr[i] === className) {
          classArr.splice(i, 1)
        }
      }
      img.className = classArr.toString().replace(",", " ");
    }
  }
})(window, document)

// useage
// document.onreadystatechange = lazyLoader.init;