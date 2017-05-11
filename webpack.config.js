
const webpack = require( 'webpack' ),
    plugins = [

      // public reqire( xxx )
      new webpack.ProvidePlugin({
        React    : 'react',
        ReactDOM : 'react-dom',
        Notify   : 'notify',
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
            { from   : 'src/options/options.html',        to : '../options/' },
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

        common : [
          'babel-polyfill',

          'jquery',

          'browser',
          'message',
          'storage',
          'site',
          'version'
        ],

        vendors : [

          // react
          './node_modules/react/dist/react.min.js',
          './node_modules/react-dom/dist/react-dom.min.js',

          // vendors
          'pangu',
          'mousetrap',
          'progressbar',
          'velocity',
          'timeago',

          'wavess',
          'notify',

          // service
          'util',
          'theme',
          'stylesheet',
          'config',

          // module
          'focusopt',
          'readopt',
          'themesel',
          'shortcuts',
          'include',
          'exclude',

          // component
          'textfield',
          'fab',
          'button',
          'selectfield',
          'switch',
          'tabs',
          'sidebar',
          'list',
          'progress',
          'tooltip',
          'waves'
        ],

        contentscripts : './src/contentscripts.js',
        background     : './src/background.js',
        options        : './src/options/options.js',
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
          timeago    : __dirname + '/src/vender/timeago.min.js',
          carousel    : __dirname + '/src/vender/carousel/carousel.js',

          wavess     : __dirname + '/src/vender/waves/waves.js',
          notify     : __dirname + '/src/vender/notify/notify.js',

          util       : __dirname + '/src/service/util.js',
          local      : __dirname + '/src/service/local.js',
          storage    : __dirname + '/src/service/storage.js',
          site       : __dirname + '/src/service/site.js',
          message    : __dirname + '/src/service/message.js',
          browser    : __dirname + '/src/service/browser.js',
          theme      : __dirname + '/src/service/theme.js',
          stylesheet : __dirname + '/src/service/stylesheet.js',
          config     : __dirname + '/src/service/config.js',
          version    : __dirname + '/src/service/version.js',

          focus      : __dirname + '/src/focus/focus.js',
          controlbar : __dirname + '/src/focus/controlbar.jsx',

          read       : __dirname + '/src/read/read.jsx',
          readctlbar : __dirname + '/src/read/controlbar.jsx',
          readschedule: __dirname+ '/src/read/component/progressbar.jsx',
          readfooter : __dirname + '/src/read/component/footer.jsx',

          modals     : __dirname + '/src/module/modals.jsx',
          focusopt   : __dirname + '/src/module/focus.jsx',
          readopt    : __dirname + '/src/module/read.jsx',
          commonopt  : __dirname + '/src/module/common.jsx',
          about      : __dirname + '/src/module/about.jsx',
          unrdist    : __dirname + '/src/module/unrdist.jsx',
          welcome    : __dirname + '/src/module/welcome.jsx',
          themesel   : __dirname + '/src/module/common/theme.jsx',
          shortcuts  : __dirname + '/src/module/common/shortcuts.jsx',
          include    : __dirname + '/src/module/common/include.jsx',
          exclude    : __dirname + '/src/module/common/exclude.jsx',

          textfield  : __dirname + '/src/comp/textfield.jsx',
          fab        : __dirname + '/src/comp/fab.jsx',
          button     : __dirname + '/src/comp/button.jsx',
          selectfield: __dirname + '/src/comp/selectfield.jsx',
          switch     : __dirname + '/src/comp/switch.jsx',
          tabs       : __dirname + '/src/comp/tabs.jsx',
          progress   : __dirname + '/src/comp/progress.jsx',
          sidebar    : __dirname + '/src/comp/sidebar.jsx',
          list       : __dirname + '/src/comp/list.jsx',
          dialog     : __dirname + '/src/comp/dialog.jsx',
          tooltip    : __dirname + '/src/comp/tooltip.jsx',
          waves      : __dirname + '/src/comp/waves.js',

        }
      }

};

module.exports = config;