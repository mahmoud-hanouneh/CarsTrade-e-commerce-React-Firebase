import React from 'react'
import { Box, Image, Button, Center } from '@chakra-ui/react'
const Explore = () => {
  const property = {
    imageUrl: '',
    imageAlt: 'Rear view of modern home with pool',

  }
    return (

      <Center>
        <Box>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
              <Image src={property.imageUrl} alt={property.imageAlt} />
              <Box p='2'>
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines={1}
                >
                'Sale'
                </Box>
                <Button colorScheme='teal' size='sm'>
                  Explore cars for sale
                </Button>
              </Box>
          </Box>

          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={property.imageUrl} alt={property.imageAlt} />
            <Box p='2'>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
              >
              Explore cars for rent
              </Box>
              <Button colorScheme='teal' size='sm'>
                Cars  for rent
              </Button>
            </Box>
          </Box>
      </Box>
      </Center>


      
      )
    
}

export default Explore