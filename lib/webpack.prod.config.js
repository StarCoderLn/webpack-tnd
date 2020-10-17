const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://cdn.staticfile.org/react/16.9.0/umd/react.production.min.js',
          global: 'React',
        }, {
          module: 'react-dom',
          entry: 'https://cdn.staticfile.org/react-dom/16.9.0/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 分离的包体积的最小大小
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2, // 设置最小引用次数为 2 次
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
