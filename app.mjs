'use strict'

import * as path from "path"
import Fastify from 'fastify'
import AutoLoad from 'fastify-autoload'
import ServeStatic from 'fastify-static'
import PointOfView from 'point-of-view'
import ejsLayout from './app/layout.mjs'
import { readFileSync } from 'fs'

const json = readFileSync("config.json", "utf8")
const { host, port } = JSON.parse(json)

const fastify = Fastify()

async function init(opts) {

  // 托管静态资源
  fastify.register(ServeStatic, {
    root: path.join(process.cwd(), 'public')
  });

  // 加入ejs支持
  fastify.register(PointOfView, {
    engine: {
      "ejs-mate": ejsLayout,
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
  });

  fastify.register(AutoLoad, {
    dir: path.join(process.cwd(), 'app/routes'),
    options: Object.assign({}, opts)
  });

  fastify.listen(port, host, function (err) {
    if (err) {
      console.error(err);
      process.exit(1)
    }
    console.log(`server listening on http://${host}:${port}`)

  });
}

init().catch(console.error)
