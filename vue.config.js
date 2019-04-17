const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const glob = require('glob')

const pages = {
    index: {
        entry: './src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        // title: '泰洋系',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    entry: {
        entry: './src/pageEntry/main.js',
        template: './src/pageEntry/entry.html',
        filename: 'entry.html',
        // title: '员工入职信息',
        chunks: ['chunk-vendors', 'chunk-common', 'entry']
    }
}

module.exports = {
    pages,
    lintOnSave: false,  // 关闭代码检查
    productionSourceMap: false, // 生产环境取消sourcemap
    configureWebpack: config => { // 开启gzip
      if (process.env.NODE_ENV === 'production') {
          // 生产环境
          config.plugins.push(
              new CompressionWebpackPlugin({
                  filename: '[path].gz[query]',
                  algorithm: 'gzip',
                  test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                  threshold: 10240,
                  minRatio: 0.8
              })
          );
      }
    },
//     devServer: {
//     // 环境配置
//     host: 'localhost',
//     port: 8080,
//     https: false,
//     hotOnly: false,
//     open: true, //配置自动启动浏览器
//     proxy: {
        
//       //配置多个代理(配置一个 proxy: 'http://localhost:4000' )
//       '/api': {
//             target: 'https://api.corvus.dev',
//             pathRewrite: {
//                 '^/api': ''
//             },
//             changeOrigin: true
//       }
//     }
//   },
}
