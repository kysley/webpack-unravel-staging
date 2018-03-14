import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'webpack4 Boiler',
  template: path.join(__dirname, 'src', 'index.ejs'),
  minify: {
    collapseWhitespace: true,
  },
})

export default {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './src/',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    /* Done automatically in Development env
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    */
    HtmlWebpackPluginConfig,
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
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ['file-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(eot|tff|woff|woff2)$/i,
        use: ['raw-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
}
