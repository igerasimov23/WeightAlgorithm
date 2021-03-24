/**
 * This is Sauce config to run in paralle
 */
const wdioConf = require('./wdio.conf');
const util = require('./utils');

// have main config file as default but overwrite environment specific information
exports.config = Object.assign(wdioConf.config, {
    capabilities: [
        Object.assign(util.capabConfig(), {
            specs: [
                './test/*.js',
            ],
            browserName: 'chrome',
            browserVersion: '80',
            platformName: 'Windows 10',
            'sauce:options': {
                ...util.capabConfig()['sauce:options'],
                device: 'desktop',
            },
        }),
    ],
});
