import { COREHTML5, requestNextAnimationFrame } from "./corehtml5"
export class Runner {
  constructor(canvas, spritesheetUrl) {
    this.context = document.getElementById(canvas).getContext('2d')
    this.PAGEFLIP_INTERVAL = 100
    this.ANIMATION_DURATION = 3900
    this.SPRITE_TOP = 0
    this.BASELINE = canvas.height - 79.5
    this.TICK_HEIGHT = 8.5
    this.TREE_VELOCITY = 20
    this.FAST_TREE_VELOCITY = 40
    this.SKY_VELOCITY = 8
    this.GRASS_VELOCITY = 75

    this.WIDTH = this.RIGHT - this.LEFT
    this.LEFT = 1.5
    this.interval = undefined
    this.lastAdvance = 0
    this.lastMove = 0
    this.spritesheetUrl = spritesheetUrl
    this.grassOffset = 0
    this.treeOffset = 0
    this.nearTreeOffset = 0
    this.lastTime = 0
    this.fps = 0
    this.skyOffset = 0
    this.sky = new Image()
    this.tree = new Image()
    this.nearTree = new Image()
    this.grass = new Image()
    this.grass2 = new Image()
    this.spritesheet = new Image()
    this.runnerCells = [
      { left: 0, top: 0, width: 400, height: 300 },
      { left: 800, top: 0, width: 400, height: 300 },
      { left: 1200, top: 0, width: 400, height: 300 },
      { left: 1600, top: 0, width: 400, height: 300 },
      { left: 2000, top: 0, width: 400, height: 300 },
      { left: 24000, top: 0, width: 400, height: 300 },
      { left: 0, top: 300, width: 400, height: 300 },
      { left: 800, top: 300, width: 400, height: 300 },
      { left: 1200, top: 300, width: 400, height: 300 },
      { left: 1600, top: 300, width: 400, height: 300 },
      { left: 2000, top: 300, width: 400, height: 300 },
      { left: 2400, top: 300, width: 400, height: 300 }
    ]
    this.SPRITE_LEFT = this.context.canvas.width - this.runnerCells[0].width
    this.RIGHT = this.context.canvas.width - this.runnerCells[0].width

    this.animationTimer = new COREHTML5.AnimationTimer(this.ANIMATION_DURATION, COREHTML5.AnimationTimer.makeEaseInOut(2))
    this.runInPlace = {
      execute: (sprite, context, time) => {
        var elapsed = this.animationTimer.getElapsedTime()
        if (this.lastAdvance === 0) {
          this.lastAdvance = elapsed
        } else if (this.lastAdvance !== 0 && (elapsed - this.lastAdvance > this.PAGEFLIP_INTERVAL)) {
          sprite.painter.advance()
          this.lastAdvance = elapsed
        }
      }
    }
    this.moveLeftToRight = {
      reset: () => {
        this.lastMove = 0
      },
      execute: (sprite, context, time) => {
        var elapsed = this.animationTimer.getElapsedTime(), advanceElapsed = elapsed - this.lastMove
        if (this.lastMove === 0) {
          this.lastMove = elapsed
        } else {
          sprite.left -= (advanceElapsed / 1000) * sprite.velocityX
          this.lastMove = elapsed
        }
      }
    }
    this.tree.src = '../../../assets/images/tree.png'
    this.nearTree.src = '../../../assets/images/nearTree.png'
    this.grass.src = '../../../assets/images/grass.png'
    this.grass2.src = '../../../assets/images/grass2.png'
    this.sky.src = '../../../assets/images/sky.jpg'
    this.spritesheet.src = this.spritesheetUrl
    this.sprite = new COREHTML5.Sprite('runner', new COREHTML5.SpriteSheetPainter(this.runnerCells, this.spritesheet), [this.moveLeftToRight, this.runInPlace])
    this.sprite.left = this.SPRITE_LEFT
    this.sprite.top = this.SPRITE_TOP
    this.sprite.velocityX = 100
    this.drawAxis()
    this.spritesheet.addEventListener('load', () => {
      this.sprite.paint(this.context)
    })
    this.sky.addEventListener('load', () => {
      this.drawScenes()
    })
  }
  drawScenes() {
    this.context.save()
    this.skyOffset = this.skyOffset < this.context.canvas.width ? this.skyOffset + this.SKY_VELOCITY / this.fps : 0;
    this.grassOffset = this.grassOffset < this.context.canvas.width ? this.grassOffset + this.GRASS_VELOCITY / this.fps : 0
    this.treeOffset = this.treeOffset < this.context.canvas.width ? this.treeOffset + this.TREE_VELOCITY / this.fps : 0
    this.nearTreeOffset = this.nearTreeOffset < this.context.canvas.width ? this.nearTreeOffset + this.FAST_TREE_VELOCITY / this.fps : 0
    this.context.save()
    this.context.translate(-this.skyOffset, 0)
    this.context.drawImage(this.sky, 0, 0)
    this.context.drawImage(this.sky, this.sky.width - 2, 0)
    this.context.restore()

    this.context.save()
    this.context.translate(-this.treeOffset, 0)
    this.context.drawImage(this.tree, 10, this.context.canvas.height - this.tree.height - 20)
    this.context.drawImage(this.tree, 778, this.context.canvas.height - this.tree.height - 20)
    this.context.restore()

    this.context.save()
    this.context.translate(-this.nearTreeOffset, 0)
    this.context.drawImage(this.nearTree, 272, this.context.canvas.height - this.tree.height)
    this.context.drawImage(this.nearTree, 1040, this.context.canvas.height - this.tree.height)
    this.context.restore()

    this.context.save()
    this.context.translate(-this.grassOffset, 0)
    this.context.drawImage(this.grass2, 0, this.context.canvas.height - this.grass2.height)
    this.context.drawImage(this.grass2, this.grass2.width, this.context.canvas.height - this.grass2.height)
    this.context.restore()
  }
  endAnimation() {
    this.animationTimer.stop()
    this.lastAdvance = 0
    this.sprite.painter.cellIndex = 0
    this.sprite.left = this.SPRITE_LEFT
    this.animationTimer.reset()
    this.moveLeftToRight.reset()
  }
  startAnimation() {
    this.animationTimer.start()
    requestNextAnimationFrame(this.animate.bind(this))
  }
  animate() {
    let time = +new Date()
    this.fps = this.calculateFps(time)
    ////////////////////////////////////////////////////////////////
    if (this.animationTimer.isRunning()) {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
      this.sprite.update(this.context, time)
      this.sprite.paint(this.context)
      this.drawTimeline()
      this.drawAxis()
      this.drawScenes

      if (this.animationTimer.isOver()) {
        this.endAnimation()
      }
      requestNextAnimationFrame(this.animate.bind(this))
    }
  }
  calculateFps(now) {
    var fps = 1000 / (now - this.lastTime)
    this.lastTime = now
    return fps
  }
  drawAxis() {
    this.context.lineWidth = 0.5
    this.context.strokeStyle = 'red'
    this.context.moveTo(this.LEFT, this.BASELINE)
    this.context.lineTo(this.RIGHT, this.BASELINE)
    this.context.stroke()
    for (var i = 0; i <= this.WIDTH; i += this.WIDTH / 20) {
      this.context.beginPath()
      this.context.moveTo(this.LEFT + i, this.BASELINE - this.TICK_HEIGHT / 2)
      this.context.lineTo(this.LEFT + i, this.BASELINE + this.TICK_HEIGHT / 2)
      this.context.stroke()
    }
    for (i = 0; i < this.WIDTH; i += this.WIDTH / 4) {
      this.context.beginPath()
      this.context.moveTo(this.LEFT + i, this.BASELINE - this.TICK_HEIGHT)
      this.context.lineTo(this.LEFT + i, this.BASELINE + this.TICK_HEIGHT)
      this.context.stroke()
    }
    this.context.beginPath()
    this.context.moveTo(this.RIGHT, this.BASELINE - this.TICK_HEIGHT)
    this.context.lineTo(this.RIGHT, this.BASELINE + this.TICK_HEIGHT)
    this.context.stroke()
  }
  drawTimeline() {
    var realElapsed = this.animationTimer.getElapsedTime(), realPercent = realElapsed / this.ANIMATION_DURATION;
    this.context.lineWidth = 0.5
    this.context.strokeStyle = 'rgba(0,0,255,0.5)'
    this.context.beginPath()
    this.context.moveTo(this.WIDTH - realPercent * this.WIDTH, 0)
    this.context.lineTo(this.WIDTH - realPercent * this.WIDTH, this.context.canvas.height)
    this.context.stroke()
  }
}