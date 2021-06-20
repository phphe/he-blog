const fs = require('fs')
const path = require('path')
const axios = require('axios')
const hp = require('helper-js')
const os = require('os')
const Nightmare = require('nightmare')
const { minify: minifyHTML } = require('html-minifier')
const getAllUrls = require('./all-url.js')
const { url } = require('koa-router')
const tempDist = fs.mkdtempSync(path.join(os.tmpdir(), 'prerender-dist'))
const maxPageConcurrent = 20
const maxApiConcurrent = 20
const RETRY = 3
const origin = 'https://phphe.com/'

start()

async function start() {
  const { apiUrls, urls } = await getAllUrls()
  genSitemapAndRobotsTXT(urls)
  await scrapePages(urls)
  await scrapeAllApi(apiUrls)
  fs.readdirSync(tempDist).forEach((name) => {
    fs.renameSync(
      path.join(tempDist, name),
      path.join(__dirname, '../dist', name)
    )
  })
}

function scrapeOnePage(url, opt = {}, count = 0) {
  return new Promise((resolve, reject) => {
    const nightmare = Nightmare({ show: false, ...opt })
    nightmare
      .goto(url)
      .wait('title')
      .evaluate(() => document.documentElement.outerHTML)
      .end()
      .then((html) => {
        html = html.replace(
          '</head>',
          '<script>window.__IS_GENERATED__ = true</script></head>'
        )
        html = minifyHTML(`<!DOCTYPE html>${html}`)
        writeFileSyncRecursively(
          path.join(
            tempDist,
            removeDomain(url).replace(/\/$/, '') + '/index.html'
          ),
          html
        )
        console.log(`Page scraped:`, url)
        resolve()
      })
      .catch((e) => {
        console.log('Page failed:', url)
        if (count < RETRY - 1) {
          console.log('Page retry:', url)
          resolve(scrapeOnePage(url, opt, count + 1))
        } else {
          reject(e)
        }
      })
  })
}

async function scrapePages(urls, opt = {}) {
  return hp.executePromiseGetters(
    urls.map((url) => {
      return () => scrapeOnePage(url, opt)
    }),
    maxPageConcurrent
  ).promise
}

function scrapeApi(url, opt = {}, count = 0) {
  return axios
    .get(url)
    .then((response) => {
      writeFileSyncRecursively(
        path.join(tempDist, removeDomain(url)),
        JSON.stringify(response.data)
      )
      console.log(`Api scraped:`, url)
    })
    .catch((e) => {
      console.log('Api failed:', url)
      if (count < RETRY - 1) {
        console.log('Api retry:', url)
        return scrapeApi(url, opt, count + 1)
      } else {
        throw e
      }
    })
}

async function scrapeAllApi(urls, opt = {}) {
  return hp.executePromiseGetters(
    urls.map((url) => {
      return () => scrapeApi(url, opt)
    }),
    maxApiConcurrent
  ).promise
}

function removeDomain(url) {
  return url.replace(/^.*\/\/[^/]+/, '')
}

function writeFileSyncRecursively(filepath, contents) {
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return fs.writeFileSync(filepath, contents)
}

function genSitemapAndRobotsTXT(urls) {
  urls = urls.map((v) => {
    if (!v.endsWith('/')) {
      v += '/'
    }
    return v.replace(/^http.*?\/\/.+?\//, origin)
  })
  const lastmod = new Date().toISOString()
  let t = urls
    .map(
      (url) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <priority>${url === origin ? '1.00' : '0.80'}</priority>
</url>`
    )
    .join('\n')
  let r = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${t}
</urlset>`
  fs.writeFileSync(path.join(tempDist, 'sitemap.xml'), r)
  fs.writeFileSync(
    path.join(tempDist, 'robots.txt'),
    `Sitemap: ${origin}sitemap.xml`.trim()
  )
}
