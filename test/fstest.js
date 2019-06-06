const fs = require('fs');
const util = require("util"); // 로그를 찍으면 시간이 나옴.

/**
 * __dirname : 
 * 현재 실행중인 js 파일의 경로, 
 * 이게 없이 파일을 찾게되면 
 * 커멘드를 입력중인 경로로부터 해당 파일을 찾을 것이다.
 */
util.log("when?", __dirname);
fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
    // 화살표 함수 내부에서의 this와 그냥 함수의 this 차이로 인해 vue에선 화살표 조심해야한다.
    if (err) return console.error(err);
    console.log("data async>> ", data);
});
console.log("-- data 파일읽기는 비동기라서 이녀석이 위 로그보다 먼저 찍힐것 --");

let data2 = fs.readFileSync(__dirname + '/test.json', 'utf-8');
console.log("data2 sync>> ", data2);
console.log("----- 동기 파일 읽기가 끝난 뒤에 읽히지, 비동기는 아직도 안왔네 ---");

// 파일 쓰기를 해보자.
// 문자열을 만들어준다.
const data3 = new Uint8Array(Buffer.from('Hello Node.js 2 '));

// 파일의 명칭과 저장경로를 만든다.
const msgfile = __dirname + '/message.txt';

// 파일을 쓴다. 경로, 써줄 문자열 전달하면 생겨버림.
fs.writeFile(msgfile, data3, (err) => {
  if (err) throw err;
  console.log('The file has been saved! ~~~ again and again and again');
});