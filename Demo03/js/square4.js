/**
 * 方块类4——右L
 * @param {Canvas Context上下文} _ctx 
 * @param {方块原点坐标x} _x 
 * @param {方块原点坐标y} _y 
 * @param {方块旋转角度} _dir
 */
function Square4(_ctx, _x=0, _y=0, _dir = 0) {
  Square.call(this, _ctx, _x, _y, _dir)
  this.squareData = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ]
}

Square4.prototype = Object.create(Square.prototype)
Square4.prototype.constructor = Square4