/**
 * 方块类
 * @param {Canvas Context上下文} _ctx 
 * @param {方块原点坐标x} _x 
 * @param {方块原点坐标y} _y 
 * @param {方块旋转角度} _dir
 */
function Square(_ctx, _x=0, _y=0, _dir = 0) {
  this.origin = {
    x: _x,
    y: _y
  }

  this.squareData = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ]

  // 绘制方块
  for(let i = 0; i < this.squareData[_dir].length; i++) {
    for(let j = 0; j < this.squareData[_dir][0].length; j++) {
      if(this.squareData[_dir][i][j] == 1) {
        _ctx.fillStyle = '#f00'
        _ctx.fillRect(_x * 30 + j * 30, _y * 30 + i * 30, 30, 30)
        _ctx.fillStyle = '#000'
        _ctx.strokeRect(_x * 30 + j * 30, _y * 30 + i * 30, 30, 30)
      }
    }
  }
}