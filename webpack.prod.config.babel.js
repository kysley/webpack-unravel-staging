import path from 'path'

import webpack from 'webpack'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'
import CompressionPlugin from 'compression-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'


export default {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js'),
    ],
    /* https://github.com/webpack/webpack/issues/6357 => chunks: 'all' is best practice
    vendor: [
      'babel-polyfill',
      'react',
      'react-router-dom',
      'react-redux',
      'react-dom',
      'redux',
    ],
    */
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    // new ExtractTextPlugin({
    //   filename: 'assets/[name].[contenthash].css',
    //   allChunks: true,
    // }),
    new HtmlWebpackPlugin({
      title: 'webpack4 Boiler',
      template: path.join(__dirname, 'src', 'index.ejs'),
      // favicon: path.join(__dirname, 'src', 'favicon.ico'),
      meta: [
        {
          name: 'description',
          content: 'React boilerplate',
        },
      ],
      minify: {
        collapseWhitespace: true,
      },
    }),
    // new InlineChunkManifestHtmlWebpackPlugin({
    //   dropAsset: true,
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Components: path.join(__dirname, 'src/components'),
      Containers: path.join(__dirname, 'src/containers'),
      Styles: path.join(__dirname, 'src/styles'),
      Reducers: path.join(__dirname, 'src/reducers'),
      Actions: path.join(__dirname, 'src/actions'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      // {
      //   test: /\.(scss|sass|css)$/i,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: { minimize: true },
      //       },
      //       'postcss-loader',
      //       'sass-loader',
      //     ],
      //   }),
      //   include: path.join(__dirname, 'src'),
      // },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ['file-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(eot|tff|woff|woff2|svg)$/i,
        use: ['raw-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    concatenateModules: true, // ModuleConcatenationPlugin
  },
}
