const fs = require('fs')
const path = require('path')
const axios = require('axios')
const hp = require('helper-js')
const os = require('os')
const Nightmare = require('nightmare')
const { minify: minifyHTML } = require('html-minifier')
const getAllUrls = require('./all-url.js')
const tempDist = fs.mkdtempSync(path.join(os.tmpdir(), 'prerender-dist'))
const maxPageConcurrent = 20
const maxApiConcurrent = 20
const RETRY = 3

start()

async function start() {
  const { apiUrls, urls } = await getAllUrls()
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
