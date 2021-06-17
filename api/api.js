/* eslint-disable @typescript-eslint/no-var-requires */
const koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const gracefulShutdown = require('http-graceful-shutdown')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const app = new koa()
const { minify } = require('terser')
app.use(cors())
const apiRouter = new Router({ prefix: '/api' })
const { getAll } = require('./data.js')

const fallbackLocale = 'en'
const pageSize = 5

apiRouter.get('/all', async (ctx, next) => {
  const all = getAll()
  ctx.body = JSON.stringify(all)
})
apiRouter.get('/locales', async (ctx, next) => {
  const all = getAll()
  ctx.body = JSON.stringify(Object.keys(all))
})
apiRouter.get('/:locale/articles/:page', async (ctx, next) => {
  const all = getAll()
  const { locale, page } = ctx.params
  const articles = getArticlesList(all[locale].articles)
  const total = articles.length
  const data = getPageItems(articles, page)
  data.forEach((item) => {
    delete item.content
  })
  const r = { data, total, pageSize }
  ctx.body = JSON.stringify(r)
})

apiRouter.get('/:locale/article/:slug', async (ctx, next) => {
  const all = getAll()
  const { locale, slug } = ctx.params
  let found
  for (const id in all[locale].articles) {
    const article = all[locale].articles[id]
    if (article.slug === slug) {
      found = article
      break
    }
  }
  ctx.body = JSON.stringify(found)
})

apiRouter.get('/:locale/page/:slug', async (ctx, next) => {
  const all = getAll()
  const { locale, slug } = ctx.params
  let found
  for (const id in all[locale].pages) {
    const article = all[locale].pages[id]
    if (article.slug === slug) {
      found = article
      break
    }
  }
  ctx.body = JSON.stringify(found)
})

apiRouter.get('/:locale/categories', async (ctx, next) => {
  const all = getAll()
  const { locale } = ctx.params
  ctx.body = JSON.stringify(all[locale].categories)
})

apiRouter.get('/:locale/pages', async (ctx, next) => {
  const all = getAll()
  const { locale } = ctx.params
  const pages = all[locale].pages
  for (const key in pages) {
    const item = pages[key]
    delete item.content
  }
  ctx.body = JSON.stringify(pages)
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

const server = app.listen(8000)

// your personal cleanup function - this one takes one second to complete
function cleanup() {
  return new Promise((resolve) => {
    console.log('... in cleanup')
    setTimeout(function () {
      console.log('... cleanup finished')
      resolve()
    }, 1000)
  })
}

// this enables the graceful shutdown with advanced options
gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 2000,
  development: false,
  onShutdown: cleanup,
  finally: function () {
    console.log('Server gracefulls shutted down.....')
  },
})

function getArticlesList(articlesMapping) {
  return Object.values(articlesMapping).sort(
    (a, b) => b.created_at.getTime() - a.created_at.getTime()
  )
}

function getPageItems(list, page) {
  return list.slice((page - 1) * pageSize, pageSize)
}

// all html of selected elements
function allHtml($els) {
  let r = ''
  $els.each((e, el) => {
    r += $(el).html()
  })
  return r
}
