'use strict'

export default async function (fastify, opts) {
  function index(request, reply) {
    reply.view('demo', {
      title: 'ejs-index',
      news: ['新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻']
    })
  }

  fastify.get('/', index)
  fastify.get('/index', index)

}

