const path = require('path');
const glob = require('glob-to-regexp');
const blacklist = require('metro/src/blacklist');

module.exports = {
  getProjectRoots() {
    return [
      __dirname,
      path.resolve(__dirname, '../packages/react-native-component-text'),
      path.resolve(__dirname, '../packages/react-native-component-google-signin'),
    ];
  },
  getProvidesModuleNodeModules() {
    return ['react-native', 'react', 'react-native-google-signin'];
  },
  getBlacklistRE() {
    return blacklist([
      glob(`${path.resolve(__dirname, '..')}/node_modules/*`),
      glob(`${path.resolve(__dirname, '..')}/packages/react-native-component-text/node_modules/*`),
    ]);
  },
};
