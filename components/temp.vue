<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import Konva from 'konva'

const stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: 500,
  height: 500,
})

const layer = new Konva.Layer()

const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
})

// add the shape to the layer
layer.add(circle)

// add the layer to the stage
stage.add(layer)

// draw the image
layer.draw()
</script>
