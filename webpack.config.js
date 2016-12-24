
var webpack = require( 'webpack' ),
    plugins = [
      new webpack.ProvidePlugin({
        React    : 'react',
        ReactDOM : 'react-dom'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name     : 'common',
        filename : '[name].js'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( 'production' ) // or development
      }),
    ],
    isProduction = function () {
      return process.env.NODE_ENV === 'production';
    },
    deploy = ( function () {
      var CopyWebpackPlugin  = require( 'copy-webpack-plugin'  ),
          CleanWebpackPlugin = require( 'clean-webpack-plugin' );

      // environment verify
      if ( isProduction() ) {

        plugins.push(
          new CleanWebpackPlugin([ 'publish' ], {
            verbose: true,
            dry    : false,
          })
        );

        plugins.push(
          new CopyWebpackPlugin([
            { from : "src/manifest.json" , to :'../' },
            { from : "src/background.js" , to :'../' },
            { context: 'src/assets/images/', from : "*" , to :'../assets/images' }
          ])
        );

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
    config = {
      entry: {
        common : [
          './node_modules/react/dist/react.min.js',
          './node_modules/react-dom/dist/react-dom.min.js',

          './src/vender/jquery-2.1.1.min.js',
          './src/vender/mousetrap.min.js',

          './src/common/notify.js'
        ],
        contentscripts : './src/contentscripts.js'
      },

      output: {
        path     :  isProduction() ? './publish/bundle' : './src/bundle',
        filename : '[name].js'
      },

      devServer: {
        inline: true,
        port  : 7777
      },

      plugins: plugins,

      module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: [ 'es2015', 'react' ]
            }
        },
        { test: /\.css$/,       loader: 'style!css'      },
        { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
        {
          test  : require.resolve( './src/vender/jquery-2.1.1.min.js' ),
          loader: 'expose?jQuery!expose?$'
        },
        {
          test  : require.resolve( './src/vender/mousetrap.min.js' ),
          loader: 'expose?Mousetrap'
        },
        {
          test  : require.resolve( './src/common/notify.js' ),
          loader: 'expose?Notify'
        }
        ]
      },

      resolve: {
        alias : {
          jquery    : __dirname + '/src/vender/jquery-2.1.1.min',
          mousetrap : __dirname + '/src/vender/mousetrap.min',

          notify    : __dirname + '/src/common/notify.js',

          focus     : __dirname + '/src/focus/focus.js',
          controlbar: __dirname + '/src/focus/controlbar.js',
          foucsopt  : __dirname + '/src/focus/option.js'
        }
      }

};

module.exports = config;