import type { DownloadOptions, QrInstant, RequiredOptions } from '@/types'
import { debounceFilter } from '@vueuse/core'
import QRCodeStyling, { type Options } from 'qr-code-styling'
import QrScanner from 'qr-scanner'

export const defaultOptions: RequiredOptions = {
  type: 'canvas',
  shape: 'square',
  width: 300,
  height: 300,
  data: 'https://urmenus.ru/#70daa0',
  margin: 0,
  qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
  dotsOptions: { type: 'square', color: '#000000' },
  backgroundOptions: { color: '#ffffff' },
  image: undefined,
  cornersSquareOptions: { type: 'square', color: '#000000' },
  cornersDotOptions: { type: 'square', color: '#000000' },
}

const blobToBase64 = (blob: Blob | Buffer<ArrayBufferLike> | null): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(blob as Blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
  })
}

const fileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Failed to convert file to Base64.'))
    }
    reader.onerror = (error) => reject(error)
  })
}

const qrInstants = ref<QrInstant>({})

export const useQrCode = (name?: string) => {
  name ??= useId()

  const qr = shallowRef<QRCodeStyling>()

  const instant = computed({
    get: () => qrInstants.value[name] || null,
    set: (val) => (qrInstants.value[name] = val),
  })

  const options = computed({
    get: () => (instant.value ? instant.value.options : ({} as RequiredOptions)),
    set: (val) => (instant.value.options = val),
    // set: (val: Partial<RequiredOptions>) => (instant.value.options = { ...instant.value.options, ...val }),
  })

  const image = computed({
    get: () => (instant.value ? instant.value.image : ''),
    set: (val) => (instant.value.image = val),
  })

  const data = computed({
    get: () => (instant.value ? instant.value.options.data : ''),
    set: (val) => (instant.value.options.data = val.trim()),
    // set: (val) => (instant.value.options.data = val!.replace(/^https?:\/\//, '').trim()),
  })

  const isReadable = computed({
    get: () => (instant.value ? instant.value.isReadable : false),
    set: (val) => (instant.value.isReadable = val),
  })

  const Image = computed(() => h('img', { src: image.value, alt: `qr-code:${data.value}` }))

  const updateImage = async (isMounted = false) => {
    try {
      if (!instant.value) throw Error('instant.value is undefined')
      if (!qr.value) throw Error('qr.value is undefined')

      if (!isMounted) qr.value.update(options.value as Options)
      const blob = (await qr.value.getRawData('svg')) as Blob
      // const base64 = await blobToBase64(blob)
      const base64 = useObjectUrl(blob).value
      if (!base64) throw Error('base64 not create')
      image.value = base64

      const { data: url } = await QrScanner.scanImage(blob, { returnDetailedScanResult: true })
      isReadable.value = options.value.data === url
    } catch (error) {
      isReadable.value = false
    }
  }

  watchDebounced(
    isReadable,
    (val) => {
      if (!val) updateImage()
    },
    { maxWait: 2000, debounce: 1500 }
  )

  onBeforeMount(() => {
    qr.value = new QRCodeStyling(defaultOptions as Options)
    if (!Object.keys(qrInstants).includes(name)) {
      qrInstants.value[name] = {
        options: defaultOptions,
        image: '',
        isReadable: false,
      }
    }
  })

  onMounted(async () => {
    await updateImage(true)
  })

  watchWithFilter(
    options,
    async () => {
      await updateImage()
    },
    {
      eventFilter: debounceFilter(100, { maxWait: 1000 }),
      flush: 'post',
      deep: true,
    }
  )

  const download = async (opt?: DownloadOptions) => {
    if (!qr.value) return
    opt ??= {}
    opt.name ??= `qr-code:${data.value}`
    opt.extension ??= 'png'
    await new QRCodeStyling(options.value as Options).download(opt)
  }

  return { Image, options, data, image, isReadable, download, blobToBase64, fileToBase64 }
}
