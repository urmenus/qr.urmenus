import { defineStore } from 'pinia'

type FormatTitles = 'A6' | 'A5' | 'self'

type Size = {
  width: number
  height: number
}

type Formats = {
  [x in FormatTitles]: { mm: Size; px: Size }
}

export const useTableTent = defineStore('TableTentPinia', () => {
  const title = ref('')

  const activeFormat = ref<FormatTitles>('A5')

  const formats = reactive<Formats>({
    A6: { mm: { width: 105, height: 148 }, px: { width: 396.8503937, height: 559.37007874 } },
    A5: { mm: { width: 148, height: 210 }, px: { width: 559.37007874, height: 793.7007874 } },
    self: { mm: { width: 148, height: 210 }, px: { width: 559.37007874, height: 793.7007874 } },
  })

  return { activeFormat, formats, title }
})
