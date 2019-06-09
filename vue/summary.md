### PWA, SPA
```sh
Progressive Web App : 앱 같은 웹의 개발이념
Progressive Javascript Framework : Ember(*굉장하다.), React, Vue 화면 처리를 포함하고 있다.
Single Page App : 페이지 재요청 하지 않고, 화면을 동적으로 변화시킴.
```

### MVVM
```sh
Model View ViewModel Pattern
View와 Controller의 결합이 너무 강함. 해소하고 싶어서 나옴.
Modeld은 데이터. View는 화면, ViewModel이 Model을 Observing하며 Dom Event를 담당한다.

View <-----> ViewModel (Dom Listeners, Data Bindings) <-----> Model
(DOM)         (Vue)                                           (Plain JavaScript Objects)
```

### Node.js, Chrome, Git
```sh
Node.js - npm 을 이용하여 개발도구 설치 가능
Chrome - Vue.js devtools 플러그인
Git - 팀간 코드 공유
```

### Vue.js
```sh
IE9+ 부터 지원한다.
함께 쓰이며 화면 조립을 돕는 vuatify.js의 경우 IE9/IE10을 지원하지 않고 있다. 

설치
npm i @vue/cli -g
npm i @vue/cli-service-global -g
vue --version

Vue.js devtools 크롬 디버그 툴 설치 (Chrome 웹 스토어), 세부정보에서 파일 URL에 대한 엑세스 허용을 활성화 한다.

vue는 node.js를 활용해 간단히 서버를 띄워준다. 다음 설정 파일을 만든다 (소스 있는 곳에서).
vue.config.js
module.exports = {
    devServer: {
        port: 8700,
        https: false
    }
}

아래 명령으로 서버를 실행 시키고 브라우저(-o)까지 띄운다.
vue serve -o
```

### Instance
```sh
// vm 은 viewModel의 약자로 관행적으로 사용한다.
var vm = new Vue({
  template: ...,
  el: ...,
  methods: {

  },
  created: {
    // 개발자가 원하는 로직을 추가, this는 vm을 가리킨다.
  }
  // ...
})
Vue 라이브러리 로딩후 제공되는 Vue 생성자로 객체를 생성한다.
```

### Component
```sh
Vue의 인스턴스. 인스턴스의 모든 옵션 사용이 가능.
Vue 컴파일러에 의해 동작이 추가되어 있어.
사용자 지정 엘리먼트가 되는것임.
언제, 왜? 재사용과 캡슐화를 위해 쓴다. 기능별 분리.

W3C 명명규칙 따라주는게 좋다.
사용자 지정 태그 이름일때 모두 소문자이고 하이픈을 포함한다.

전역 사용.
Vue.component('my-component', {
  // 옵션
})
위와같이 메모리에 등록되면 인스턴스의 템플릿에서 커스텀 엘리먼트,<my-component></my-component>로 사용할 수 있게된다.
<div id="example">
  <my-component></my-component>
</div>

지역 사용.
var Child = {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    'my-component': Child
  }
})

그러나, 브라우저가 구문 분석과 정규화 이후 작동하기
때문에 사용상 약간의 주의가 필요하고, 신경쓰고 싶지 않다면 가능한 경우 항상 문자열 템플릿으로 사용하는 것이 좋다.
```

### Router
```sh
페이지 전환
```

### Resource
```sh
```

### Templates
```sh
html
```

### WebPack
```sh
https://d2.naver.com/helloworld/0239818

현대의 웹 환경은, 자바 스크립트의 양이 많아졌다.
이 부분을 모듈화 할 필요성이 대두되면서 webpack이 등장했다.
특히, vue.js는 모든 브라우저에서 사용가능 하도록 ES5 형태로 빌드할 필요가 있다.
또한, js 파일을 패키징 할때 여러개로 만들어진다면 여러번 접속이 이루어질 테니 하나의 파일로 만들 필요도 있다.
(모듈 구성 외에도 로더 사용, 파른 컴파일 등 장점이 있다.)

예전에 모듈화 노력을 하던중 CommonJs(require 형태로 호출 : node.js), AMD(import, export :vue.js) 진영으로 쪼개졌다.
webpack은 이 두그룹의 명세를 모두 지원한다.

모듈 만들기
var greeting = require('./hello') + require('./world');
module.exports = greeting;

모듈 로딩
require('./greeting')

모듈 파일은 바로 브라우저에서 실행할 수 없고, webpack으로 컴파일야 한다.

webpack 설치 (Webpack V4는 webpack-cli를 요구한다)
npm i --save-dev webpack webpack-cli

webpack으로 컴파일 방법
webpack ./entry.js bundle.js  

--watch 옵션, 모듈 파일이 변경될 때마다 변경된 모듈을 자동으로 다시 컴파일한다.
webpack --watch ./entry.js bundle.js  

컴파일의 불편함 개선,
프로젝트 루트에 webpack.config.js 파일 생성하고 다음과 같이 작성.
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
webpack 혹은
webpack --watch  

옵션설명
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
    require() 함수로 템플릿 파일을 로딩한 결과는 handlebars.compile() 함수를 거쳐 반환된 결과라 바로 데이터를 주입해 데이터와 결합된 HTML 코드를 얻을 수도 있다.
    var listTpl = require('./example-tpl.html');  
    listTpl( { greeting: 'Hello World' } );  

    공식 문서
    http://webpack.github.io/docs/
```

### Babel
```sh
    webpack을 사용하여 번들링하게되면 Babel을 사용할 수 있게된다.
    https://poiemaweb.com/es6-babel-webpack-2

    babel-loader 설치, Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+ 코드를 ES5 코드로 트랜스파일링
    npm install --save-dev babel-loader

    아래와 같이 package.json 파일의 scripts를 변경, Babel 대신 Webpack을 실행하도록 수정하자. 
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
            "webpack": "^4.32.2", // 여기.
            "webpack-cli": "^3.3.2" // 여기.
        }
    }

    결국, 트랜스파일링은 Babel이 실행하고 번들링은 Webpack이 실행하게 된다.
    npm run build

    하나가 된 파일을 다음과 같이 사용.
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
설치
npm install node-sass style-loader css-loader sass-loader --save-dev

webpack.config.js 파일을 수정.
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

