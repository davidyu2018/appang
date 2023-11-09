const DEFAULT_ELASTIC_PASSES = 3
const AXIS_COLOR = 'black'
const TICKS_COLOR = 'black'
const AXIS_LINEWIDTH = 0.5
const TICK_WIDTH = 6
const AXIS_MARGIN = 80
const HORIZONTAL_TICK_SPACING = 10
const VERTICAL_TICK_SPACING = 10
const SPACE_BETWEEN_LABELS_AND_AXIS = 20
// General tools function..........................................................................................
const drawHorizontalAxis = function (context) {
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(context.canvas.width - AXIS_MARGIN, AXIS_ORIGIN.y)
  context.stroke()
}
const drawVerticalAxis = function (context) {
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(AXIS_ORIGIN.x, AXIS_MARGIN / 2)
  context.stroke()
}
const drawHorizontalAxisTicks = function (context) {
  const horizonTickSpacing = (context.canvas.width - 2 * AXIS_MARGIN) / 12
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  for (var i = 1; i < 12; ++i) {
    context.beginPath()
    // if (i % 5 === 0) deltaY = TICK_WIDTH;
    // else deltaY = TICK_WIDTH / 2
    context.moveTo(AXIS_ORIGIN.x + i * horizonTickSpacing, AXIS_ORIGIN.y)
    context.lineTo(AXIS_ORIGIN.x + i * horizonTickSpacing, AXIS_ORIGIN.y + TICK_WIDTH)
    context.stroke()
  }
}
const drawVerticalAxisTicks = function (context) {
  const verticalTickSpacing = (context.canvas.height - 1.5 * 80) / 7
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  // var deltaX
  for (var i = 1; i < 7; ++i) {
    context.beginPath()
    // if (i % 5 === 0) deltaX = TICK_WIDTH;
    // else deltaX = TICK_WIDTH / 2
    context.moveTo(AXIS_ORIGIN.x - TICK_WIDTH, AXIS_ORIGIN.y - i * verticalTickSpacing)
    context.lineTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y - i * verticalTickSpacing)
    context.stroke()
  }
}
const drawHorizontalAxisLabels = function (context) {
  const NUM_HORIZONTAL_TICKS = (context.canvas.width - 2 * AXIS_MARGIN) / HORIZONTAL_TICK_SPACING
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  context.textAlign = 'center'
  context.textBaseline = 'top'
  for (var i = 0; i <= NUM_HORIZONTAL_TICKS; ++i) {
    if (i % 5 === 0) {
      context.fillText(i, AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + SPACE_BETWEEN_LABELS_AND_AXIS)
    }
  }
}
const drawVerticalAxisLabels = function (context) {
  const NUM_VERTICAL_TICKS = (context.canvas.height - 2 * AXIS_MARGIN) / VERTICAL_TICK_SPACING
  const AXIS_ORIGIN = { x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN }
  context.textAlign = 'right'
  context.textBaseline = 'middle'
  for (var i = 0; i <= NUM_VERTICAL_TICKS; ++i) {
    if (i % 5 === 0) {
      context.fillText(i, AXIS_ORIGIN.x - SPACE_BETWEEN_LABELS_AND_AXIS, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING)
    }
  }
}
export const windowToCanvas = function (context, x, y) {
  var bbox = context.canvas.getBoundingClientRect()
  return {
    x: x - bbox.left * (context.canvas.width / bbox.width),
    y: y - bbox.top * (context.canvas.height / bbox.height)
  }
}
export const requestNextAnimationFrame = (function () {
  var originalWebkitMethod, wrapper = undefined, callback = undefined, geckoVersion = 0, userAgent = navigator.userAgent, index = 0, self = this;
  if (window.webkitRequestAnimationFrame) {
    wrapper = function (time) {
      if (time === undefined) {
        time = +new Date()
      }
      self.callback(time)
    }
    originalWebkitMethod = window.webkitRequestAnimationFrame
    window.webkitRequestAnimationFrame = function (callback, element) {
      self.callback = callback
      originalWebkitMethod(wrapper, element)
    }
  }
  if (window.mozRequestAnimationFrame) {
    index = userAgent.indexOf('rv:')
    if (userAgent.indexOf('Gecko') != -1) {
      geckoVersion = userAgent.substr(index + 3, 3)
      if (geckoVersion === '2.0') {
        window.mozRequestAnimationFrame = undefined
      }
    }
  }
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAmimationFrame || function (callback, element) {
    var start, finish;
    window.setTimeout(function () {
      start = +new Date()
      callback(start)
      finish = +new Date()
      self.timeout = 1000 / 60 - (finish - start)
    }, self.timeout)
  }
})()
export const drawGrid = function (canvas, color, stepx, stepy) {
  let context = canvas.getContext('2d')
  context.strokeStyle = color;
  context.lineWidth = 0.5;
  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath()
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height)
    context.stroke()
  }
  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath()
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i)
    context.stroke()
  }
}
// Draw round seal...........................................................................................
export const drawCircularText = function (canvas, string, startAngle, endAngle) {
  const TEXT_SIZE = 20
  let context = canvas.getContext('2d')
  let circle = { x: canvas.width / 2, y: canvas.height / 2, radius: 80 }
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = 'red'
  context.strokeStyle = 'orange'
  context.font = TEXT_SIZE + 'px Lucida Sans'
  context.lineWidth = 0.5
  var radius = circle.radius,
    angleDecrement = (startAngle - endAngle) / (string.length),
    angle = parseFloat(startAngle),
    index = 0,
    character;
  context.save()

  while (index < string.length) {
    character = string.charAt(index)
    context.save()
    context.beginPath()
    context.translate(circle.x + Math.cos(angle) * radius, circle.y - Math.sin(angle) * radius)
    context.rotate(Math.PI / 2 - angle)
    context.fillText(character, 0, 0)
    context.strokeText(character, 0, 0)
    angle -= angleDecrement
    index++;
    context.restore()
  }
  context.restore()
  //////////////////////////// new add
  context.beginPath()
  context.arc(circle.x, circle.y, radius + 20, 0, Math.PI * 2, false)
  context.strokeStyle = 'red'
  context.lineWidth = 4
  context.stroke()

}
// Axis Constructor.................................................................................................
class Axis {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.context.save()
    this.context.strokeStyle = AXIS_COLOR;
    this.context.fillStyle = 'rgba(100,140,230,0.8)'
    this.context.lineWidth = AXIS_LINEWIDTH;
    drawHorizontalAxis(this.context);
    drawVerticalAxis(this.context);
    this.context.lineWidth = 0.5;
    this.context.strokeStyle = TICKS_COLOR
    drawHorizontalAxisTicks(this.context)
    drawVerticalAxisTicks(this.context)

