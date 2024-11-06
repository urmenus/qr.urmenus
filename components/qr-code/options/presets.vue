<template>
  <details ref="collapse" open>
    <summary>Пресеты</summary>
    <ul class="flex flex-wrap gap-2 mt-2">
      <ClientOnly>
        <template v-for="preset in presets" :key="preset.id">
          <button
            class="btn btn-ghost py-2 h-full ~w-1/2 size-28"
            v-if="typeof preset.image === 'string'"
            @click="change(preset)"
          >
            <div class="avatar">
              <div class="w-24 rounded">
                <img :src="preset.image" />
              </div>
            </div>
          </button>
        </template>
      </ClientOnly>
    </ul>
  </details>
</template>

<script lang="ts" setup>
import { presets } from '@/src/presets'
import type { Colors, RequiredOptionsForPresent } from '@/types'

const { options } = useQrCode('result')
const dots = useState<Colors>('qr-menu-dots')
const cornerDots = useState<Colors>('qr-menu-corners-dot')
const cornerSquare = useState<Colors>('qr-menu-corners-square')

const change = (opt: RequiredOptionsForPresent) => {
  changeDots(opt)
  changeCornerDots(opt)
  changeCornerSquare(opt)
}

const changeDots = (opt: RequiredOptionsForPresent) => {
  dots.value = {
    single: opt.dotsOptions.single,
    gradient: opt.dotsOptions.gradient,
    colorType: opt.dotsOptions.colorType,
  }
  options.value.dotsOptions.type = opt.dotsOptions.type
}

const changeCornerDots = (opt: RequiredOptionsForPresent) => {
  cornerDots.value = {
    single: opt.cornersDotOptions.single,
    gradient: opt.cornersDotOptions.gradient,
    colorType: opt.cornersDotOptions.colorType,
  }
  options.value.cornersDotOptions.type = opt.cornersDotOptions.type
}

const changeCornerSquare = (opt: RequiredOptionsForPresent) => {
  cornerSquare.value = {
    single: opt.cornersSquareOptions.single,
    gradient: opt.cornersSquareOptions.gradient,
    colorType: opt.cornersSquareOptions.colorType,
  }
  options.value.cornersSquareOptions.type = opt.cornersSquareOptions.type
}

const collapse = ref<HTMLDetailsElement>()
const close = () => {
  if (collapse.value) collapse.value.open = false
}
defineExpose({ close })
</script>
