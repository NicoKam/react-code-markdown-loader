const path = require('path');
// const HtmlPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = path.resolve(__dirname, '.');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      // [
      //   'import',
      //   {
      //     libraryName: 'antd',
      //     libraryDirectory: 'es',
      //     style: true, // `style: true` 会加载 less 文件
      //   },
      // ],
    ],
  },
};

const config = {
  // devtool: ifDev('source-map', false),
  mode: 'development',
  entry: {
    main: './test/index',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: `${rootPath}/dist`,
  },
  resolve: {
    // modules: [path.join(rootPath, 'src'), path.join(rootPath, 'node_modules')],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlPlugin({ template: './src/index.html' }),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.md?$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: path.resolve(__dirname, './lib/markdown-loader.js'),
            options: {
              myConfig: 'config content',
            },
          },
        ],
        // use: [babelLoader, require.resolve(__dirname, '@umijs/preset-dumi/lib/loader')],
      },
      // {
      //   test: /\.(md|txt)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'raw-loader',
      //     },
      //   ],
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /src/, // foo.css?inline
            use: 'raw-loader',
          },
          {
            use: [babelLoader],
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    __dirname: true,
    path: true,
  },
};

module.exports = config;
