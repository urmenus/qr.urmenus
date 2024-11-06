<template>
  <div>
    Click on canvas to create a cirlce.
    <a href=".">Reload the page</a>. Circles should stay here.
    <v-stage ref="stage" :config="stageSize" @click="handleClick">
      <v-layer ref="layer">
        <v-circle v-for="(item, id) in list" :key="id" :config="item"></v-circle>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import type { Stage } from 'konva/lib/Stage'

const width = window.innerWidth
const height = window.innerHeight

export default {
  data() {
    return {
      list: [{ x: 100, y: 100, radius: 50, fill: 'blue' }],
      stageSize: {
        width: width,
        height: height,
      },
    }
  },
  methods: {
    downloadURI(uri: string, name: string) {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    handleClick(evt: { target: { getStage: () => Stage } }) {
      const stage = evt.target.getStage()
      const pos = stage.getPointerPosition()
      this.list.push({
        radius: 50,
        fill: 'red',
        ...pos!,
      })
      const dataURL = stage.toDataURL({ pixelRatio: 3 })
      this.downloadURI(dataURL, 'stage.png')

      this.save()
    },

    load() {
      const data = localStorage.getItem('storage')
      if (data) this.list = JSON.parse(data)
    },

    save() {
      localStorage.setItem('storage', JSON.stringify(this.list))
    },
  },
  mounted() {
    this.load()
  },
}
</script>
