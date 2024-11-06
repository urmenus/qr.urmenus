export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:setup', () => {
    const _ = useQrCode('result')
  })
})
