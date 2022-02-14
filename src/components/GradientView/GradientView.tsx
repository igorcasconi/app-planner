import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useColors } from 'src/hooks/useColors'
import { Props as ColumnProps } from '../Column'

type coordinates = { x: number; y: number }

interface GradientProps extends ColumnProps {
  colorsTheme: string[]
  start?: coordinates
  end?: coordinates
  location?: number[]
}
const GradientView: React.FC<GradientProps> = ({ colorsTheme, children, ...props }) => {
  const getThemeColors = useColors()

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 0.8, 1]}
      colors={[getThemeColors(colorsTheme[0]), getThemeColors(colorsTheme[1]), getThemeColors(colorsTheme[2])]}
      {...props}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientView
