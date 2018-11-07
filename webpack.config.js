if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webpack.prod.js'); // eslint-disable-line global-require
} else {
  module.exports = require('./webpack.dev.js'); // eslint-disable-line global-require
}
