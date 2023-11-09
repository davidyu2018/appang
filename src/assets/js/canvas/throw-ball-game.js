import { COREHTML5, requestNextAnimationFrame, windowToCanvas } from "./corehtml5";
export class ThrowBallGame {
  constructor(canvas) {
    this.context = document.getElementById(canvas).getContext('2d')

    this.BALL_RADIUS = 8;
    this.ARENA_LENGTH_IN_METERS = 10;
    this.INITIAL_LAUNCH_ANGLE = Math.PI / 4;
    this.launchAngle = this.INITIAL_LAUNCH_ANGLE;
    this.launchVelocity = 0
    this.BUCKET_X = 573
    this.BUCKET_Y = this.context.canvas.height - 150
    this.bucketImage = new Image()
    this.bucketImage.src = '../assets/images/bucket.png'
    this.pixelsPerMeter = this.context.canvas.width / this.ARENA_LENGTH_IN_METERS;
    this.elapsedTime = undefined;
    this.launchTime = undefined;
    this.score = 0;
    this.lastScore = 0;
    this.lastMouse = { left: 0, top: 0 };
    this.threePointer = false;
    this.needInstructions = true;
    this.ballInFlight = false
    const _this = this
    // 发射台绘制器
    this.launchPadPainter = {
      LAUNCHPAD_X: 50,
      LAUNCHPAD_Y: _this.context.canvas.height - 50,
      LAUNCHPAD_WIDTH: 50,
      LAUNCHPAD_HEIGHT: 12,
      LAUNCHPAD_FILL_STYLE: 'rgba(100,140,230,1)',
      paint: function (ledge, context) {
        context.save()
        context.fillStyle = this.LAUNCHPAD_FILL_STYLE
        context.fillRect(this.LAUNCHPAD_X, this.LAUNCHPAD_Y, this.LAUNCHPAD_WIDTH, this.LAUNCHPAD_HEIGHT)
        context.restore()
      }
    }
    this.ballPainter = {
      BALL_FILL_STYLE: 'brown',
      BALL_STROKE_STYLE: 'rgba(0,0,0,0.4)',
      paint: function (ball, context) {
        context.save()
        context.shadowColor = undefined
        context.lineWidth = 2
        context.fillStyle = this.BALL_FILL_STYLE
        context.strokeStyle = this.BALL_STROKE_STYLE
        context.beginPath()
        context.arc(ball.left, ball.top, ball.radius, 0, Math.PI * 2, false)
        context.clip()
        context.fill()
        context.stroke()
        context.restore()
      }
    }
    this.lob = {
      lastTime: 0,
      GRAVITY_FORCE: 9.81,
      applyGravity: function (elapsed) {
        _this.ball.velocityY = (this.GRAVITY_FORCE * elapsed) - (_this.launchVelocity * Math.sin(_this.launchAngle))
      },
      updateBallPosition: function (updateDelta) {
        _this.ball.left += _this.ball.velocityX * (updateDelta) * _this.pixelsPerMeter
        _this.ball.top += _this.ball.velocityY * (updateDelta) * _this.pixelsPerMeter
      },
      checkForThreePointer: function () {
        if (_this.ball.top < 0) {
          _this.threePointer = true
        }
      },
      checkBallBounds: function () {
        if (_this.ball.top > _this.context.canvas.height || _this.ball.left > _this.context.canvas.width) {
          _this.reset()
        }
      },
      execute: function (ball, context, time) {
        var updateDelta, elapsedFlightTime, elapsedFrameTime;
        if (_this.ballInFlight) {
          elapsedFrameTime = (time - this.lastTime) / 1000;
          elapsedFlightTime = (time - _this.launchTime) / 1000;
          this.applyGravity(elapsedFlightTime)
          console.log(elapsedFrameTime)
          this.updateBallPosition(elapsedFrameTime)
          this.checkForThreePointer()
          this.checkBallBounds()
        }
        this.lastTime = time
      }
    }
    this.catchBall = {
      ballInBucket: function () {
        return _this.ball.left > _this.bucket.left + _this.bucket.width / 2 && _this.ball.left < _this.bucket.left + _this.bucket.width && _this.ball.top > _this.bucket.top && _this.ball.top < _this.bucket.top + _this.bucket.height / 3;
      },
      adjustScore: function () {
        if (_this.threePointer) _this.lastScore = 3
        else _this.lastScore = 2
        this.score += this.lastScore
        // scoreboard.innerText = score
      },
      execute: function (bucket, context, time) {
        if (_this.ballInFlight && this.ballInBucket()) {
          _this.reset()
          this.adjustScore()
        }
      }
    }
    // 发射台精灵      // 球精灵         // 桶精灵
    this.launchPad = new COREHTML5.Sprite('launchPad', this.launchPadPainter)
    this.ball = new COREHTML5.Sprite('ball', this.ballPainter, [this.lob])
    this.bucket = new COREHTML5.Sprite('bucket', {
      paint: function (sprite, context) {
        context.drawImage(_this.bucketImage, _this.BUCKET_X, _this.BUCKET_Y)
      }
    }, [this.catchBall]);

    // Initaliaton.........
    this.ball.width = this.BALL_RADIUS
    this.ball.height = this.ball.width
    this.ball.left = this.launchPadPainter.LAUNCHPAD_X + this.launchPadPainter.LAUNCHPAD_WIDTH / 2
    this.ball.top = this.launchPadPainter.LAUNCHPAD_Y - this.ball.height / 2
    this.ball.radius = this.BALL_RADIUS
    this.context.lineWidth = 0.5
    this.context.strokeStyle = 'rgba(0,0,0,0.5)'
    this.context.shadowColor = 'rgba(0,0,0,0.5)'
    this.context.shadowOffsetX = 2
    this.context.shadowOffsetY = 2
    this.context.shadowBlur = 4

    this.bucketImage.onload = (e) => {
      this.bucket.left = this.BUCKET_X
      this.bucket.top = this.BUCKET_Y
      this.bucket.width = this.bucketImage.width
      this.bucket.height = this.bucketImage.height
    }
    requestNextAnimationFrame(this.animate.bind(this))
    this.listenerEvent(this.context.canvas)
  }

