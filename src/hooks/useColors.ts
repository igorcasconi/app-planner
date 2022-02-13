import theme from '../theme'

export const useColors = () => {
  const getThemeColors = (color?: string): string => {
    if (!color) return ''
    // @ts-ignore
    const colorHEX = theme.colors[color]

    return colorHEX
  }

  return getThemeColors
}
