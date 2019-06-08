const express = require('express');
const app = express(),
      testJson = require('./test/test.json');

app.use(express.static('public')); // 정적자원 위치는 경로에 써줄필요 없다.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    //res.send("Hello Node.Js");
    //res.send(testJson);

    // ejs : __dirname/views/index.ejs
    res.render('index', {name : '홍길동', dir:__dirname});
});

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email; // req.body, req.query
    testJson.addr2 = req.query.aa; // localhost:7000/test/dezcao@naver.com?aa=1234
    res.json(testJson);
});

app.get('/socket', (req, res) => {
    
});

const server = app.listen(7000, function() {
    console.log("Express's started.... on port 7000");
});