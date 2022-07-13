import React from 'react'

const SelectInput = ( { name, id, placeholder, handler, value, selectData } ) => {
  return (
    <FormControl className='mb-3'>
          <FormLabel htmlFor='city'>{name}</FormLabel>
          <Select 
            id={id} 
            placeholder={placeholder}
            onChange={handler}
            value={value}
          >
          {selectData.map((name) => (
            <option key={name.id} value={name.city}>{name.city}</option>
          ))}
        </Select>
        
    </FormControl> 
  )
}

export default SelectInput