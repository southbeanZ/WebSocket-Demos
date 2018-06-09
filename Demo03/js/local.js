let oPage = {
  init: function() {
    this.initView()
    this.initEvent()
  },
  initView: function() {
    let gameView = document.getElementById('J_local_game'),
        nextView = document.getElementById('J_local_next'),
        scoreView = document.getElementById('J_local_score'),
        timeView = document.getElementById('J_local_time'),
        gameCtx = gameView.getContext('2d'),
        nextCtx = nextView.getContext('2d')
    this.game = new Game(gameCtx, nextCtx, scoreView, timeView, 10, 20)
  },
  initEvent: function() {
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 40:
          this.game.fastDown()
          break
        case 37:
          this.game.moveLeft()
          break
        case 39:
          this.game.moveRight()
          break
        case 38:
          this.game.rotate()
          break
        default:
      }
    })
    this.game.start()
  }
}

oPage.init()