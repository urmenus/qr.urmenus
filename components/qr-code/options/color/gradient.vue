<template>
  <div class="form-control w-full max-w-xs">
    <h2 class="menu-title">Цвета</h2>
    <div class="flex gap-4 pl-4">
      <div>
        <input type="color" @blur="$emit('change')" v-model="gradient[0]" class="invisible size-0" ref="colorInput2" />
        <button class="btn btn-square border-base-content/20" @click="$refs.colorInput2.showPicker()">
          <Icon name="bx:bxs-checkbox" size="2rem" :style="{ color: gradient[0] }" />
        </button>
      </div>
      <div>
        <input type="color" @blur="$emit('change')" v-model="gradient[1]" class="invisible size-0" ref="colorInput3" />
        <button class="btn btn-square border-base-content/20" @click="$refs.colorInput3.showPicker()">
          <Icon name="bx:bxs-checkbox" size="2rem" :style="{ color: gradient[1] }" />
        </button>
      </div>
      <label class="input input-bordered flex items-center gap-2 text-sm">
        Градус:
        <input
          type="number"
          min="0"
          max="360"
          class="grow w-3/4 text-base"
          v-model="gradient[2]"
          placeholder="90"
          @blur="$emit('change')"
          @keypress.enter="$emit('change')"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
const gradient = defineModel<[string, string, number]>({ required: true })
defineEmits<{ change: [] }>()
</script>
