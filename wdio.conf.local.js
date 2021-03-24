const wdioConf = require('./wdio.conf');
const util = require('./utils');
const globals = require('./globals');

// have main config file as default but overwrite environment specific information
exports.config = Object.assign(wdioConf.config, {
  capabilities: [
    Object.assign(util.capabConfig(), {
      specs: [
        './test/*.js',
      ],
      'sauce:options': {
        ...util.capabConfig()['sauce:options'],
      },
    }),
  ],
});
