<template>
  <div class="btn btn-ghost no-animation w-full" v-for="t in types" :key="t.value">
    <label class="label cursor-pointer w-full">
      <span class="label-text">{{ t.title }}</span>
      <input type="radio" :name="inputName" class="radio checked:radio-primary" :value="t.value" v-model="colorType" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { ColorType } from '@/types'

defineProps<{ inputName: string }>()

const colorType = defineModel<ColorType>({ required: true })

const types: { title: string; value: ColorType }[] = [
  { title: 'Одноцветный', value: 'color' },
  { title: 'Градиент', value: 'gradient' },
]
</script>
