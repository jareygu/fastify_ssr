'use strict'
const fs = require('fs')
const path = require('path')

module.exports = async function (fastify, opts) {
  function index(request, reply) {
    reply.view('index', {
      title: 'ejs-index',
      news: ['新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻']
    })
  }

  fastify.get('/', index)
  fastify.get('/index', index)

}

