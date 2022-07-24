import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Logo = (props) => {
  return (
    <Box {...props}>
        <Text className='text-gray-800' fontSize='lg' fontWeight='bold'>
            CarsTrade
        </Text>
    </Box>
  )
}

export default Logo