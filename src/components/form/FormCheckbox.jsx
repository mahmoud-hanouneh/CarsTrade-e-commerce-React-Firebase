import React from 'react'
import { Checkbox } from '@chakra-ui/react'

const FormCheckbox = ( { checkboxValue, checkStatus, change, text } ) => {
  return (
    <Checkbox 
        value={checkboxValue}  
        size='lg' 
        colorScheme='teal' 
        isChecked={checkStatus} 
        onChange={change}>
        { text }
    </Checkbox>
  )
}

export default FormCheckbox