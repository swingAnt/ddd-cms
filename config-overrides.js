const path = require('path');
const { override, fixBabelImports, addWebpackAlias, addPostcssPlugins, addReactRefresh } = require('customize-cra');
const px2viewport = require('postcss-px-to-viewport');
const CopyPlugin = require("copy-webpack-plugin");

const babelPlugins = fixBabelImports('import', {
  libraryName: 'antd-mobile',
  style: 'css',
});

const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375,
  })
]);

module.exports = override(
  (config) => {
    config.output = {
      path: path.join(__dirname, process.env.BUILD || './build'),
      publicPath: process.env.PUBLIC_URL || '',
    };
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src', 'assets', 'styles'),
    };
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: config.output.path,
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ['**.html'],
            },
          },
        ],
      }),
    );
    return config;
  },
  babelPlugins,
  postcssPlugins
);
