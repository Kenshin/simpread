
const webpack = require( 'webpack' ),
    plugins = [

      // public reqire( xxx )
      new webpack.ProvidePlugin({
        React    : 'react',
        ReactDOM : 'react-dom'
      }),

      // chunk files
      new webpack.optimize.CommonsChunkPlugin({
        names     : [ 'vendors', 'common' ],
        minChunks : Infinity
      }),

      // defined environment variable
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( 'production' ) // or development
      }),

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
            { from   : "src/manifest.json" ,              to : '../' },
            { from   : "src/website_list.json" ,          to : '../' },
            { from   : 'src/optionspage/options.html',    to : '../optionspage/' },
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
          './node_modules/react/dist/react.min.js',
          './node_modules/react-dom/dist/react-dom.min.js',

          './src/vender/pangu.min.js',
          './src/vender/mousetrap.min.js',
          './src/vender/progressbar.min.js',
          './src/vender/velocity.min.js',

          './src/vender/notify/notify.js'
        ],
        common : [
          'babel-polyfill',
          './src/service/browser.js',
          './src/service/message.js',
          './src/service/storage.js',
          './src/vender/jquery-2.1.1.min.js',
        ],
        contentscripts : './src/contentscripts.js',
        background     : './src/background.js',
        options        : './src/optionspage/options.js',
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
              presets: [ 'es2015', 'stage-0', 'react' ]
            }
        },
        { test: /\.css$/,           loader: 'style!css!postcss' },
        { test: /\.(png|jpg|gif)$/, loader: 'url?limit=12288'   },
        {
          test  : require.resolve( './src/vender/jquery-2.1.1.min.js' ),
          loader: 'expose?jQuery!expose?$'
        },
        {
          test  : require.resolve( './src/vender/mousetrap.min.js' ),
          loader: 'expose?Mousetrap'
        }
        ]
      },

      postcss: function () {
        return [
          require( 'postcss-cssnext' )()
        ]
      },

      resolve: {
        alias : {
          jquery     : __dirname + '/src/vender/jquery-2.1.1.min.js',
          mousetrap  : __dirname + '/src/vender/mousetrap.min.js',
          pangu      : __dirname + '/src/vender/pangu.min.js',
          progressbar: __dirname + '/src/vender/progressbar.min.js',
          velocity   : __dirname + '/src/vender/velocity.min.js',

          notify     : __dirname + '/src/vender/notify/notify.js',

          util       : __dirname + '/src/service/util.js',
          storage    : __dirname + '/src/service/storage.js',
          local      : __dirname + '/src/service/local.js',
          site       : __dirname + '/src/service/site.js',
          message    : __dirname + '/src/service/message.js',
          browser    : __dirname + '/src/service/browser.js',
          theme      : __dirname + '/src/service/theme.js',
          stylesheet : __dirname + '/src/service/stylesheet.js',
          config     : __dirname + '/src/service/config.js',

          focus      : __dirname + '/src/focus/focus.js',
          controlbar : __dirname + '/src/focus/controlbar.jsx',
          foucsetting: __dirname + '/src/focus/setting.js',

          read       : __dirname + '/src/read/read.jsx',
          readctlbar : __dirname + '/src/read/controlbar.jsx',
          readsetting: __dirname + '/src/read/setting.js',
          readschedule: __dirname + '/src/read/component/progressbar.jsx',
          readfooter : __dirname + '/src/read/component/footer.jsx',

          dialog     : __dirname + '/src/option/dialog.jsx',
          focusopt   : __dirname + '/src/option/focus.jsx',
          readopt    : __dirname + '/src/option/read.jsx',
          commonopt  : __dirname + '/src/option/common.jsx',
          themesel   : __dirname + '/src/option/common/theme.jsx',
          shortcuts  : __dirname + '/src/option/common/shortcuts.jsx',
          include    : __dirname + '/src/option/common/include.jsx',
          exclude    : __dirname + '/src/option/common/exclude.jsx',

          textfield  : __dirname + '/src/comp/textfield.jsx',
          fab        : __dirname + '/src/comp/fab.jsx',
          button     : __dirname + '/src/comp/button.jsx',
          selectfield: __dirname + '/src/comp/selectfield.jsx',
          switch     : __dirname + '/src/comp/switch.jsx',
          tabs       : __dirname + '/src/comp/tabs.jsx',
          sidebar    : __dirname + '/src/comp/sidebar.jsx',
          tooltip    : __dirname + '/src/comp/tooltip.jsx',
          waves      : __dirname + '/src/comp/waves.js',

        }
      }

};

module.exports = config;