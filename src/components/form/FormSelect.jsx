import React from 'react'
import { FormControl, FormLabel, Select} from '@chakra-ui/react'


const FormSelect = ( { name, id, handler, value, selectData, dataKey } ) => {
  return (
    <FormControl className='mb-3'>
          <FormLabel htmlFor='city'>{name}</FormLabel>
          <Select
            variant='flushed' 
            id={id} 
            onChange={handler}
            value={value}
          >
          {selectData.map((name) => (
            <option key={name.id} value={name[`${dataKey}`]}>{name[`${dataKey}`]}</option>
          ))}
        </Select>
        
    </FormControl> 
  )
}

export default FormSelect