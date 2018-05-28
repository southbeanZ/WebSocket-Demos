## WebSocket 入门基础知识-Demo01

### 1. WebSocket是什么？
WebSocket是一种在单个TCP连接上进行全双工通讯的协议。
- 借助于WebSocket，浏览器和服务器只需要完成一次握手，就可以创建持久性的连接，并进行双向数据传输。
- Websocket使用ws或wss的统一资源标志符。类似于HTTPS，wss表示在TLS之上的Websocket。
- Websocket使用与HTTP相同的TCP端口，可以绕过大多数防火墙的限制。默认情况下，Websocket协议使用80端口；运行在TLS之上时，默认使用443端口。
- [WebSocket官网](https://www.websocket.org/echo.html)

### 2.WebSocket基本API
- 新建一个WebSocket
  ```
  let socket = new WebSocket('wss://echo.websocket.org/')
  ```
  其中，`wss://echo.websocket.org/`为WebSocket提供的一个测试服务，返回服务器收到的消息，故名为回声echo。
- 事件
  ```
  socket.onopen = (e) => {
    // 连接开启
  }
  socket.onclose = (e) => {
    // 连接关闭
  }
  socket.onmessage = (e) => {
    // 接收到消息，获取消息内容 e.data
  }
  socket.onerror = (e) => {
    // 连接出现错误
  }
  ```
- 发送数据
  ```
  socket.send(msg) //msg为数据
  ```

### 3.NodeJs搭建自己的WebSocket服务器
为了在Node环境下搭建一个WebSocket服务器，需要借助npm模块，在本Demo中使用基础的[nodejs-websocket](https://www.npmjs.com/package/nodejs-websocket)。
该模块的使用较为简单，通过`createServer`方法创建一个服务器，`listen`设定端口。具体使用可查看本demo中的server.js及官方文档。
需要注意的是，该模块发送数据的方法`sendText`仅支持字符串，因此在使用中如果要传输JSON格式的数据需要进行序列化处理。
