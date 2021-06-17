const fs = require('fs')
const axios = require('axios')
const { arrayDistinct } = require('helper-js')

const PREVIEW_BASE_URL = 'http://127.0.0.1:5000'
const API_BASE_URL = 'http://127.0.0.1:8000/api'
const FALLBACK_LOCALE = 'en'

module.exports = async function () {
  const mainUrls = []
  const apiMainUrls = []
  const all = (await axios.get(API_BASE_URL + '/all')).data
  const locales = Object.keys(all)
  for (const locale in all) {
    const info = all[locale]
    apiMainUrls.push(`${API_BASE_URL}/${locale}/articles/1`)
    for (const item of Object.values(info.articles)) {
      mainUrls.push(
        `${PREVIEW_BASE_URL}/${locale}/article/${item.category.slug}/${item.slug}`
      )
      apiMainUrls.push(`${API_BASE_URL}/${locale}/article/${item.slug}`)
    }
    for (const item of Object.values(info.pages)) {
      mainUrls.push(`${PREVIEW_BASE_URL}/${locale}/page/${item.slug}`)
      apiMainUrls.push(`${API_BASE_URL}/${locale}/page/${item.slug}`)
    }
    // TODO pages
    // const {total, pageSize} = (await axios.get(`${API_BASE_URL}/${locale}/articles/1`)).data
    // const pages = Math.ceil(total / pageSize)
    // for (let page = 1; page < pages.length; page++) {
    //   mainUrls.push(`/page/${item.slug}`)
    // }
  }
  const urls = arrayDistinct([
    ...mainUrls,
    ...genUrlsWithI18n(['/'], PREVIEW_BASE_URL),
  ])
  const apiUrls = arrayDistinct(apiMainUrls)
  return { urls, apiUrls }
  function genUrlsWithI18n(mainUrls, baseUrl) {
    const r = []
    for (const url of mainUrls) {
      r.push(`${baseUrl}${url}`)
      for (const locale of locales) {
        if (locale !== FALLBACK_LOCALE) {
          r.push(`${baseUrl}/${locale}${url}`)
        }
      }
    }
    return r
  }
}
