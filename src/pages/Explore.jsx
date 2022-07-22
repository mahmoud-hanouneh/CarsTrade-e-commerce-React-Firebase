import React from 'react'
import { Box, Image, Button, Grid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import saleImg from '../images/sale.jpg'
import rentImg from '../images/rent.jpg'

const Explore = () => {

  const property = {
    imageUrl: '',
    imageAlt: 'Image',
  }
    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={3} alignItems='center'>
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
                  Sale
                  </Box>
                  <Link to='/category/sale'>
                    <Button colorScheme='orange' size='sm'>Cars for sale</Button>
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
                Explore cars for rent
                </Box>
              
                <Link to='/category/rent'>
                  <Button colorScheme='orange' size='sm'>Cars for rent</Button>
                </Link>
                
            </Box>
          </Box>

      </Grid>
  )
    
}

export default Explore