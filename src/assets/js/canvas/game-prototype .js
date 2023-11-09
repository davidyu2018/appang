import { COREHTML5 } from "./corehtml5"
export class GamePrototype {
  constructor(gameName, gameCanvasId) {
    var self = this
    this.translateDelta = 0.025
    this.translateOffset = 0
    this.gameOver = false
    this.livesLeft = 3
    this.score = 0
    this.lastScore = 0
    this.lastScoreUpdate = undefined
    this.HIGH_SCORES_DISPLAYED = 10
    this.loading = false

    this.progressbar = new COREHTML5.Progressbar('rgba(0,0,0,0.2)', 'teal', 80, 4)

    this.game = new COREHTML5.GameEngine(gameName, gameCanvasId)
    // this.tree = new Image()
    // this.nearTree = new Image()
    // this.tree.src = '../../../assets/images/tree.png'
    // this.nearTree.src = '../../../assets/images/nearTree.png'
    // this.sprite1 = new COREHTML5.Sprite('farTree', {
    //   paint: (sprite, context) => {
    //     context.drawImage(this.tree, 210, 310)
    //   }
    // })
    // this.sprite2 = new COREHTML5.Sprite('nearTree', {
    //   paint: function (sprite, context) {
    //     context.drawImage(_this.bucketImage, _this.BUCKET_X, _this.BUCKET_Y)
    //   }
    // })
    // this.game.addSprite(this.sprite1)
    // this.game.addSprite(this.sprite2)

    this.game.paintUnderSprites = () => {
      if (!this.gameOver && this.livesLeft === 0) {
        this.over()
      } else {
        this.paintSun(this.game.context)
        this.paintFarClound(this.game.context, 20, 20)
        this.paintFarClound(this.game.context, this.game.context.canvas.width + 20, 20)
        if (!this.gameOver) {
          this.updateScore()
        }
        this.updateLivesDisplay()
      }
    }
    this.game.paintOverSprites = () => {
      this.paintNearClound(this.game.context, 120, 20)
      this.paintNearClound(this.game.context, this.game.context.width + 120, 20)
    }
    this.game.startAnimate = () => {
    }
    this.game.endAnimate = () => {

    }
    this.game.start()

    // key listenter
    this.game.addKeyListener({ key: 'p', listener: () => { this.game.togglePaused() } })
    // 当页面切换时 可暂停动画
    window.onblur = function windowOnBlur() {
      if (!self.gameOver && !self.game.paused) {
        self.game.togglePaused()
      }
    }
    window.onfocus = function windowOnFocus() {
      if (self.game.paused) {
        self.game.togglePaused()
      }
    }
  }

