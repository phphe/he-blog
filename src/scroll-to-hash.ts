// VueRouter scrollBehavior does not work, so use this file
import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'
import * as hp from 'helper-js'

export function initScrollToHash(router: VueRouter.Router) {
  let latestID = 0
  router.afterEach(() => {
    if (location.hash) {
      const localID = ++latestID
      nextTick(() => {
        const getEl = () =>
          document.getElementById(location.hash.substr(1)) ||
          document.getElementsByName(location.hash.substr(1))[0]
        hp.waitFor(() => Boolean(getEl()), 60, 333).promise.then(() => {
          if (localID !== latestID) {
            // expired
            return
          }
          const el = getEl()
          setTimeout(() => {
            el.scrollIntoView?.()
          }, 100)
        })
      })
    }
  })
}
