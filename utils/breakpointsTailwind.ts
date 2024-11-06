import { theme } from '#tailwind-config'
export default Object.fromEntries(Object.entries(theme.screens).map(([key, value]) => [key, parseInt(value)]))
