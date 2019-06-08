### 장점
    websocket은 IE10 부터지만, socket.io는 IE8 부터 지원됨 (사실상 다됨)

### 설치
    npm i socket.io --save

### Events
    connection, disconnect, disconnecting(끊어지기 전), error

### Object
    id, rooms, handsake (query, host, url, user-agent(접속정보), cookie)

### Room
    socket.broadcast.emit(...) 나 제외 모든이에게, 방무관
    socket.broadcast.to('roomid').emit(...) 이방의 나를 제외한 모두
    io.to('roomid').emit(...) 이 방의 모두 나를포함, io가 socket의 상위개념

### Basic code
```sh
// 소켓은 단독 실행 또는 웹서버 실행이 가능하다.
// 하지만 서버가 처리해줄 것들도 많기 때문에 보통 서버에서 실행시킨다.
const util = require('util');
const webserver = app.listen(7000,) ...webserver

// 웹서버에 소켓을 붙인다.
const io = require('socket.io').listen(webserver, {
    log         : false,
    origins     : '*:*',
    pingInterval: 3000,
    pingTimeout : 5000
});

// sockets 모든 소켓의 연결에 대해서
io.sockets.on('connection', (socket, opt) => {

    // 특정 소켓에 메시지 발송
    socket.emit('message', {msg: 'Welcome!!'});

    // 특정 소켓에 메시지 받으면
    socket.on('message', (data, fn) => {
        util.log('message >> ', data.msg, Object.keys(socket.rooms));
    });
});
```