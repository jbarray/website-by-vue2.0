'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
//配置json数据
// const express=require('express')
// const app=express()
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
//   var jsonServer=new jsonServer()
//   var jsonServer=require('json-server')
//   var apiServer=jsonServer.create()
//   var apiRouter=jsonServer.router('db.json')
//   var middlewares=jsonServer.defaults()
//   apiServer.use(middlewares)
// apiServer.use(apiRouter)
// apiServer.listen(port+1,function(){
//   console.log('JSON Server is running')
// })
//   var appData=require('../static/db.json')
 //  var seller=appData.seller
 //  var goods=appData.result
  // var ratings=appData.ratings
  // var apiRoutes=express.Router()
  // app.use('/api',apiRoutes)
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
    // before(app){
    //   app.get('/api/getNewsList',(req,res)=>{
    //     res.json({
    //     "getBoardList": [
    //       {
    //         "title": "开放产品",
    //         "description": "开放产品是一款开放产品",
    //
    //         "saleout": false
    //       },
    //       {
    //         "title": "品牌营销",
    //         "description": "品牌营销帮助你的产品更好地找到定位",
    //         "saleout": false
    //       },
    //       {
    //         "title": "使命必达",
    //         "description": "使命必达快速迭代永远保持最前端的速度",
    //         "saleout": true
    //       },
    //       {
    //         "title": "勇攀高峰",
    //         "description": "帮你勇闯高峰，到达事业的顶峰",
    //         "saleout": false
    //       }
    //   })
    //   }),
    //   app.get('/api/goods',(req,res)=>{
    //     res.json({
    //     "getBoardList": [
    //       {
    //         "title": "开放产品",
    //         "description": "开放产品是一款开放产品",
    //
    //         "saleout": false
    //       },
    //       {
    //         "title": "品牌营销",
    //         "description": "品牌营销帮助你的产品更好地找到定位",
    //         "saleout": false
    //       },
    //       {
    //         "title": "使命必达",
    //         "description": "使命必达快速迭代永远保持最前端的速度",
    //         "saleout": true
    //       },
    //       {
    //         "title": "勇攀高峰",
    //         "description": "帮你勇闯高峰，到达事业的顶峰",
    //         "saleout": false
    //       }
    //   })
    //   }),
    //   app.get('/api/ratings',(req,res)=>{
    //     res.json({
    //     "getBoardList": [
    //       {
    //         "title": "开放产品",
    //         "description": "开放产品是一款开放产品",
    //
    //         "saleout": false
    //       },
    //       {
    //         "title": "品牌营销",
    //         "description": "品牌营销帮助你的产品更好地找到定位",
    //         "saleout": false
    //       },
    //       {
    //         "title": "使命必达",
    //         "description": "使命必达快速迭代永远保持最前端的速度",
    //         "saleout": true
    //       },
    //       {
    //         "title": "勇攀高峰",
    //         "description": "帮你勇闯高峰，到达事业的顶峰",
    //         "saleout": false
    //       }
    //   })
    //   })

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
