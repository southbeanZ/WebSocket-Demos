/**
 * 方块类3——左L
 * @param {Canvas Context上下文} _ctx 
 * @param {方块原点坐标x} _x 
 * @param {方块原点坐标y} _y 
 * @param {方块旋转角度} _dir
 */
function Square3(_ctx, _x=0, _y=0, _dir = 0) {
  Square.call(this, _ctx, _x, _y, _dir)
  this.squareData = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ]
}

Square3.prototype = Object.create(Square.prototype)
Square3.prototype.constructor = Square3