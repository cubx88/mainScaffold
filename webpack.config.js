const nodeExternals = require('webpack-node-externals');
module.exports = {
  externals: [
    // Mark realm package as external
    nodeExternals({
      allowlist: ['realm/dist/app-services/EmailPasswordAuth']
    })
  ]
};
