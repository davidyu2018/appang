import { COREHTML5 } from './corehtml5'
export class RoundedRectangle {
  constructor(boxid, width, height) {
    this.roundedRectangle = new COREHTML5.RoundedRectangle('rgba(0,0,0,0.2)', 'darkgoldenrod', width, height)
    this.roundedRectangle.appendTo(document.getElementById(boxid))
    this.roundedRectangle.draw()
  }
  resize(width, height) {
    this.roundedRectangle.horizontalSizePercent = parseFloat(width) / 100
    this.roundedRectangle.verticalSizePercent = parseFloat(height) / 100
    this.roundedRectangle.resize(this.roundedRectangle.domElement.offsetWidth, this.roundedRectangle.domElement.offsetHeight)
    this.roundedRectangle.erase()
    this.roundedRectangle.draw()
  }
}