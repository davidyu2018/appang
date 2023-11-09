import { COREHTML5 } from "./corehtml5"
class Point {

}
export class PinballGame {
  constructor(gameName, gameCanvasId) {
    this.pinball = new COREHTML5.GameEngine(gameName, gameCanvasId)
    this.FLIPPER_RISE_DURATION = 25
    this.FLIPPER_FALL_DURATION = 175
    this.MAX_FLIPPER_ANGLE = Math.PI / 4
    this.MIN_BALL_VELOCITY = 0
    this.GAME_HEIGHT_IN_METERS = 100
    this.LEFT_FLIPPER_PIVOT_X = 10
    this.LEFT_FLIPPER_PIVOT_OFFSET_X = 10
    this.LEFT_FLIPPER_PIVOT_Y = 10
    this.LEFT_FLIPPER_PIVOT_OFFSET_Y = 10
    this.ACTUATOR_LEFT = 20
    this.FLIPPER_BOTTOM = 20
    this.GRAVITY = 9.8
    this.seconds = 1000
    this.leftFlipperRiseTimer = new COREHTML5.AnimationTimer(this.FLIPPER_RISE_DURATION, COREHTML5.AnimationTimer.makeEaseOut(3))
    this.leftFlipperFallTimer = new COREHTML5.AnimationTimer(this.FLIPPER_FALL_DURATION, COREHTML5.AnimationTimer.makeEaseIn(3))
    this.leftFlipperAngle = 0
    this.loading = false
    this.launching = false
    this.gameOver = false
    this.livesLeft = 3
    this.ballOutOfPlay = false
    this.showPolygonsOnly = false
    this.showingHighScores = false
    this.showTryAgain = false
    this.backgroundImage = new Image()
    // ....... Declarations omitted for brevity
    this.lastBallPosition = new Point()
    this.ballMover = {
      execute: (sprite, context, time) => {
        if (!this.pinball.paused && !this.loading) {
          this.lastBallPosition.x = sprite.left;
          this.lastBallPosition.y = sprite.top;
          if (!this.launching && sprite.left < this.ACTUATOR_LEFT && (sprite.top > this.FLIPPER_BOTTOM || sprite.top < 0)) this.ballOutOfPlay = true
          sprite.left += this.pinball.pixelsPerFrame(time, sprite.velocityX)
          sprite.top += this.pinball.pixelsPerFrame(time, sprite.velocityY)
        }
      }
    }
    this.ballSprite = new COREHTML5.Sprite('ball', new COREHTML5.ImagePainter('../../../../assets/images/runner01.png'), [this.ballMover])
    this.pinball.addSprite(this.ballSprite)
    this.pinball.startAnimate = () => {
      var collisionOccurred;
      if (this.loading || this.pinball.paused || this.launching) return;
      if (!this.gameOver && this.livesLeft === 0) {
        this.over()
        return
      }
      if (this.ballOutOfPlay) {
        this.ballOutOfPlay = false
        this.prepareForLaunch()
        this.brieflyShowTryAgainImage(2000)
        this.livesLeft--;
        return
      }
      this.adjustRightFlipperCollisionPolygon()
      this.adjustLeftFlipperCollisionPolygon()
      collisionOccurred = this.detectCollisions()
      if (!collisionOccurred && this.applyGravityAndFriction) {
        this.applyGravityAndFriction()
      }
      this.pinball.queueImage('../../../../assets/images/bomb-no-fuse.png')
      this.pinball.loadImages()
    }
    this.pinball.paintUnderSprites = () => {
      if (this.loading) return;
      this.updateLeftFlipper()
      this.updateRightFlipper()
      if (this.showPolygonsOnly) {
        drawCollisionShapes()
      } else {
        if (!this.showingHighScores) {
          this.pinball.context.drawImage(this.backgroundImage, 0, 0)
          this.drawLitBumper()
          if (this.showTryAgain) {
            brieflyShowTryAgainImage(2000)
          }
          this.paintLeftFlipper()
          this.paintRightFlipper()
          for (var i = 0; i < this.livesLeft - 1; ++i) {
            this.drawExtraBall(i)
          }
        }
      }
    }
    this.pinball.start()
    // key event handler
    this.lastKeyListenerTime = 0
    this.pinball.addKeyListener({
      key: 'p',
      listener: function () {
        togglePaused()
      }
    })
    this.pinball.addKeyListener({
      key: 'k',
      listener: function () {
        if (!this.launching && !this.gameOver) {
          this.rightFlipperAngle = 0
          this.rightFlipperRiseTimer.start()
          this.pinball.playSound('flipper')
        }
      }
    })
    this.pinball.addKeyListener({
      key: 'p',
      listener: function () {
        togglePaused()
      }
    })
    this.pinball.addKeyListener({
      key: 'up arrow',
      listener: function () {
        var now;
        if (!this.launching || this.launchStep === 1) return
        now = +new Date()
        if (now - this.lastKeyListenerTime > 80) {
          this.lastKeyListenerTime = now
          this.launchStep--
          this.ballSprite.top = this.BALL_LAUNCH_TOP + (this.launchStep - 1) * 9;
          this.actuatorSprite.painter.image = this.launchImages[this.launchStep - 1]
          this.adjustActuatorPlatformShape()
        }
      }
    })
    this.pinball.addKeyListener({
      key: 'space',
      listener: function () {
        if (!this.launching && this.ballSprite.left === this.BALL_LAUNCH_LEFT && this.ballSprite.velocityY === 0) {
          this.launching = true;
          this.ballSprite.velocityY = 0;
          this.applyGravityAndFriction = false
          this.launchStep = 1
        }
        if (this.launching) {
          this.ballSprite.velocityY = -300 * this.launchStep
          this.launching = false
          this.launchStep = 1
          setTimeout(() => {
            this.actuatorSprite.painter.image = launchImages[0]
            this.adjustActuatorPlatformShape()
          }, 50)
          setTimeout(() => {
            this.applyGravityAndFriction = true
            this.adjustRightBoundaryAfterLaunch()
          }, 2000)
        }
      }
    })
    // Collision Detection
    this.shapes = []
    // ...
    this.fiveHunderBumper = new Circle(256, 187, 40)
    this.oneHunderBumperRight = new Circle(395, 328, 40)
    this.oneHunderBumperLeft = new Circle(116, 328, 40)
    this.fiftyBumper = new Circle(255, 474, 40)
    this.leftBoundary = new Polygon()
    this.rightBoundary = new Polygon()
    // ...
    this.leftBoundary.points.push(new Point(45, 235))
    this.leftBoundary.points.push(new Point(45, this.pinball.context.canvas.height))
    this.leftBoundary.points.push(new Point(-450, this.pinball.context.canvas.height))
    this.leftBoundary.points.push(new Point(-450, 235))
    this.leftBoundary.points.push(new Point(45, 235))
    this.leftBoundary.points.push(new Point(508, 235))
    this.leftBoundary.points.push(new Point(508, this.pinball.context.canvas.height))
    this.leftBoundary.points.push(new Point(508 * 2, this.pinball.context.canvas.height))
    this.leftBoundary.points.push(new Point(508 * 2, 235))
    this.leftBoundary.points.push(new Point(508, 235))
    // ...
    this.shapes.push(this.leftBoundary)
    this.shapes.push(this.rightBoundary)
  }
  applyGravityAndFriction(time) {
    var lastElapsedTime = time / 1000, gravityVelocityIncrease = this.GRAVITY * this.seconds * 0.5;
    if (Math.abs(this.ballSprite.velocityX) > this.MIN_BALL_VELOCITY) {
      this.ballSprite.velocityX *= Math.pow(0.2, lastElapsedTime)
    }
    this.ballSprite.velocityY += gravityVelocityIncrease * parseFloat(this.pinball.context.canvas.height / this.GAME_HEIGHT_IN_METERS)
  }
  updateLeftFlipper() {
    if (this.leftFlipperRiseTimer.isRunning()) {
      if (this.leftFlipperRiseTimer.isOver()) {
        this.leftFlipperRiseTimer.stop()
        this.leftFlipperAngle = this.MAX_FLIPPER_ANGLE
        this.leftFlipperFallTimer.start()
      } else {
        this.leftFlipperAngle = this.MAX_FLIPPER_ANGLE / this.FLIPPER_RISE_DURATION * this.leftFlipperRiseTimer.getElapsedTime()
      }
    } else if (this.leftFlipperFallTimer.isRunning()) {
      if (this.leftFlipperFallTimer.isOver()) {
        this.leftFlipperFallTimer.stop()
        this.leftFlipperAngle = 0
      } else {
        this.leftFlipperAngle = this.MAX_FLIPPER_ANGLE - this.MAX_FLIPPER_ANGLE / this.FLIPPER_FALL_DURATION * this.leftFlipperFallTimer.getElapsedTime()
      }
    }
  }
  updateRightFlipper() {

  }
  paintLeftFlipper() {
    if (this.leftFlipperRiseTimer.isRunning() || this.leftFlipperFallTimer.isRunning()) {
      this.game.context.save()
      this.game.context.translate(LEFT_FLIPPER_PIVOT_X, LEFT_FLIPPER_PIVOT_Y)
      this.game.context.rotage(-this.leftFlipperAngle);
      this.game.context.drawImage(this.game.getImage('images/leftFlipper.png'), -LEFT_FLIPPER_PIVOT_X, -LEFT_FLIPPER_PIVOT_Y)
      this.game.context.restore()
    } else {
      this.pinball.context.drawImage(this.pinball.getImage('../../../../assets/images/bomb-no-fuse.png'), this.LEFT_FLIPPER_PIVOT_X - this.LEFT_FLIPPER_PIVOT_OFFSET_X, this.LEFT_FLIPPER_PIVOT_Y - this.LEFT_FLIPPER_PIVOT_OFFSET_Y)
    }
  }
  paintRightFlipper() {

  }
  drawExtraBall(i) {

  }
  adjustRightFlipperCollisionPolygon() {

  }
  adjustLeftFlipperCollisionPolygon() {

  }
  collisionDetected(mtv) {
    return mtv.axis !== undefined && mtv.overlap !== 0
  }
  detectCollisions() {
    var mtv, shape, displacement, position, lastPosition;
    if (!this.launching && !this.loading && !this.pinball.paused) {
      this.ballShape.x = this.ballSprite.left
      this.ballShape.y = this.ballSprite.top
      this.ballShape.points = []
      this.ballShape.setPolygonPoints()
      position = new Vector(new Point(this.ballSprite.left, this.ballSprite.top))
      lastPosition = new Vector(new Point(this.lastBallPosition.x, this.lastBallPosition.y))
      displacement = position.subtract(lastPosition)
      for (var i = 0; i < this.shapes.length; ++i) {
        shape = shape[i]
        if (shape !== this.ballShape) {
          mtv = this.ballShape.collidesWith(shape, displacement)
          if (this.collisionDetected(mtv)) {
            this.updateScore(shape)
            setTimeout(() => { this.bumperLit = undefined }, 1000)
            if (shape === twoXBumperLeft || shape === twoXBumperRight || shape === fiveXBumperRight || shape === fiveXBumperLeft || shape === this.fiftyBumper || shape === this.oneHunderBumperLeft || shape === this.oneHunderBumperRight || shape === this.fiveHunderBumper) {
              this.pinball.playSound('bumper')
              bounce(mtv, shape, 4.5)
              bumperLit = shape
              return true
            } else if (shape === rightFlipperShape) {
              if (rightFlipperAngle === 0) {
                bounce(mtv, shape, 1 + rightFlipperAngle)
                return true
              }
            } else if (shape === leftFlipperShape) {
              if (leftFlipperAngle === 0) {
                bounce(mtv, shape, 1 + leftFlipperAngle)
                return true
              }
            } else if (shape === actuatorPlatformShape) {
              bounce(mtv, shape, 0.2)
              return true
            } else {
              bounce(mtv, shape, 0.96)
              return true
            }
          }
        }
      }
      detectFlipperCollision(LEFT_FLIPPER)
      detectFlipperCollision(RIGHT_FLIPPER)
      return flipperCollisionDetected
    }
    return false
  }
  clampBallVelocity() {
    if (this.ballSprite.velocityX > this.MAX_BALL_VELOCITY) this.ballSprite.velocityX = this.MAX_BALL_VELOCITY
    else if (this.ballSprite.velocityX < -this.MAX_BALL_VELOCITY) this.ballSprite.velocityX = -this.MAX_BALL_VELOCITY
    if (this.ballSprite.velocityY > this.MAX_BALL_VELOCITY) this.ballSprite.velocityY = this.MAX_BALL_VELOCITY
    else if (this.ballSprite.velocityY < -this.MAX_BALL_VELOCITY) this.ballSprite.velocityY = -this.MIN_BALL_VELOCITY
  }
  separate(mtv) {
    var dx, dy, velocityMagnitude, point, theta = 0, velocityVector = new Vector(new Point(this.ballSprite.velocityX, this.ballSprite.velocityY)), velocityUnitVector = velocityVector.normalize();
    if (mtv.axis.x === 0) {
      theta = Math.PI / 2
    } else {
      theta = Math.atan(mtv.axis.y / mtv.axis.x)
    }
    dy = mtv.overlap * Math.sin(theta)
    dx = mtv.overlap * Math.cos(theta)
    if (mtv.axis.x < 0 && dx > 0 || mtv.axis.x > 0 && dx < 0) dx = -dx;
    if (mtv.axis.y < 0 && dy > 0 || mtv.axis.y > 0 && dy < 0) dy = -dy;
    this.ballSprite.left += dx
    this.ballSprite.top += dy
  }
  checkMTVAxisDirection(mtv, shape) {
    var flipOrNot, centroid1 = new Vector(this.ballShape.centroid()), centroid2 = new Vector(shape.centroid()), centroidVector = centroid2.subtract(centroid1), centroidUnitVector = (new Vector(centroidVector)).normalize();
    if (centroidUnitVector.dotProduct(mtv.axis) > 0) {
      mtv.axis.x = -mtv.axis.x
      mtv.axis.y = -mtv.axis.y
    }
  }
  bounce(mtv, shape, bounceCoefficient) {
    var velocityVector = new Vector(new Point(this.ballSprite.velocityX, this.ballSprite.velocityY)), velocityUnitVector = velocityVector.normalize(), velocityVectorMagnitude = velocityVector.getMagnitude(), reflectAxis, point;
    this.checkMTVAxisDirection(mtv, shape)
    if (!this.loading && !this.pinball.paused) {
      if (mtv.axis !== undefined) {
        reflectAxis = mtv.axis.perpendicular()
      }
      this.separate(mtv)
      point = velocityUnitVector.reflect(reflectAxis);
      if (shape === leftFlipperShape || shape === rightFlipperShape) {
        if (velocityMagnitude < MIN_BALL_VELOCITY_OFF_FLIPPER) velocityMagnitude = MIN_BALL_VELOCITY_OFF_FLIPPER
      }
      this.ballSprite.velocityX = point.x * velocityMagnitude * bounceCoefficient
      this.ballSprite.velocityY = point.y * velocityMagnitude * bounceCoefficient
      this.clampBallVelocity()
    }
  }
  createDomePolygons(centerX, centerY, radius, sides) {
    var polygon, polygons = [], startTheta = 0, endTheta, midPointTheta, thetaDelta = Math.PI / sides, midPointRadius = radius * 1.5;
    for (var i = 0; i < sides; ++i) {
      polygon = new Polygon()
      endTheta = startTheta + thetaDelta;
      midPointTheta = startTheta + (endTheta - startTheta) / 2
      polygon.points.push(new Point(centerX + radius * Math.cos(startTheta), centerY - radius * Math.sin(startTheta)))
      polygon.points.push(new Point(centerX + midPointRadius * Math.cos(midPointTheta), centerY - midPointRadius * Math.sin(midPointTheta)))
      polygon.points.push(new Point(centerX + radius * Math.cos(endTheta), centerY - radius * Math.sin(endTheta)))
      polygon.points.push(new Point(centerX + radius * Math.cos(startTheta), centerY - radius * Math.sin(startTheta)))
      polygons.push(Polygon)
      startTheta += thetaDelta
    }
    return polygons
  }
  detectFlipperCollision(flipper) {
    var v1, v2, l1, l2, surface, ip, bbox = {}, riseTimer;
    bbox.top = 725
    bbox.bottom = 850
    if (flipper === LEFT_FLIPPER) {
      v1 = new Vector(leftFlipperBaselineShape.points[0].rotate(LEFT_FLIPPER_ROTATION_POINT, this.leftFlipperAngle))
      v2 = new Vector(leftFlipperBaselineShape.points[1].rotate(LEFT_FLIPPER_ROTATION_POINT, this.leftFlipperAngle))
      bbox.left = 170
      bbox.right = 265
      riseTimer = this.leftFlipperRiseTimer;
    } else if (flipper === RIGHT_FLIPPER) {
      v1 = new Vector(rightFlipperBaselineShape.points[0].rotate(RIGHT_FLIPPER_ROTATION_POINT, this.rightFlipperAngle))
      v2 = new Vector(rightFlipperBaselineShape.points[1].rotate(RIGHT_FLIPPER_ROTATION_POINT, this.rightFlipperAngle))
      bbox.left = 245
      bbox.right = 400
      riseTimer = this.rightFlipperRiseTimer;
    }
    if (!flipperCollisionDetected && riseTimer.isRunning() && (this.ballSprite.top + this.ballSprite.height) > bbox.top && this.ballSprite.left < bbox.right) {
      surface = v2.subtract(v1)
      l1 = new Line(new Point(this.ballSprite.left, this.ballSprite.top), this.lastBallPosition)
      l2 = new Line(new Point(v2.x, v2.y), new Point(v1.x, v1.y))
      ip = l1.intersectionPoint(12)
      if (ip.x > bbox.left && ip.x < bbox.right) {
        reflectVelocityAroundVector(surface.perpendicular())
        this.ballSprite.velocityX = this.ballSprite.velocityX * 3.5
        this.ballSprite.velocityY = this.ballSprite.velocityY * 3.5
        if (this.ballSprite.velocityY > 0) this.ballSprite.velocityY = -this.ballSprite.velocityY
        if (flipper === LEFT_FLIPPER && this.ballSprite.velocityX < 0) this.ballSprite.velocityX = -this.ballSprite.velocityX
        else if (flipper === RIGHT_FLIPPER && this.ballSprite.velocityX > 0) this.ballSprite.velocityX = -this.ballSprite.velocityX
      }
    }
  }
  drawLitBumper() {

  }
  prepareForLaunch() {

  }
  brieflyShowTryAgainImage() {

  }
  over() {

  }

}