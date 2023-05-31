import React, { useEffect, useState } from 'react'

import { RadioButton } from '../RadioButton'
import { Row } from '../Row'

interface RadioGroupProps {
  options: { value: string; label: string }[]
  onChange?: (value: string) => void
  defaultValue?: string
  value?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange, defaultValue, value }) => {
  const [selectedValue, selectValue] = useState<string | undefined>(defaultValue)

  useEffect(() => {
    if (!selectedValue) return
    !!onChange && onChange(selectedValue)
  }, [selectedValue])

  useEffect(() => {
    if (!value) return
    selectValue(value)
  }, [value])

  return (
    <Row width={1} justifyContent='space-around'>
      {options.map((radio, index) => (
        <RadioButton
          key={index}
          label={radio.label}
          value={radio.value}
          selected={selectedValue === radio.value}
          onSelect={selectValue}
        />
      ))}
    </Row>
  )
}

export default RadioGroup
