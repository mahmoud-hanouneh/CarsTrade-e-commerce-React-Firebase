import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Heading, Text, Flex, Spacer, Box, Grid } from '@chakra-ui/react'
import { ImLocation } from 'react-icons/im' 
import { BiDollar } from 'react-icons/bi'
import { FaBluetooth, FaCarCrash } from 'react-icons/fa'
import { GiCarSeat } from 'react-icons/gi'
import { BsSpeedometer } from 'react-icons/bs'

const ListingItem = ( { data, id } ) => {
  return (
    <div className="flex flex-row p-6 gap-4 shadow-xl mb-8 w-10/12 mx-auto shadow-white shadow-slate-200">
      <div className="basis-1/4">
          <img className='w-fit max-h-min' src={data.carImages[0]} alt="" />
      </div>
      <div className="basis-1/2">
          <Heading className='mb-3' as='h4' size='md'>
            {data.manufacturer}
          </Heading>

          <Text fontSize='md p-4'>
                <ImLocation className='inline mr-2' />
                {data.city}
          </Text>

          <Flex>
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
          </Flex>
          
          <Flex>
            <Box className='mr-3'>
              <Text fontSize='md p-4'>
                Mileage: { ' ' }
                <span className='font-bold'>{data.mileage} KM</span>
              </Text>
            </Box>

            <Box className='mr-3'>
              <Text fontSize='md p-4'>
                Color: { ' ' }
                <span className='font-bold'>{data.color}</span>
              </Text>
            </Box>
          </Flex>

          <Text fontSize='lg'>
            <span className='font-bold'>Model: </span> 
            { ' ' }
            {data.modelYear} 
            { ' ' }
            {data.modelYear > 2019 && <span className='font-bold text-red-600	text-sm'>New!</span>}   
          </Text>
          <hr />
      </div>

      <div className="basis-1/4">
        
          <Text fontSize='2xl'>
            Price <br /> 
            <span className='font-bold'>{data.price} $ </span>
            <span className='text-sm'>Total</span>
          </Text>

          <Button colorScheme='orange' className='mt-3'>View Details</Button> 

             
      </div>
    </div>
  )
}

export default ListingItem