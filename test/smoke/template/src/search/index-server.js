import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.jpg';
import { a } from './tree-shaking';
import './b.less';
import '../../common';
// import largeNumberTnd from 'large-number-tnd';

// const largeNumberTnd = require('large-number-tnd');

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Text: null,
      data: ''
    }
  }

  loadComponent() {
    import('./text.js').then(Text => {
      this.setState({ Text: Text.default });
    })
  }

  componentDidMount() {
    // new Promise((resolve, reject) => {
    //   require(['large-number-tnd'], function (largeNumberTnd) {
    //     resolve(largeNumberTnd('999', '1'));
    //   })
    // }).then(res => {
    //   this.setState({ data: res });
    // })
    let that = this;
    require(['large-number-tnd'], function (largeNumberTnd) {
      that.setState({ data: largeNumberTnd('999', '1') });
    })
  }

  render() {
    const aVal = a();
    const { Text, data } = this.state;
    // const data = largeNumberTnd('999', '999');

    return (
      <div>
        { aVal } Search Text Change
        <img src={ logo } onClick={ this.loadComponent.bind(this) } />
        { Text ? <Text /> : null }
        { data }
      </div>
     );
  }
}

module.exports = <Search />;