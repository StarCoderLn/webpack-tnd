const glob = require('glob-all');

describe('Checking generated css and js files', () => {
  it('should generate css and js files', (done) => {
    const files = glob.sync([
      './dist/index_*.css',
      './dist/search_*.css',
      './dist/index_*.js',
      './dist/search_*.js'
    ]);
    if (files.length) {
      done();
    } else {
      throw new Error('no css and js files found');
    }
  })
})