<template>
  <div
    class="tooltip tooltip-bottom md:tooltip-right before:max-w-56"
    :class="[isReadable ? 'tooltip-success' : 'tooltip-error', mobile && isOpen ? 'tooltip-open' : '']"
    :data-tip="text"
  >
    <button class="btn btn-square btn-ghost btn-xs" :class="isReadable ? 'text-success' : 'text-error'">
      <Icon name="ph:check-fat-fill" size="1rem" v-if="isReadable" />
      <Icon name="ph:x-bold" size="1rem" v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
type Props = { mobile?: boolean; isOpen?: boolean }
withDefaults(defineProps<Props>(), { mobile: false, isOpen: false })
const { isReadable } = useQrCode('result')

const text = computed(() => (isReadable.value ? 'Все хорошо' : 'Некоторые устройства НЕ смогут распознать код'))
</script>
