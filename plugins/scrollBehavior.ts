import type { NuxtApp, RouterOptions } from 'nuxt/schema'

type ElementTop = Element & { offsetTop: number }

type _NuxtApp = NuxtApp & { $router: { options: RouterOptions } }

export default defineNuxtPlugin((nuxtApp) => {
  ;(nuxtApp as unknown as _NuxtApp).$router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash && to.path == from.path) {
      const el = document.querySelector(to.hash) as ElementTop
      return el ? { top: el.offsetTop, left: 0, behavior: 'smooth' } : { top: 0, left: 0 }
    }
    return { top: 0, left: 0 }
  }
})
