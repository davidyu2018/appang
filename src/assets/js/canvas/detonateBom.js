import { COREHTML5, requestNextAnimationFrame } from "./corehtml5"

export class DetonateBom {
  constructor(canvas) {
    this.context = canvas.getContext('2d')
    this.BOMB_LEFT = 100
    this.BOMB_TOP = 80
    this.BOMB_WIDTH = 180
    this.BOMB_HEIGHT = 130
    this.NUM_EXPLOSION_PAINTERS = 8
    this.NUM_FUSE_PAINTERS = 9
    // Painters...............................................................
    this.bombPainter = new COREHTML5.ImagePainter('../../../../assets/images/bomb.png')
    this.bombNoFuserPainter = new COREHTML5.ImagePainter('../../../../assets/images/bomb-no-fuse.png')
    this.fuseBurningPainters = []
    this.explosionPainters = []
    // Animators..................................................................
    this.fuseBurningAnimator = new COREHTML5.SpriteAnimator(this.fuseBurningPainters, () => { this.bomb.painter = this.bombNoFuserPainter })
    this.explosionAnimator = new COREHTML5.SpriteAnimator(this.explosionPainters, () => { this.bomb.painter = this.bombNoFuserPainter })
    // Bomb.........................................................................................
    this.bomb = new COREHTML5.Sprite('bomb', this.bombPainter)

    this.bomb.left = this.BOMB_LEFT
    this.bomb.top = this.BOMB_TOP
    this.bomb.width = this.BOMB_WIDTH
    this.bomb.height = this.BOMB_HEIGHT
    for (var i = 0; i < this.NUM_FUSE_PAINTERS; ++i) {
      this.fuseBurningPainters.push(new COREHTML5.ImagePainter('../../../../assets/images/fuse-0' + i + '.png'))
    }
    for (var i = 0; i < this.NUM_EXPLOSION_PAINTERS; ++i) {
      this.explosionPainters.push(new COREHTML5.ImagePainter('../../../../assets/images/explosion-0' + i + '.png'))
    }
    requestNextAnimationFrame(this.animate.bind(this))

  }
  resetBombNoFuse() {
    this.bomb.painter = this.bombNoFuserPainter
  }
  detonate() {
    if (this.bomb.animating) return;
    this.fuseBurningAnimator.start(this.bomb, 2000)
    setTimeout(() => { // Wait for 3 seconds, then explode for 1 second
      this.explosionAnimator.start(this.bomb, 1000)
      setTimeout(() => { // Waint for 2 seconds, then reset to the original bomb image
        // this.bomb.painter = this.bombNoFuserPainter
        this.explosionAnimator.end(this.bomb, this.bombNoFuserPainter)
        // this.bomb.animating = false
        // requestNextAnimationFrame(this.animate.bind(this))
      }, 2000)
    }, 2000)
  }
  // Animation.................................................
  animate() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.bomb.paint(this.context)
    requestNextAnimationFrame(this.animate.bind(this))
  }
}