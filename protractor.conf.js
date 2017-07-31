// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { JasmineReporters } = require('jasmine-reporters');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });

    require('connect')().use(require('serve-static')('www')).listen(4200);
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new JasmineReporters.TerminalReporter ({ displayStacktrace: true, isVerbose: true }));
    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      savePath: process.env.JUNIT_REPORT_PATH,
      outputFile: process.env.JUNIT_REPORT_NAME,
      consolidateAll: true
    }));
  }
};
