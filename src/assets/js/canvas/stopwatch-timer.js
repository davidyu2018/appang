import { COREHTML5, requestNextAnimationFrame } from "./corehtml5"
export class StopwatchTimer {
  constructor(canvasid, callback, timerSetting) {
    if (canvasid) this.context = document.getElementById(canvasid).getContext('2d')
    else return
    this.CENTROID_RADIUS = 10
    this.CENTROID_STROKE_STYLE = 'rgba(0,0,0,0.5)'
    this.CENTROID_FILL_STYLE = 'rgba(80,190,240,0.6)'
    this.RING_INNER_RADIUS = 35
    this.RING_OUTER_RADIUS = 55
    this.ANNOTATIONS_FILL_STYLE = 'rgba(3,3,23,0.9)'
    this.ANNOTATIONS_TEXT_SIZE = 12
    this.TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230,0.9)'
    this.TICK_SHORT_STROKE_STYLE = 'rgba(100,140,230,0.7)'
    this.TRACKING_DIAL_STROKING_STYLE = 'rgba(100,140,230,0.5)'
    this.GUIDEWIRE_STROKE_STYLE = 'goldenrod'
    this.GUIDEWIRE_FILL_STYLE = 'rgba(250,250,0,0.6)'
    this.TICK_WIDTH = 10

    this.stopwatch = new COREHTML5.Stopwatch()
    this.callback = callback || null
    this.timerSetting = timerSetting || 0
    this.keepTimerSetting = this.timerSetting
    this.drawDial(this.context, this.timerSetting)
  }
  animate() {
    if (this.stopwatch.isRunning() && this.stopwatch.getElapsedTime() > this.timerSetting * 1000) {
      this.timerSetting = this.keepTimerSetting
      this.stopwatch.stop()
      if (this.callback) {
        this.callback()
      }
    } else if (this.stopwatch.isRunning()) {
      this.drawDial(this.context, this.timerSetting - this.stopwatch.getElapsedTime() / 1000)
      requestNextAnimationFrame(this.animate.bind(this))
    }
  }
  start() {
    this.stopwatch.start()
    requestNextAnimationFrame(this.animate.bind(this))
    // this.stopwatch.reset()
  }
  pause() {
    this.pausePointerElapseTime = 0
    this.pausePointerElapseTime += (this.stopwatch.getElapsedTime() / 1000)
    this.stopwatch.stop()
  }
  continue() {
    this.stopwatch.start()
    this.timerSetting = this.timerSetting - this.pausePointerElapseTime
    requestNextAnimationFrame(this.animate.bind(this))
  }
  reset(time) {
    this.timerSetting = time
    this.stopwatch.stop()
    this.drawDial(this.context, this.timerSetting)
    this.stopwatch.reset()
  }
  // Draw Dial
  drawDial(context, timerSetting) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    let loc = { x: context.canvas.width / 2, y: context.canvas.height / 2, radius: 120 }
    context.shadowColor = 'rgba(0,0,0,0.4)'
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 4
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    this.drawCentroid(context, loc)
    this.drawCentroidGuidewire(context, loc, timerSetting)
    this.drawRing(context, loc)
    this.drawTickInnerCircle(context, loc)
    this.drawTicks(context, loc)
    this.drawAnnotations(context, loc)
  }
  drawCentroid(context, loc) {
    context.beginPath()
    context.save()
    context.strokeStyle = this.CENTROID_STROKE_STYLE
    context.fillStyle = this.CENTROID_FILL_STYLE
    context.arc(loc.x, loc.y, this.CENTROID_RADIUS, 0, Math.PI * 2, false)
    context.stroke()
    context.fill()
    context.restore()
  }
  drawCentroidGuidewire(context, loc, timerSetting = 0) {
    var setDegree = timerSetting * Math.PI / 30
    var angle = setDegree, radius, endpt;
    radius = loc.radius + this.RING_OUTER_RADIUS
    if (loc.x >= loc.x) {
      endpt = { x: loc.x - radius * Math.sin(angle), y: loc.y - radius * Math.cos(angle) }
    } else {
      endpt = { x: loc.x - radius * Math.cos(angle), y: loc.y - radius * Math.sin(angle) }
    }
    context.save()
    context.strokeStyle = this.GUIDEWIRE_STROKE_STYLE
    context.fillStyle = this.GUIDEWIRE_FILL_STYLE
    context.beginPath()
    context.moveTo(loc.x, loc.y)
    context.lineTo(endpt.x, endpt.y)
    context.stroke()
    context.beginPath()
    context.strokeStyle = this.TICK_LONG_STROKE_STYLE
    context.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false)
    context.fill()
    context.stroke()
    context.restore()
  }
  drawRing(context, loc) {
    this.drawRingOuterCircle(context, loc)
    context.strokeStyle = 'rgba(0,0,0,0.1)'
    context.arc(loc.x, loc.y, loc.radius + this.RING_INNER_RADIUS, 0, Math.PI * 2, false)
    context.fillStyle = 'rgba(100,140,230,0.1)'
    context.fill()
    context.stroke()
  }
  drawRingOuterCircle(context, loc) {
    context.shadowColor = 'rgba(0,0,0,0.7)'
    context.shadowOffsetX = 3
    context.shadowOffsetY = 3
    context.shadowBlur = 6
    context.strokeStyle = this.TRACKING_DIAL_STROKING_STYLE
    context.beginPath()
    context.arc(loc.x, loc.y, loc.radius + this.RING_OUTER_RADIUS, 0, Math.PI * 2, true)
    context.stroke()
  }
  drawTickInnerCircle(context, loc) {
    context.save()
    context.beginPath()
    context.strokeStyle = 'rgba(0,0,0,0.1)'
    context.arc(loc.x, loc.y, loc.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH, 0, Math.PI * 2, false)
    context.stroke()
    context.restore()
  }
  drawTick(context, loc, angle, radius, cnt) {
    var tickWidth = cnt % 10 === 0 ? this.TICK_WIDTH : this.TICK_WIDTH / 2
    context.beginPath()
    context.moveTo(loc.x + Math.cos(angle) * (radius - tickWidth), loc.y + Math.sin(angle) * (radius - tickWidth))
    context.lineTo(loc.x + Math.cos(angle) * (radius), loc.y + Math.sin(angle) * (radius))
    context.strokeStyle = this.TICK_SHORT_STROKE_STYLE
    context.stroke()
  }
  drawTicks(context, loc) {
    var radius = loc.radius + this.RING_INNER_RADIUS
    var ANGLE_MAX = 2 * Math.PI
    var ANGLE_DELTA = Math.PI / 30
    context.save()
    for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, cnt++) {
      this.drawTick(context, loc, angle, radius, cnt++)
    }
    context.restore()
  }
  drawAnnotations(context, loc) {
    var radius = loc.radius + this.RING_INNER_RADIUS
    context.save()
    context.fillStyle = this.ANNOTATIONS_FILL_STYLE
    context.font = this.ANNOTATIONS_TEXT_SIZE + 'PX Arial'
    for (var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 30) {
      context.beginPath()
      if ((angle * 30 / Math.PI).toFixed(0) % 5 === 0 && (angle * 30 / Math.PI).toFixed(0) !== '60') {
        context.fillText((angle * 30 / Math.PI).toFixed(0), loc.x - Math.sin(angle) * (radius - this.TICK_WIDTH * 2), loc.y - Math.cos(angle) * (radius - this.TICK_WIDTH * 2))
      }
    }
    context.restore()
  }
}