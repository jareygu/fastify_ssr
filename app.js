'use strict'

import path from "path"
import Fastify from 'fastify'
import ServeStatic from 'fastify-static'
import PointOfView from 'point-of-view'
import ejsLayout from './app/layout.js'
import * as fs from 'fs'
import glob from 'glob'

const json = fs.readFileSync("config.json", "utf8")
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
    options: {},
    includeViewExtension: true,
    templates: path.resolve("app/views")
  });

  // 注册路由
  for (let js of glob.sync("./app/routes/**/*.js")) {
    let route = await import(js)
    fastify.register(route.default)
  }

  fastify.listen(port, host, function (err) {
    if (err) {
      console.error(err);
      process.exit(1)
    }
    console.log(`server listening on http://${host}:${port}`)
  });
}

init().catch(console.error)
