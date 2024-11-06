import { defineStore } from 'pinia'

type Data = {
  id: string
  title: string
  maxTables: number
}

export const useUser = defineStore('UserPinia', () => {
  const restaurant = reactive<Data>({
    id: '#fbd38d',
    title: 'Marmelad lounge bar',
    maxTables: 44,
  })

  return { restaurant }
})
