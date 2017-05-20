
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
      HtmlWebpackPlugin = require( 'html-webpack-plugin' )
      webpack           = require( 'webpack' ),
      plugins           = [

      // chunk files
      new webpack.optimize.CommonsChunkPlugin({
        names     : [ 'bundle', 'vendors' ],
        minChunks: Infinity
      }),

      // defined environment variable
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( 'production' ) // or development
      }),

      // extract text plugin
      new ExtractTextPlugin( '[name].css' ),

      // html plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        hash    : true,
        inject  : true,
      }),

      // webpack-dev-server --hot
      new webpack.HotModuleReplacementPlugin(),

    ],

    // conditions environment
    isProduction = function () {
      return process.env.NODE_ENV === 'production';
    },

    // only when environment variable is 'production' call
    deploy = ( function () {
      var CopyWebpackPlugin  = require( 'copy-webpack-plugin'  ),
          CleanWebpackPlugin = require( 'clean-webpack-plugin' );

      // environment verify
      if ( isProduction() ) {

        // delete publish folder
        plugins.push(
          new CleanWebpackPlugin([ 'publish' ], {
            verbose: true,
            dry    : false,
          })
        );

        // copy files
        plugins.push(
          new CopyWebpackPlugin([
            { from   : "src/favicon.ico" ,   to : '../' },
            { from   : 'src/index.html',     to : '../' },
            { context: 'src/assets/images/', from : "*" , to : '../assets/images' },
          ])
        );

        // call uglifyjs plugin
        plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true
            },
            mangle: {
              except: [ '$', 'exports', 'require' ]
            },
            output: {
              comments: false
            }
          })
        );

      }
    })(),

    // webpack config
    config = {
      entry: {

        vendors : [
          'jquery'
        ],

        bundle: [
          'webpack/hot/dev-server',
          'webpack-dev-server/client?http://localhost:8080',
          './src/index.js'
        ],

        style: './src/assets/css/main.css',

      },

      output: {
        path      : isProduction() ? './publish/bundle' : './bundle',
        filename  : '[name].js',
        publicPath: '/',
      },

      plugins: plugins,

      module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: [ 'es2015', 'stage-0', 'react' ]
            }
        },
        /*{
            test:   /\.css$/,
            loader: "style!css!postcss"
        },*/
        { test: /\.css$/,
          loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!postcss-loader' )
        },
        { test: /\.(png|jpg|gif)$/, loader: 'url?limit=12288'   },
        {
          test  : require.resolve( './src/vender/jquery-2.1.1.min.js' ),
          loader: 'expose?jQuery!expose?$'
        }
        ]
      },

      postcss: function () {
        return [
          require( 'postcss-cssnext' )(),
          require( 'autoprefixer'    )({
            browsers: [ 'last 2 versions', '> 5%' ]
          })
        ]
      },

      resolve: {
        alias : {
          jquery     : __dirname + '/src/vender/jquery-2.1.1.min.js',
        }
      }

};

module.exports = config;