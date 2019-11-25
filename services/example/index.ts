'use strict'

// module.exports = function (fastify, opts, next) {
//   fastify.get('/example', function (request, reply) {
//     reply.send('this is an example')
//   })

//   next()
// }

// If you prefer async/await, use the following
//
module.exports = async function (fastify: any, opts: any) {
  fastify.get('/example', async function (request: any, reply: any) {
    return 'this is an example'
  })
}
