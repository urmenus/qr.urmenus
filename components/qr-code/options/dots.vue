<template>
  <details ref="collapse">
    <summary>Варианты точек</summary>
    <ul class="space-y-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Стиль</span>
        </div>
        <select class="select select-bordered" v-model="options.dotsOptions.type">
          <option v-for="style in dotsType" :value="style" class="capitalize">{{ style }}</option>
        </select>
      </label>
      <li>
        <ul class="flex flex-col">
          <h2 class="menu-title">Тип окраски</h2>
          <QrCodeOptionsColorType input-name="color-type-dots" v-model="colors.colorType" />

          <QrCodeOptionsColorSingle v-model="colors.single" @change="changeColor" v-if="!isGradient" />
          <QrCodeOptionsColorGradient v-model="colors.gradient" @change="changeColor" v-else />
        </ul>
      </li>
    </ul>
  </details>
</template>

<script lang="ts" setup>
import type { Colors, DotType } from '@/types'

const { options } = useQrCode('result')

const isGradient = computed(() => colors.value.colorType === 'gradient')

const colors = useState<Colors>('qr-menu-dots', () => ({
  single: '#000000',
  gradient: ['#19191a', '#9629f6', 0],
  colorType: 'color',
}))
const dotsType: DotType[] = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded']

watchDebounced([isGradient, colors], () => changeColor(), { debounce: 50 })

const changeColor = () => {
  if (isGradient.value) {
    options.value.dotsOptions.color = undefined
    options.value.dotsOptions.gradient = {
      type: 'linear',
      rotation: colors.value.gradient[2],
      colorStops: [
        { offset: 0, color: colors.value.gradient[0] },
        { offset: 1, color: colors.value.gradient[1] },
      ],
    }
  } else {
    options.value.dotsOptions.gradient = undefined
    options.value.dotsOptions.color = colors.value.single
  }
}

watch(
  () => colors.value.gradient,
  (val) => {
    colors.value.gradient[2] = Math.min(360, Math.max(0, val[2] || 0))
  }
)
const collapse = ref<HTMLDetailsElement>()
const close = () => {
  if (collapse.value) collapse.value.open = false
}
defineExpose({ close })
</script>
