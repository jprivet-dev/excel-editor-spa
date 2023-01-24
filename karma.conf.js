// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      // @see https://stackoverflow.com/questions/17120182/karma-test-runner-detailed-test-report-in-console
      require("karma-verbose-reporter"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary", subdir: "text" },
        { type: "lcov", subdir: "lcov" },
      ],
    },
    reporters: ["verbose", "progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    restartOnFileChange: true,
    customLaunchers: {
      // @see https://ievgen.de/2020/11/06/running-angular-unit-tests-in-docker-container/
      // @see https://stackoverflow.com/questions/51658212/run-angular-tests-scripts-from-docker
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--headless",
          "--remote-debugging-port=9222",
        ],
      },
    },
    // Avoid following error: "Disconnected , because no message in 30000 ms."
    browserNoActivityTimeout: 120000,
  });
};
