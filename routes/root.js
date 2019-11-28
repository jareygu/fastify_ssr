'use strict'
const fs = require('fs')
const path = require('path')
module.exports = async function (fastify, opts) {
  function index(request, reply) {
    let html = fs.readFileSync(path.resolve(__dirname, '../assets/index.html'), 'utf8')
    reply.header('Content-Type', 'text/html')
      .send(html)
  }
  fastify.get('/', index)
  fastify.get('/index', index)
}
