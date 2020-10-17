// webpack4 默认以 src 目录下的 index.js 文件为入口，不需要再像以前那样自己手动去配置，省去了一些工作
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import a from './a.js';
const s = () => {
  // console.log(123);
  a.init();
};
s();