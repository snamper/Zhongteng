module.exports = {
  devServer: {
    open: true,

    proxy: {
      //配置跨域
      '/api': {
        target: 'http://120.27.214.242/api', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        secure: false,
        pathRewrite: {
          '^/api': '', //请求的时候使用这个api就可以
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.set('externals', {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      echarts: 'echarts',
      'element-ui': 'ELEMENT',
    })
  },
  transpileDependencies: ['vue-json-excel'],
}
