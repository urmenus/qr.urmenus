<template>
  <details ref="collapse">
    <summary>Логотип</summary>
    <ul class="space-y-4">
      <!--  -->
      <div class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Загрузить картинку</span>
        </div>
        <input
          v-if="!filename"
          ref="file"
          type="file"
          class="file-input file-input-bordered file-input-xs file-input-primary w-full max-w-xs"
          accept="image/*"
          @change="onFileChange"
        />
        <input
          v-else
          type="text"
          v-model="filename"
          class="input input-bordered input-primary input-xs w-full max-w-xs select-none"
          @click="remove"
        />
        <div class="label">
          <span class="label-text-alt" :class="{ invisible: filename }">png | jpg | webp</span>
          <span class="label-text-alt underline cursor-pointer" v-show="filename" @click.prevent="remove">Удалить</span>
        </div>
      </div>
      <!--  -->
      <div class="form-control w-full max-w-xs" v-if="options.image">
        <div class="label">
          <span class="label-text">Размер картинки</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          v-model="options.imageOptions.imageSize"
          class="range range-xs"
          step="0.05"
        />
        <div class="flex w-full justify-between ~space-x-6 px-2 text-xs mt-1 cursor-pointer">
          <span
            :class="{ 'text-primary': options.imageOptions.imageSize == step / 10 }"
            @click="options.imageOptions.imageSize = step / 10"
            v-for="(_, step) in 11"
            :key="step"
            >{{ step / 10 }}</span
          >
        </div>
      </div>
      <!--  -->
      <div class="form-control w-full max-w-xs" v-if="options.image">
        <div class="label">
          <span class="label-text">Внешний отступ картинки</span>
        </div>
        <input type="range" min="0" max="10" v-model="options.imageOptions.margin" class="range range-xs" step="1" />
        <div class="flex w-full justify-between ~space-x-6 px-2 text-xs mt-1 cursor-pointer">
          <span
            :class="{ 'text-primary': options.imageOptions.margin == step }"
            @click="options.imageOptions.margin = step"
            v-for="(_, step) in 11"
            :key="step"
            >{{ step }}</span
          >
        </div>
      </div>
      <!--  -->
    </ul>
  </details>
</template>

<script lang="ts" setup>
const { options, fileToBase64 } = useQrCode('result')

const filename = ref('')

const onFileChange = async (e: Event) => {
  const { files } = e.target as HTMLInputElement
  const file = files && files.length > 0 ? files[0] : undefined
  if (!file || file.type === 'image/gif' || !file.type.startsWith('image/')) return
  filename.value = file.name
  const image = await fileToBase64(file)

  options.value.image = image
}

const remove = () => {
  options.value.image = undefined
  filename.value = ''
}

const collapse = ref<HTMLDetailsElement>()
const close = () => {
  if (collapse.value) collapse.value.open = false
}
defineExpose({ close })
</script>
