import { devServer } from './.temp/dev'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: devServer,
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/icon', '@nuxtjs/seo'],

  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },

  icon: {
    mode: 'svg',
    collections: ['bx', 'ph'],
    customCollections: [{ prefix: 'menus', dir: './assets/icons' }],
  },
  app: {
    head: {
      htmlAttrs: { style: 'scroll-behavior: smooth;', lang: 'ru' },
      titleTemplate: '%s %separator %siteName',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    },
  },

  router: { options: { scrollBehaviorType: 'smooth' } },
})
