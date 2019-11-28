'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const ServeStatic = require('fastify-static')

module.exports = function (fastify, opts, next) {

  // 引入静态资源
  fastify.register(ServeStatic, {
    root: path.join(process.cwd(), 'assets')
  })


  // 注册插件和路由
  fastify.register(AutoLoad, {
    dir: path.join(process.cwd(), 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(process.cwd(), 'routes'),
    options: Object.assign({}, opts)
  })

  next()
}