  animate() {
    let time = +new Date()
    this.elapsedTime = (time - this.launchTime) / 1000;
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    if (!this.ballInFlight) {
      this.drawGuidewire()
      this.updateBackgroundText()
      if (this.lastScore !== 0) setTimeout(() => { this.lastScore = 0 }, 1000)
    }
    this.launchPad.paint(this.context)
    this.launchPad.update(this.context, time)
    this.ball.paint(this.context)
    this.ball.update(this.context, time)
    this.bucket.paint(this.context)
    this.bucket.update(this.context, time)
    requestNextAnimationFrame(this.animate.bind(this))
  }
  drawGuidewire() {
    this.context.moveTo(this.ball.left, this.ball.top)
    this.context.lineTo(this.lastMouse.left, this.lastMouse.top)
    this.context.stroke()
  }
  updateBackgroundText() {
    var word, metrics;
    if (this.lastScore == 3) word = 'Three pointer!'
    else if (this.lastScore == 2) word = 'Nice shot!'
    else if (this.needInstructions) word = 'Click to launch ball'
    else return
    this.context.font = '42px Helvetica'
    metrics = this.context.measureText(word)
    this.context.save()
    this.context.shadowColor = undefined
    this.context.strokeStyle = 'rgb(80,120,210)'
    this.context.fillStyle = 'rgba(100,140,230,0.5)'
    this.context.fillText(word, this.context.canvas.width / 2 - metrics.width / 2, this.context.canvas.height / 2)
    this.context.strokeText(word, this.context.canvas.width / 2 - metrics.width / 2, this.context.canvas.height / 2)
    this.context.restore()
  }
  listenerEvent(canvas) {
    this.context.canvas.addEventListener('mousemove', (e) => {
      var loc, deltaX, deltaY;
      e.preventDefault(e)
      if (!this.ballInFlight) {
        loc = windowToCanvas(this.context, e.clientX, e.clientY)
        this.lastMouse.left = loc.x
        this.lastMouse.top = loc.y
        deltaX = Math.abs(this.lastMouse.left - this.ball.left)
        deltaY = Math.abs(this.lastMouse.top - this.ball.top)
        this.launchAngle = Math.atan(parseFloat(deltaY) / parseFloat(deltaX))
        this.launchVelocity = 4 * deltaY / Math.sin(this.launchAngle) / this.pixelsPerMeter
        // launchVelocityOutput.innerText = launchVelocity.toFixed(2)
        // launchAngleOutput.innerText = (launchAngle * 180 / Math.PI).toFixed(2)
      }
    }, false)
    this.context.canvas.addEventListener('mousedown', (e) => {
      var rect;
      e.preventDefault(e)
      if (!this.ballInFlight) {
        this.ball.velocityX = this.launchVelocity * Math.cos(this.launchAngle)
        this.ball.velocityY = this.launchVelocity * Math.sin(this.launchAngle)
        this.ballInFlight = true
        this.threePointer = false
        this.launchTime = +new Date()
      }
    }, false)
  }
  reset() {
    this.ball.left = this.launchPadPainter.LAUNCHPAD_X + this.launchPadPainter.LAUNCHPAD_WIDTH / 2
    this.ball.top = this.launchPadPainter.LAUNCHPAD_Y - this.ball.height / 2
    this.ball.velocityX = 0
    this.ball.velocityY = 0
    this.ballInFlight = false
    this.needInstructions = false
    this.lastScore = 0
  }
}