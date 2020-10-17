const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms'
});

process.chdir(path.join(__dirname, 'template'));  // 构建前进入到 template 文件夹下

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.config');  // 加载生产环境的配置文件

  webpack(prodConfig, (error, stats) => { // 判断是否构建成功
    if (error) {
      console.log(error);
      process.exit(2);
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }));

    console.log('Webpack build success, begin run test...');

    mocha.addFile(path.join(__dirname, 'html.spec.js')); // 添加测试用例
    mocha.addFile(path.join(__dirname, 'cssjs.spec.js'));

    mocha.run();  // 运行测试用例
  });
})