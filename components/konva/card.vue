<template>
  <div class="~w-[35rem] ~h-[40rem] cursor-move">
    <ClientOnly>
      <v-stage :config="stage" @wheel="onWheel">
        <v-layer>
          <KonvaLine :font-family="fontFamily" :start="card" height />
          <KonvaLine :font-family="fontFamily" :start="card" width />

          <v-label :config="card" @dblclick="qwe">
            <v-rect :config="rect" />
            <v-image :config="img" v-if="imageUrl" />
            <v-text :config="textTitle" />
            <v-text :config="textP" />
            <v-text :config="textUrl" />
            <v-label :config="tableLabel">
              <v-rect :config="tableRect" />
              <v-text id="meow" :config="table" />
            </v-label>
          </v-label>
        </v-layer>
      </v-stage>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { _themes } from '#tailwind-config/daisyui'
import type { KMouseEvent, KWheelEvent } from '@/types/konva'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import Konva from 'konva'
import type { Label } from 'konva/lib/shapes/Label'
const { height } = useWindowSize()
const { image: imageUrl, options, data: url } = useQrCode('result')

const qwe = (evt: KMouseEvent) => {
  const stage = evt.target.getStage()
  if (!stage) return
  const card = stage.children[0].children[4] as Label

  useQwe(card, 4)
}

const scale = ref(0.6)
const stage = computed({
  set: (val) => (stage.value = val),
  get: (): Konva.StageConfig => ({
    width: 500,
    height: height.value - 192,
    scaleX: scale.value,
    scaleY: scale.value,
    draggable: true,
    dragDistance: 10,
    x: 0,
    y: 0,
    style: { cursor: 'pointer' },
  }),
})

const { formats, title } = storeToRefs(useTableTent())
const cardSize = computed(() => formats.value.self.px)

const theme = computed(() => _themes[0].white)
const fontFamily = `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell`

const card = reactive<Konva.LabelConfig>({ x: 140, y: 100 })
const rect = computed((): Konva.RectConfig => ({ ...cardSize.value, fill: '#ffffff' }))

const qrSize = computed(() => formats.value.self.px.width * 0.45)
watch(qrSize, (val) => {
  options.value.height = val
  options.value.width = val
})

const img = computed(
  (): Konva.ImageConfig => ({
    image: image.value,
    height: options.value.height,
    width: options.value.width,
    y: 40,
    x: rect.value.width! / 2 - options.value.width! / 2,
  })
)

const textTitle = computed(
  (): Konva.TextConfig => ({
    text: useChangeCase(title.value, 'capitalCase').value,
    y: img.value.height! + 20,
    fontSize: fontSize.value.title,
    fontStyle: '600',
    fontFamily: fontFamily,
    lineHeight: 1.24,
    align: 'center',
    width: cardSize.value.width,
    fill: theme.value['base-content'],
    padding: 40,
  })
)

const textP = computed(
  (): Konva.TextConfig => ({
    text: 'В случае нечитаемости qr кода введите ссылку в браузере',
    align: 'center',
    width: cardSize.value.width,
    fontFamily: fontFamily,
    fontSize: fontSize.value.base,
    y: textTitle.value.y! + cardSize.value.height * 0.07,
    padding: 40,
    fill: theme.value['base-content'],
  })
)

const textUrl = computed(
  (): Konva.TextConfig => ({
    text: url.value.replace(/^https?:\/\//, ''),
    align: 'center',
    width: cardSize.value.width,
    fontFamily: fontFamily,
    fontSize: fontSize.value.base,
    y: textP.value.y! + 72,
    padding: 40,
    textDecoration: 'underline',
    fill: theme.value['base-content'],
  })
)

const tableLabel = computed(
  (): Konva.LabelConfig => ({
    y: (rect.value.height ?? 0) - 90,
    x: (rect.value.width ?? 0) / 2 - 24,
  })
)

const table = computed(
  (): Konva.TextConfig => ({
    text: '01',
    fontSize: fontSize.value.base,
    fontStyle: '600',
    fontFamily: fontFamily,
    fill: theme.value['base-content'],
    width: 48,
    height: 48,
    align: 'center',
    offsetY: -12,

    stroke: theme.value['base-content'],
    strokeWidth: 1,
  })
)

const tableRect = computed(
  (): Konva.RectConfig => ({
    stroke: theme.value['base-content'],
    strokeWidth: 1.33333,
    height: table.value.height,
    width: table.value.width,
    cornerRadius: 8,
  })
)

const fontSize = computed(() => ({
  title: formats.value.self.px.width * 0.07,
  base: formats.value.self.px.width * 0.05,
}))

const zoom = (zoomFactor: number) => {
  scale.value *= zoomFactor
  stage.value.scaleX = scale.value
  stage.value.scaleY = scale.value
}

const onWheel = (e: KWheelEvent) => {
  e.evt.preventDefault() // Предотвращаем прокрутку страницы
  if (e.evt.deltaY > 0) zoom(0.9)
  else zoom(1.1)
}

// const { image: url } = useQrCode('result')
const image = computed(() => {
  const _image = new window.Image()
  _image.src = imageUrl.value
  return _image
})

const resetPosition = () => {
  const defaultOptions = {
    width: 560,
    height: 640,
    scaleX: 0.6,
    scaleY: 0.6,
    draggable: true,
    x: 0,
    y: 0,
  }
  for (const [key, val] of Object.entries(defaultOptions)) {
    stage.value[key] = val
  }
  scale.value = 0.6
  card.x = 140
  card.y = 100
}
defineExpose({ resetPosition })
</script>
