<template>
  <details ref="collapse">
    <summary>Варианты угловых точек</summary>
    <qr-code-options-corners-square />
    <qr-code-options-corners-dot />
  </details>
</template>

<script setup lang="ts">
const collapse = ref<HTMLDetailsElement>()
const close = () => {
  if (collapse.value) collapse.value.open = false
}
defineExpose({ close })
</script>
