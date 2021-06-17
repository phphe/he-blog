const fs = require('fs')
const path = require('path')
const hp = require('helper-js')
const marked = require('marked')
const crypto = require('crypto')
const YAML = require('yaml')
const dayjs = require('dayjs')
const p = (part) => path.join(__dirname, part)
const resolveName = (filename) => {
  let id = filename.split(' ', 1)[0]
  let name
  if (!id.match(/^\d+$/)) {
    id = name = filename.replace(/\.md$/, '')
  } else {
    name = filename.substring(id.length + 1).replace(/\.md$/, '')
  }
  return { id, name }
}

const PAGES_ID = '0'
const FALLBACK_LOCALE = 'en' // fallback and main
const CACHE_ENABLED = true

function getAll() {
  const r = {}
  const contentPath = p('../content')
  const slugs = {}
  iterateLocale(FALLBACK_LOCALE)
  fs.readdirSync(contentPath).forEach((locale) => {
    if (!locale !== FALLBACK_LOCALE) {
      iterateLocale(locale)
    }
  })
  // alternate
  const slugsByID = {}
  for (const locale in r) {
    const info = r[locale]
    const iterate = (id, item) => {
      if (!slugsByID[id]) {
        slugsByID[id] = {}
      }
      slugsByID[id][locale] = item.slug
      item.alternate = slugsByID[id]
    }
    for (const id in info.articles) {
      const article = info.articles[id]
      iterate(id, article)
    }
    for (const id in info.pages) {
      const page = info.pages[id]
      iterate(id, page)
    }
    for (const id in info.categories) {
      const cat = info.categories[id]
      iterate(id, cat)
    }
  }
  return r
  function iterateLocale(locale) {
    slugs[locale] = {}
    const uniqueSlugs = {} // slug must be unique in a locale
    const info = (r[locale] = {
      articles: {},
      categories: {},
      pages: {},
    })
    const categoriesPath = path.join(contentPath, locale)
    fs.readdirSync(categoriesPath).forEach((t) => {
      const { id, name } = resolveName(t)
      if (!info.categories[id]) {
        info.categories[id] = { name }
      }
      const category = info.categories[id]
      const category_id = id
      category.id = id
      category.slug =
        r[FALLBACK_LOCALE].categories[id].slug || strToSlug(category.name)
      const categoryPath = path.join(categoriesPath, t)
      fs.readdirSync(categoryPath).forEach((t) => {
        const articlePath = path.join(categoryPath, t)
        let { id, name } = resolveName(t)
        id = `${category_id}_${id}`
        const article = { title: name }
        const mdInfo = getMarkdownInfo(articlePath)
        Object.assign(article, mdInfo)
        if (!article.slug) {
          article.slug = slugs[FALLBACK_LOCALE][id] || strToSlug(article.title)
        }
        if (uniqueSlugs[article.slug]) {
          console.warn('slug exists:', article.slug)
          throw 'slug exists'
        }
        article.category_id = category_id
        article.category = category
        slugs[locale][id] = article.slug
        uniqueSlugs[article.slug] = true
        if (category_id === PAGES_ID) {
          info.pages[id] = article
        } else {
          info.articles[id] = article
        }
      })
    })
  }
}

function md5(str) {
  var md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}

function getMarkdownInfo(filePath) {
  const stat = fs.statSync(filePath)
  const t = md5(filePath)
  const cacheDir = path.join(__dirname, '.cache/')
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }
  const cachePath = path.join(cacheDir, t)
  const cacheInfoPath = path.join(cacheDir, 'info.json')
  const cacheInfo = fs.existsSync(cacheInfoPath)
    ? JSON.parse(fs.readFileSync(cacheInfoPath).toString())
    : {}
  let info
  if (CACHE_ENABLED && cacheInfo[t] && cacheInfo[t] === stat.mtimeMs) {
    info = readCacheInfo(cachePath)
  } else {
    let mdStr = fs.readFileSync(filePath).toString()
    let m = mdStr.match(/^```yml\n([\s\S]*?)\n```/)
    info = {}
    if (m) {
      info = YAML.parse(m[1]) || {}
      mdStr = mdStr.substring(m[0].length)
    }
    if (!info.created_at) {
      info.created_at = stat.ctime
    }
    m = mdStr.match(/(^|\n)#(.+?)\n/)
    if (m) {
      info.title = m[2].trim()
      mdStr = mdStr.substring(m[0].length)
    }
    let html = marked(mdStr)
    info.content = html
    cacheInfo[t] = stat.mtimeMs
    fs.writeFileSync(cachePath, JSON.stringify(info))
    fs.writeFileSync(cacheInfoPath, JSON.stringify(cacheInfo))
  }
  return info
}

function readCacheInfo(cachePath) {
  const info = JSON.parse(fs.readFileSync(cachePath).toString())
  info.created_at = dayjs(info.created_at).toDate()
  return info
}

module.exports = {
  getAll,
}

function strToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}
