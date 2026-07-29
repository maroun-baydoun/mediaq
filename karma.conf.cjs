module.exports = function(config) {
  config.set({
    singleRun: true,
    frameworks: ["jasmine", "karma-typescript"],
    files: [{
        pattern: "test/**/*.ts"
      },
      {
        pattern: "src/**/*.ts"
      },
      {
        pattern: 'test/**/*.css',
        watched: true,
        served: true,
        included: true
      }
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"]
  });
};
