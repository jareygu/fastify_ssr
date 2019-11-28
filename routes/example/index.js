'use strict'
const fs = require('fs')
const path = require('path')

module.exports = async function (fastify, opts) {
  fastify.get('/example', async function (request, reply) {
    let html = fs.readFileSync(path.resolve(__dirname,'../../assets/example.html'))
    reply.header('Content-Type', 'text/html')
      .send(html)
  })

}
