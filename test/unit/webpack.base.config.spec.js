const assert = require('assert');

describe('webpack.base.config.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.config');
  const curPath = process.cwd();
  it('test entry', () => {
    assert.equal(baseConfig.entry.index, `${curPath}/src/index/index.js`)
    assert.equal(baseConfig.entry.search, `${curPath}/src/search/index.js`)
  })
})