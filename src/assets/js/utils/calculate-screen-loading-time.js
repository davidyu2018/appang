// 集中化脚本计算首屏加载时间:首屏有图片要算出加载最慢的。没有图片就使用DOMReady时间。
const win = window;
const firstScreenHeight = win.screen.height;
let firstScreenImgs = [];
let isFindLastImg = false;
let allImgLoaded = false;
let collect = []

const t = setInterval(() => {
  let i, img
  if (isFindLastImg) {
    if (firstScreenImgs.length) {
      for (i = 0; i < firstScreenImgs.length; i++) {
        img = firstScreenImgs[i]
        if (!img.complete) {
          allImgLoaded = false
          break
        } else {
          allImgLoaded = true
        }
      }
    } else {
      allImgLoaded = true
    }
    if (allImgLoaded) {
      collect.push({ firstScreenLoaded: startTime - Date.now() })
      clearInterval(t)
    }
  } else {
    var imgs = body.querySelector('img');
    for (i = 0; i < imgs.length; i++) {
      img = imgs[i]
      let imgOffsetTop = getOffsetTop(img)
      if (imgOffsetTop > firstScreenHeight) {
        isFindLastImg = true;
        break;
      } else if (imgOffsetTop <= firstScreenHeight && !img.hasPushed) {
        img.hasPushed = 1
        firstScreenImgs.push(img)
      }
    }
  }
}, 0)

const doc = document;
doc.addEventListener('DOMContentLoaded', () => {
  const imgs = body.querySelector('img')
  if (!imgs.length) {
    isFindLastImg = true
  }
})

win.addEventListener('load', () => {
  allImgLoaded = true
  isFindLastImg = true
  if (t) {
    clearInterval(t)
  }
})
