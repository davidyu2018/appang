function logFirstScreen() {
  let images = document.getElementsByTagName('img')
  let iLen = images.length;
  let curMax = 0;
  let inScreenLen = 0;

  // 图片加载回调
  function imageBack() {
    this.removeEventListener && this.removeEventListener('load', imageBack, !1)
    if (++curMax === inScreenLen) {
      log() // 所有在首屏的图片均已加载完成的话，发送日志
    }
  }

  // 对所有位于指定区域的图片绑定回调事件
  for (var s = 0; s < iLen; s++) {
    var img = images[s]
    var offset = { top: 0 }
    var curImg = img
    while (curImg.offsetParent) {
      offset.top += curImg.offsetTop
      curImg = curImg.offsetParent
    }
    // 判断图片在不在首屏
    if (document.documentElement.clientHeight < offset.top) {
      continue
    }
    // 图片还没有加载完成
    if (!img.complete) {
      inScreenLen++
      img.addEventListener('load', imageBack, !1)
    }
  }
  // 如果首屏没有图片，则直接发送日志
  if (inScreenLen === 0) {
    log()
  }
  // 对发送日志进行统计
  function log() {
    window.logInfo.firstScreen = +new Date() - window.performance.timing.navigationStart
    console.log('首屏时间：', +new Date() - window.performance.timing.navigationStart)
  }
}