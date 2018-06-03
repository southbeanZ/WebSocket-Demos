## 使用Socket.io 实现 WebSocket 服务器-Demo02

### Socket.io简介
- [Socket.io](https://socket.io/)是面向实时Web应用的JS库，主要基于WebSocket协议。
- Socket.io要求服务端和客户端都使用该框架。在服务端可以通过npm安装模块并使用；在客户端需要引入官方提供的JS文件。可以从CDN获取最新的客户端代码。
  ```
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
  ```

### 基本使用方法
- 建立一个服务器
  ```
  const app = require('http').createServer(),
      io = require('socket.io')(app)

  app.listen(3000)

  io.on('connection', (socket) => {
    // do something
  })
  ```
- 服务端接收消息
  ```
  socket.on(eventName, function() {
    //do something
  })
  ```
  可以通过eventName设置不同的消息类型，其中`error`、`disconnect`与`disconnecting`固定为错误、关闭、关闭中事件。
- 服务端发送消息
  ```
  socket.emit(eventName, data)  //给当前的socket连接发送消息
  io.emit(eventName, data)  //广播消息，即给所有的连接发送消息
  ```
- 客户端使用
  ```
  const socket = io('ws://localhost:3000');
  socket.on(eventName, (data) => {
    // do something
  });
  ...
  // 通过on监听各类消息
  ...
  ```
  通过本目录Demo可以运行一个简单的聊天页面。