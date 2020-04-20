const path = require("path");

module.exports = {
  paths: function(paths, env) {
    paths.appIndexJs = path.resolve(__dirname, "src/app/index.tsx");
    return paths;
  }
};
