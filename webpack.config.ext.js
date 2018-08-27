
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

      // development verify
      if ( !isProduction() ) {
        // copy files
        plugins.push(
          new CopyWebpackPlugin([
            { from   : 'src/options/options.html',        to : '../options/' },
            { from   : 'src/options/custom.html',         to : '../options/' },
            { from   : 'src/options/sitemgr.html',        to : '../options/' },
            //{ from   : "src/website_list.json" ,          to : '../' },
            //{ context: 'src/assets/css/', from : "*" ,    to : '../assets/css' },
            //{ context: 'src/assets/images/', from : "*" , to : '../assets/images' },
            //{ context: 'src/_locales/',    from : "*/*" , to : '../_locales/' },
          ])
        )
      }

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
            { from   : "ext/manifest.json" ,              to : '../' },
            { from   : "src/website_list.json" ,          to : '../' },
            { from   : 'src/options/options.html',        to : '../options/' },
            { from   : 'src/options/custom.html',         to : '../options/' },
            { from   : 'src/options/sitemgr.html',        to : '../options/' },
            { context: 'src/assets/images/', from : "*" , to : '../assets/images' },
            { context: 'src/_locales/',    from : "*/*" , to : '../_locales/' },
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

          'storage',
          'message',
          'browser',
          'version',
          'menu',
          'watch',
          'util',
        ],

        vendors : [

          // react
          './node_modules/react/dist/react.min.js',
          './node_modules/react-dom/dist/react-dom.min.js',

          // vendors
          //'minimatch',
          //'to-markdown',
          'velocity',
          'filesaver',
          'dom2image',
          'notify',

          // only read
          //'pangu',
          //'mousetrap',
          //'progressbar',
          //'util',
          //'highlight',
          //'output',

          // service
          'export',
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
          'name',
          'url',
          'modals',

          // olny options
          //'welcome',
          //'commonopt',
          //'authorize',
          //'labsopt',
          //'unrdist',
          //'about',
          //'timeago',

          // mduikit
          'tooltip',
          'waves',
          'textfield',
          'button',
          'selectfield',

          // only read
          //'fab',
          //'progress',
          //'dialog',

          // option custom
          //'switch',
          //'tabs',
          //'sidebar',
          //'list',
        ],

        contentscripts : './ext/contentscripts.js',
        background     : './ext/background.js',
        options        : './src/options/options.js',
        custom         : './src/options/custom.js',
        sitemgr        : './src/options/sitemgr.js',
      },

      output: {
        path     :  isProduction() ? './publish/bundle' : './ext/bundle',
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

      node: {
        fs: 'empty'
      },

      resolve: {
        alias : {
          notify_css : __dirname + '/src/vender/notify/notify.css',
          carous_css : __dirname + '/src/vender/carousel/carousel.css',

          markdown   : __dirname + '/node_modules/to-markdown/dist/to-markdown.js',
          epubpress  : __dirname + '/node_modules/epub-press-js/build/index.js',
          nanoid     : __dirname + '/node_modules/nanoid/generate.js',

          jquery     : __dirname + '/src/vender/jquery-2.1.1.min.js',
          mousetrap  : __dirname + '/src/vender/mousetrap.min.js',
          velocity   : __dirname + '/src/vender/velocity.min.js',
          timeago    : __dirname + '/src/vender/timeago.min.js',
          carousel   : __dirname + '/src/vender/carousel/carousel.js',
          dom2image  : __dirname + '/src/vender/dom2image.min.js',
          filesaver  : __dirname + '/src/vender/filesaver.min.js',
          instapaper : __dirname + '/src/vender/instapaper.js',

          util       : __dirname + '/src/service/util.js',
          local      : __dirname + '/src/service/local.js',
          storage    : __dirname + '/src/service/storage.js',
          message    : __dirname + '/src/service/message.js',
          browser    : __dirname + '/src/service/browser.js',
          theme      : __dirname + '/src/service/theme.js',
          stylesheet : __dirname + '/src/service/stylesheet.js',
          config     : __dirname + '/src/service/config.js',
          version    : __dirname + '/src/service/version.js',
          menu       : __dirname + '/src/service/menu.js',
          watch      : __dirname + '/src/service/watch.js',
          export     : __dirname + '/src/service/export.js',
          highlight  : __dirname + '/src/service/highlight.js',
          output     : __dirname + '/src/service/output.js',
          runtime    : __dirname + '/src/service/runtime.js',

          focus      : __dirname + '/src/focus/focus.js',
          controlbar : __dirname + '/src/focus/controlbar.jsx',

          read       : __dirname + '/src/read/read.jsx',
          toc        : __dirname + '/src/read/toc.jsx',
          special    : __dirname + '/src/read/special.jsx',
          readctlbar : __dirname + '/src/read/controlbar.jsx',
          schedule   : __dirname + '/src/read/progressbar.jsx',

          keyboard   : __dirname + '/src/module/keyboard.js',
          modals     : __dirname + '/src/module/modals.jsx',
          focusopt   : __dirname + '/src/module/focus.jsx',
          readopt    : __dirname + '/src/module/read.jsx',
          commonopt  : __dirname + '/src/module/common.jsx',
          pluginsopt : __dirname + '/src/module/plugins.jsx',
          sitesopt   : __dirname + '/src/module/sites.jsx',
          labsopt    : __dirname + '/src/module/labs.jsx',
          accountopt : __dirname + '/src/module/account.jsx',
          about      : __dirname + '/src/module/about.jsx',
          unrdist    : __dirname + '/src/module/unrdist.jsx',
          welcome    : __dirname + '/src/module/welcome.jsx',
          authorize  : __dirname + '/src/module/authorize.jsx',
          siteeditor : __dirname + '/src/module/siteeditor.jsx',
          actionbar  : __dirname + '/src/module/actionbar.jsx',
          pluginbar  : __dirname + '/src/module/pluginbar.jsx',
          sitebar    : __dirname + '/src/module/sitebar.jsx',
          enhancesite: __dirname + '/src/module/enhancesite.jsx',
          editor     : __dirname + '/src/module/common/editor.jsx',
          themesel   : __dirname + '/src/module/common/theme.jsx',
          shortcuts  : __dirname + '/src/module/common/shortcuts.jsx',
          include    : __dirname + '/src/module/common/include.jsx',
          exclude    : __dirname + '/src/module/common/exclude.jsx',
          name       : __dirname + '/src/module/common/name.jsx',
          url        : __dirname + '/src/module/common/url.jsx',

          wavess     : __dirname + '/src/vender/waves/waves.js',
          notify     : __dirname + '/src/vender/notify/notify.js',

          textfield  : __dirname + '/src/vender/mduikit/textfield.jsx',
          fab        : __dirname + '/src/vender/mduikit/fab.jsx',
          fap        : __dirname + '/src/vender/mduikit/fap.jsx',
          button     : __dirname + '/src/vender/mduikit/button.jsx',
          statebutton: __dirname + '/src/vender/mduikit/statebutton.jsx',
          selectfield: __dirname + '/src/vender/mduikit/selectfield.jsx',
          ac         : __dirname + '/src/vender/mduikit/autocomplete.jsx',
          dropdown   : __dirname + '/src/vender/mduikit/dropdown.jsx',
          switch     : __dirname + '/src/vender/mduikit/switch.jsx',
          tabs       : __dirname + '/src/vender/mduikit/tabs.jsx',
          progress   : __dirname + '/src/vender/mduikit/progress.jsx',
          sidebar    : __dirname + '/src/vender/mduikit/sidebar.jsx',
          list       : __dirname + '/src/vender/mduikit/list.jsx',
          dialog     : __dirname + '/src/vender/mduikit/dialog.jsx',
          slider     : __dirname + '/src/vender/mduikit/slider.jsx',
          tooltip    : __dirname + '/src/vender/mduikit/tooltip.jsx',
          waves      : __dirname + '/src/vender/mduikit/waves.js',

          puread     : __dirname + '/src/vender/puread/puread.js',
          puplugin   : __dirname + '/src/vender/puread/plugin.js',

        }
      }

};

module.exports = config;
