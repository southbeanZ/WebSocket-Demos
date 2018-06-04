/**
 * 游戏类
 * @param {游戏区域Context} gameCtx 
 * @param {下一步区域Context} nextCtx 
 * @param {游戏区域宽度，个数非像素} gameWidth 
 * @param {游戏区域高度，同上} gameHeight 
 */
function Game(gameCtx, nextCtx, gameWidth, gameHeight) {
  this.gameCtx = gameCtx
  this.nextCtx = nextCtx
  this.gameWidth = gameWidth
  this.gameHeight = gameHeight
  this.squareDir = 0
  this.squareCur = this.generateSquare(gameCtx, 3, 0, 0)
  this.squareNext = this.generateSquare(nextCtx)
  // this.squareCur = new Square(gameCtx, 3, 0, 0)
  // this.squareNext = new Square(nextCtx)

  // 初始化游戏区域， 0:无方块 1:运动中方块 2:静止方块
  this.gameData = []
  for(let i = 0; i < gameHeight; i++) {
    this.gameData[i] = []
    for(let j = 0; j < gameWidth; j++) {
      this.gameData[i][j] = 0
    }
  }

  this.squareCur.renderView()
  this.squareNext.renderView()
}

// 清除之前的游戏数据
Game.prototype.clearPrevView = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y
  for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
    for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
      if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
        this.gameData[curY + i][curX + j] = 0
      }
    }
  }
}

// 判断是否还可以移动
Game.prototype.canMove = function(nextDir, nextX, nextY) {
  for(let i = 0; i < this.squareCur.squareData[nextDir].length; i++) {
    for(let j = 0; j < this.squareCur.squareData[nextDir][0].length; j++) {
      if(this.squareCur.squareData[nextDir][i][j] == 2) {
        return false;
      } else if(this.squareCur.squareData[nextDir][i][j] == 1) {
        if(nextX + j < 0 || nextX + j >= this.gameWidth) {
          return false;
        }
        if(nextY + i < 0 || nextY + i >= this.gameHeight) {
          return false;
        }
      }
    }
  }
  return true;
}

// 向下移动
Game.prototype.moveDown = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y
  if(this.canMove(this.squareDir, curX, curY+1)) {
    this.clearPrevView()
    for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
      for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
        if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
          this.gameData[curY + i + 1][curX + j] = 1
        }
      }
    }
    this.squareCur.origin.y++
    if(this.isBottom()) {
      this.squareCur = this.squareNext
      this.squareCur.origin.x = 3
      this.squareCur.origin.y = 0
      this.squareCur.ctx = this.gameCtx
      this.squareCur.renderView()
      this.squareNext = this.generateSquare(this.nextCtx)
      this.renderNextView()     
    }
    this.renderView()
  }
}

// 向左移动
Game.prototype.moveLeft = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y
  if(this.canMove(this.squareDir, curX-1, curY)) {
    this.clearPrevView()
    for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
      for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
        if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
          this.gameData[curY + i][curX + j - 1] = 1
        }
      }
    }
    this.squareCur.origin.x--
    if(this.isBottom()) {
      this.squareCur = this.squareNext
      this.squareCur.origin.x = 3
      this.squareCur.origin.y = 0
      this.squareCur.ctx = this.gameCtx
      this.squareCur.renderView()
      this.squareNext = this.generateSquare(this.nextCtx)
      this.renderNextView()
    }
    this.renderView()
  }
}

// 向右移动
Game.prototype.moveRight = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y
  if(this.canMove(this.squareDir, curX+1, curY)) {
    this.clearPrevView()
    for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
      for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
        if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
          this.gameData[curY + i][curX + j + 1] = 1
        }
      }
    }
    this.squareCur.origin.x++
    if(this.isBottom()) {
      this.squareCur = this.squareNext
      this.squareCur.origin.x = 3
      this.squareCur.origin.y = 0
      this.squareCur.ctx = this.gameCtx
      this.squareCur.renderView()
      this.squareNext = this.generateSquare(this.nextCtx)
      this.renderNextView()
    }
    this.renderView()
  }
}

// 旋转方块
Game.prototype.rotate = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y,
      tmpDir = (this.squareDir + 1) % 4
  if(this.canMove(tmpDir, curX, curY)) {
    this.clearPrevView()
    this.squareDir = tmpDir
    for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
      for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
        if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
          this.gameData[curY + i][curX + j] = 1
        }
      }
    }
    if(this.isBottom()) {
      this.squareCur = this.squareNext
      this.squareCur.origin.x = 3
      this.squareCur.origin.y = 0
      this.squareCur.ctx = this.gameCtx
      this.squareCur.renderView()
      this.squareNext = this.generateSquare(this.nextCtx)
      this.renderNextView()
    }
    this.renderView()
  }
}

// 渲染游戏
Game.prototype.renderView = function() {
  this.gameCtx.clearRect(0, 0, this.gameWidth * 30, this.gameHeight * 30)
  for(let i = 0; i < this.gameHeight; i++) {
    for(let j = 0; j < this.gameWidth; j++) {
      if(this.gameData[i][j] > 0) {
        this.gameCtx.fillStyle = this.gameData[i][j] == 1? '#f00' : '#ddd'
        this.gameCtx.fillRect(j * 30, i * 30, 30, 30)
        this.gameCtx.strokeRect(j * 30, i * 30, 30, 30)
      }
    }
  }
}

// 渲染下一个方块区域
Game.prototype.renderNextView = function() {
  this.nextCtx.clearRect(0, 0, 120, 120)
  this.squareNext.renderView()
}

// 随机产生方块
Game.prototype.generateSquare = function(ctx, x=0, y=0) {
  let type = Math.floor(Math.random() * 7),
      dir = Math.floor(Math.random() * 4)
      squares = [Square1, Square2, Square3, Square4, Square5, Square6, Square7]
  return new squares[type](ctx, x, y, dir);
}

// 判断是否着地
Game.prototype.isBottom = function() {
  let curX = this.squareCur.origin.x,
      curY = this.squareCur.origin.y,
      isBottom = false
  for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
    for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
      if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
        if(isBottom || (curY + i + 1 >= this.gameHeight) || (this.gameData[curY + i + 1][curX + j] == 2)) {
          isBottom = true
          break;
        }
      }
    }
    if(isBottom) {
      break;
    }
  }
  if(isBottom) {
    for(let i = 0; i < this.squareCur.squareData[this.squareDir].length; i++) {
      for(let j = 0; j < this.squareCur.squareData[this.squareDir][0].length; j++) {
        if(this.squareCur.squareData[this.squareDir][i][j] == 1) {
          this.gameData[curY + i][curX + j] = 2
        }
      }
    }
  }
  return isBottom
}

this.Game = Game;