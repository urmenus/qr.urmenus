<template>
  <details ref="collapse">
    <summary>Формат</summary>
    <ul class="space-y-4">
      <div class="join w-full mt-4">
        <input
          class="join-item btn btn-ghost btn-outline w-1/3"
          type="radio"
          name="format-size"
          :checked="activeFormat === 'A6'"
          @click="activeFormat = 'A6'"
          aria-label="A6"
        />
        <input
          class="join-item btn btn-ghost btn-outline w-1/3"
          type="radio"
          name="format-size"
          :checked="activeFormat === 'A5'"
          @click="activeFormat = 'A5'"
          aria-label="A5"
        />
        <input
          class="join-item btn btn-ghost btn-outline w-1/3"
          type="radio"
          name="format-size"
          :checked="activeFormat === 'self'"
          @click="activeFormat = 'self'"
          aria-label="Свой"
        />
      </div>
      <div class="flex gap-2">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Ширина</span>
          </label>
          <div class="relative">
            <input
              type="number"
              placeholder="105"
              class="input input-bordered w-full no-spinner"
              min="10"
              max="1000"
              v-model="formats.self.mm.width"
            />
            <span class="absolute opacity-75 right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">
              MM
            </span>
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Высота</span>
          </label>
          <div class="relative">
            <input
              type="number"
              placeholder="148"
              class="input input-bordered w-full no-spinner"
              min="10"
              max="1000"
              v-model="formats.self.mm.height"
            />
            <span class="absolute opacity-75 right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">
              MM
            </span>
          </div>
        </div>
      </div>
    </ul>
  </details>
</template>

<script lang="ts" setup>
const { activeFormat, formats } = storeToRefs(useTableTent())

watch(activeFormat, (val) => {
  if (val === 'self') return
  formats.value.self.mm.height = formats.value[val].mm.height
  formats.value.self.mm.width = formats.value[val].mm.width
})
watch(
  formats.value.self.mm,
  ({ width, height }, old) => {
    activeFormat.value = 'self'
    try {
      formats.value.self.px = { width: mm2px(width), height: mm2px(height) }
    } catch {
      formats.value.self.px = { width: mm2px(old.width), height: mm2px(old.height) }
    }
  },
  { deep: true }
)

const collapse = ref<HTMLDetailsElement>()
const close = () => {
  if (collapse.value) collapse.value.open = false
}
defineExpose({ close })
</script>
