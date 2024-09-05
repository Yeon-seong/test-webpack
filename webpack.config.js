/*
node.js의 path 모듈을 require라는 함수를 통해 불러온다.
운영체제별로 상이한 경로 문법(구분자 : / 혹은 \)를 해결해 절대 경로로 반환하는 역할을 한다.
*/
const path = require('path');

const webpack = require('webpack');

// 터미널 명령어를 웹팩에서도 사용할 수 있도록 해주는 모듈
const childProcess = require('child_process');

// dotenv : 전역 상수를 깃허브에 남기지 않음
require('dotenv').config();


/*
  module.exports : Node.js 환경에서 모듈을 밖으로 빼내는 노드 JS문법.
  엔트리, 아웃풋 그리고 번들링 모드를 설정할 수 있습니다.
*/
module.exports = {
  mode: 'development', // 개발 환경

  entry: {
    main: path.resolve('./src/app.js')
  },

  output: {
    // publicPath : 빌드 할 때 CSS나 HTML파일 안에 URL들을 업데이트 해줍니다.
    publicPath: '/webpack/dist/',
    filename: '[name].js', // main의 이름이 name에 들어간다.
    path: path.resolve('./dist')
  },

  module: {
    rules: [
      {
        // myLoader 등록, 파일 끝이 js로 끝나는 모든 파일
        test: /\.js$/,
        use: [
          // 위와 일치하는 패턴의 파일이 전달될 로더를 설정합니다.
          // path.resolve('./myLoader.js')
        ]
      },
      {
        // style-loader, css-loader 등록, 파일 끝이 css로 끝나는 모든 파일
        // style-loader를 먼저 써야 한다, 밑에부터 실행되기 때문
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // test : 대상 지정 : 아래 확장자를 가진 이미지를 대상으로 처리
        test: /\.(png|jpg|gif|svg|jpeg|webp)$/,
        // type: 'asset/inline'
        type: 'asset',
        parser: {
          dataUrlCondition: {
          maxSize: 20 * 1024
          // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
          }
        },
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner:
      `
        마지막 빌드 시간은 ' + ${new Date().toLocaleString()} + ' 입니다.
        Commit version : ${childProcess.execSync('git rev-parse --short HEAD')}
        Committer : ${childProcess.execSync('git config user.name')}
        Commit Date : ${new Date().toLocaleString()}
      `
    }),
    // 웹팩으로 데이터를 관리하기
    new webpack.DefinePlugin({
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API)
    }),
  ]
}