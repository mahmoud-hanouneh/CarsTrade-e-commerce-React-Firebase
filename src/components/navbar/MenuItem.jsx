import React from 'react'

import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const MenuItem = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>
        <Text className='text-gray-800 font-medium' display='block' {...rest}>
            {children}
        </Text>
    </Link>
  )
}

export default MenuItem