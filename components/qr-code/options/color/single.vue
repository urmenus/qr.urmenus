<template>
  <div class="form-control w-full max-w-xs">
    <h2 class="menu-title">Цвет</h2>
    <div class="pl-4">
      <input type="color" @blur="$emit('change')" v-model="color" class="invisible size-0" ref="colorInput1" />
      <button class="btn btn-square border-base-content/20" @click="$refs.colorInput1.showPicker()">
        <Icon name="bx:bxs-checkbox" size="2rem" :style="{ color: color }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const color = defineModel<string>({ required: true })
defineEmits<{ change: [] }>()
</script>
