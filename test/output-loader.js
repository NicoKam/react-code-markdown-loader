const fs = require('fs');
const path = require('path');
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const { resourcePath } = this;
  const callback = this.async();
  fs.writeFile(path.resolve(__dirname, `output/${path.basename(resourcePath)}.js`), source, (error) => {
    if (error) {
      console.error('error::::',error);
    }
    callback(error, 'export default "";');
  });
};
