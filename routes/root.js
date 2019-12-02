'use strict'
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

module.exports = async function (fastify, opts) {
  async function index(request, reply) {
    // let html = fs.readFileSync(path.resolve(__dirname, '../views/index.html'), 'utf8')
    // reply.header('Content-Type', 'text/html')
    //   .send(html)
    let html = await ejs.renderFile(
      path.resolve(__dirname, '../views/index.html'),
      {
        title: 'ejs-index',
        news: ['新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻']
      })
    reply.header('Content-Type', 'text/html')
      .send(html)
  }
  fastify.get('/', index)
  fastify.get('/index', index)
}
