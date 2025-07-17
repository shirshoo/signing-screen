const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 
module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'css']
  }
};