'use strict'

module.exports = async function (fastify: any, opts: any) {
  fastify.get('/example', async function (request: any, reply: any) {
    return 'this is an example'
  })
}
