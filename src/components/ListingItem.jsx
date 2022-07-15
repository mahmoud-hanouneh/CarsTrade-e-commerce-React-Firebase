import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Heading, Text  } from '@chakra-ui/react'
import { HiLocationMarker } from 'react-icons/hi' 

const ListingItem = ( { info, id } ) => {
  return (
    <div className="flex flex-row p-6 gap-4 shadow-xl mb-8 w-10/12 mx-auto shadow-white shadow-slate-200">
      <div className="basis-1/4">
          <img className='w-fit max-h-min' src={info.carImages[0]} alt="" />
      </div>
      <div className="basis-1/2">
          <Heading as='h4' size='md'>
            {info.manufacturer}
          </Heading>

          <Text fontSize='sm'>
            <HiLocationMarker />
            {info.city}
          </Text>

          <Text fontSize='sm'>
            {info.price}
          </Text>

          <hr />
      </div>
      <div className="basis-1/4">
        <Button colorScheme='orange'>View Details</Button>      
      </div>
    </div>
  )
}

export default ListingItem