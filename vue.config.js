module.exports = {
    lintOnSave: false,
    devServer: {
    // 环境配置
    host: '',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    // proxy: {
        
      // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      // '/api': {
      //   target: 'http://192.168.1.248:9888',
      //   // target: 'http://192.168.1.4:8999',
      //   pathRewrite: {
      //     '^/api': '/api'
      //   }
      // }
    // }
    // proxy:'http://localhost:8080'
  },
}