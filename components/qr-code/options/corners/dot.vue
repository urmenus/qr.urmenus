<template>
  <ul class="space-y-4">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Стиль &#8226; внутренний</span>
      </div>
      <select class="select select-bordered" v-model="options.cornersDotOptions.type">
        <option v-for="style in dotsType" :value="style" class="capitalize">{{ style || 'None' }}</option>
      </select>
    </label>
    <li>
      <ul class="flex flex-col">
        <h2 class="menu-title">Тип окраски</h2>
        <QrCodeOptionsColorType input-name="color-type-corner-dot" v-model="colors.colorType" />

        <QrCodeOptionsColorSingle v-model="colors.single" @change="changeColor" v-if="!isGradient" />
        <QrCodeOptionsColorGradient v-model="colors.gradient" @change="changeColor" v-else />
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Colors, CornerDotType } from '@/types'

const { options } = useQrCode('result')

const isGradient = computed(() => colors.value.colorType === 'gradient')

const colors = useState<Colors>('qr-menu-corners-dot', () => ({
  single: '#000000',
  gradient: ['#19191a', '#9629f6', 0],
  colorType: 'color',
}))
const dotsType: CornerDotType[] = ['dot', 'square', '']

watchDebounced([isGradient, colors], () => changeColor(), { debounce: 50 })

const changeColor = () => {
  if (isGradient.value) {
    options.value.cornersDotOptions.color = undefined
    options.value.cornersDotOptions.gradient = {
      type: 'linear',
      rotation: colors.value.gradient[2],
      colorStops: [
        { offset: 0, color: colors.value.gradient[0] },
        { offset: 1, color: colors.value.gradient[1] },
      ],
    }
  } else {
    options.value.cornersDotOptions.gradient = undefined
    options.value.cornersDotOptions.color = colors.value.single
  }
}

watch(
  () => colors.value.gradient,
  (val) => {
    colors.value.gradient[2] = Math.min(360, Math.max(0, val[2] || 0))
  }
)
</script>
