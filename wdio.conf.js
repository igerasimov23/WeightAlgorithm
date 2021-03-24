require('@babel/register');
const util = require('./utils');
const globals = require('./globals');
const chai = require('chai');
const assertArrays = require('chai-arrays');
const chaiWebdriver = require('chai-webdriverio').default;


// SauceLab run setup
let sauceUser = undefined;
let sauceKey = undefined;

const services = [];
let device = '';

const logLevel = process.env.LOG_LEVEL || 'silent';
if (process.env.SELHOST === 'sauce' || process.env.SELENIUM_HOST === 'sauce') {
    if (process.env.SAUCE_USERNAME === undefined || process.env.SAUCE_ACCESS_KEY === undefined) {
        throw new Error('Error| To run on saucelabs set the environment variables SAUCE_USERNAME and SAUCE_ACCESS_KEY');
    }
    // If the environment variables are set then the test runs on Saucelabs
    console.info('This test will run remotely on SauceLabs.');
    sauceUser = process.env.SAUCE_USERNAME;
    sauceKey = process.env.SAUCE_ACCESS_KEY;
    services.push('sauce');
} else {
    services.push('selenium-standalone');
    console.info('This test will run on the local selenium node.');
}


// Reporters
const reporters = ['spec', 'dot'];

exports.config = {
    sync: true,
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel,
    logLevels: {
        'webdriver': logLevel,
        'webdriverio': logLevel,
        '@wdio/local-runner': logLevel,
        '@wdio/cli:Launcher': logLevel,
        '@wdio/utils:initialiseServices': logLevel,
        '@wdio/sauce-service': logLevel,
    },

    //
    // Enables colors for log output.
    coloredLogs: true,

    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    baseUrl: globals.urls.baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: globals.baseConfig.waitForTimeout,

    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: parseInt(process.env.CONNECTRETRYTIMEOUT, 10) || 90000,

    // Default request retries count
    connectionRetryCount: 3,

    framework: 'mocha',
    maxInstances: parseInt(process.env.PARALLELTHREADS, 10) || 10,

    // Sauce
    user: sauceUser,
    key: sauceKey,
    services,

    reporters,

    mochaOpts: {
        timeout: parseInt(process.env.MOCHATIMEOUT, 10) || 900000,
        ui: 'bdd',
        grep: process.env.npm_config_grep,
        compilers: ['js:@babel/register'],
    },


    onPrepare: function (config, capabilities) {

    },

    beforeSession: async function (config, capabilities, specs) {

    },

    before: function () {
        // adding assertions to use globally
        chai.config.includeStack = true;
        global.expect = chai.expect;
        global.AssertionError = chai.AssertionError;
        global.Assertion = chai.Assertion;
        global.assert = chai.assert;

        const options = { defaultWait: 5000 };
        chai.use(chaiWebdriver(browser, options));
        chai.use(assertArrays);

        // setting global timeouts
        browser.setTimeout({
            'implicit': globals.baseConfig.waitForTimeout / 10,
            'pageLoad': globals.baseConfig.pageLoadTimeout,
        });
    },

    beforeSuite: function (suite) {
        // setting viewport size
        util.setViewportSize(device);
    },

    beforeTest: function (test) {
    },

    afterTest: async function (test) {

    },

    afterSession: function (exitCode, config, capabilities) {
    },

    onComplete: async function (exitCode, config, capabilities, results) {

    },

};
