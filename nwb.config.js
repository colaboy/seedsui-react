var path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'seedsui',
      externals: {
        react: 'React'
      }
    }
  }
}
