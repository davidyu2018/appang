import { COREHTML5, requestNextAnimationFrame } from "./corehtml5";

export class ColorBarSlider {
  constructor(canvasId) {
    this.colorPatchContext = document.getElementById(canvasId).getContext('2d')

    this.redSlider = new COREHTML5.Slider('rgb(0,0,0)', 'rgba(255,0,0,0.8)', 0)
    this.greenSlider = new COREHTML5.Slider('rgb(0,0,0)', 'rgba(0,255,0,0.25)', 0)
    this.blueSlider = new COREHTML5.Slider('rgb(0,0,0)', 'rgba(0,0,255,1.0)', 0)
    this.alphaSlider = new COREHTML5.Slider('rgb(0,0,0)', 'rgba(255,255,255,0.8)', 0)

    this.redSlider.appendTo('redSliderDiv')
    this.greenSlider.appendTo('greenSliderDiv')
    this.blueSlider.appendTo('blueSliderDiv')
    this.alphaSlider.appendTo('alphaSliderDiv')
    // Initialtion
    this.redSlider.fillStyle = `rgb(${(this.redSlider.knobPercent * 255).toFixed(0), 0, 0})`
    this.greenSlider.fillStyle = `rgb(0,${(this.greenSlider.knobPercent * 255).toFixed(0), 0})`
    this.blueSlider.fillStyle = `rgb(0, 0,${(this.blueSlider.knobPercent * 255).toFixed(0)})`
    this.alphaSlider.fillStyle = `rgb(255,255,255,${(this.alphaSlider.knobPercent * 255).toFixed(0)})`
    this.alphaSlider.opacity = this.alphaSlider.knobPercent
    this.redSlider.draw()
    this.greenSlider.draw()
    this.blueSlider.draw()
    this.alphaSlider.draw()
    // Event handlers
    this.redSlider.addChangeListener(() => {
      this.updateColor()
      this.redSlider.fillStyle = `rgb(${(this.redSlider.knobPercent * 255).toFixed(0)},0,0)`
    })
    this.greenSlider.addChangeListener(() => {
      this.updateColor()
      this.greenSlider.fillStyle = `rgb(0, ${(this.greenSlider.knobPercent * 255).toFixed(0)},0)`
    })
    this.blueSlider.addChangeListener(() => {
      this.updateColor()
      this.blueSlider.fillStyle = `rgb(0,0, ${(this.blueSlider.knobPercent * 255).toFixed(0)})`
    })
    this.alphaSlider.addChangeListener(() => {
      this.updateColor()
      this.alphaSlider.fillStyle = `rgb(255,255,255,${(this.alphaSlider.knobPercent * 255).toFixed(0)})`
      this.alphaSlider.opacity = this.alphaSlider.knobPercent
    })
  }
  updateColor() {
    var alpha = new Number((this.alphaSlider.knobPercent).toFixed(2))
    var color = `rgba(${parseInt(this.redSlider.knobPercent * 255)}, ${parseInt(this.greenSlider.knobPercent * 255)},${parseInt(this.blueSlider.knobPercent * 255)},${alpha})`
    this.colorPatchContext.fillStyle = color
    this.colorPatchContext.clearRect(0, 0, this.colorPatchContext.canvas.width, this.colorPatchContext.canvas.height)
    this.colorPatchContext.fillRect(0, 0, this.colorPatchContext.canvas.width, this.colorPatchContext.canvas.height)
    this.colorPatchContext.font = '18px Arial'
    this.colorPatchContext.fillStyle = 'white'
    this.colorPatchContext.fillText(color, 10, 40)
    alpha = (alpha + 0.2 > 1.0) ? 1.0 : alpha + 0.2;
    this.alphaSlider.opacity = alpha
  }
}