    this.context.restore()
    drawHorizontalAxisLabels(this.context)
    drawVerticalAxisLabels(this.context)
  }
}
// Pendulum..................................................................
class Pendulum {
  constructor(canvas) {
    this.context = document.getElementById(canvas).getContext('2d')
    this.PIVOT_Y = 20
    this.WEIGHT_RADIUS = 25
    this.PIVOT_RADIUS = 7
    this.INITIAL_ANGLE = Math.PI / 5
    this.ROD_LENGTH_IN_PIXELS = 300
    this.ROD_LENGTH = 0.8
    this.GRAVITY_FORCE = 32
    this.startTime = +new Date()
    this.elapsedTime = undefined
    this.pendulumPainter = {
      PIVOT_FILL_STYLE: 'rgba(0,0,0,0.2)',
      WEIGHT_SHADOW_COLOR: 'rgb(0,0,0)',
      PIVOT_SHADOW_COLOR: 'rgb(255,255,0)',
      STROKE_COLOR: 'rgb(100,100,195)',
      paint: function (pendulum, context) {
        this.drawRod(pendulum, context)
        this.drawWeight(pendulum, context)
        this.drawPivot(pendulum, context)

      },
      drawWeight: function (pendulum, context) {
        context.save()
        context.beginPath()
        context.arc(pendulum.weightX, pendulum.weightY, pendulum.weightRadius, 0, Math.PI * 2, false)
        context.clip()
        context.shadowColor = this.WEIGHT_SHADOW_COLOR
        context.shadowOffsetX = -4
        context.shadowOffsetY = -4
        context.shadowBlur = 8
        context.lineWidth = 2
        context.strokeStyle = this.STROKE_COLOR
        context.stroke()
        context.beginPath()
        context.arc(pendulum.weightX, pendulum.weightY, pendulum.weightRadius / 2, 0, Math.PI * 2, false)
        context.clip()
        context.shadowColor = this.PIVOT_SHADOW_COLOR
        context.shadowOffsetX = -4
        context.shadowOffsetY = -4
        context.shadowBlur = 8
        context.stroke()
        context.restore()
      },
      drawPivot: function (pendulum, context) {
        context.save()
        context.beginPath()
        context.shadowColor = undefined
        context.fillStyle = 'white'
        context.arc(pendulum.x + pendulum.pivotRadius, pendulum.y, pendulum.pivotRadius / 2, 0, Math.PI, false)
        context.fill()
        context.stroke()
        context.beginPath()
        context.fillStyle = this.PIVOT_FILL_STYLE
        context.arc(pendulum.x + pendulum.pivotRadius, pendulum.y, pendulum.pivotRadius, 0, Math.PI * 2, false)
        context.fill()
        context.stroke()
        context.restore()
      },
      drawRod: function (pendulum, context) {
        context.save()
        context.beginPath()
        context.moveTo(pendulum.x + pendulum.pivotRadius + pendulum.pivotRadius * Math.sin(pendulum.angle), pendulum.y + pendulum.pivotRadius * Math.cos(pendulum.angle))
        context.lineTo(pendulum.weightX - pendulum.weightRadius * Math.sin(pendulum.angle), pendulum.weightY - pendulum.weightRadius * Math.cos(pendulum.angle))
        context.stroke()
        context.restore()
      }
    }
    this.swing = {
      execute: (pendulum, context, time) => {
        pendulum.angle = pendulum.initialAngle * Math.cos(Math.sqrt(this.GRAVITY_FORCE / this.ROD_LENGTH) * this.elapsedTime)
        pendulum.weightX = pendulum.x + Math.sin(pendulum.angle) * pendulum.rodLength
        pendulum.weightY = pendulum.y + Math.cos(pendulum.angle) * pendulum.rodLength
      }
    }
    this.pendulum = new COREHTML5.Sprite('pendulum', this.pendulumPainter, [this.swing]);
    // initation..
    this.pendulum.x = this.context.canvas.width / 2
    this.pendulum.y = this.PIVOT_Y
    this.pendulum.weightRadius = this.WEIGHT_RADIUS
    this.pendulum.pivotRadius = this.PIVOT_RADIUS
    this.pendulum.initialAngle = this.INITIAL_ANGLE
    this.pendulum.angle = this.INITIAL_ANGLE
    this.pendulum.rodLength = this.ROD_LENGTH_IN_PIXELS
    this.context.lineWidth = 0.5
    this.context.strokeStyle = 'rgba(0,0,0,0.5)'
    this.context.shadowColor = 'rgba(0,0,0,0.5)'
    this.context.shadowOffsetX = 2
    this.context.shadowOffsetY = 2
    this.context.shadowBlur = 4
    this.context.stroke()
    requestNextAnimationFrame(this.animate.bind(this))
  }

