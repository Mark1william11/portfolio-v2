module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the source-map-loader rule and exclude @mediapipe/tasks-vision
      const sourceMapRule = webpackConfig.module.rules.find(
        (rule) =>
          rule.enforce === 'pre' &&
          rule.use &&
          rule.use.some((use) => use.loader && use.loader.includes('source-map-loader'))
      );
      if (sourceMapRule) {
        sourceMapRule.exclude = [
          ...(sourceMapRule.exclude || []),
          /@mediapipe[\\/]tasks-vision/
        ];
      }
      return webpackConfig;
    },
  },
};
