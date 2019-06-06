/** 
 * 모듈을 제공하는 쪽은 export
 * 받는 쪽은 require로 받는다.
 * node.js는 파일시스템에 관해서 기본제공하는 라이브러리가 포함되어 있다.
 * 그래서 별도 모듈 설치없이 바로 받겠다고 해주면 된다. require('fs');
 * 
 * 그밖에 설치에 거의 필수적인 모듈들 설치해준다.
 * npm i express (express-koa, 경량화 시켜준것도 있다.)
 * npm i ejs
 * npm i body-parser (리퀘스트의 파라미터 파싱용)
 * npm i mysql
 * npm i nodemon -g (개발중 자동 재시작 해줌.)
 * npm i bluebird --save (connection pool, transaction, Kludgy)
 * 
 * 
 * 다만 .gitignore에 node_modules를 추가하여 불필요한 업로드를 없앤다.
 * git pull을 한경우 최초 npm install 한방이면 모두 설치될 것이다.
 * 
 * git 설치 후
 * 참고, 형상관리 툴별 특징
 * -- csv
 * -- svn, csv를 대체함.
 * -- git
 * 
 * git 으로 관리하고 싶은 프로젝트의 디렉토리로 이동.
 * git init
 * git config --global user.name "이름"
 * git config --global user.email dezcao@naver.com
 * git config --list
 * 
 * git status
 * git add README (git add는 파일의 상태를 추적 + 수정한 파일을 Staged 상태만듬.)
 * cat .gitignore (무시할 파일을 만들어준다. window라면 cat 대신 type)
 * 
 * git remote add origin 깃주소(https) ***
 * git remote remove origin (잘못해서 지울때) * 
 * 
 * clone 해오기
 * git clone git://github.com/schacon/grit.git
 * 
 * ignore (항상 최상위 Directory에 존재해야한다.)
 * 
 * git pull
 * git push
 * git commit -a (add 수고를 덜기위해서 옵션 -a)
 * 
 * 참고로 visual studio code 재시작 해줘야 한다.
 * 
 * 프로그램 실행해 보기
 * node fstest.js
*/

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