  animate() {
    let time = +(new Date())
    this.elapsedTime = (time - this.startTime) / 1000;
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.pendulum.update(this.context, time)
    this.pendulum.paint(this.context)
    requestNextAnimationFrame(this.animate.bind(this))
  }
}
// Sprite Object Constructor................................................................................................
class Sprite {
  constructor(name, painter, behaviors) {
    if (name != undefined) this.name = name
    if (painter !== undefined) this.painter = painter
    this.top = 0
    this.left = 0
    this.width = 10
    this.height = 10
    this.velocityX = 0
    this.velocityY = 0
    this.visible = true
    this.animating = false
    this.behaviors = behaviors || []
    return this
  }
  paint(context) {
    if (this.painter !== undefined && this.visible) {
      this.painter.paint(this, context)
    }
  }
  update(context, time) {
    for (var i = 0; i < this.behaviors.length; ++i) {
      this.behaviors[i].execute(this, context, time)
    }
  }
}
// 1. Stork && Fill Painter.................................................................................
export const ballPainter = {
  paint: function (sprite, context) {
    var x = sprite.left + sprite.width / 2, y = sprite.top + sprite.height / 2, radius = sprite.width / 2, width = sprite.width, height = sprite.height, radius = sprite.width / 2;
    context.save()
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2, false)
    context.clip()
    context.shadowColor = 'rgba(0,0,0)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 3
    context.fillStyle = 'rgba(218,165,32,0.1)'
    context.fill()
    context.lineWidth = 2
    context.strokeStyle = 'rgb(100,100,195)'
    context.stroke()
    context.restore()
  }
}
// 2. Image Painter....................................................................................
class ImagePainter {
  constructor(imageUrl) {
    this.image = new Image()
    this.image.src = imageUrl
  }
  paint(sprite, context) {
    if (this.image.complete) {
      context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height)
    }
  }
}
// 3. Spritesheet Painter.....................................................................................................
class SpriteSheetPainter {
  constructor(cells, spritesheet) {
    this.cells = cells || []
    this.cellIndex = 0;
    this.spritesheet = spritesheet
  }
  advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0
    } else {
      this.cellIndex++
    }
  }
  paint(sprite, context) {
    var cell = this.cells[this.cellIndex]
    context.drawImage(this.spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height)
  }
}
//  Spriteanimator Maker ..............................................................................................
class SpriteAnimator {
  constructor(painters, elapsedCallback) {
    this.painters = painters || []
    this.elapsedCallback = elapsedCallback
    this.duration = 1000
    this.startTime = 0
    this.index = 0
  }
  end(sprite, originalPainter) {
    sprite.animating = false
    if (this.elapsedCallback) this.elapsedCallback(sprite)
    else sprite.painter = originalPainter
  }
  start(sprite, duration) {
    var endTime = (+new Date()) + duration, period = duration / (this.painters.length), animator = this, originalPainter = sprite.painter, lastUpdate = 0;
    this.index = 0
    sprite.animating = true
    sprite.painter = this.painters[this.index]
    requestNextAnimationFrame(function spriteAnimatorAnimate(time) {

      if (time < endTime) {
        if ((time - lastUpdate) > period) {
          sprite.painter = animator.painters[++animator.index]
          lastUpdate = time
        }
        requestNextAnimationFrame(spriteAnimatorAnimate)
      } else {
        animator.end(sprite, originalPainter)
      }
    })
  }
}
// Stopwatch Object Constructor.............................................................................................
class Stopwatch {
  constructor() {
    this.startTime = undefined
    this.elapsedTime = undefined
    this.running = false
  }
  start() {
    this.startTime = +new Date()
    this.elapsedTime = undefined
    this.running = true
  }
  stop() {
    this.elapsedTime = (+new Date()) - this.startTime
    this.running = false
  }
  getElapsedTime() {
    if (this.running) {
      return (+new Date()) - this.startTime
    } else {
      return this.elapsedTime
    }
  }
  isRunning() {
    return this.running
  }
  reset() {
    this.elapsedTime = 0
  }
}
// AnimationTimer Object Constructor..........................................................................................................
class AnimationTimer {
  constructor(duration, timeWarp) {
    if (timeWarp !== undefined) this.timeWarp = timeWarp
    if (duration !== undefined) this.duration = duration
    this.stopwatch = new Stopwatch()
  }
  start() {
    this.stopwatch.start()
  }
  stop() {
    this.stopwatch.stop()
  }
  getElapsedTime() {
    var elapsedTime = this.stopwatch.getElapsedTime(), percentComplete = elapsedTime / this.duration
    if (!this.stopwatch.running) return undefined
    if (this.timeWarp == undefined) return elapsedTime
    return elapsedTime * (this.timeWarp(percentComplete) / percentComplete)
  }
  isRunning() {
    return this.stopwatch.isRunning()
  }
  isOver() {
    return this.stopwatch.getElapsedTime() > this.duration
  }
  reset() {
    this.stopwatch.reset()
  }
  // 时间轴包装器
  static makeLinear = () => {
    return function (percentComplete) {
      return percentComplete;
    }
  }
  static makeEaseIn = (strength) => {
    return function (percentComplete) {
      return Math.pow(percentComplete, strength * 2)
    }
  }
  static makeEaseOut = (strength) => {
    return function (percentComplete) {
      return 1 - Math.pow(1 - percentComplete, strength * 2)
    }
  }
  static makeEaseInOut = () => {
    return function (percentComplete) {
      return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI)
    }
  }
  static makeElastic = (passes) => {
    passes = passes || DEFAULT_ELASTIC_PASSES
    return function (percentComplete) {
      return ((1 - Math.cos(percentComplete * Math.PI * passes)) * (1 - percentComplete)) + percentComplete;
    }
  }
  static makeBounce = (bounces) => {
    var fn = AnimationTimer.makeElastic(bounces)
    return function (percentComplete) {
      percentComplete = fn(percentComplete)
      return percentComplete <= 1 ? percentComplete : (2 - percentComplete)
    }
  }
}
// RounderdRectange Ctroal Object constrouctor....................................................................................
class RoundedRectangle {
  constructor(strokeStyle, fillStyle, horizontalSizePercent = 100, verticalSizePercent = 100) {
    this.strokeStyle = strokeStyle ? strokeStyle : 'gray';
    this.fillStyle = fillStyle ? fillStyle : 'skyblue'
    this.SHADOW_COLOR = 'rgba(100,100,100,0.8)'
    this.SHADOW_OFFSET_X = 3
    this.SHADOW_OFFSET_Y = 3
    this.SHADOW_BLUR = 3
    this.setSizePercents(horizontalSizePercent, verticalSizePercent)
    this.createCanvas();
    this.createDOMElement()
  }
  // General function
  createCanvas() {
    var canvas = document.createElement('canvas')
    this.context = canvas.getContext('2d')
    return canvas
  }
  createDOMElement() {
    this.domElement = document.createElement('div')
    this.domElement.appendChild(this.context.canvas)
  }
  appendTo(element) {
    element.appendChild(this.domElement)
    this.domElement.style.width = element.offsetWidth + 'px'
    this.domElement.style.height = element.offsetHeight + 'px'
    this.resize(element.offsetWidth, element.offsetHeight)
  }
  resize(width, height) {
    this.HORIZONTAL_MARGIN = (width - width * this.horizontalSizePercent) / 2
    this.VERTICAL_MARGIN = (height - height * this.verticalSizePercent) / 2
    this.cornerRadius = (this.context.canvas.height / 2 - 2 * this.VERTICAL_MARGIN) / 2
    this.top = this.VERTICAL_MARGIN
    this.left = this.HORIZONTAL_MARGIN
    this.right = this.left + width - 2 * this.HORIZONTAL_MARGIN
    this.bottom = this.top + height - 2 * this.VERTICAL_MARGIN
    this.context.canvas.width = width
    this.context.canvas.height = height
  }
  setSizePercents(h, v) {
    this.horizontalSizePercent = h > 1 ? h / 100 : h
    this.verticalSizePercent = v > 1 ? v / 100 : v
  }
  //Drawing funciton
  fill() {
    var radius = (this.bottom - this.top) / 2
    this.context.save()
    this.context.shadowColor = this.SHADOW_COLOR
    this.context.shadowOffsetX = this.SHADOW_OFFSET_X
    this.context.shadowOffsetY = this.SHADOW_OFFSET_Y
    this.context.shadowBlur = 6
    this.context.beginPath()
    this.context.moveTo(this.left + radius, this.top)
    this.context.arcTo(this.right, this.top, this.right, this.bottom, radius)
    this.context.arcTo(this.right, this.bottom, this.left, this.bottom, radius)
    this.context.arcTo(this.left, this.bottom, this.left, this.top, radius)
    this.context.arcTo(this.left, this.top, this.right, this.top, radius)
    this.context.closePath()
    this.context.fillStyle = this.fillStyle
    this.context.fill()
    this.context.shadowColor = undefined
  }
  overlayGradient() {
    var gradient = this.context.createLinearGradient(this.left, this.top, this.left, this.bottom)
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)')
    this.context.fillStyle = gradient
    this.context.fill()
    this.context.lineWidth = 0.4
    this.context.strokeStyle = this.strokeStyle
    this.context.stroke()
    this.context.restore()
  }
  erase() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }
  draw(context) {
    var originalContext;
    if (context) {
      originalContext = this.context
      this.context = context
    }
    this.fill()
    this.overlayGradient()
    if (context) {
      this.context = originalContext
    }
  }

}
// Progressbar constrouctor............................................................................................
class Progressbar {
  constructor(strokeStyle, fillStyle, horizontalSizePercent, verticalSizePercent) {
    this.trough = new COREHTML5.RoundedRectangle(strokeStyle, fillStyle, horizontalSizePercent, verticalSizePercent);
    this.SHADOW_COLOR = 'rgba(255,255,255,0.5)'
    this.SHADOW_OFFSET_X = 2
    this.SHADOW_OFFSET_Y = 2
    this.SHADOW_BLUR = 3
    this.percentComplete = 0;
    this.createCanvas()
    this.createDOMElement()
    return this;
  }
  createCanvas() {
    var canvas = document.createElement('canvas')
    this.context = canvas.getContext('2d')
    this.offscreen = document.createElement('canvas').getContext('2d')
  }
  createDOMElement() {
    this.domElement = document.createElement('div')
    this.domElement.appendChild(this.context.canvas)
  }
  appendTo(element) {
    element.appendChild(this.domElement)
    this.domElement.style.width = element.offsetWidth + 'px'
    this.domElement.style.height = element.offsetHeight + 'px'
    this.resize()
    this.trough.resize(element.offsetWidth, element.offsetHeight)
    this.trough.draw(this.offscreen)
  }
  resize() {
    var domElementParent = this.domElement.parentNode, w = domElementParent.offsetWidth, h = domElementParent.offsetHeight;
    this.setCanvasSize()
    this.context.canvas.width = w;
    this.context.canvas.height = h;
    this.offscreen.canvas.width = w;
    this.offscreen.canvas.height = h;
  }
  setCanvasSize() {
    var domElementParent = this.domElement.parentNode
    this.context.canvas.width = domElementParent.offsetWidth
    this.context.canvas.height = domElementParent.offsetHeight
  }
  draw(percentComplete) {
    if (percentComplete > 0) {
      this.context.drawImage(this.offscreen.canvas, 0, 0, this.offscreen.canvas.width * (percentComplete / 100), this.offscreen.canvas.height, 0, 0, this.offscreen.canvas.width * (percentComplete / 100), this.offscreen.canvas.height);
    }
  }
  erase() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }
}
// Slider Object constrouctor...................................................................................................
class Slider {
  constructor(strokeStyle, fillStyle, knobPercent, hpercent, vpercent) {
    this.trough = new COREHTML5.RoundedRectangle(strokeStyle, fillStyle, hpercent || 90, vpercent || 50)
    this.knobPercent = knobPercent || 0
    this.strokeStyle = strokeStyle ? strokeStyle : 'gray'
    this.fillStyle = fillStyle ? fillStyle : 'skyblue'
    this.SHADOW_COLOR = 'rgba(100,100,100,0.8)'
    this.SHADOW_OFFSET_X = 3
    this.SHADOW_OFFSET_Y = 3
    this.HORIZONTAL_MARGIN = 2 * this.SHADOW_OFFSET_X
    this.VERTICAL_MARGIN = 2 * this.SHADOW_OFFSET_Y
    this.KNOB_SHADOW_COLOR = 'yellow'
    this.KNOB_SHADOW_OFFSET_X = 1
    this.KNOB_SHADOW_OFFSET_Y = 1
    this.KNOB_SHADOW_BLUR = 0
    this.KNOB_FILL_STYLE = 'rgba(255,255,255,0.45)'
    this.KNOB_STROKE_STYLE = 'rgba(0,0,150,0.45)'
    this.context = document.createElement('canvas').getContext('2d')
    this.changeEventListeners = []
    this.createDOMElement()
    this.addMouseHandlers()
  }
  createDOMElement() {
    this.domElement = document.createElement('div')
    this.domElement.appendChild(this.context.canvas)
  }
  appendTo(elementName) {
    document.getElementById(elementName).appendChild(this.domElement)
    this.setCanvasSize()
    this.resize()
  }
  setCanvasSize() {
    var domElementParent = this.domElement.parentNode
    this.context.canvas.width = domElementParent.offsetWidth
    this.context.canvas.height = domElementParent.offsetHeight
  }
  resize() {
    this.cornerRadius = (this.context.canvas.height / 2 - 2 * this.VERTICAL_MARGIN)
    this.top = this.HORIZONTAL_MARGIN
    this.left = this.VERTICAL_MARGIN
    this.right = this.left + this.context.canvas.width - 2 * this.HORIZONTAL_MARGIN
    this.bottom = this.top + this.context.canvas.height - 2 * this.VERTICAL_MARGIN
    this.trough.resize(this.context.canvas.width, this.context.canvas.height)
    this.knobRadius = this.context.canvas.height / 2 - this.context.lineWidth * 2
  }
  // Event handlers
  addMouseHandlers() {
    var slider = this
    this.domElement.onmouseover = function (e) {
      slider.context.canvas.style.cursor = 'crosshair'
    }
    this.domElement.onmousedown = function (e) {
      var mouse = windowToCanvas(slider.context, e.clientX, e.clientY)
      e.preventDefault()
      if (slider.mouseInTrough(mouse) || slider.mouseInKnob(mouse)) {
        slider.knobPercent = slider.knobPositionToPercent(mouse.x)
        slider.fireChangeEvent(e)
        slider.erase()
        slider.draw()
        slider.dragging = true
      }
    };
    this.domElement.onmousemove = function (e) {
      var mouse = null, percent = null;
      e.preventDefault()
      if (slider.dragging) {
        mouse = windowToCanvas(slider.context, e.clientX, e.clientY)
        percent = slider.knobPositionToPercent(mouse.x)
        if (percent >= 0 && percent <= 1.0) {
          slider.fireChangeEvent(e)
          slider.erase()
          slider.draw(percent)
        }
      }
    }
    this.domElement.onmouseup = function (e) {
      var mouse = null;
      e.preventDefault()
      if (slider.dragging) {
        slider.fireChangeEvent(e)
        slider.dragging = false
      }
    }
  }
  // Change events
  fireChangeEvent(e) {
    for (var i = 0; i < this.changeEventListeners.length; ++i) {
      this.changeEventListeners[i](e)
    }
  }
  addChangeListener(listenerFunction) {
    this.changeEventListeners.push(listenerFunction)
  }
  // Utility function
  mouseInKnob(mouse) {
    var position = this.knobPercentToPosition(this.knobPercent)
    this.context.beginPath()
    this.context.arc(position, this.context.canvas.height / 2, this.knobRadius, 0, Math.PI * 2)
    return this.context.isPointInPath(mouse.x, mouse.y)
  }
  mouseInTrough(mouse) {
    this.context.beginPath()
    this.context.rect(this.left, 0, this.right - this.left, this.bottom)
    return this.context.isPointInPath(mouse.x, mouse.y)
  }

