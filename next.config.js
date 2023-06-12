/* eslint-disable global-require */
/* eslint-disable no-param-reassign */

require('dotenv').config({
  path: process.env.VERCEL_ENV ? `.env.${process.env.VERCEL_ENV}` : null,
});
require('babel-polyfill');
require('intersection-observer');

const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const withSourceMaps = require('@zeit/next-source-maps');
const path = require('path');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withOptimizedImages = require('@mrroll/next-optimized-images');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

const { NODE_ENV } = process.env;

console.log(JSON.stringify(process.env, null, 2));

module.exports = withPlugins(
  // TODO: fix for PWA, creating issues with cache files
  [withSourceMaps, withCSS, withOptimizedImages, withTM],
  {
    redirects: () => {
      return [
        { source: '/account', destination: '/account/dashboard', permanent: true },
        { source: '/insurance/quote', destination: '/insurance/quote/name', permanent: true },
      ];
    },
    transpileModules: [
      'intersection-observer-polyfill',
      'react-intersection-observer',
      'intersection-observer',
      'babel-polyfill',
    ],
    target: 'serverless',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    imagesName: '[name]-[hash].[ext]',
    mozjpeg: {
      quality: 60,
    },
    webp: {
      preset: 'default',
      quality: 60,
    },
    optimizeImagesInDev: false,
    optimizeImages: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]_[hash:base64:5]',
      url: false,
    },
    webpack: (config, { isServer, buildId, webpack }) => {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('./scripts/polyfills.js')) {
          entries['main.js'].unshift('./scripts/polyfills.js');
        }

        return entries;
      };

      // to lower load time
      config.devtool = false;
      for (const r of config.module.rules) {
        if (r.loader === 'babel-loader') {
          r.options.sourceMaps = false;
        }
      }
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      // to generate sitemap xml takes < 2s
      if (isServer && NODE_ENV === 'production') {
        require('./scripts/sitemap.generator.js');
      }
      // sentry
      if (!isServer) {
        // eslint-disable-next-line no-param-reassign
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }
      if (NODE_ENV === 'production') {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.',
            ignoreFile: '.sentrycliignore',
            ignore: ['node_modules'],
            configFile: path.resolve(__dirname, './sentry.properties'),
            debug: false,
            release: buildId,
            enabled: false,
            dsn: 'https://02656c7fb85349b7a4ce9311765d7716@sentry.io/5187270',
          })
        );
        config.plugins.push(new webpack.IgnorePlugin(/canvas|jsdom/, /konva/));
      }
      return config;
    },
  }
);
