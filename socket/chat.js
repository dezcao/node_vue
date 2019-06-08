const util = require('util'); // 로그용 유틸
const express = require('express');
const app = express();
      app.use(express.static('public')); // 정적자원 위치는 이제 경로에 써줄필요 없다.
      app.set('views', __dirname);       // 샘플이기 때문에 프론트 화면를 같은 폴더에 두고싶다.
      app.set('view engine', 'ejs');
      app.engine('html', require('ejs').renderFile);

// 서버 생성
const hostname  = '127.0.0.1'; // 로컬호스트
const port      = 7000;
const server = app.listen(port, hostname, function() {
    console.log(`socket.io test server ready at http://${hostname}:${port}/`);
});

// 서버에 소켓연결.
const io = require('socket.io').listen(server, {
    log         : false,
    origins     : '*:*',    // 모든 url
    pingInterval: 3000,     // 3초, 클라이언트와 서버가 서로 살아있는지 체크. 디폴트 25초
    pingTimeout : 5000      // 응답 없을때 기다리는 시간, 디폴트 60초
});

// sockets 모든 소켓의 연결에 대해서
io.sockets.on('connection', (socket, opt) => {

    // 특정 소켓에 메시지 발송
    socket.emit('message', {msg: `Welcome!! ${socket.id}`});

    util.log('connection', socket.id, socket.handshake.query); // query는 url에 붙어 날아오는 값들

    // 방에 자동 조인 1.data(roomId)는 클라이언트가 준것, 2.fn은 콜백
    socket.on('join', (roomId, fn) => {
        // join 비동기함수임
        socket.join(roomId, function() {
            // 조인 후 콜백 함수
            util.log(`Join ${roomId} : ${Object.keys(socket.rooms)}`);
        });
    });

    // 방에 자동 떠나기, fn도 클라이언트가 줄수있다.
    socket.on('leave', (roomId, fn) => {
        socket.leave(roomId, function(){
            // 비동기 이기 때문에 안쪽에서 함수 돌렸다.
            if (fn) { // 함수가 있을때만 처리하도록
                fn();
            }
        });
    });

    // 방의 목록을 보자.
    socket.on('rooms', (fn) => {
        // 보내고 싶은 곳으로 보내면 된다. room으로 보내도 되고, 여기선 클라이언트가 전달한 함수에 다시 준다.
        if (fn) {
            fn(Object.keys(socket.rooms)); // 방목록을 함수에 넣어줬음.
        }
    });
    
    // 특정 소켓에 메시지
    // data : {room : roomid, msg : '내용'}; 클라이언트와 약속된 키 room, msg 등 맘대로.
    socket.on('message', (data, fn) => {
        util.log('message >> ', data.msg, Object.keys(socket.rooms));

        if (fn) {
            fn(data.msg);
        }
        // emit(이벤트, 정보);
        socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});
    });

    socket.on('messageOne', (socketId, msg, fn) => {
        socket.to(socketId).emit('message', {msg: msg});
    });
    
    // 소켓 끊기 roomId, fn 없을것.
    socket.on('disconnecting', (data) => {
        // 알아서 방정리도 해준다. 즉, socket.leave(roomId); 해줄필요 없음.
        // 참여된 방 자체를 아직 나가지는 않은 상태이다.
        util.log(`disconnecting ${socket.id} ${Object.keys(socket.rooms)}`);
    });

    socket.on('disconnect', (data) => {
        // 참여한 방 자체를 나간다.
        util.log(`disconnect ${socket.id} ${Object.keys(socket.rooms)}`);
    });
});


app.get('/', (req, res) => {
    res.render('chatClient', {name : '홍길동', dir:__dirname});
});

app.get('/socket', (req, res) => {
    res.render('chatClient', {name : 'chat', dir:__dirname});
});
