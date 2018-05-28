const ws = require('nodejs-websocket')

let clientCount = 0

const server = ws.createServer((conn) => {
  console.log("New connection!")
  clientCount++
  conn.nickname = 'user' + clientCount
  let msg = {
    'type': 'enter',
    'txt': conn.nickname + ' comes in.'
  }
  broadcastMsg(msg)
  conn.on('text', (msg) => {
    console.log("Rec: " + msg)
    msg = {
      'type': 'message',
      'txt': conn.nickname + ' says: ' + msg
    }
    broadcastMsg(msg)
  })
  conn.on('close', (code, reason) => {
    console.log("Connection closed!")
    msg = {
      'type': 'leave',
      'txt': conn.nickname + ' leave.'
    }
    broadcastMsg(msg)
  })
  conn.on('error', (err) => {
    console.log("Error:" + err)
  })
}).listen(3000)

function broadcastMsg(data) {
  // 序列化JSON数据
  str = JSON.stringify(data)
  server.connections.forEach((conn) => {
    conn.sendText(str)
  })
}