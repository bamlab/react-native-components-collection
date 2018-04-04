const path = require('path');
module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '../packages/react-native-component-text')];
  },
};
