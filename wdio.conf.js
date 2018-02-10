// http://webdriver.io/guide/testrunner/configurationfile.html

console.log('using ' + resolveSeleniumHost() + ' as selenium host');
console.log('using ' + resolveDestination() + ' as application host');

exports.config = {
  host: resolveSeleniumHost(),
  port: 4444,
  path: '/wd/hub',
  baseUrl: resolveDestination(),
  specs: [
    './test/**/*.js'
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    { browserName: 'chrome' },
    { browserName: 'firefox' }
  ],
  sync: true,
  logLevel: 'silent', // silent | verbose | command | data | result | error
  coloredLogs: true,
  deprecationWarnings: false,
  bail: 0,
  screenshotPath: './error-shots/' + nowString() + '/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
    compilers: ['js:babel-register'],
  },
  afterTest: function (test) {
    if (test.passed) {
      return;
    }

    mkdir(this.screenshotPath);

    // get current test title and clean it, to use it as file name
    const filename = encodeURIComponent(test.title.replace(/\s+/g, '-'));
    const filePath = this.screenshotPath + filename + '.png';

    // save screenshot
    browser.saveScreenshot(filePath);
    console.log('\n\tScreenshot location:', filePath, '\n');
  },
};

function nowString() {
  return new Date().toISOString().slice(0, 19);
}

function mkdir(dir) {
  const fs = require('fs');
  const path = require('path');

  try {
    fs.mkdirSync(dir);
  }
  catch (e) {
    if (e.errno === 34) {
      mkdir(path.dirname(dir));
      mkdir(dir);
    }
  }
}

function resolveSeleniumHost() {
  return (process.env.SELENIUM_ENV || 'localhost').toLowerCase();
}

function resolveDestination() {
  return 'http://' + (process.env.TEST_ENV || 'todoapp').toLowerCase();
}

