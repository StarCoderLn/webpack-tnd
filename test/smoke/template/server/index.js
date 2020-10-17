if (typeof window === 'undefined') {  // hack，解决 window is not defined 的问题
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
  const app = express();

  app.use(express.static('dist'));  // 设置静态目录
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);  // 这里返回的是字符串，但是实际上是需要返回一个 html 文件的，所以需要用一个模板包装起来
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  })
}

server(process.env.PORT || 3000);

const renderMarkup = (html) => {
  const dataStr = JSON.stringify(data);
  return template.replace('<!--HTML_PLACEHOLDER-->', html)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}