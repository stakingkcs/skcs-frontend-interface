const { when } = require('@craco/craco')
const path = require('path')
const CracoLessPlugin = require('craco-less')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // config less variable here
            modifyVars: {
              '@primary-color': '#31D7A0',
              '@link-color': '#0fcd8c',
              '@logo-color': '#39E1A4',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
      'sha3.js': path.resolve(process.cwd(), 'node_modules', 'js-sha3.js'),
      'bignumber.js': path.resolve(process.cwd(), 'node_modules', 'bignumber.js'),
    },
    configure: (config) => {
      config.devtool = process.env.NODE_ENV === 'production' ? false : 'source-map'
      if (process.env.NODE_ENV !== 'development') {
        config.optimization = {
          splitChunks: {
            chunks: 'all',
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 6,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
              bn: {
                name: 'bn.js',
                test: /[\\/]node_modules[\\/][a-zA-Z]*bn.js[\\/]/,
                priority: 100,
              },
              bignumber: {
                name: 'bignumber.js',
                test: /[\\/]node_modules[\\/]bignumber.js[\\/]/,
                priority: 100,
              },
              styledcomponent: {
                name: 'styled-component',
                test: /[\\/]node_modules[\\/]styled-component[\\/]/,
                priority: 60,
              },
              lodash: {
                name: 'lodash',
                test: /[\\/]node_modules[\\/]lodash[\\/]/,
                priority: 80,
              },
              moment: {
                name: 'moment',
                test: /[\\/]node_modules[\\/]moment[\\/]/,
                priority: 80,
              },
              reactdom: {
                name: 'react-dom',
                test: /[\\/]node_modules[\\/]react-dom[\\/]/,
                priority: 80,
              },
              reactrouterdom: {
                name: 'react-router-dom',
                test: /[\\/]node_modules[\\/]react-router-dom[\\/]/,
                priority: 60,
              },
              web3: {
                name: 'web3',
                test: /[\\/]node_modules[\\/]web3[\\/]/,
                priority: 40,
              },
              ethersproject: {
                name: 'ethersproject',
                test: /[\\/]node_modules[\\/]\@ethersproject[\\/]/,
                priority: 40,
              },
              ethereumjs: {
                name: 'ethereumjs',
                test: /[\\/]node_modules[\\/]ethereumjs-[a-zA-Z]*[\\/]/,
                priority: 40,
              },
              antd: {
                name: 'antd',
                test: /[\\/]node_modules[\\/]antd[\\/]/,
                priority: 40,
              },
              antdesign: {
                name: '@ant-design',
                test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                priority: 40,
              },
              idna: {
                name: 'idna-uts46-hx',
                test: /[\\/]node_modules[\\/]idna-uts46-hx[\\/]/,
                priority: 90,
              },
              sha3: {
                name: 'sha3',
                test: /[\\/]node_modules[\\/]js-sha3[\\/]/,
                priority: 90,
              },
            },
          },
        }
      }
      return config
    },
    plugins: [
      ...when(
        process.env.NETWORK === 'main',
        () => [
          new TerserPlugin({
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: process.env.NODE_ENV === 'production',
                drop_debugger: true,
                pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log'] : '',
              },
            },
          }),
        ],
        []
      ),
      ...when(process.env.NETWORK === 'analysis', () => [new BundleAnalyzerPlugin()], []),
    ],
  },
}
