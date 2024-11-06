import type {
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  GradientType,
  Mode,
  ShapeType,
  TypeNumber,
} from 'qr-code-styling'

export type { DotType, DownloadOptions } from 'qr-code-styling'

interface IQrOptionsType {
  typeNumber?: TypeNumber
  mode?: Mode
  errorCorrectionLevel?: ErrorCorrectionLevel
}

export type ColorType = 'color' | 'gradient'

export type Colors = {
  single: string
  gradient: [string, string, number]
  colorType: ColorType
}

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded' | ''
export type CornerDotType = 'dot' | 'square' | ''

// export * from 'qrcode-vue3/src/types'
export type Options = {
  type?: DrawType
  shape?: ShapeType
  width?: number
  height?: number
  margin?: number
  data?: string
  image?: string
  qrOptions?: IQrOptionsType
  imageOptions?: {
    hideBackgroundDots?: boolean
    imageSize?: number
    crossOrigin?: string
    margin?: number
  }
  dotsOptions?: {
    type?: DotType
    color?: string
  }
  cornersSquareOptions?: {
    type?: CornerSquareType
    color?: string
  }
  cornersDotOptions?: {
    type?: CornerDotType
    color?: string
  }
  backgroundOptions?: {
    color?: string
  }
}

type Gradient = {
  type: GradientType
  rotation: number
  colorStops: [{ offset: number; color: string }, { offset: number; color: string }]
}

type DotsOptionsBase = { type: DotType }
type CornersSquareOptionsBase = { type: CornerSquareType }
type CornersDotOptionsBase = { type: CornerDotType }

type DotsOptionsWithColor = DotsOptionsBase & { color: string; gradient?: undefined }
type DotsOptionsWithGradient = DotsOptionsBase & { color?: undefined; gradient: Gradient }

type CornersSquareOptionsWithColor = CornersSquareOptionsBase & { color: string; gradient?: undefined }
type CornersSquareOptionsWithGradient = CornersSquareOptionsBase & { color?: undefined; gradient: Gradient }

type CornersDotOptionsWithColor = CornersDotOptionsBase & { color: string; gradient?: undefined }
type CornersDotOptionsWithGradient = CornersDotOptionsBase & { color?: undefined; gradient: Gradient }

export type DotsOptions = DotsOptionsWithColor | DotsOptionsWithGradient
export type CornersOptions = CornersSquareOptionsWithColor | CornersSquareOptionsWithGradient
export type CornersDotOptions = CornersDotOptionsWithColor | CornersDotOptionsWithGradient

type BackgroundOptions = { color: string; gradient?: undefined } | { color?: undefined; gradient: Gradient }

export interface RequiredOptions extends Options {
  width?: number
  height?: number
  margin: number
  data: string
  qrOptions: {
    typeNumber: TypeNumber
    mode?: Mode
    errorCorrectionLevel: ErrorCorrectionLevel
  }
  imageOptions: {
    hideBackgroundDots: boolean
    imageSize: number
    crossOrigin?: string
    margin: number
  }
  dotsOptions: DotsOptions
  backgroundOptions: BackgroundOptions
  cornersSquareOptions: CornersOptions
  cornersDotOptions: CornersDotOptions
}

export type RequiredOptionsForPresent = {
  id: number
  dotsOptions: DotsOptionsBase & Colors
  cornersSquareOptions: CornersSquareOptionsBase & Colors
  cornersDotOptions: CornersDotOptionsBase & Colors
  image: string
}

export type QrInstant = {
  [name: string]: {
    options: RequiredOptions
    image: string
    isReadable: boolean
  }
}
