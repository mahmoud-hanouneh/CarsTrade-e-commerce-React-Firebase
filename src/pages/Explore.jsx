import React from 'react'
import { Box, Image, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import saleImg from '../images/sale.jpg'
import rentImg from '../images/rent.jpg'


const Explore = () => {
 
  const property = {
    imageUrl: '',
    imageAlt: 'Image',
  }
    return (
        <Stack direction={['column', 'row']} spacing='35px' align='center' justify='center' mt='5rem'>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
              <Image src={saleImg} alt={property.imageAlt} />
              <Box p='2'>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                    className='mb-3'
                  >
                  Cars For Sale
                  </Box>
                  <Link to='/category/sale'>
                    <Button colorScheme='orange' size='sm'>Explore</Button>
                  </Link>
              </Box>
          </Box>
         <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Image src={rentImg} alt={property.imageAlt} />
            <Box p='2'>
                <Box
                  mt='1'
                  fontWeight='semibold'
                  as='h4'
                  lineHeight='tight'
                  noOfLines={1}
                  className='mb-3'
                >
                Cars For Rent
                </Box>
              
                <Link to='/category/rent'>
                  <Button colorScheme='orange' size='sm'>Explore</Button>
                </Link>
                
            </Box>
          </Box>

      </Stack>
  )
    
}

export default Explore