  // Paint function
  paintClouds(context) {
    this.paintFarClound(context, 0, 20)
    this.paintNearClound(context, this.game.context.canvas.width + 120, 20)
  }
  paintSun(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = 'orange';
    ctx.shadowColor = '#464646';
    ctx.shadowBlur = 1;
    ctx.arc(200, 50, 50, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore()
  }
  paintFarClound(context, x, y) {
    context.save()
    this.scrollBackgroud()
    // Paint far cloud with quadratic curves...
    var startX = 200;
    var startY = 100;
    var grdCenterX = 160;
    var grdCenterY = 40;
    context.beginPath();
    context.moveTo(startX, startY);
    context.bezierCurveTo(startX - 20, startY + 20, startX - 40, startY + 70, startX + 60, startY + 70);
    context.bezierCurveTo(startX + 80, startY + 100, startX + 150, startY + 100, startX + 170, startY + 70);
    context.bezierCurveTo(startX + 250, startY + 70, startX + 250, startY + 40, startX + 220, startY + 20);
    context.bezierCurveTo(startX + 260, startY - 40, startX + 200, startY - 50, startX + 170, startY - 30);
    context.bezierCurveTo(startX + 150, startY - 75, startX + 80, startY - 60, startX + 80, startY - 30);
    context.bezierCurveTo(startX + 30, startY - 75, startX - 20, startY - 60, startX, startY);
    context.closePath()

    var grd = context.createRadialGradient(grdCenterX, grdCenterY, 10, grdCenterX, grdCenterY, 200);
    grd.addColorStop(0, "whitesmoke");  //浅蓝色
    grd.addColorStop(1, "white");  //深蓝色
    context.fillStyle = grd;
    context.fill();
    context.scale(0.5, 0.5)

    context.lineWidth = 5;
    context.strokeStyle = "gray";
    // context.stroke();
    // Paint far cloud with quadratic curves...
    context.restore()
  }
  paintNearClound(context, x, y) {
    context.save()
    this.scrollBackgroud()
    this.scrollBackgroud() // 调2次是为了与远处的云产生视觉差
    // Paint far cloud with quadratic curves...
    var startX = 120;
    var startY = 200;
    var grdCenterX = 260;
    var grdCenterY = 80;
    context.beginPath();
    context.moveTo(startX, startY);
    context.bezierCurveTo(startX - 40, startY + 20, startX - 40, startY + 70, startX + 60, startY + 70);
    context.bezierCurveTo(startX + 80, startY + 100, startX + 150, startY + 100, startX + 170, startY + 70);
    context.bezierCurveTo(startX + 250, startY + 70, startX + 250, startY + 40, startX + 220, startY + 20);
    context.bezierCurveTo(startX + 260, startY - 40, startX + 200, startY - 50, startX + 170, startY - 30);
    context.bezierCurveTo(startX + 150, startY - 75, startX + 80, startY - 60, startX + 80, startY - 30);
    context.bezierCurveTo(startX + 30, startY - 75, startX - 20, startY - 60, startX, startY);
    context.closePath()

    var grd = context.createRadialGradient(grdCenterX, grdCenterY, 10, grdCenterX, grdCenterY, 200);
    grd.addColorStop(0, "whitesmoke");  //浅蓝色
    grd.addColorStop(1, "lightskyblue");  //深蓝色
    context.fillStyle = grd;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "gray";
    // context.stroke();
    context.restore()
  }
  scrollBackgroud() {
    this.translateOffset = (this.translateOffset + this.translateDelta) % this.game.context.canvas.width
    this.game.context.translate(-this.translateOffset, 0)
  }
  updateScore() {

  }
  updateLivesDisplay() {

  }
  /// fire game
  loadGame(progressbarBoxId, cb = null) {
    var interval, loadingPercentComplete;
    this.progressbar.appendTo(document.getElementById(progressbarBoxId))
    this.game.queueImage('../../../../assets/images/runner01.png')
    this.game.queueImage('../../../../assets/images/runner02.png')
    this.game.queueImage('../../../../assets/images/runner03.png')
    this.game.queueImage('../../../../assets/images/runner04.png')
    this.game.queueImage('../../../../assets/images/runner05.png')
    this.game.queueImage('../../../../assets/images/runner06.png')
    this.game.queueImage('../../../../assets/images/runner07.png')
    this.game.queueImage('../../../../assets/images/runner08.png')
    this.game.queueImage('../../../../assets/images/runner09.png')
    interval = setInterval(() => {
      loadingPercentComplete = this.game.loadImages()
      console.log('loadingPercentComplete', loadingPercentComplete)
      if (loadingPercentComplete === 100) {
        clearInterval(interval)
        setTimeout(() => {
          cb && cb(1)
          setTimeout(() => {
            cb && cb(2)
            setTimeout(() => {
              cb && cb(3)
              // this.game.playSound('sounds/pop')
              setTimeout(() => {
                cb && cb(4)
                this.loading = false
                this.score = 10
                // this.game.playSound('pop')
              }, 1000)
            }, 500)
          }, 500)
        }, 500)
      }
      this.progressbar.erase()
      this.progressbar.draw(loadingPercentComplete)
    }, 16);
  }
  togglePaused(cb) {
    this.game.togglePaused()
    cb && cb(this.game.paused)
  }
  over() {
    var highScore;
    highScores = this.game.getHighScores()
    if (highScores.length == 0 || this.score > highScores[0].score) {
      this.showHighSCores()
    } else {
      // this.gameOverToast.style.display = 'inline'
    }
    this.gameOver = true
    this.lastScore = this.score
    this.score = 0
  }

}