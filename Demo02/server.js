const app = require('http').createServer(),
      io = require('socket.io')(app)

app.listen(3000)

let clientCount = 0

io.on('connection', (socket) => {
  console.log("New connection!")
  clientCount++
  socket.nickname = 'user' + clientCount
  io.emit('enter', socket.nickname + ' comes in.') //io.emit为广播消息，socket.emit为单独发送消息
  
  socket.on('message', (data) => {
    console.log(data)
    io.emit('message', socket.nickname + ' says: ' + data) //也支持发送JSON格式数据
  })

  socket.on('disconnect', () => {
    io.emit('leave', socket.nickname + ' left.')
  })
})