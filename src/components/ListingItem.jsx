import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { Button, Heading, Text, Flex, Box, Image, Stack } from '@chakra-ui/react'
import { ImLocation } from 'react-icons/im' 
import { FaBluetooth, FaCarCrash } from 'react-icons/fa'
import { GiCarSeat } from 'react-icons/gi'
import offerIcon from '../components/icons/offer-icon.png'

const ListingItem = ( { data, id } ) => {
  const auth = getAuth()

  return (
    <div className="flex flex-row p-6 gap-4 shadow-xl mb-8 w-10/12 mx-auto shadow-white shadow-slate-200">
      <div className="basis-1/4 relative">
          <Image className='w-fit max-h-min absolute' src={data.carImages[0]} alt="" />
          {data.offer && <Image src={offerIcon} className='absolute right-0 w-10 h-10' />} 
      </div>
      <div className="basis-1/2">
          <Heading className='mb-3' as='h4' size='md'>
            {data.manufacturer}
          </Heading>

          <Text fontSize='md p-4'>
                <ImLocation className='inline mr-2' />
                {data.city}
          </Text>

          <Stack direction={['column', 'row']} spacing='15px' className='mt-1'>
            <Box className='mr-3'>
              
            <Text fontSize='md p-4' as={data.options && data.options.leatherSeats ? '' : 's'}>
                <GiCarSeat className='inline mr-2' />
                {data.options && 
                    data.options.leatherSeats ? 'Leather Seats' : 'Leather Seats'
                } 
            </Text>
              
            </Box>
            <Box className='mr-3'>
              <Text as={data.options && data.options.bluetooth ? '' : 's'} >
                <FaBluetooth className='inline mr-2' />
                  {data.options && 
                    data.options.bluetooth ? 'Bluetooh' : 'Bluetooth'
                  }   
              </Text>
            </Box>
            <Box className='mr-3'>
              
            <Text fontSize='md p-4' as={data.options && data.options.airBags ? '' : 's'}>
                <FaCarCrash className='inline mr-2' />
                {data.options && 
                    data.options.airBags ? 'Airbags' : 'Airbags'
                } 
            </Text>
              
            </Box>
          </Stack>
          
          <Flex className='mt-2'>
            <Box className='mr-3'>
              <Text fontSize='md p-4'>
               <span className='font-bold'> Mileage: { ' ' }</span>
                {data.mileage} Km
              </Text>
            </Box>

            <Box className='mr-3'>
              <Text fontSize='md p-4'>
                <span className='font-bold'>
                  Color: { ' ' }
                </span>
                {data.color}
              </Text>
            </Box>
          </Flex>

          <Text className='mt-2' fontSize='lg'>
            <span className='font-bold'>Model: </span> 
            { ' ' }
            {data.modelYear} 
            { ' ' }
            {data.modelYear > 2019 && <span className='font-bold text-red-600	text-sm'>New!</span>}   
          </Text>
          <hr />
      </div>

      <div className="basis-1/4">
        
          <Box>
            <Text fontSize='2xl'>{data.type === 'rent' ? 'Rent' : 'Price'}</Text>
            <Text fontSize='2xl' as={data.offer && 's'} className='font-bold'>
              {data.price} $ 
            </Text>
            <span className='text-sm mx-1'>{data.type === 'rent' ? '/Month' : 'Total'}</span>
            {data.offer && <Text className='text-orange-500	font-bold	'>{data.discountedPrice} $</Text>}
          </Box>

          <Button colorScheme='orange' className='mt-3'>
            <Link to={`/category/${data.type}/${id}`}>View Details</Link>
          </Button> 
          {auth.currentUser.uid == data.userRef && (
            <Button colorScheme='orange' variant='outline' className='mt-3'>
              <Link to={`/category/${data.type}/${id}`}>Delete</Link>
            </Button> 
          )}
         
             
      </div>
      
    </div>
  )
}

export default ListingItem