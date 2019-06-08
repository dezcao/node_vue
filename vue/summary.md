### WebPack
```sh
https://d2.naver.com/helloworld/0239818

현대의 웹 환경은, 자바 스크립트의 양이 많아졌다.
이 부분을 모듈화 할 필요성이 대두되면서 webpack이 등장했다.
(모듈 구성 외에도 로더 사용, 파른 컴파일 등 장점이 있다.)

예전에 모듈화 노력을 하던중 CommonJs(require 형태로 호출), AMD 진영으로 쪼개졌다.
webpack은 이 두그룹의 명세를 모두 지원한다.

다음과 같이 외부에 배포할 모듈을 정의한다.
js 내부 변수들이 충돌하지 않기 위해서 별도로 패키징 하고,
js 파일을 패키징 할때 여러개로 만들어진다면 여러번 접속이 이루어질 것이다.
그래서, 하나로 묶어서 xxx.js 한개로 만들어준다.

var greeting = require('./hello') + require('./world');
module.exports = greeting;  

모듈을 사용하도록 로딩하는 방법은 어렵지 않다. require('./greeting')

다만 모듈로 만든 파일은 바로 웹 페이지에 넣어 브라우저에서 실행할 수 없다. 
webpack으로 컴파일해 브라우저에서 실행할 수 있는 형태로 바꿔야 한다.

설치 (Webpack V4는 webpack-cli를 요구한다)
npm i --save-dev webpack webpack-cli

webpack으로 컴파일 방법
webpack ./entry.js bundle.js  

--watch 옵션, 모듈 파일이 변경될 때마다 변경된 모듈을 자동으로 다시 컴파일한다.
webpack --watch ./entry.js bundle.js  

불편함,
CLI(command line interface)로 webpack을 실행해 컴파일할 때 엔트리 파일이 많거나 
옵션이 많으면 입력하기 불편하다. 

프로젝트 루트에 webpack.config.js 파일을 생성
webpack.config.js 파일을 다음과 같이 작성해 저장한다. 
module.exports = {  
    context: __dirname + '/app', // 모듈 파일 폴더
    entry: { // 엔트리 파일 목록
        app: './app.js' 
    },
    output: {
        path: __dirname + '/dist', // 번들 파일 폴더
        filename: '[name].bundle.js' // 번들 파일 이름 규칙
    }
}

설정 파일이 있는 디렉터리에서
webpack 
혹은
webpack --watch  
하면 간단하게 완수된다.


Entry : 시작지점 (index.js)
Ouput : webpack의 아웃풋
Loader : JavaScript에서 바로 사용할 수 있는 형태로 로딩하는 기능
    json-loader (데이터)            ---- 데이터 객체
    handlebars-loader (템플릿)      ---- 템플릿 함수
    coffescript (개발 언어)         ---- JavaScript

    handlebars 라이브러리가 설치된 환경에서 다음과 같이 npm 명령어를 실행해 handlebars-loader를 설치한다.
    npm install handlebars-loader  
    로더가 설치되면 webpack.config.js 파일에 다음과 같이 로더 관련 설정을 추가한다.
    module.exports = {  
        ...
        output : {
            ...
        },
        module : {
            loaders : [
            // 적용할 파일의 패턴(정규표현식)과 적용할 로더 설정
            {
                test : /\-tpl.html$/,
                loader : 'handlebars'
            }]
        }
    }

    이제 템플릿 파일(xx.html)에서
    <div>{{greeting}}</div> 
    와 같은 형태로 사용할 수 있게된다.
    require() 함수로 템플릿 파일을 로딩한 결과는 handlebars.compile() 함수를 거쳐 반환된 결과라 바로 데이터를 주입해 데이터와 결합된 HTML 코드를 얻을 수 있다.
    var listTpl = require('./example-tpl.html');  
    listTpl( { greeting: 'Hello World' } );  

    공식 문서
    http://webpack.github.io/docs/

    

Plug-in :

```

### Babel
```sh
    webpack을 사용하여 번들링하게되면 Babel을 사용할 수 있게된다...??
    https://poiemaweb.com/es6-babel-webpack-2

    babel-loader 설치, Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+ 코드를 ES5 코드로 트랜스파일링
    npm install --save-dev babel-loader

    Babel 대신 Webpack을 실행하도록 수정하자. 아래와 같이 package.json 파일의 scripts를 변경
    {
        "name": "es6-project",
        "version": "1.0.0",
        "scripts": {
            "build": "webpack -w"
        },
        "devDependencies": {
            "@babel/cli": "^7.4.4",
            "@babel/core": "^7.4.5",
            "@babel/plugin-proposal-class-properties": "^7.4.4",
            "@babel/preset-env": "^7.4.5",
            "babel-loader": "^8.0.6",
            "webpack": "^4.32.2",
            "webpack-cli": "^3.3.2"
        }
    }

    트랜스파일링은 Babel이 실행하고 번들링은 Webpack이 실행
    npm run build

    하나가 된 파일을 다음과 같이 사용하게 된다.
    <!DOCTYPE html>
    <html>
    <body>
        <script src="./dist/js/bundle.js"></script>
    </body>
    </html>


    오래된 브라우저에서도 ES6에서 새롭게 추가된 객체나 메소드를 사용하기 위해서는 @babel/polyfill을 설치해야 한다.
    npm install @babel/polyfill
    실제 환경에서도 사용하여야 하므로 --save-dev 옵션으로 개발 설치를 하지 않도록 한다.
    ES6의 import를 사용하는 경우, import "@babel/polyfill";

    webpack을 사용하는 경우에는 폴리필을 webpack.config.js 파일의 entry 배열에 추가한다.
    // webpack.config.js
    const path = require('path');

    module.exports = {
    // entry files
    entry: ['@babel/polyfill', './src/js/main.js'],
    ...
    
```

### css 번들
```sh
npm install node-sass style-loader css-loader sass-loader --save-dev

webpack.config.js 파일을 아래와 같이 수정한다.

const path = require('path');
module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader",   // translates CSS into CommonJS
          "sass-loader"   // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```