<template>
  <div class="qwe w-screen grid grid-cols-2 h-[calc(100dvh-10rem)]">
    <div class="flex flex-col space-y-4">
      <QrCodeOptionsFormat />
      <input class="input input-bordered" type="text" v-model="text" @input="updateText" placeholder="Введите текст" />
      <input class="input input-bordered" type="number" v-model="scale" />
    </div>
    <div ref="container" class="canvas-container"></div>
  </div>
</template>

<script lang="ts" setup>
import Konva from 'konva'
import type { Layer } from 'konva/lib/Layer'
import type { Image } from 'konva/lib/shapes/Image'
import type { Label } from 'konva/lib/shapes/Label'
import type { Rect } from 'konva/lib/shapes/Rect'
import type { Text } from 'konva/lib/shapes/Text'
import type { Stage } from 'konva/lib/Stage'
const container = ref<HTMLDivElement>()
// Реактивная переменная для текста
const text = ref('qwe')

let stage: Stage, layer: Layer, textNode: Text, group: ComputedRef<Label>, card: Rect, image: Image

// const stage = shallowRef<Stage>()
// const layer = shallowRef<Layer>()
// const textNode = shallowRef<Text>()

const { height } = useWindowSize()
const scale = ref(0.6)

const { formats, title } = storeToRefs(useTableTent())
const cardSize = computed(() => formats.value.self.px)
const { image: imageUrl } = useQrCode('result')

const _image = new window.Image()
_image.src = imageUrl.value

onMounted(() => {
  stage = new Konva.Stage({
    container: container.value, // id контейнера
    width: 500,
    height: height.value - 192,
    scaleX: scale.value,
    scaleY: scale.value,
    draggable: true,
    dragDistance: 10,
    x: 0,
    y: 0,
  })

  const imageObj = new window.Image()
  imageObj.src = imageUrl.value

  layer = new Konva.Layer()

  group = computed(() => new Konva.Label({ x: 140, y: 100 }))
  card = new Konva.Rect({ ...cardSize.value, fill: '#ffffff' })
  stage.add(layer)

  image = new Konva.Image({
    x: 200,
    y: 50,
    image: imageObj,
    width: 100,
    height: 100,
  })
  group.value.add(image)

  // Создаем текстовый узел
  textNode = new Konva.Text({
    x: stage.width() / 2,
    y: stage.height() / 2,
    text: text.value,
    fontSize: 24,
    fill: 'black',
    align: 'center',
  })

  group.value.add(card)
  group.value.add(textNode)
  layer.add(group.value)
  layer.draw()
})

// Функция обновления текста
const updateText = () => {
  if (textNode) textNode.text(text.value) // Обновляем текст узла
  // layer.draw() // Перерисовываем слой
}

watch(cardSize, (val) => {
  // card.width = val.width
})

watchEffect(() => {
  if (layer) layer.draw() // Перерисовываем слой
  console.log('height: ', height)
})
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  /* height: 100vh; */
  @apply border;
}
</style>
