import { COREHTML5, ballPainter, requestNextAnimationFrame } from "./corehtml5";
export class VariousWaysMove {
  constructor(canvas) {
    this.context = canvas.getContext('2d')
    this.PUSH_ANIMATION_DURATION = 3600
    this.lastTime = undefined
    this.pushAnimationTimer = new COREHTML5.AnimationTimer(this.PUSH_ANIMATION_DURATION, COREHTML5.AnimationTimer.makeLinear())

    const arrow = 'RIGHT'
    this.moveBall = {
      resetBall: () => {
        this.ball.left = canvas.width / 2
        this.ball.top = canvas.height / 2
      },
      isBallOnLedge: () => {
        return this.ball.left + this.ball.width < canvas.width
      },
      updateBallPosition: (elapsed) => {
        if (arrow === 'LEFT') this.ball.left -= this.ball.velocityX * (elapsed / 1000)
        else this.ball.left += this.ball.velocityX * (elapsed / 1000)
      },
      execute: (ball, context, time) => {
        if (this.pushAnimationTimer.isRunning()) {
          var animationElapsed = this.pushAnimationTimer.getElapsedTime(), elapsed;
          if (this.lastTime != undefined) {
            elapsed = animationElapsed - this.lastTime
            this.moveBall.updateBallPosition(elapsed)
            if (this.moveBall.isBallOnLedge()) {
              if (this.pushAnimationTimer.isOver()) {
                this.pushAnimationTimer.stop()
              }
            } else {
              this.pushAnimationTimer.stop();
              this.moveBall.resetBall()
            }
          }
        }
        this.lastTime = animationElapsed
      }
    }
    this.ball = new COREHTML5.Sprite('ball', ballPainter, [this.moveBall])
    this.ball.width = 20
    this.ball.height = 20
    this.ball.left = canvas.width / 2
    this.ball.top = canvas.height / 2
    this.ball.velocityX = 20
    requestNextAnimationFrame(this.animate.bind(this))
  }
  moveToright(timewrap, strength) {
    this.pushAnimationTimer = new COREHTML5.AnimationTimer(this.PUSH_ANIMATION_DURATION, COREHTML5.AnimationTimer[timewrap](strength))
    this.pushAnimationTimer.start()
  }
  animate() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.ball.paint(this.context)
    this.ball.update(this.context)
    // this.arrow.paint(this.context)
    requestNextAnimationFrame(this.animate.bind(this))
  }
}



