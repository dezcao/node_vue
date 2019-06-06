### 모듈을 제공하는 쪽은 export
    받는 쪽은 require로 받는다.
    node.js는 파일시스템에 관해서 기본제공하는 라이브러리가 포함되어 있다.
    그래서 별도 모듈 설치없이 바로 받겠다고 해주면 된다. require('fs');

### 그밖에 거의 필수적인 모듈들 설치해준다.

```sh
 npm i express (express-koa, 경량화 시켜준것도 있다.)
 npm i ejs
 npm i body-parser (리퀘스트의 파라미터 파싱용)
 npm i mysql
 npm i nodemon -g (개발중 자동 재시작 해줌.)
 npm i bluebird --save (connection pool, transaction, Kludgy)
```

 <pre>
 </pre>
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
