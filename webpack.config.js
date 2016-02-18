const path = require('path');

const config = {
  bundle: 'bundle.js',
  src: 'app',
  dist: 'build',
  script: 'main.js',
  port: 8080,
  host: 'http://localhost'
};

module.exports = {
  entry:[
    'webpack/hot/dev-server',
    'webpack-dev-server/client?' + config.host + ':' + config.port,
    path.resolve(__dirname, config.src + '/' + config.script)
  ],
  output: {
    path: path.resolve(__dirname, config.dist),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      },
    },
    {
      test: /\.scss$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
    }]
  }
};
