import React, { ReactHTML, useState } from 'react'

interface returnType{
  type: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
}

export const useField = (type: string): returnType => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}