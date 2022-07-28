import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useToast, Heading, Button, Text, Box, Textarea, Container } from '@chakra-ui/react'

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ownerData, setOwnerData] = useState(null)
  const [message, setMessage] = useState('')
  const params = useParams()
  const toast = useToast()

  const changeHandler = (e) => {
    setMessage(e.target.value)
  }
  useEffect(() => {

    const getOwnerData = async () => {
      try {
        const docRef = doc(db, 'users', params.carOwnerId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
          setOwnerData(docSnap.data())
        } else {
          toast({
            title: 'Owner Not Found',
            description: "Cound not find the owner",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    
        }
      } catch (error) {
        console.log(error.code)
      }
    }
    getOwnerData()

  }, [params.carOwnerId])

  return (
    <>
     <Box px={10}>
      {ownerData && (
        <Box>
          <Heading mb={30}>Contact {ownerData.name}</Heading>
         
          <Text mb={2} fontSize='xl'>{ownerData.name}</Text>
          <Text mb={5} fontSize='xl'>{ownerData.email}</Text>
          <Text mb='12px'>Message:</Text>
          <Textarea
            mb={2}
            value={message}
            onChange={changeHandler}
            placeholder={`Hello ${ownerData.name}, I am interested in you ad ... `}
            size='sm'
          />
          <a
            href={`mailto:${ownerData.email}?Subject=${searchParams.get(
              'listingName'
            )}&body=${message}`}
          >
             <Button>
              Send Message
             </Button>
          </a>
        </Box>
      
      )}
    </Box>
    </>
   
  )
}

export default Contact