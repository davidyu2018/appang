import { COREHTML5, requestNextAnimationFrame } from "./corehtml5"

export class EnlargedView {
  constructor(canvasId, imageUrl, sizeSliderId, alphaSliderId, sizeSliderVal = 0.85, alphaSliderVal = 0.5) {
    this.image = new Image()
    this.sizeSlider = new COREHTML5.Slider('blue', 'cornflowerblue', sizeSliderVal, 90, 20)
    this.alphaSlider = new COREHTML5.Slider('blue', 'cornflowerblue', alphaSliderVal, 90, 20)
    this.enlargedView = new COREHTML5.EnlargedView(document.getElementById(canvasId), this.image)
    this.elem = this.enlargedView.domElement
    this.ALPHA_MAX = 1.0
    this.SIZE_MAX = 12
    this.eventHandlers()
    // Initialzon....
    this.image.src = imageUrl
    document.body.appendChild(this.elem)
    this.elem.className = 'pan'
    this.enlargedView.viewportPercent = this.sizeSlider.knobPercent * this.SIZE_MAX
    this.enlargedView.panCanvasAlpha = this.alphaSlider.knobPercent * this.ALPHA_MAX
    // sizeSpan.innerHTML = this.enlargedView.viewportPercent.toFixed(0) + '%'
    // alphaSpan.innerHTML = (this.enlargedView.panCanvasAlpha * 100).toFixed(0) + '%'
    this.sizeSlider.appendTo(sizeSliderId)
    this.alphaSlider.appendTo(alphaSliderId)
    this.sizeSlider.draw()
    this.alphaSlider.draw()
  }
  eventHandlers() {
    this.sizeSlider.addChangeListener((e) => {
      var size = (parseFloat(this.sizeSlider.knobPercent) * 12)
      size = size < 2 ? 2 : size
      // sizeSpan.innerHTML = size.toFixed(1) + '%'
      this.enlargedView.imageContext.setTransform(1, 0, 0, 1, 0, 0)
      this.enlargedView.viewportPercent = size
      this.enlargedView.erase()
      this.enlargedView.initialize()
      this.enlargedView.draw()
    })
    this.alphaSlider.addChangeListener((e) => {
      // alphaSpan.innerHTML = parseFloat(alphaSlider.knobPercent * 100).toFixed(0) + '%'
      // alphaSan.style.opacity = parseFloat(this.alphaSlider.knobPercent)
      this.enlargedView.panCanvasAlpha = this.alphaSlider.knobPercent
      this.enlargedView.erase()
      this.enlargedView.draw()
    })
  }
}