import React from 'react'
import { 
    FormControl, 
    FormLabel, 
    NumberInput,
    NumberInputField, 
    NumberInputStepper, 
    NumberIncrementStepper, 
    NumberDecrementStepper
} from '@chakra-ui/react'

const FormNumber = ( { labelText, max, min, inputValue, onChange } ) => {
  return (
    <FormControl className='mb-3'>
        <FormLabel>{labelText}</FormLabel>
        <NumberInput
            variant='flushed' 
            max={max} 
            min={min} 
            onChange={onChange}
            value={inputValue}
        >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
  </FormControl>
  )
}

export default FormNumber