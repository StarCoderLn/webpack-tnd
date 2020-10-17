const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template')); // 构建前进入到 template 文件夹下

describe('webpack-tnd test case', () => {
  require('./unit/webpack.base.config.spec');
});