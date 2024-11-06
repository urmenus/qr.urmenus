import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

import themes from 'daisyui/src/theming/themes'

const dark = {
  ...themes.dark,
  primary: '#FBD38D',
  'base-100': '#202023', // Very dark gray
  'base-200': '#1F1F21', // Example darker color
  'base-300': '#1C1C1E', // Another example darker color
  neutral: '#a6adbb',
  'neutral-content': '#202023',
}
const light = {
  ...themes.light,
  primary: '#FBD38D',
  'base-100': '#f0e7db',
}

const white = {
  ...themes.light,
  primary: '#FBD38D',
  'base-100': '#ffffff',
}

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      screens: {
        md: '960px',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{ dark, light, white }],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
    themeRoot: ':root',
  },
}
