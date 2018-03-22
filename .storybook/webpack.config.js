const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          /node_modules\/react-native-/,
          /node_modules\/@bam\.tech\/react-native-/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react-native'],
          },
        },
      }
    ]
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  },
};
