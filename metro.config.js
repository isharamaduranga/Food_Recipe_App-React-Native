const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  defaultConfig.transformer.minifierConfig = {
    keep_classnames: true, // Required for fast refresh to work properly
    keep_fnames: true, // Required for fast refresh to work properly
    collapseWhitespace: true,
    drop_console: true,
  };
  return defaultConfig;
})();
