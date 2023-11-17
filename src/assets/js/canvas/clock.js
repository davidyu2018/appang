import { COREHTML5, ballPainter, drawGrid, requestNextAnimationFrame } from './corehtml5'
export class Clock {
  constructor(canvas, x, y, radius) {
    this.context = canvas.getContext('2d')
    this.HOUR_HAND_TRUNCATION = 35
    if (x !== undefined) this.x = x
    else this.x = canvas.width / 2
    if (y !== undefined) this.y = y
    else this.y = canvas.height / 2
    if (radius !== undefined) this.radius = radius
    else this.radius = canvas.width / 2 - 15
    this.ballPainter = ballPainter
    this.ball = new COREHTML5.Sprite('ball', this.ballPainter)
    // initialzion
    this.context.lineWidth = 0.5
    this.context.strokeStyle = 'rgba(0,0,0,0.2)'
    this.context.shadowColor = 'rgba(0,0,0,0.5)'
    this.context.shadowOffsetX = 2
    this.context.shadowOffsetY = 2
    this.context.shadowBlur = 4
    this.context.stroke()
    requestNextAnimationFrame(this.animate.bind(this))
  }
  animate() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    drawGrid(this.context.canvas, 'lightgray', 10, 10)
    this.drawClockFace()
    this.drawHands()
    requestNextAnimationFrame(this.animate.bind(this))
  }
  drawClockFace() {
    this.context.beginPath()
    this.context.arc(this.context.canvas.width / 2, this.context.canvas.height / 2, this.radius, 0, Math.PI * 2, false)
    this.context.save()
    this.context.strokeStyle = 'rgba(0,0,0,0.2)'
    this.context.stroke()
    this.context.restore()
  }
  drawHands() {
    var date = new Date(), hour = date.getHours()
    this.ball.width = 10
    this.ball.height = 10
    this.drawHand(date.getSeconds(), false)
    hour = hour > 12 ? hour - 12 : hour
    this.ball.width = 20
    this.ball.height = 20
    this.drawHand(date.getMinutes(), false)
    this.ball.width = 30
    this.ball.height = 30
    this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5)
    this.ball.width = 10
    this.ball.height = 10
    this.ball.left = this.context.canvas.width / 2 - this.ball.width / 2
    this.ball.top = this.context.canvas.height / 2 - this.ball.height / 2
    this.ballPainter.paint(this.ball, this.context)
  }
  drawHand(loc, isHour) {
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2, handRadius = isHour ? this.radius - this.HOUR_HAND_TRUNCATION : this.radius,
      lineEnd = { x: this.context.canvas.width / 2 + Math.cos(angle) * (handRadius - this.ball.width / 2), y: this.context.canvas.height / 2 + Math.sin(angle) * (handRadius - this.ball.width / 2) }
    this.context.beginPath()
    this.context.moveTo(this.context.canvas.width / 2, this.context.canvas.height / 2)
    this.context.lineTo(lineEnd.x, lineEnd.y)
    this.context.strokeStyle = 'gray'
    this.context.stroke()
    this.ball.left = this.context.canvas.width / 2 + Math.cos(angle) * handRadius - this.ball.width / 2
    this.ball.top = this.context.canvas.height / 2 + Math.sin(angle) * handRadius - this.ball.height / 2
    this.ball.paint(this.context)
  }
}

/////------------------------- Tap (用于对后台返回的数据打印处理看)------------------------
const tap = value => fn => typeof fn === 'function' && fn(value); console.log(value);
/////------------------------- Once (对于某个给定的函数只需运行一次)------------------------
const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments))
  }
};
/////------------------------- Memoized (记忆某个计算结果-一个参数的)------------------------
const memoized = fn => {
  const lookupTable = {}
  return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg))
}
