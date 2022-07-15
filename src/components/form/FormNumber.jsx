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

const FormNumber = () => {
  return (
    <FormControl className='mb-3'>
        <FormLabel htmlFor='modelYear'>Year</FormLabel>
        <NumberInput 
            max={2022} 
            min={1920} 
            onChange={(valueString) => setFormData(prev => ({
            ...prev,
            modelYear: valueString
            }))} 
            value={formData.modelYear}
        >
            <NumberInputField id='modelYear' />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
  </FormControl>
  )
}

export default FormNumber