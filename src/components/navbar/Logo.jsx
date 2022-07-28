import React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import logo from '../../assets/images/logo.png'

const Logo = (props) => {
  return (
    <Box {...props}>
        {/* <Text className='text-gray-800' fontSize='lg' fontWeight='bold'>
            CarsTrade
        </Text> */}
        <Image src={logo} />
    </Box>
  )
}

export default Logo