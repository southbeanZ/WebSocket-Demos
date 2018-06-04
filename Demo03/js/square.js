/**
 * 方块基础类
 * @param {Canvas Context上下文} _ctx 
 * @param {方块原点坐标x} _x 
 * @param {方块原点坐标y} _y 
 * @param {方块旋转角度} _dir
 */
function Square(_ctx, _x=0, _y=0, _dir = 0) {
  this.ctx = _ctx
  this.dir = _dir
  this.origin = {
    x: _x,
    y: _y
  }

  this.squareData = []
}

// 渲染方块
Square.prototype.renderView = function() {  
  for(let i = 0; i < this.squareData[this.dir].length; i++) {
    for(let j = 0; j < this.squareData[this.dir][0].length; j++) {
      if(this.squareData[this.dir][i][j] == 1) {
        this.ctx.fillStyle = '#f00'
        this.ctx.fillRect(this.origin.x * 30 + j * 30, this.origin.y * 30 + i * 30, 30, 30)
        this.ctx.fillStyle = '#000'
        this.ctx.strokeRect(this.origin.x * 30 + j * 30, this.origin.y * 30 + i * 30, 30, 30)
      }
    }
  }
}