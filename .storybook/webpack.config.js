const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
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
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      '@bam.tech/react-native-component-progress-bar': '../react-native-component-progress-bar',
      '@bam.tech/react-native-component-circle-image': '../react-native-component-circle-image',
    },
    extensions: ['.web.js', '.js'],
  },
};
