'use strict'
import * as fs from "fs";
import * as path from "path";

export default async function (fastify, opts) {
  function index(request, reply) {
    reply.view('index', {
      title: 'ejs-index',
      news: ['新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻', '新闻新闻']
    })
  }

  fastify.get('/', index)
  fastify.get('/index', index)

}

