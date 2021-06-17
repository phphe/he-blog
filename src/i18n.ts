import {
  createApp,
  ref,
  ComponentInternalInstance,
  onBeforeUnmount,
  getCurrentInstance,
} from 'vue'
import { createI18n } from 'vue-i18n'
import * as VueRouter from 'vue-router'
import { AxiosInstance } from 'axios'
import { cloneObject } from './utils'
import * as hp from 'helper-js'

export const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      Languages: 'Languages',
      Home: 'Home',
      Works: 'Works',
      About: 'About',
    },
    zh: {
      Languages: '语言',
      Home: '首页',
      Works: '作品',
      About: '关于',
    },
  },
})

export function initI18n(app: ReturnType<typeof createApp>) {
  app.use(i18n)
}

export function i18nInitRouter(router: VueRouter.Router) {
  router.getRoutes().forEach((route) => {
    if (route.path) {
      const localePath = `/:locale${route.path}`.replace(/\/$/, '')
      const newRoute = cloneObject(route)
      newRoute.components = route.components
      newRoute.path = localePath
      // @ts-ignore
      newRoute.name = `${newRoute.name}.i18n`
      router.addRoute(newRoute)
    }
  })
  router.afterEach((to, from, failure) => {
    if (failure) {
      return
    }
    // @ts-ignore
    const locale: string =
      to.params.locale ||
      (Array.isArray(i18n.global.fallbackLocale)
        ? i18n.global.fallbackLocale[0]
        : i18n.global.fallbackLocale)
    if (locale !== i18n.global.locale) {
      i18n.global.locale = locale
    }
  })
}

export function i18nInitAxios(axiosInstance: AxiosInstance) {
  // axiosInstance.defaults.baseURL = axiosInstance.defaults.baseURL
  axiosInstance.interceptors.request.use(
    function (config) {
      config.baseURL = config.baseURL + '/' + i18n.global.locale
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
}

export function getRouteByLocale(
  route: VueRouter.RouterLinkProps['to'],
  locale: string
) {
  const newRoute: VueRouter.RouterLinkProps['to'] = hp.objectOnly(route, [
    'name',
    'params',
    'query',
  ])
  if (locale === i18n.global.fallbackLocale) {
    if (newRoute.params) {
      newRoute.params = { ...newRoute.params }
      delete newRoute.params.locale
    }
    // @ts-ignore
    newRoute.name = newRoute.name.replace(/\.i18n$/, '')
  } else {
    if (!newRoute.params) {
      newRoute.params = {}
    }
    newRoute.params.locale = locale
    // @ts-ignore
    if (!newRoute.name.match(/\.i18n$/)) {
      // @ts-ignore
      newRoute.name = newRoute.name + '.i18n'
    }
  }
  return newRoute
}

interface Hoooks {
  afterI18nRouteGenerated?: (
    route: VueRouter.RouteLocationNormalizedLoaded,
    to: string
  ) => VueRouter.RouteRecordRaw
}
export const hooks: Hoooks = {}
export const useOnAfterI18nRouteGenerated = generateUseFunction<
  Hoooks['afterI18nRouteGenerated']
>('afterI18nRouteGenerated')

export function switchLocale(
  to: string,
  router: VueRouter.Router,
  currentRoute: VueRouter.RouteRecordRaw
) {
  let newRoute = getRouteByLocale(currentRoute, to)
  if (hooks.afterI18nRouteGenerated) {
    // @ts-ignore
    newRoute = hooks.afterI18nRouteGenerated(newRoute, to)
  }
  router.push(newRoute)
}

function generateUseFunction<T>(name: string) {
  return (hook: T, vm?: ComponentInternalInstance) => {
    // @ts-ignore
    hooks[name] = hook
    const thevm = vm || getCurrentInstance()
    if (!thevm) {
      throw new Error(
        `i18n hook ${name}: the second argument is required when called outside of setup`
      )
    }
    onBeforeUnmount(() => {
      // @ts-ignore
      if (hooks[name] === hook) {
        // @ts-ignore
        hooks[name] = null
      }
    }, thevm)
  }
}
