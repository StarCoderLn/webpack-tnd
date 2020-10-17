const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = process.cwd(); // 打包时的当前目录，因为在 smoke 里的 index.js 中设置成了 template，所以这里就是 template

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(rootPath, './src/*/index.js')); // 获取入口文件路径
  Object.values(entryFiles).forEach((file) => {
    const pageName = file.match(/src\/(.*)\/index\.js/)[1]; //  获取页面所在的目录
    entry[pageName] = file;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(rootPath, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName], // 发现这里不加 vendors 也会自动在 html 中引入
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: ['last 2 version', '>1%', 'iOS 7'],
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 设置 rem 相对 px 的转换单位，一个 rem 等于 75px
              remPrecision: 8, // px 转换为 rem 时小数点后的位数
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/, // 不加这句的话生产模式下打包会报错
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
