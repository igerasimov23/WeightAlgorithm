Fetch Rewards Coding Exercise
## Introduction

This directory contains everything related to the functional test suite for the
'Fetch Rewards Coding Exercise' project.

## Setup

1. Clone [WeightAlgorithm](https://github.com/igerasimov23/WeightAlgorithm)
2. Run `npm install`

## Technology Stack

- Nodejs **(v10.16.0 or later)**
- [WebdriverIO](http://webdriver.io//) (Wrapper over selenium api)
- [Mocha testing framework](https://github.com/webdriverio/wdio-mocha-framework)
- [Chai assertion library](http://www.chaijs.com/)
- Execution platform [Sauce Lab](https://saucelabs.com/)


## Execution

Script to run locally on Mac machine
` npm run e2e-test-run`

Script to run on SauceLab:
`SELHOST=sauce SAUCE_USERNAME="igerasimov231" SAUCE_ACCESS_KEY="9e05cde5-f00b-4aed-9e05-16b41ae95ae5" npm run e2e-test-run-sauce`

To see results in Saucelab, you need to login: igerasimov231/Fetchrewards)1


#### Project structure
- tests - folder contains all test execution files
- pages - folder contains all page objects
- globals.js - includes all global variables and static content
- wdio.conf.js - includes basic WebdriverIO config
- wdio.conf.sauce.js - includes config to run tests in saucelab
- wdio.conf.local.js - includes config to run tests on local machine
