'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const ServeStatic = require('fastify-static')
const PointOfView = require('point-of-view')
const ejsMate = require('./app/layout')


module.exports = async function (fastify, opts) {

  // 托管静态资源
  fastify.register(ServeStatic, {
    root: path.join(process.cwd(), 'public')
  })

  // 加入ejs支持
  fastify.register(PointOfView, {
    engine: {
      "ejs-mate": ejsMate,
    },
    options: {
      context: {
        test() {
          return "TEST"
        }
      }
    },
    includeViewExtension: true,
    templates: path.resolve("app/views")
  });

  // 注册插件和路由
  fastify.register(AutoLoad, {
    dir: path.join(process.cwd(), 'app/plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(process.cwd(), 'app/routes'),
    options: Object.assign({}, opts)
  })
}
