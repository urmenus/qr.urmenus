<template>
  <v-line :config="lineConfig" />
  <v-text :config="textConfig" />
</template>

<script lang="ts" setup>
import { _themes } from '#tailwind-config/daisyui'
import Konva from 'konva'

type Props = { width?: boolean; height?: boolean; fontFamily: string; start: Konva.LabelConfig }
const props = withDefaults(defineProps<Props>(), { width: false, height: false })

const { formats } = storeToRefs(useTableTent())
const theme = computed(() => _themes[0])

const start = computed(() => ({
  x: props.start.x ?? 0,
  y: props.start.y ?? 0,
}))

const formatPx = computed(() => formats.value.self.px)

const lineConfig = computed(
  (): Konva.LineConfig =>
    props.width
      ? {
          points: [
            start.value.x,
            formatPx.value.height + start.value.y + 20,
            start.value.x,
            formatPx.value.height + start.value.x,
            formatPx.value.width + start.value.x,
            formatPx.value.height + start.value.x,
            formatPx.value.width + start.value.x,
            formatPx.value.height + start.value.y + 20,
          ],
          stroke: theme.value.dark['base-content'],
          strokeWidth: 2,
        }
      : props.height
      ? {
          points: [
            start.value.x - 20,
            start.value.y,
            start.value.y,
            start.value.y,
            start.value.y,
            formatPx.value.height + start.value.y,
            start.value.x - 20,
            formatPx.value.height + start.value.y,
          ],
          stroke: theme.value.dark['base-content'],
          strokeWidth: 2,
        }
      : {}
)

const text = computed(() => `${formats.value.self.mm[props.width ? 'height' : 'width']} ММ`)
const width = computed(() => text.value.length * 22)

const textConfig = computed(
  (): Konva.TextConfig =>
    props.width
      ? {
          x: start.value.x,
          y: formatPx.value.height + 150,
          align: 'center',
          width: formatPx.value.width + start.value.x / 2 - 0.5 * width.value,
          text: text.value,
          fontFamily: props.fontFamily,
          fontSize: 24,
          fill: theme.value.dark['base-content'],
        }
      : props.height
      ? {
          y: 210,
          x: 60,
          width: width.value,
          height: formatPx.value.height + 100,
          text: text.value,
          rotation: 270,
          fontFamily: props.fontFamily,
          fontSize: 24,
          fill: theme.value.dark['base-content'],
          offsetX: (formatPx.value.height - (210 - width.value / 2)) / 2,
        }
      : {}
)
</script>
