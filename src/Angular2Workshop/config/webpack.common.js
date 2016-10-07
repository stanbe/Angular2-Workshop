const webpack = require('webpack');
const helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin'); 
var CleanWebpackPlugin = require('clean-webpack-plugin');


const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular 2 Workshop',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
  isProd = options.env === 'production';
  return {
  
    metadata: METADATA,
    
    entry: {

      'polyfills': './clientsrc/polyfills.browser.ts',
      'vendor': './clientsrc/vendor.browser.ts',
      'main': './clientsrc/boot.ts'
    },
    
    resolve: {      
      extensions: ['', '.ts', '.js', '.json', '.scss', '.css'],
      modules: [helpers.root('clientsrc'), 'node_modules'],

    },
    
    module: {

      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('clientsrc')]
        },

      ],
      
      loaders: [

        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: 'raw-loader!style-loader!css-loader!sass-loader'
        },
        
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('clientsrc/index.html')]
        },
        
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
            test: /bootstrap\/dist\/js\/umd\//,
            loader: 'imports?jQuery=jquery'
        }
      ],

      postLoaders: [
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
            replace: 'var sourceMappingUrl = "";',
            flags: 'g'
          }
        }
      ]
    },    
    plugins: [      
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('clientsrc') // location of your src
      ),

      new CleanWebpackPlugin(
                [
                    './wwwroot/dist',                    
                ]
            ),
      
      new CopyWebpackPlugin([{
          from: 'clientsrc/assets',
        to: 'assets'
      }]),

      new HtmlWebpackPlugin({
          template: 'clientsrc/index.html',
        chunksSortMode: 'dependency'
      }),
      
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
      })

    ],

  };
}