  knobPositionToPercent(position) {
    var troughWidth = this.right - this.left - 2 * this.knobRadius
    return (position - this.left - this.knobRadius) / troughWidth
  }
  knobPercentToPosition(percent) {
    if (percent > 1) percent = 1
    if (percent < 0) percent = 0
    var troughWidth = this.right - this.left - 2 * this.knobRadius
    return percent * troughWidth + this.left + this.knobRadius
  }
  // Drawing function
  fillKnob(position) {
    this.context.save()
    this.context.shadowColor = this.KNOB_SHADOW_COLOR
    this.context.shadowOffsetX = this.KNOB_SHADOW_OFFSET_X
    this.context.shadowOffsetY = this.KNOB_SHADOW_OFFSET_Y
    this.context.shadowBlur = this.KNOB_SHADOW_BLUR
    this.context.beginPath()
    this.context.arc(position, this.top + ((this.bottom - this.top) / 2), this.knobRadius, 0, Math.PI * 2, false)
    this.context.clip()
    this.context.fillStyle = this.KNOB_FILL_STYLE
    this.context.fill()
    this.context.restore()
  }
  strokeKnob() {
    this.context.save()
    this.context.lineWidth = 1
    this.context.strokeStyle = this.KNOB_STROKE_STYLE
    this.context.stroke()
    this.context.restore()
  }
  drawKnob(percent) {
    if (percent < 0) percent = 0
    if (percent > 1) percent = 1
    this.knobPercent = percent
    this.fillKnob(this.knobPercentToPosition(percent))
    this.strokeKnob()
    // this.showKnobTicket()
  }
  // showKnobTicket() {
  //   var percent = new Number((this.knobPercent).toFixed(2))
  //   this.context.clearRect(0, 0, this.context.canvas.width, 30)
  //   this.context.fillRect(0, 0, this.context.canvas.width, 30)
  //   this.context.font = '12px Arial'
  //   this.context.fillStyle = 'orange'
  //   this.context.fillText(percent, this.context.canvas.width / 2, 10)
  // }
  drawTrough() {
    this.context.save()
    this.trough.fillStyle = this.fillStyle
    this.trough.strokeStyle = this.strokeStyle
    this.trough.draw(this.context)
    this.context.restore()
  }
  draw(percent) {
    this.context.globalAlpha = this.opacity
    if (percent === undefined) {
      percent = this.knobPercent
    }
    this.drawTrough()
    this.drawKnob(percent)
  }
  erase() {
    this.context.clearRect(this.left - this.knobRadius, 0 - this.knobRadius, this.context.canvas.width + 4 * this.knobRadius, this.context.canvas.height + 3 * this.knobRadius)
  }
}
// EnlargedView object constrouctor .................................................................................................
class EnlargedView {
  constructor(imageCanvas, image, viewportPercent, panCanvasAlpha) {
    var self = this
    this.imageCanvas = imageCanvas
    this.imageContext = imageCanvas.getContext('2d')
    this.image = image
    this.viewportPercent = viewportPercent || 10
    this.panCanvasAlpha = panCanvasAlpha || 0.5
    this.panCanvas = document.createElement('canvas')
    this.panContext = this.panCanvas.getContext('2d')
    this.domElement = document.createElement('div')
    this.domElement.appendChild(this.panCanvas)
    if (image.width == 0 || image.height || 0) {
      this.image.onload = function (e) {
        self.initialize()
      }
    } else {
      this.initialize()
    }
    return this
  }
  initialize() {
    var width = this.image.width * (this.viewportPercent / 100), height = this.image.height * (this.viewportPercent / 100);
    this.addEventHandlers()
    this.setupViewport(width, height);
    this.setupDOMElement(width, height)
    this.setupPanCanvas(width, height)
    this.draw()
  }
  setupPanCanvas(w, h) {
    this.panCanvas.width = w
    this.panCanvas.height = h
  }
  setupDOMElement(w, h) {
    this.domElement.style.width = w + 'px'
    this.domElement.style.height = h + 'px'
    this.domElement.className = 'pan'
  }
  setupViewport(w, h) {
    this.viewportLocation = { x: 0, y: 0 }
    this.viewportSize = { width: 50, height: 50 }
    this.viewportLastLocation = { x: 0, y: 0 }
    this.viewportSize.width = this.imageCanvas.width * this.viewportPercent / 100
    this.viewportSize.height = this.imageCanvas.height * this.viewportPercent / 100
  }
  moveViewport(mouse, offset) {
    this.viewportLocation.x = mouse.x - offset.x
    this.viewportLocation.y = mouse.y - offset.y
    var delta = {
      x: this.viewportLastLocation.x - this.viewportLocation.x,
      y: this.viewportLastLocation.y - this.viewportLocation.y
    }
    this.imageContext.translate(delta.x * (this.image.width / this.panCanvas.width), delta.y * (this.image.height / this.panCanvas.height))
    this.viewportLastLocation.x = this.viewportLocation.x
    this.viewportLastLocation.y = this.viewportLocation.y
  }
  isPointInViewport(x, y) {
    this.panContext.beginPath()
    this.panContext.rect(this.viewportLocation.x, this.viewportLocation.y, this.viewportSize.width, this.viewportSize.height)
    return this.panContext.isPointInPath(x, y)
  }
  addEventHandlers() {
    var pan = this;
    pan.domElement.onmousedown = function (e) {
      var mouse = windowToCanvas(pan.panContext, e.clientX, e.clientY), offset = null;
      e.preventDefault()
      if (pan.isPointInViewport(mouse.x, mouse.y)) {
        offset = { x: mouse.x - pan.viewportLocation.x, y: mouse.y - pan.viewportLocation.y }
        pan.panCanvas.onmousemove = function (e) {
          pan.erase()
          pan.moveViewport(windowToCanvas(pan.panContext, e.clientX, e.clientY), offset)
          pan.draw()
        };
        pan.panCanvas.onmouseup = function (e) {
          pan.panCanvas.onmouseover = undefined
          pan.panCanvas.onmouseup = undefined
        };
      }
    }
  }
  erase() {
    this.panContext.clearRect(0, 0, this.panContext.canvas.width, this.panContext.canvas.height)
  }
  drawPanCanvas(alpha) {
    this.panContext.save()
    this.panContext.globalAlpha = alpha
    this.panContext.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.panCanvas.width, this.panCanvas.height)
    this.panContext.restore()
  }
  drawImageCanvas() {
    this.imageContext.drawImage(this.image, 0, 0, this.image.width, this.image.height)
  }
  drawViewport() {
    this.panContext.shadowColor = 'rgba(0,0,0,0.4)'
    this.panContext.shadowOffsetX = 2
    this.panContext.shadowOffsetY = 2
    this.panContext.shadowBlur = 3
    this.panContext.lineWidth = 3
    this.panContext.strokeStyle = 'white'
    this.panContext.strokeRect(this.viewportLocation.x, this.viewportLocation.y, this.viewportSize.width, this.viewportSize.height)
  }
  clipToViewport() {
    this.panContext.beginPath()
    this.panContext.rect(this.viewportLocation.x, this.viewportLocation.y, this.viewportSize.width, this.viewportSize.height)
    this.panContext.clip()
  }
  draw() {
    this.drawImageCanvas()
    this.drawPanCanvas(this.panCanvasAlpha)
    this.panContext.save()
    this.clipToViewport()
    this.drawPanCanvas(1.0)
    this.panContext.restore()
    this.drawViewport()
  }
}
// Key constroueter
class Key {
  constructor() {
    this.left = 0
    this.top = 0
  }
  createPath(context) {
    context.beginPath()
    if (this.width > 0) context.moveTo(this.left + this.cornerRadius, this.prototype)
    else context.moveTo(this.left - this.cornerRadius, this.top)
    context.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + this.height, this.cornerRadius)
    context.arcTo(this.left + this.width, this.top + this.left, this.left, this.top, this.cornerRadius)
    if (this.width > 0) context.arcTo(this.left, this.top, this.left + this.cornerRadius, this.top, this.cornerRadius)
    else context.arcTo(this.left, this.top, this.left - this.cornerRadius, this.top, this.cornerRadius)
  }
  createKeyGradient(context) {
    var keyGradient = context.createLinearGradient(this.left, this.top, this.left, this.top + this.height)
    if (this.selected) {
      keyGradient.addColorStop(0, 'rgb(208,208,210)')
      keyGradient.addColorStop(1, 'rgb(162,162,166)')
    } else if (this.translucent) {
      keyGradient.addColorStop(0, 'rgba(298,298,300,0.2)')
      keyGradient.addColorStop(1, 'rgba(255,255,255,0.2)')
    } else {
      keyGradient.addColorStop(0, 'rgb(238,238,240)')
      keyGradient.addColorStop(1, 'rgb(192,192,196)')
    }
    return keyGradient
  }
  setKeyProperties(context, keyGradient) {
    context.shadowColor = 'rgba(0,0,0,0.8)'
    context.shadowOffsetX = 1
    context.shadowOffsetY = 1
    context.shadowBlur = 1
    context.lineWidth = 0.5
    context.strokeStyle = 'rgba(0,0,0,0.7)'
    context.fillStyle = keyGradient
  }
  setTextProperties(context) {
    context.shadowColor = undefined
    context.shadowOffsetX = 0
    context.font = '100 ' + this.height / 3 + 'px Helvetica'
    context.fillStyle = 'rgba(0,0,0,0.4)'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
  }
  draw(context) {
    var keyGradient = this.createKeyGradient(context)
    context.save()
    this.createPath(context)
    this.setKeyProperties(context, keyGradient)
    context.stroke()
    context.fill()
    this.setTextProperties(context)
    context.fillText(this.text, this.left + this.width / 2, this.top + this.height / 2)
    context.restore()
  }
  erase(context) {
    context.clearRect(this.left - 2, this.top - 2, this.width + 6, this.height + 6)
  }
  redraw(context) {
    this.erase(context)
    this.draw(context)
  }
  toggleSelection(context) {
    this.selected = !this.selected
  }
  isPointInKey(context, x, y) {
    this.createPath(context)
    return context.isPointInPath(x, y)
  }
  select() {
    this.selected = true
  }
  deselect() {
    this.selected = false
  }
}
// Keyboard 
class Keyboard {
  constructor() {
    var keyboard = this;
    this.keys = [
      [new COREHTML5.Key('Q'), new COREHTML5.Key('W'), new COREHTML5.Key('E'), new COREHTML5.Key('R'), new COREHTML5.Key('T'), new COREHTML5.Key('Y'), new COREHTML5.Key('U'), new COREHTML5.Key('I'), new COREHTML5.Key('O'), new COREHTML5.Key('P'), new COREHTML5.Key('<')],
      [new COREHTML5.Key('A'), new COREHTML5.Key('S'), new COREHTML5.Key('D'), new COREHTML5.Key('F'), new COREHTML5.Key('G'), new COREHTML5.Key('H'), new COREHTML5.Key('J'), new COREHTML5.Key('K'), new COREHTML5.Key('L'), new COREHTML5.Key('Enter')],
      [new COREHTML5.Key('^'), new COREHTML5.Key('Z'), new COREHTML5.Key('XE'), new COREHTML5.Key('C'), new COREHTML5.Key('V'), new COREHTML5.Key('B'), new COREHTML5.Key('N'), new COREHTML5.Key('M'), new COREHTML5.Key(','), new COREHTML5.Key('.'), new COREHTML5.Key('^')],
      [new COREHTML5.Key(';'), new COREHTML5.Key(':'), new COREHTML5.Key(' '), new COREHTML5.Key('?'), new COREHTML5.Key('!')],
    ]
    this.createCanvas()
    this.createDOMElement()
    this.translucent = false
    this.shifted = false
    this.keyListenerFunctions = []
    this.context.canvas.onmousedown = function (e) {
      keyboard.mouseDownOrTouchStart(keyboard.context, keyboard.windowToCanvas(keyboard.context.canvas, e.clientX, e.clientY))
      e.preventDefault()
    }
    this.context.canvas.ontouchstart = function (e) {
      keyboard.mouseDownOrTouchStart(keyboard.context, keyboard.windowToCanvas(keyboard.context.canvas, e.touches[0].clientX, e.touches[0].clientY))
      e.preventDefault()
    }
    return this
  }
  createCanvas() {
    var canvas = document.createElement('canvas')
    this.context = canvas.getContext('2d')
  }
  createDOMElement() {
    this.domElement = document.createElement('div')
    this.domElement.appendChild(this.context.canvas)
  }
  appendTo(elementName) {
    var element = document.getElementById(elementName)
    element.appendChild(this.domElement)
    this.domElement.style.width = element.offsetWidth + 'px'
    this.domElement.style.height = element.shadowOffsetHeight + 'px'
    this.resize(element.offsetWidth, element.offsetHeight)
    this.createKeys()
  }
  resize(width, height) {
    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'
    this.context.canvas.width = width
    this.context.canvas.height = height
  }
  // Drawing function
  drawRoundeRect(context, cornerX, cornerY, width, height, cornerRadius) {
    if (width > 0) {
      this.context.moveTo(cornerX + cornerRadius, cornerY)
    } else {
      this.context.moveTo(cornerX - cornerRadius, cornerY)
    }
    context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius)
    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius)
    if (width > 0) {
      context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius)
    } else {
      context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius)
    }
    context.stroke()
    context.fill()
  }
  drawKeys() {
    for (var row = 0; row < this.keyListenerFunctions.length; ++row) {
      for (var col = 0; col < this.keys[row].length; ++col) {
        key = this.keys[row][col]
        key.translucent = this.translucent
        key.draw(this.context)
      }
    }
  }
  draw(context) {
    var originalContext, key
    if (context) {
      originalContext = this.context
      this.context = context
    }
    this.context.save()
    this.drawKeys()
    if (context) this.context = originalContext
    this.context.restore()
  }
  erase() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }
  // Keys
  adjustKeyPosition(key, keyTop, keyMargin, keyWidth, spacebarPadding, row, col) {
    var
      keyMargin = this.domElement.clientWidth / (this.KEY_COLUMNS * 8),
      keyWidth = ((this.domElement.clientWidth - 2 * keyMargin / this.KEY_COLUMNS) - keyMargin),
      keyLeft = keyMargin + col * keyWidth + col * keyMargin;
    if (row === 1) keyLeft += keyWidth / 2
    if (row === 3) keyLeft += keyWidth / 3
    key.left = keyLeft + spacebarPadding
    key.top = keyTop
  }
  adjustKeySize(key, keyMargin, keyWidth, keyHeight) {
    if (key.text === 'Enter') key.width = keyWidth * 1.5
    else if (key.text === ' ') key.width = keyWidth * 7
    else key.width = keyWidth
    key.height = keyHeight
    key.cornerRadius = 5
  }
  createKeys() {
    var key, keyMargin, keyWidth, keyHeight, spacebarPadding = 0, row, col, keyTop;
    for (row = 0; row < this.keys.length; ++row) {
      for (col = 0; col < this.keys[row].length; ++col) {
        key = this.keys[row][col]
        keyMargin = this.domElement.clientWidth / (this.KEY_COLUMNS * 8)
        keyWidth = ((this.domElement.clientWidth - 2 * keyMargin) / this.KEY_COLUMNS) - keyMargin
        keyHeight = ((this.KEYBOARD_HEIGHT - 2 * keyMargin) / this.KEY_ROW) - keyMargin;
        keyTop = keyMargin + row * keyHeight + row * keyMargin
        this.adjustKeyPosition(key, keyTop, keyMargin, keyWidth, spacebarPadding, row, col)
        this.adjustKeySize(key, keyMargin, keyWidth, keyHeight)
        if (this.keys[row][col].text === ' ') {
          spacebarPadding = keyWidth * 6;
        }
      }
    }
  }
  getKeyForLocation(context, loc) {
    var key;
    for (var row = 0; row < this.keys.length; ++row) {
      for (var col = 0; col < this.keys[row].length; ++col) {
        key = this.keys[row][col]
        if (key.isPointInKey(context, loc.x, loc.y)) return key
      }
    }
    return null
  }
  shiftKeyPressed(context) {
    for (var row = 0; row < this.keys.length; ++row) {
      for (var col = 0; col < this.keys[row].length; ++col) {
        nextKey = this.keys[row][col]
        if (nextKey.text === '^') {
          nextKey.toggleSelection()
          nextKey.redraw(context)
          this.shifted = nextKey.selected
        }
      }
    }
  }
  activateKey(key, context) {
    key.select()
    setTimeout(function (e) {
      key.deselect()
      key.redraw(context)
    }, 200)
    key.redraw(context)
    this.fireKeyEvent(key)
  }
  // KEY listeners
  addKeyListener(listenerFunction) {
    this.keyListenerFunctions.push(listenerFunction)
  }
  fireKeyEvent(key) {
    for (var i = 0; i < this.keyListenerFunctions.length; ++i) {
      this.keyListenerFunctions[i](this.shifted ? key.text : key.text.toLowerCase())
    }
  }
  mouseDownOrTouchStart(context, loc) {
    var key = this.getKeyForLocation(context, loc)
    if (key) {
      if (key.text === '^') {
        this.shiftKeyPressed(context)
      } else {
        if (this.shifted) this.activateKey(key, context)
        else this.activateKey(key, context)
      }
    }
  }
}
// Game Engine constrouctor.............................................................................................................
class GameEngine {
  constructor(gameName, canvasId) {
    var self = this
    this.context = document.getElementById(canvasId).getContext('2d')
    this.gameName = gameName
    this.sprites = []
    this.keyListeners = []
    this.HIGH_SCORES_SUFFIX = '_highscores'
    // image loading
    this.imageLoadingProgressCallback = null
    this.images = {}
    this.imageUrls = []
    this.imagesLoaded = 0
    this.imagesFailedToLoad = 0
    this.imagesIndex = 0
    //Time
    this.startTime = 0
    this.lastTime = 0
    this.gameTime = 0
    this.fps = 0
    this.STARTING_FPS = 60
    this.paused = false
    this.startedPauseAt = 0
    this.PAUSE_TIMEOUT = 100
    // Sound
    this.soundOn = true
    this.soundChannels = []
    this.audio = new Audio()
    this.NUM_SOUND_CHANNELS = 10
    for (var i = 0; i < this.NUM_SOUND_CHANNELS; ++i) {
      var audio = new Audio()
      this.soundChannels.push(audio)
    }
    window.onkeypress = function (e) {
      self.keyPressed(e)
    }
    window.onkeydown = function (e) {
      self.keyPressed(e)
    }
    return this
  }
  getImage(imageUrl) {
    return this.images[imageUrl]
  }
  imageLoadedCallback(e) {
    this.imagesLoaded++;
  }
  imageLoadErrorCallback(e) {
    this.imagesFailedToLoad++
  }
  loadImage(imageUrl) {
    var image = new Image(), self = this;
    image.src = imageUrl
    image.addEventListener('load', function (e) {
      self.imageLoadedCallback(e)
    })
    image.addEventListener('error', function (e) {
      self.imageLoadErrorCallback(e)
    })
    this.images[imageUrl] = image
  }
  loadImages() {
    if (this.imagesIndex < this.imageUrls.length) {
      this.loadImage(this.imageUrls[this.imagesIndex])
      this.imagesIndex++;
    }
    return (this.imagesLoaded + this.imagesFailedToLoad) / this.imageUrls.length * 100
  }
  queueImage(imageUrl) {
    this.imageUrls.push(imageUrl)
  }
  // Game loop
  start() { // 设置游戏启动时间，并请求浏览器绘制下一帧动画，以此开始游戏实现游戏循环w'w
    var self = this
    this.startTime = (+new Date())
    requestNextAnimationFrame(function (time) {
      self.animate.call(self, time)
    })
  }
  animate(time) {
    var self = this
    if (this.paused) {
      setTimeout(function () {
        self.animate.call(self, time)
      }, this.PAUSE_TIMEOUT)
    } else {
      this.tick(time)
      this.clearScreen()
      this.startAnimate(time) // 引擎在播放每帧动画前都会调用此回调方法，默认不做任何事件。
      this.paintUnderSprites() // 引擎在绘制精灵前会调用此方法，默认不做任何事件。
      this.updateSprites(time) // 更新所有精灵对象
      this.paintSprites(time) // 绘制所有可见的精灵
      this.paintOverSprites() //引擎在绘制完精灵后会调用此方法，默认不做任何事件。
      this.endAnimate() // 引擎在播放每帧动画后都会调用此回调方法，默认不做任何事件。
      requestNextAnimationFrame(function (time) {
        self.animate.call(self, time)
      })
    }
  }
  tick(time) { // 在播放每帧动画前更新帧速率及游戏时间
    this.updateFrameRate(time)
    this.gameTime = ((+new Date())) - this.startTime
    this.lastTime = time
  }
  updateFrameRate(time) { // 更新游戏当前的帧速率
    if (this.lastTime === 0) this.fps = this.STARTING_FPS
    else this.fps = 1000 / (time - this.lastTime)
  }
  clearScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }
  updateSprites(time) {// 更新所有精灵对象
    for (var i = 0; i < this.sprites.length; ++i) {
      var sprite = this.sprites[i]
      sprite.update(this.context, time)
    }
  }
  paintSprites(time) { // 绘制所有可见的精灵
    for (var i = 0; i < this.sprites.length; ++i) {
      var sprite = this.sprites[i]
      if (sprite.visible) sprite.paint(this.context)
    }
  }
  togglePaused() {
    var now = (+new Date())
    this.paused = !this.paused
    if (this.paused) {
      this.startedPauseAt = now
    } else {
      this.startTime = this.startTime + now - this.startedPauseAt
      this.lastTime = now
    }
  }
  pixelsPerFrame(time, velocity) {
    return velocity / this.fps;
  }
  // High scores
  getHighScores() {
    var key = this.gameName + this.HIGH_SCORES_SUFFIX, highScoresString = localStorage[key]
    if (highScoresString == undefined) {
      localStorage[key] = JSON.stringify([])
    }
    return JSON.parse(localStorage[key])
  }
  setHighScore(highScore) {
    var key = this.gameName + this.HIGH_SCORES_SUFFIX, highScoresString = localStorage[key]
    highScores.unshift(highScore)
    localStorage[key] = JSON.stringify(highScores)
  }
  clearHighScores() {
    localStorage[this.gameName + this.HIGH_SCORES_SUFFIX] = JSON.stringify([])
  }
  // Key listeners
  addKeyListener(keyAndListener) {
    this.keyListeners.push(keyAndListener)
  }
  findKeyListener(key) {
    var listener = undefined
    for (var i = 0; i < this.keyListeners.length; ++i) {
      var keyAndListener = this.keyListeners[i], currentKey = keyAndListener.key;
      if (currentKey === key) listener = keyAndListener.listener
    }
    return listener
  }
  keyPressed(e) {
    var listener = undefined, key = undefined;
    switch (e.keyCode) {
      case 32: key = 'space'; break;
      case 68: key = 'd'; break;
      case 75: key = 'k'; break;
      case 83: key = 's'; break;
      case 80: key = 'p'; break;
      case 37: key = 'k'; break;
      case 39: key = 'left arrow'; break;
      case 38: key = 'right arrow'; break;
      case 40: key = 'down arrow'; break;
    }
    listener = this.findKeyListener(key)
    if (listener) listener()
  }
  // Sound
  canPlayOggVorbis() {
    return "" != this.audio.canPlayType('audio/ogg; codecs="vorbis"')
  }
  canPlayMp4() {
    return "" != this.audio.canPlayType('audio/mp4')
  }
  getAvailableSoundChannel() {
    var audio
    for (var i = 0; i < this.NUM_SOUND_CHANNELS; ++i) {
      audio = this.soundChannels[i];
      if (audio.played && audio.played.length > 0) {
        if (audio.ended) return audio
      } else {
        if (!audio.ended) return audio
      }
    }
    return undefined
  }
  playSound(id) {
    var channel = this.getAvailableSoundChannel(), element = document.getElementById(id)
    if (channel && element) {
      channel.src = element.src === '' ? element.currentSrc : element.src
      channel.load()
      channel.play()
    }
  }
  // Sprites
  addSprite(sprite) {
    this.sprites.push(sprite)
  }
  getSprite(name) {
    for (i in this.sprites) {
      if (this.sprites[i].name === name) return this.sprites[i]
    }
    return null
  }
  // 下面的方法没有做什么被动画函数调用。按照它们列出的顺序。按您的意愿覆盖它们 
  startAnimate(time) { }
  paintUnderSprites() { }
  paintOverSprites() { }
  endAnimate() { }
}
export const COREHTML5 = { Axis, Sprite, Pendulum, ImagePainter, SpriteSheetPainter, SpriteAnimator, Stopwatch, AnimationTimer, RoundedRectangle, Progressbar, Slider, EnlargedView, Key, Keyboard, GameEngine } || {}

