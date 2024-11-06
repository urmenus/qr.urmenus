import type { Shape } from 'konva/lib/Shape'
import type { Stage } from 'konva/lib/Stage'

export interface Line {
  x: number
  y: number
  points: number[]
  tension: number
  closed: boolean
  stroke: string
  fillLinearGradientStartPoint: FillLinearGradientPoint
  fillLinearGradientEndPoint: FillLinearGradientPoint
  fillLinearGradientColorStops: Array<number | string>
}

export interface FillLinearGradientPoint {
  x: number
  y: number
}

export interface Circle {
  x: number
  y: number
  radius: number
  fill: string
}

// export interface Text {
//   text: string
//   fontSize: number
// }

// export interface Rect {
//   width: number
//   height: number
//   fill: string
//   draggable: boolean
//   x: number
//   y: number
//   shadowBlur: number
// }

export interface KMouseEvent<This = Node> {
  evt: MouseEvent
  target: Shape | Stage
  currentTarget: This
  child?: Node
}

export interface KWheelEvent<This = Node> {
  evt: WheelEvent
  target: Shape | Stage
  currentTarget: This
  child?: Node
}

// export interface KMouseEvent extends KonvaPointerEvent {}
