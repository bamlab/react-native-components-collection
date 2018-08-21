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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      '@bam.tech/react-native-component-circle-image': path.join(__dirname, '../packages/react-native-component-circle-image'),
      '@bam.tech/react-native-component-map-clustering': path.join(__dirname, '../packages/react-native-component-map-clustering'),
      '@bam.tech/react-native-component-password-strength-indicator': path.join(__dirname, '../packages/react-native-component-password-strength-indicator'),
      '@bam.tech/react-native-component-progress-bar': path.join(__dirname, '../packages/react-native-component-progress-bar'),
      '@bam.tech/react-native-component-separator': path.join(__dirname, '../packages/react-native-component-separator'),
      '@bam.tech/react-native-component-text': path.join(__dirname, '../packages/react-native-component-text'),
      '@bam.tech/react-native-component-text-input': path.join(__dirname, '../packages/react-native-component-text-input'),
      '@bam.tech/react-native-component-verification-code-input': path.join(__dirname, '../packages/react-native-component-verification-code-input'),
    },
    extensions: ['.web.js', '.js'],
  },
};
